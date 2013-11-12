/* Copyright (C) 2009 - 2011 Shopiy, Shopiy许可协议 (http://www.shopiy.com/license) */
$.ajaxSetup({
	cache: false
});
$(document).ready(function() {
	$('body').append('<div id="loading_box">' + lang.process_request + '</div>');
	$('#loading_box').ajaxStart(function(){
		var loadingbox = $(this);
		var left = -(loadingbox.outerWidth() / 2);
		loadingbox.css({'marginRight': left + 'px'});
		loadingbox.delay(3000).fadeIn(400);
	});
	$('#loading_box').ajaxSuccess(function(){
		$(this).stop().stop().fadeOut(400);
	});
});
var loader = '<div class="loader">&nbsp;</div>', result = '<div class="result"></div>', status = '<div class="status"></div>', page = 'undefined', action = 'undefined';
function clearHistory() {
	$.get(
		'user.php',
		'act=clear_history',
		function(){
			$('#history').animate({height:'0',opacity:'0'}, 1000).css({visibility:'hidden'});
			$('#history .more').tipsy('hide');
		},
		'text'
	);
}

(function($) {
$.fn.GoodsCleariy = function() {
	$('.first_child', this).before('<hr class="clearer"/>');
};
})(jQuery);

function orderQuery() {
	var order_sn = order_input.val(), reg = /^[\.0-9]+/;
	if (order_sn.length < 10 || ! reg.test(order_sn)) {
		order_input.focus().tipsy('show');
		return;
	}
	else {
		var order_loader = $('#order_query .loader');
		order_loader.css({visibility:'visible'}).fadeTo(0, 1000);
		$.get(
			'user.php?act=order_query&order_sn=s',
			'order_sn=s' + order_sn,
			function(response){
				var order_result = $('#order_query .result');
				var res = $.evalJSON(response);
				if (res.message != '') {
					order_result.css({display:'block',backgroundColor:'#ff5215'});
					order_result.html(res.message);
				}
				if (res.error == 0) {
					order_result.css({display:'block',backgroundColor:'#97cf4d'});
					order_result.html(res.content);
					$('form', order_result).attr('name', function(){return this.name+'_new'});
					$('form a', order_result).attr('href', function(){return this.href.replace(/\'\]\.submit\(\)\;/, '_new\'].submit();')});
				}
				order_result.animate({backgroundColor:'#fff'}, 1000);
				order_loader.fadeTo(1000, 0);
			},
			'text'
		);
	}
}

function submitVote()
{
	var type = $('#vote input[name="type"]').val(), vote_id = $('#vote input[name="id"]').val(), option = '';
	$('#vote input[name="option_id"]:checked').each(function() {
		var option_id = $(this).val();
		option += option_id + ',';
	});

	if (option == '') {
		$('#vote form').tipsy('show');
		return;
	} else {
		var vote_result = $('#vote .result');
		$('#vote .loader').css({visibility:'visible'}).fadeTo(0, 1000);
		$.post(
			'vote.php',
			{vote: vote_id, options: option, type: type},
			function(response){
				var res = $.evalJSON(response);
				if (res.message != '') {
					vote_result.css({display:'block',backgroundColor:'#ff5215'});
					vote_result.html(res.message);
				}
				if (res.error == 0) {
					$('#vote_inner').html(res.content);
				}
				vote_result.animate({backgroundColor:'#fff'}, 1000);
				$('#vote .loader').fadeTo(1000, 0);
			},
			'text'
		);
	}
}


function addEmailList() {
	var email = subscription_email.val();
	if (!isValidEmail(email)) {
		subscription_email.focus().tipsy('show');
		return;
	}
	else {
		$('#subscription .loader').css({visibility:'visible'}).fadeTo(0, 1000);
		$.get(
			'user.php?act=email_list&job=add',
			'email=' + email,
			function(response){
				$('#subscription .result').css({display:'block',backgroundColor:'#999999'}).html(response).animate({backgroundColor:'#f0f0f0'}, 1000);
				$('#subscription .loader').fadeTo(1000, 0);
			},
			'text'
		);
	}
}
function cancelEmailList()
{
	var email = subscription_email.val();
	if (!isValidEmail(email)) {
		subscription_email.focus().tipsy('show');
		return;
	}
	else {
		var subscription_result = $('#subscription .result');
		var subscription_loader = $('#subscription .loader');
		subscription_loader.css({visibility:'visible'}).fadeTo(0, 1000);
		$.get(
			'user.php?act=email_list&job=del',
			'email=' + email,
			function(response){
				subscription_result.css({display:'block',backgroundColor:'#999999'}).html(response).animate({backgroundColor:'#f0f0f0'}, 1000);
				subscription_loader.fadeTo(1000, 0);
			},
			'text'
		);
	}
}
function isValidEmail(email) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return filter.test(email);
}

function getAttrSiy(area) {
	var attrList = new Array();
	area.find('input[name^="spec_"]:checked, select[name^="spec_"]').each(function(i) {
		attrList[i] = $(this).val();
	});
	return attrList;
}

(function($) {
$.fn.ChangePriceSiy = function() {
	var area = $(this);
	loadPrice();
	area.find('input[name^="spec_"], select[name^="spec_"]').change(function() {
		var number = area.find('input[name="number"]').val();
		if (number.length == 0) {
			area.find('[name="number"]').val('1');
			loadPrice();
		}
	});
	area.find('input[name="number"]').keyup(function() {
		var number = area.find('input[name="number"]').val();
		if (number.length > 0) {
			loadPrice();
		}
	});
	function loadPrice() {
		var attr = getAttrSiy(area);
		var number = area.find('input[name="number"]').val();
		if (number < 1) {
			var qty = '1';
		}
		else {
			var qty = number;
		};
		$.get(
			'goods.php',
			'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty,
			function(response){
				var res = $.evalJSON(response);
				if (res.err_msg.length > 0) {
					$.fn.colorbox({html:'<div class="message_box">' + res.err_msg + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
				else {
					area.find('[name="number"]').val(res.qty);
					area.find('.amount').html(res.result);
				}
			},
			'text'
		);
	};
};
})(jQuery);


function buy(id, num, parent) {
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	var number = 1;
	var form = $('#purchase_form');
	var quick = 0;

	if (form.length > 0) {
		spec_arr = getAttrSiy(form);
		var numberInput = form.find('input[name="number"]');
		if (numberInput) {
			number = numberInput.val();
		}
		quick = 1;
	}
	if (num > 0) {
		number = num;
	}

	goods.quick    = quick;
	goods.spec     = spec_arr;
	goods.goods_id = id;
	goods.number   = number;
	goods.parent   = (typeof(parent) == 'undefined') ? 0 : parseInt(parent);

	$.post(
		'flow.php?step=add_to_cart',
		{goods: $.toJSON(goods)},
		function(response){
			var res = $.evalJSON(response);
			if (res.error > 0) {
				if (res.error == 2) {
					$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="add_booking&id=' + res.goods_id + '&spec=' + res.product_spec + '" class="button brighter_button"><span>' + lang.booking + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
				}
				else if (res.error == 6) {
					openSpeSiy(res.message, res.goods_id, number, res.parent);
				}
				else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
			}
			else {
				//$('#cart').html(res.content);
				loadCart();
				if (res.one_step_buy == '1') {
					location.href = 'checkout';
				}
				else {
					if ($('#page_flow').length > 0) {
						location.href = 'cart';
					} else {
						$.fn.colorbox({html:'<div class="message_box mb_info">' + lang.add_to_cart_success + '<p class="action"><a href="cart" class="button brighter_button"><span>' + lang.checkout_now + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
					}
				}
			}
		},
		'text'
	);
}

function openSpeSiy(message, goods_id, num, parent) {
	var html = '<div class="message_box" id="properties_box"><div class="properties_wrapper">';
	for (var spec = 0; spec < message.length; spec++) {
		var tips = '';
		if (message[spec]['attr_type'] == 2) {
			var tips = 'title="' + lang.multi_choice + '"';
		};
		html += '<dl class="properties clearfix" ' + tips + '><dt>' +  message[spec]['name'] + '：</dt>';
		if (message[spec]['attr_type'] == 1) {
			html += '<dd class="radio">';
			for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++) {
				var check = '';
				var title = '';
				if (val_arr == 0) {
					var check = 'checked="checked"';
				}
				if (message[spec]["values"][val_arr]["price"] != '') {
					var title = 'title="' + lang.add + message[spec]["values"][val_arr]["format_price"] + '"';
				}
				html += '<label for="spec_value_'+ message[spec]["values"][val_arr]["id"] +'" ' + title + '><input type="radio" name="spec_' + message[spec]["attr_id"] + '" value="' + message[spec]["values"][val_arr]["id"] + '" id="spec_value_' + message[spec]["values"][val_arr]["id"] + '" ' + check + ' />' + message[spec]["values"][val_arr]["label"] + '</label>';
			} 
			html += '<input type="hidden" name="spec_list" value="' + val_arr + '" /></dd>';
		}
		else {
			html += '<dd class="checkbox">';
			for (var val_arr = 0; val_arr < message[spec]["values"].length; val_arr++) {
				var title = '';
				if (message[spec]["values"][val_arr]["price"] != '') {
					var title = 'title="' + lang.add + message[spec]["values"][val_arr]["format_price"] + '"';
				}
				html += '<label for="spec_value_' + message[spec]["values"][val_arr]["id"] + '" ' + title + '><input type="checkbox" name="spec_' + message[spec]["attr_id"] + '" value="' + message[spec]["values"][val_arr]["id"] + '" id="spec_value_' + message[spec]["values"][val_arr]["id"] + '" />' + message[spec]["values"][val_arr]["label"] + '</label>';
			}
			html += '<input type="hidden" name="spec_list" value="' + val_arr + '" /></dd>';
		}
		html += "</dl>";
	}
	html += '</div><p class="action"><a href="javascript:submitSpeSiy(' + goods_id + ',' + num + ',' + parent + ')" class="buy button brighter_button"><span>' + lang.buy + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.cancel + '</a></p></div>';
	
	$.fn.colorbox({scrolling:false,html: html,title: lang.select_spe});
	$('.properties').Formiy();
	$('.properties dl').tipsy({gravity: 'e',fade: true,html:true});
	$('.properties label').tipsy({gravity: 's',fade: true,html:true});
}

function submitSpeSiy(goods_id, num, parent) {
	var goods = new Object();
	var spec_arr = new Array();
	var fittings_arr = new Array();
	var number = 1;
	var area = $('#properties_box');
	var quick = 1;

	if (num > 0) {
		number = num;
	}

	var spec_arr = getAttrSiy(area);

	goods.quick    = quick;
	goods.spec     = spec_arr;
	goods.goods_id = goods_id;
	goods.number   = number;
	goods.parent   = (typeof(parent) == "undefined") ? 0 : parseInt(parent);

	$.post(
		'flow.php?step=add_to_cart',
		{goods: $.toJSON(goods)},
		function(response){
			var res = $.evalJSON(response);
			if (res.error > 0) {
				if (res.error == 2) {
					$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="add_booking&id=' + res.goods_id + '&spec=' + res.product_spec + '" class="button brighter_button"><span>' + lang.booking + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
				}
				else if (res.error == 6) {
					openSpeSiy(res.message, res.goods_id, res.parent);
				}
				else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
			}
			else {
				//$('#cart').html(res.content);
				loadCart();
				if (res.one_step_buy == '1') {
					location.href = 'checkout';
				}
				else {
					if ($('#page_flow').length > 0) {
						location.href = 'cart';
						//window.location.reload();
					} else {
						$.fn.colorbox({html:'<div class="message_box mb_info">' + lang.add_to_cart_success + '<p class="action"><a href="cart" class="button brighter_button"><span>' + lang.checkout_now + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
					};
				}
			}
		},
		'text'
	);
}

function collect(id) {
	$.get(
		'user.php?act=collect',
		'id=' + id,
		function(response){
			var res = $.evalJSON(response);
			$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
		},
		'text'
	);
}

function like(id) {
	$.get(
		'user.php?act=like',
		'id=' + id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_like[data-id='+id+']');
				target.addClass('btn_liked').attr('href','javascript:unlike('+id+')').html('<i></i><span class="status">'+lang.btn_liked+'</span><span class="act">'+lang.btn_unlike+'</span>');
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function unlike(id) {
	$.get(
		'user.php?act=unlike',
		'id=' + id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_like[data-id='+id+']');
				target.removeClass('btn_liked').attr('href','javascript:like('+id+')').html('<i></i><span class="status">'+lang.btn_like+'</span><span class="act">'+lang.btn_like_add+'</span>');
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function addAA(id) {
	$.get(
		'user.php?act=add_auction_attention',
		'id=' + id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('#auction_'+id);
				target.addClass('has_attention').find('.add_aa').addClass('remove_aa').attr('href','javascript:removeAA('+id+')').find('.tipsy-inner').text(lang.remove_auction_attention);
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function removeAA(id) {
	$.get(
		'user.php?act=remove_auction_attention',
		'id=' + id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('#auction_'+id);
				target.removeClass('has_attention').find('.add_aa').removeClass('remove_aa').attr('href','javascript:addAA('+id+')').find('.tipsy-inner').text(lang.add_auction_attention);
			}
			//$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
		},
		'text'
	);
}

function addPackageToCart(id) {
	var package_info = new Object();
	var number       = 1;

	package_info.package_id = id
	package_info.number     = number;

	$.post(
		'flow.php?step=add_package_to_cart',
		{package_info: $.toJSON(package_info)},
		function(response){
			var res = $.evalJSON(response);
			if (res.error > 0) {
				if (res.error == 2) {
					$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="add_booking&id=' + res.goods_id + '" class="button brighter_button"><span>' + lang.booking + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.cancel + '</a></p></div>'});
				}
				else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
			}
			else {
				//$('#cart').html(res.content);
				loadCart();
				if (res.one_step_buy == '1') {
					location.href = 'checkout';
				}
				else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + lang.add_to_cart_success + '<p class="action"><a href="cart" class="button brighter_button"><span>' + lang.checkout_now + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
				}
			}
		},
		'text'
	);
}

function fittings_to_flow(goodsId,parentId)
{
	var goods        = new Object();
	var spec_arr     = new Array();
	var number       = 1;
	goods.spec     = spec_arr;
	goods.goods_id = goodsId;
	goods.number   = number;
	goods.parent   = parentId;

	$.post(
		'flow.php?step=add_to_cart',
		{goods: $.toJSON(goods)},
		function(response){
			var res = $.evalJSON(response);
			if (res.error > 0) {
				if (res.error == 2) {
					$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="add_booking&id=' + res.goods_id + '&spec=' + res.product_spec + '" class="button brighter_button"><span>' + lang.booking + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.continue_browsing_products + '</a></p></div>'});
				}
				else if (res.error == 6) {
					openSpeSiy(res.message, res.goods_id, res.parent);
				}
				else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
			} else {
				location.href = 'cart';
			}
		},
		'text'
	);
}


function validAndTip(obj){if(obj.isValid()){obj.tipsy('hide');}else{obj.tipsy('show');}return false;}
function validAndTipNext(obj){if(obj.isValid()){obj.next().tipsy('hide');}else{obj.next().tipsy('show');}return false;}

function validLogin() {
	$('#username_login, #password_login').valid8('').tipsy({gravity: 'w', fade: true, trigger: 'manual'}).focusout(function(){validAndTip($(this));}).keyup(function(){validAndTip($(this));});
	$('#username_login').focus().attr('original-title', lang.error_username_required);
	$('#password_login').attr('original-title', lang.error_password_required);
	if ($('#captcha_login').length > 0) {
		$('#captcha_login').valid8('').next().tipsy({gravity: 'w', fade: true, trigger: 'manual'}).attr('original-title', lang.error_captcha_required);
		$('#captcha_login').focusout(function(){validAndTipNext($(this));}).keyup(function(){validAndTipNext($(this));});
	}
	$('#user_login').submit(function(){
		var unc = 0,pwc = 0,ccc = 0;
		validAndTip($('#username_login'));
		validAndTip($('#password_login'));
		if ($('#username_login').val() != '') {unc = 1};
		if ($('#password_login').val() != '') {pwc = 1};
		if ($('#captcha_login').length > 0) {
			validAndTipNext($('#captcha_login'));
			if ($('#captcha_login').val() != '') {ccc = 1};
			if(unc+pwc+ccc == 3){
				return true;
			} else {
				return false;
			}
		} else {
			if(unc+pwc+ccc == 2){
				return true;
			} else {
				return false;
			}
		};
	});
}

function openQuickLogin() {
	$.fn.colorbox({scrolling:false,href:'user.php?act=login&ajax=1',onComplete:function(){
			$('.tipsy').remove();
			validQuickLogin();
		},onCleanup:function(){
			$('.tipsy').remove();
		}
	});
}

function validAndTip2(obj){if(obj.val() != ''){obj.tipsy('hide');}else{obj.tipsy('show');}return false;}
function validAndTipNext2(obj){if(obj.val() != ''){obj.next().tipsy('hide');}else{obj.next().tipsy('show');}return false;}

function validQuickLogin() {
	$('#user_login .tip').tipsy({gravity: 's',fade: true,html: true});
	$('#username_login, #password_login').tipsy({gravity: 'w', fade: true, trigger: 'manual'}).focusout(function(){validAndTip2($(this));}).keyup(function(){validAndTip2($(this));});//
	$('#username_login').focus().attr('original-title', lang.error_username_required);
	$('#password_login').attr('original-title', lang.error_password_required);
	if ($('#captcha_login').length > 0) {
		$('#captcha_login').next().tipsy({gravity: 'w', fade: true, trigger: 'manual'}).attr('original-title', lang.error_captcha_required);
		$('#captcha_login').focusout(function(){validAndTipNext2($(this));}).keyup(function(){validAndTipNext2($(this));});//
	}
	$('#user_login').submit(function(){
		var unc = 0,pwc = 0,ccc = 0;
		validAndTip2($('#username_login'));
		validAndTip2($('#password_login'));
		if ($('#username_login').val() != '') {unc = 1};
		if ($('#password_login').val() != '') {pwc = 1};
		if ($('#captcha_login').length > 0) {
			validAndTipNext2($('#captcha_login'));
			if ($('#captcha_login').val() != '') {ccc = 1};
			if(unc+pwc+ccc == 3){
				quickLogin();
				return false;
			} else {
				return false;
			}
		} else {
			if(unc+pwc+ccc == 2){
				quickLogin();
				return false;
			} else {
				return false;
			}
		};
	});
}


function quickLogin() {
	var userArea = $('#user_area');
	var username = $('#username_login').val();
	var password = $('#password_login').val();
	var remember = '';
	var captcha = '';
	if ($('#captcha_login').length > 0) {
		var captcha = $('#captcha_login').val();
	}
	if ($('#remember_login:checked').length > 0) {
		$.post(
			'user.php?act=signin',
			{username: username, password: encodeURIComponent(password), captcha: captcha, remember: 1},
			function(response){
				var res = $.evalJSON(response);
				if (res.error == 9) {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.content + '<p class="action"><a href="verify_email" class="button brighter_button"><span>' + lang.to_verify + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.login_cancel + '</a></p></div>'});
				} else if (res.error > 0) {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.content + '<p class="action"><a href="login" class="button brighter_button quick_login"><span>' + lang.login_again + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.login_cancel + '</a></p></div>'});
					if(res.html) {
						userArea.html(res.html);
					}
				} else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + lang.login_success + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a><a href="account" class="tool_link">' + lang.go_to_user_center + '</a></p></div>'});
					userArea.html(res.content);
				}
			},
			'text'
		);
	} else {
		$.post(
			'user.php?act=signin',
			{username: username, password: encodeURIComponent(password), captcha: captcha},
			function(response){
				var res = $.evalJSON(response);
				if (res.error == 9) {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.content + '<p class="action"><a href="verify_email" class="button brighter_button"><span>' + lang.to_verify + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.login_cancel + '</a></p></div>'});
				} else if (res.error > 0) {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.content + '<p class="action"><a href="login" class="button brighter_button quick_login"><span>' + lang.login_again + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.login_cancel + '</a></p></div>'});
					if(res.html) {
						userArea.html(res.html);
					}
				} else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + lang.login_success + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a><a href="account" class="tool_link">' + lang.go_to_user_center + '</a></p></div>'});
					userArea.html(res.content);
				}
			},
			'text'
		);
	}
}

function submitComment(frm) {
	var cmt = new Object();
	cmt.email           = frm.elements['email'].value;
	cmt.content         = frm.elements['content'].value;
	cmt.type            = frm.elements['cmt_type'].value;
	cmt.id              = frm.elements['id'].value;
	cmt.enabled_captcha = frm.elements['enabled_captcha'] ? frm.elements['enabled_captcha'].value : '0';
	cmt.captcha         = frm.elements['captcha'] ? frm.elements['captcha'].value : '';
	cmt.rank            = 0;
	for (i = 0; i < frm.elements['comment_rank'].length; i++) {
		if (frm.elements['comment_rank'][i].checked) {
			cmt.rank = frm.elements['comment_rank'][i].value;
		}
	}
	var validItem = $('#cf_email, #cf_content, #cf_captcha');
	validItem.tipsy({gravity: 's', fade: true, trigger: 'manual'}).valid8('').focusout(function(){validAndTip($(this));}).keyup(function(){validAndTip($(this));});
	if (cmt.email.length > 0) {
		if (!isValidEmail(cmt.email)) {
			$('#cf_email').attr('original-title', lang.error_email_format).tipsy('show');
			return false;
		}
	} else {
		$('#cf_email').attr('original-title', lang.error_email_required).tipsy('show');
		return false;
	}
	if (cmt.content.length == 0) {
		$('#cf_content').attr('original-title', lang.error_comment_content_required).tipsy('show');
		return false;
	}
	if ($('#cf_captcha').length > 0 && cmt.captcha.length == 0) {
		$('#cf_captcha').attr('original-title', lang.error_captcha_required).tipsy('show');
		return false;
	}
	$.post(
		'comment.php',
		{cmt: $.toJSON(cmt)},
		function(response){
			var res = $.evalJSON(response);
			if (res.message) {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
			if (res.error == 0) {
				$('#comment_wrapper').html(res.content);
				$('.rank_star').rating({
					focus: function(value, link){
						var tip = $('#star_tip');
						tip[0].data = tip[0].data || tip.html();
						tip.html(link.title || 'value: '+value);
					},
					blur: function(value, link){
						var tip = $('#star_tip');
						$('#star_tip').html(tip[0].data || '');
					}
				});
				$('.tip').tipsy({gravity: 's',fade: true,html: true});
			}
		},
		'text'
	);
	return false;
}

/* 评论的翻页 */
function gotoPage(page, id, type) {
	$.get(
		'comment.php?act=gotopage',
		'page=' + page + '&id=' + id + '&type=' + type,
		function(response){
			var res = $.evalJSON(response);
			$('#comment_wrapper').html(res.content);
			$('.rank_star').rating({
				focus: function(value, link){
					var tip = $('#star_tip');
					tip[0].data = tip[0].data || tip.html();
					tip.html(link.title || 'value: '+value);
				},
				blur: function(value, link){
					var tip = $('#star_tip');
					$('#star_tip').html(tip[0].data || '');
				}
			});
		},
		'text'
	);
}

/* 购买记录的翻页 */
function gotoBuyPage(page, id) {
	$.get(
		'goods.php?act=gotopage',
		'page=' + page + '&id=' + id,
		function(response){
			var res = $.evalJSON(response);
			$('#bought_wrap').html(res.result);
		},
		'text'
	);
}

/* =user */
function sendHashMail() {
	$.get(
		'user.php?act=send_hash_mail',
		'',
		function(response){
			var res = $.evalJSON(response);
			$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			$('#comment_wrapper').html(res.content);
		},
		'text'
	);
}


/* =snatch */
function bid()
{
	var form = $('#snatch_form');
	var id = form.find('input[name="snatch_id"]').val();
	var priceInput = form.find('input[name="price"]');
	var price = priceInput.val();
	priceInput.tipsy({gravity: 'w', fade: true, trigger: 'manual'}).focusout(function() {
		$(this).tipsy('hide');
	}).keypress(function() {
		$(this).tipsy('hide');
	});;
	if (price == '') {
		priceInput.attr('original-title', lang.error_price_required).tipsy('show');
		return;
	} else {
		var reg = /^[\.0-9]+/;
		if ( ! reg.test(price)) {
			priceInput.attr('original-title', lang.error_price).tipsy('show');
			return;
		} else {
			$.post(
				'snatch.php?act=bid',
				{id: id, price: price},
				function(response){
					var res = $.evalJSON(response);
					if (res.error == 0) {
						$('#snatch_wrapper').html(res.content);
					} else {
						$.fn.colorbox({html:'<div class="message_box mb_info">' + res.content + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
					}
				},
				'text'
			);
		}
	}
}

function newPrice(id) {
	$.get(
		'snatch.php?act=new_price_list',
		'id=' + id,
		function(response){
			$('#price_list').html(response);
			$('#price_list').find('.bd').css({backgroundColor:'#ffc'}).animate({backgroundColor:'#fff'}, 1000);
		},
		'text'
	);
}

function regionChanged(obj, type, selName) {
	var parent = obj.options[obj.selectedIndex].value;
	loadRegions(parent, type, selName);
}
function loadRegions(parent, type, target) {
	var target = $('#'+target+'');
	target.after(loader).next('.loader').css({visibility:'visible'}).fadeTo(0, 1000);
	$.get(
		'region.php',
		'type=' + type + '&target=' + target + "&parent=" + parent,
		function(response){
			var res = $.evalJSON(response);
			target.next('.loader').fadeTo(500, 0, function(){
				$(this).remove();
			});
			target.find('option[value!="0"]').remove();
			if (res.regions.length == 0) {
				target.css('display','none');
				target.nextAll('select').css('display','none');
			} else {
				target.css('display','');
				for (i = 0; i < res.regions.length; i ++ ) {
					target.append('<option value="' + res.regions[i].region_id + '">' + res.regions[i].region_name + '</option>');
				}
			};
		},
		'text'
	);
}

function loadCart(show) {
	$.post(
		'cart.php',
		'',
		function(response){
			$('#cart .loader').fadeTo(1000, 0);
			$("#cart").html(response);
			if (show == 1) {
				$('#cart .list_wrapper').css({display:'block',backgroundColor:'#ffc'}).animate({backgroundColor:'#fff'}, 1000);
				//$('#cart .list_wrapper .close').css({display:'block'});
			}
		},
		'text'
	);
}

function cartDrop(id) {
	$('#cart .loader').css({visibility:'visible'}).fadeTo(0, 1000);
	$.get(
		'flow.php?step=drop_goods',
		'id=' + id,
		function(response){
			if ($('#page_flow').length > 0) {
				if (action == 'checkout') {
					location.href = 'checkout';
				} else {
					location.href = 'cart';
				}
			} else {
				loadCart(1);
			}
		},
		'text'
	);
}

function closeCart() {
	$('#cart .list_wrapper').hide();
}

function cAlert(content) {
	$('.tipsy').css({zIndex:'100'});
	$.fn.colorbox({transition:'none',html:'<div class="message_box mb_info">' + content + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
}


function submitTag() {
	var tag = $('#tag_form input[name="tag"]').val();
	var goods_id = $('#tag_form input[name="goods_id"]').val();
	if (tag.length > 0 && parseInt(goods_id) > 0) {
		$.post(
			'user.php?act=add_tag',
			{id: goods_id, tag: tag},
			function(response){
				var res = $.evalJSON(response);
				if (res.error > 0) {
					cAlert(res.message);
				} else {
					var tags = res.content;
					var html = '';
					for (i = 0; i < tags.length; i++) {
						html += '<a href="search.php?keywords='+tags[i].word+'" class="item">' +tags[i].word + '<em>' + tags[i].count + '</em></a>';
					}
					$('#tag_list').html(html);
				}
			},
			'text'
		);
	}
}

function reset_html(id) {
	$('#'+id).html($('#'+id).html());
}

function switchLanguage(code) {
	location.href = 'switch.php?code='+code+'&redirect='+encodeURIComponent(location.href);
}

function showArtInfo(id) {
	$.get(
		'art_info.php',
		'id=' + id,
		function(response){
			$.fn.colorbox({html:response});
		},
		'text'
	);
	return false;
}

function numberPickerInt() {
	$('.number_picker').each(function(){
		var picker = $(this);
		var input = picker.find('input');
		var minus = picker.find('.minus');
		var plus = picker.find('.plus');
		minus.click(function(){
			var value = (parseInt(input.val()) > 0 ) ? parseInt(input.val()) : 0;
			var min = (parseInt(input.attr('min')) > 0 ) ? parseInt(input.attr('min')) : 1;
			var step = (parseInt(input.attr('step')) > 0 ) ? parseInt(input.attr('step')) : 1;
			if ((value - step) > min ) {
				input.val(value - step);
			} else {
				input.val(min);
			}
			return false;
		});
		plus.click(function(){
			var value = (parseInt(input.val()) > 0 ) ? parseInt(input.val()) : 0;
			var min = (parseInt(input.attr('min')) > 0 ) ? parseInt(input.attr('min')) : 1;
			var step = (parseInt(input.attr('step')) > 0 ) ? parseInt(input.attr('step')) : 1;
			if ((value + step) > min) {
				input.val(value + step);
			} else {
				input.val(min);
			}
			return false;
		});
	});
}

function auctionInit() {
	var refreshTime = $('#refresh_time');
	if(refreshTime.length > 0){
		var time = parseInt(refreshTime.attr('time')) - server_time;
		if (refreshTime.attr('timezone')) {
			time -= parseInt(refreshTime.attr('timezone'))*3600;
		}
		var until = '+'+time;
		refreshTime.countdown({
			until: until,
			format: 's',
			onTick: watchCountdown
		});
	}
	$('#show_all_log').click(function() {
		$.fn.colorbox({height:'80%',width:'750px',inline:true,href:'#auction_log_all .collector_list',onOpen:function(){
				$('.tipsy').css({zIndex:'100'});
			},onClosed:function(){
				$('.tipsy').css({zIndex:'1000'});
			}
		});
		return false;
	});
	var form = $('#auction_form');
	var act = form.find('[name="act"]').val();
	var id = form.find('[name="id"]').val();
	form.submit(function(){
		var price = form.find('[name="price"]').val();
		$.post(
			'auction.php',
			{ajax:'1', act:act, id:id, price:price},
			function(response){
				var res = $.evalJSON(response);
				if (res.error == 9) {
					$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="verify_email" class="button brighter_button"><span>' + lang.to_verify + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.cancel + '</a></p></div>'});
				} else if (res.error > 0) {
					cAlert(res.message);
				} else {
					location.href = res.message;
				}
			},
			'text'
		);
		return false;
	});
	numberPickerInt();
}

function eventInit() {
	if ($.cookie('auction_display') == 'list') {
		$('#auction_display_switcher .list').addClass('current_list').siblings().removeClass('current_grid');
		$('#auction_active').addClass('auction_display_list').removeClass('auction_display_grid');
	}
	if ($.cookie('auction_fullscreen') == 'true' && $('#auction_active').length > 0) {
		$('#page_auction').addClass('auction_fullscreen');
		var innerWidth = $('#auction_active').innerWidth();
		$('style.fullscreen_css').remove();
		var itemInnerWidth = innerWidth - 2;
		var itemNameWidth = innerWidth - 610;
		var style = '<style type=\"text\/css\" class=\"fullscreen_css\">.auction_fullscreen .auction_display_list .item{width:'+innerWidth+'px;}.auction_fullscreen .auction_display_list .item_inner{width:'+itemInnerWidth+'px;}.auction_fullscreen .auction_display_list .item .name{width:'+itemNameWidth+'px;}<\/style>';
		$('body').append(style);
	}
	if (event_status != 'finished') {
		var refreshTime = $('#refresh_time');
		if(refreshTime.length > 0){
			var time = parseInt(refreshTime.attr('time')) - server_time;
			if (refreshTime.attr('timezone')) {
				time -= parseInt(refreshTime.attr('timezone'))*3600;
			}
			var until = '+'+time;
			refreshTime.countdown({
				until: until,
				format: 's',
				onTick: watchCountdown
			});
		}
	}
	var container = $('#auction_active .item_list_wrapper');
	container.isotope({
		itemSelector : '.item',
		getSortData : {
			start_price : function ( $elem ) {
				return parseInt($elem.attr('start_price'));
			},
			end_price : function ( $elem ) {
				return parseInt($elem.attr('end_price'));
			},
			latest_price : function ( $elem ) {
				return parseInt($elem.attr('latest_price'));
			},
			latest_time : function ( $elem ) {
				return parseInt($elem.attr('latest_time'));
			}
		}
	});
	$('#item_list_filter a').click(function(){
		var $this = $(this);
		if ($this.hasClass('selected')){
			return false;
		}
		$this.addClass('selected').siblings().removeClass('selected');
		var selector = $this.attr('data-filter');
		if ($('#filter_type_has_bid').hasClass('selected')) selector = selector+'.has_bid';
		if ($('#filter_type_attention').hasClass('selected')) selector = selector+'.has_attention';
		container.isotope({filter:selector});
		return false;
	});
	$('#item_list_filter_type a').click(function(){
		var $this = $(this);
		if ($this.hasClass('selected')){
			$this.removeClass('selected checked');
			var selector = $('#item_list_filter .selected').first().attr('data-filter');
			var another = $this.siblings('a').first();
			if (another.hasClass('selected')) selector = selector+another.attr('data-filter');
			container.isotope({filter:selector});
		} else {
			$this.addClass('selected checked');
			var selector = $('#item_list_filter .selected').first().attr('data-filter');
			selector = selector+$this.attr('data-filter');
			var another = $this.siblings('a').first();
			if (another.hasClass('selected')) selector = selector+another.attr('data-filter');
			container.isotope({filter:selector});
		}
		return false;
	});
	$('#item_list_sort a').click(function(){
		var $this = $(this);
		$this.addClass('selected').siblings().removeClass('selected arrow');
		var sort = $this.attr('id').slice(8);
		var selector = $('#item_list_filter .selected').attr('data-filter');
		if ($('#filter_type_has_bid').hasClass('selected')) selector = selector+'.has_bid';
		if ($('#filter_type_attention').hasClass('selected')) selector = selector+'.has_attention';
		if (sort == 'original') {
			container.isotope({sortBy:'original-order',sortAscending:true,filter:selector});
		} else if (sort == 'start_price') {
			if ($this.hasClass('arrow')) {
				if ($this.hasClass('arrow_up')) {
					$this.removeClass('arrow_up').addClass('arrow_down');
					container.isotope({sortBy:sort,sortAscending:false,filter:selector});
				} else {
					$this.removeClass('arrow_down').addClass('arrow_up');
					container.isotope({sortBy:sort,sortAscending:true,filter:selector});
				}
			} else {
				$this.addClass('arrow arrow_up');
				container.isotope({sortBy:sort,sortAscending:true,filter:selector});
			}
		} else if (sort == 'end_price') {
			if ($this.hasClass('arrow')) {
				if ($this.hasClass('arrow_up')) {
					$this.removeClass('arrow_up').addClass('arrow_down');
					container.isotope({sortBy:sort,sortAscending:false,filter:selector});
				} else {
					$this.removeClass('arrow_down').addClass('arrow_up');
					container.isotope({sortBy:sort,sortAscending:true,filter:selector});
				}
			} else {
				$this.addClass('arrow arrow_up');
				container.isotope({sortBy:sort,sortAscending:true,filter:selector});
			}
		} else if (sort == 'latest_price') {
			if ($this.hasClass('arrow')) {
				if ($this.hasClass('arrow_up')) {
					$this.removeClass('arrow_up').addClass('arrow_down');
					container.isotope({sortBy:sort,sortAscending:false,filter:selector});
				} else {
					$this.removeClass('arrow_down').addClass('arrow_up');
					container.isotope({sortBy:sort,sortAscending:true,filter:selector});
				}
			} else {
				$this.addClass('arrow arrow_up');
				container.isotope({sortBy:sort,sortAscending:true,filter:selector});
			}
		} else if (sort == 'latest_time') {
			if ($this.hasClass('arrow')) {
				if ($this.hasClass('arrow_up')) {
					$this.removeClass('arrow_up').addClass('arrow_down');
					container.isotope({sortBy:sort,sortAscending:true,filter:selector});
				} else {
					$this.removeClass('arrow_down').addClass('arrow_up');
					container.isotope({sortBy:sort,sortAscending:false,filter:selector});
				}
			} else {
				$this.addClass('arrow arrow_up');
				container.isotope({sortBy:sort,sortAscending:false,filter:selector});
			}
		}
		return false;
	});
	$('#auction_display_switcher .list').click(function() {
		$(this).addClass('current_list').siblings().removeClass('current_grid');
		$('#auction_active').addClass('auction_display_list').removeClass('auction_display_grid');
		$.cookie('auction_display', 'list');
		container.isotope({
			itemSelector : '.item'
		});
		return false;
	});
	$('#auction_display_switcher .grid').click(function() {
		$(this).addClass('current_grid').siblings().removeClass('current_list');
		$('#auction_active').addClass('auction_display_grid').removeClass('auction_display_list');
		$.cookie('auction_display', 'grid');
		container.isotope({
			itemSelector : '.item'
		});
		return false;
	});
	$('#auction_display_switcher .fullscreen').click(function() {
		if($('body').hasClass('auction_fullscreen')){
			$('body').removeClass('auction_fullscreen');
			$.cookie('auction_fullscreen', '');
			container.isotope({
				itemSelector : '.item'
			});
		} else {
			$('body').addClass('auction_fullscreen');
			$.cookie('auction_fullscreen', 'true');
			container.isotope({
				itemSelector : '.item'
			});
			var innerWidth = $('#auction_active').innerWidth();
			$('style.fullscreen_css').remove();
			var itemInnerWidth = innerWidth - 2;
			var itemNameWidth = innerWidth - 610;
			var style = '<style type=\"text\/css\" class=\"fullscreen_css\">.auction_fullscreen .auction_display_list .item{width:'+innerWidth+'px;}.auction_fullscreen .auction_display_list .item_inner{width:'+itemInnerWidth+'px;}.auction_fullscreen .auction_display_list .item .name{width:'+itemNameWidth+'px;}<\/style>';
			$('body').append(style);
		}
		return false;
	});
}

function auctionRefresh() {
	var container = $('#auction_active .item_list_wrapper');
	var refreshLoader = $('#auction_refresh .loader');
	refreshLoader.stop().css({visibility:'visible'}).fadeTo(0, 1000);
	$('#auction_active .item').removeClass('has_updated');
	$.get(
		'event.php',
		'id=' + event_id + '&act=latest',
		function(response){
			var res = $.evalJSON(response);
			$('#latest_price_total').html(res.latest_price_total);
			if (res.error == 0) {
			if (res.overtime_count > 0) {
				$('.big_end_time .overtime_label em').text(res.overtime_count);
				$('.big_end_time').addClass('overtime_big_end_time');
				var overtime_class = 'overtime_count_'+res.overtime_count;
				if (!$('.big_end_time').hasClass(overtime_class)) {
					$('.big_end_time').addClass(overtime_class);
					var countdown = $('.big_end_time .end_time');
					var time = parseInt(res.overtime_end_time) - res.server_time;
					if (countdown.attr('timezone')) {
						time -= parseInt(countdown.attr('timezone'))*3600;
					}
					var until = '+'+time;
					countdown.countdown('change',{
						until: until,
						format: 'dhms',
						onExpiry: auctionRefresh
					});
				}
			}
			if (res.event_status == 'finished') {
				$('#refresh_time').countdown('pause');
				$('#auction_refresh').hide();
				$('#waiting_bar .bar').stop();
				$('.big_end_time strong').html(lang.auction_has_ended_and_thanks);
				$('.big_end_time span').html(lang.view_your_success_auction);
			}
			$.each(res.auction_list, function(i, item){
				var target = $('#auction_'+item['act_id']);
				target.addClass('has_updated').attr('start_price',item['start_price']).attr('end_price',item['end_price']).attr('latest_price',item['latest_price']).attr('latest_time',item['latest_time']).attr('min_price',item['min_price']);
				$('.user em',target).text(item['latest_user']);
				$('.user img',target).attr('src',item['latest_user_avater']);
				if (item['latest_price'] > 0) {
					target.addClass('has_latest_price').find('.latest_price .price').html(item['formated_latest_price']);
				} else {
					target.removeClass('has_latest_price');
				}
				var tipInner = target.find('.actions .action .tipsy-inner');
				if (item['status_no'] == 0) {
					target.removeClass('finished overtime');
					tipInner.text(lang.pre_start);
				} else if (item['status_no'] == 1) {
					target.removeClass('finished overtime');
					tipInner.text(lang.bid_now);
				} else if (item['status_no'] == 9) {
					target.removeClass('finished');
					target.addClass('overtime');
					tipInner.text(lang.overtime_ing);
				} else {
					target.addClass('finished');
					target.removeClass('overtime');
					tipInner.text(lang.finished);
				}
				refreshLoader.stop().fadeTo(1000, 0);
			});
			$('#auction_active .item:not(.has_updated)').detach();
			container.isotope('updateSortData', $('#auction_active .item')).isotope();
			} else {
				cAlert(res.message);
			}
		},
		'text'
	);
}

function watchCountdown(periods) {
	var seconds = periods[6];
	if (seconds > 60) {
		var residue = seconds % 60;
		$('#waiting_time').text(residue);
		var sp = (60 - residue) / 60 * 100;
		if (residue > 0) {
			if (!$('#waiting_bar').hasClass('first_start')) {
				$('#waiting_bar').addClass('first_start');
				intWatingBar(sp, residue * 1000);
			}
		} else {
			if (!$('#waiting_bar').hasClass('first_reset')) {
				$('#waiting_bar').addClass('first_reset');
				intWatingBar(0, 59900);
				clearInterval(auctionRefreshTimer);
				auctionRefreshTimer = setInterval('intWatingBar(0, 59900)', 60000);
			}
		}
	} else {
		$('#waiting_time').next('em').text(lang.end_after_seconds);
		intWatingBar(0, 59900);
		clearInterval(auctionRefreshTimer);
	}
}
function intWatingBar(sp,duration) {
	$('#waiting_bar .bar').stop().css({width:'0'}).animate({width:'100%'}, duration, 'linear', function(){
		if ($('#page_event').length > 0) {
			auctionRefresh();
		} else {
			auctionItemRefresh();
		}
	});
}
function auctionAction(id) {
	var target = $('#auction_'+id);
	if (target.hasClass('finished')) {
		window.open(target.find('a.action').attr('href'));
		return false;
	} else {
		var min_price = parseInt(target.attr('min_price'));
		var bid_range = parseInt(target.attr('bid_range'));
		var html = '<div class="placard"><div class="number_picker"><a href="javascript:;" class="minus">-</a><input name="price" type="text" min="'+min_price+'" step="'+bid_range+'" value="'+min_price+'" /><a href="javascript:;" class="plus">+</a></div><p class="placard_actions"><a href="javascript:bidAA('+id+');" class="button brighter_button bid_now"><span>'+lang.bid_now+'</span></a><a href="javascript:cancelAA('+id+');" class="button text_button cancel"><span>'+lang.cancel+'</span></a></p><span class="loader">&nbsp;</span></div>';
		target.find('.actions').append(html);
		numberPickerInt();
	}
}
function cancelAA(id) {
	var target = $('#auction_'+id);
	target.find('.placard').remove();
}
function bidAA(id) {
	var target = $('#auction_'+id);
	var price = parseInt(target.find('[name="price"]').val());
	var loader = target.find('.placard .loader');
	loader.css({visibility:'visible'}).fadeTo(0, 1000);
	var cancel = target.find('.placard .cancel');
	cancel.hide();
	$.post(
		'auction.php',
		{ajax:'1', act:'bid', id:id, price:price},
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 9) {
				$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="verify_email" class="button brighter_button"><span>' + lang.to_verify + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.cancel + '</a></p></div>'});
			} else if (res.error == 8) {
				$.fn.colorbox({html:'<div class="message_box mb_question">' + res.message + '<p class="action"><a href="account_deposit" class="button brighter_button"><span>' + lang.to_recharge + '</span></a><a href="javascript:void(0);" class="tool_link" onclick="$.fn.colorbox.close(); return false;">' + lang.cancel + '</a></p></div>'});
			} else if (res.error > 0) {
				cAlert(res.message);
			} else {
				target.addClass('has_bid').find('.placard').remove();
				cAlert(lang.bid_success);
				auctionRefresh();
			}
			loader.fadeTo(1000, 0);
			cancel.show();
		},
		'text'
	);
}

function tagFormInt() {
	var form = $('#tag_form');
	$('.top_tags .item', form).click(function(){
		var item = $(this);
		var input = $('[name=tag]', form);
		var tag = $('[name=tag]', form).val();
		if (tag != '') {
			input.val(tag + ',' + item.text());
		} else {
			input.val(item.text());
		}
		input.focus();
		return false;
	});
}

function memberOnlyNotice(){
	if ($.cookie('close_mon') != 'true') {
		var html = '<div id="member_only_notice"><span class="arrow">&nbsp;</span><a href="javascript:closeMON();" class="close">×</a><p>'+lang.member_only_notice+'</p></div>';
		$('#header .container').append(html);
	}
}
function closeMON(){
	$.cookie('close_mon', 'true');
	$('#member_only_notice').remove();
}

function follow(type, id) {
	$.get(
		'user.php?act=add_follow',
		'id=' + id + '&type=' + type,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_follow[data-item='+type+'|'+id+']');
				target.addClass('btn_followed').attr('href','javascript:unfollow(\''+type+'\','+id+')').html('<i></i><em class="status">'+lang.btn_followed+'</em><em class="act">'+lang.btn_unfollow+'</em>');
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function unfollow(type, id) {
	$.get(
		'user.php?act=remove_follow',
		'id=' + id + '&type=' + type,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_follow[data-item='+type+'|'+id+']');
				target.removeClass('btn_followed').attr('href','javascript:follow(\''+type+'\','+id+')').html('<i></i><em class="status">'+lang.btn_follow+'</em><em class="act">'+lang.btn_follow+'</em>');
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function loadUFA(id,cat,page) {
	var container = $('#follow_art');
	var refreshLoader = $('.loader', container);
	refreshLoader.stop().css({visibility:'visible'}).fadeTo(0, 1000);
	$.get(
		'user.php',
		'act=get_user_follow_art&id='+id+'&cat='+cat+'&page='+page,
		function(response){
			container.html(response);
			refreshLoader.stop().fadeTo(1000, 0);
			$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
			$body.animate({scrollTop: container.parent().offset().top}, 800);
		},
		'text'
	);
}

function loadUC(id,cat,page) {
	var container = $('#collections');
	var refreshLoader = $('.loader', container);
	refreshLoader.stop().css({visibility:'visible'}).fadeTo(0, 1000);
	$.get(
		'user.php',
		'act=get_user_collections&id='+id+'&cat='+cat+'&page='+page,
		function(response){
			container.html(response);
			refreshLoader.stop().fadeTo(1000, 0);
			$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
			$body.animate({scrollTop: container.parent().offset().top}, 800);
		},
		'text'
	);
}

function refreshPage(periods) {
	window.location.reload();
}

function auctionItemRefresh() {
	var refreshLoader = $('#auction_refresh .loader');
	refreshLoader.stop().css({visibility:'visible'}).fadeTo(0, 1000);
	$.get(
		'auction.php',
		'id=' + auction_id + '&act=latest',
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var auction = res.auction;
				if (auction.status_no != 1) {
					window.location.reload();
					return false;
				}
				$('#auction_form .sale_price .price').html(auction.current_price);
				$('#auction_log').html(res.auction_log);
				$('#auction_log_all').html(res.auction_log_all);
				$('#show_all_log').click(function() {
					$.fn.colorbox({height:'80%',width:'750px',inline:true,href:'#auction_log_all .collector_list',onOpen:function(){
							$('.tipsy').css({zIndex:'100'});
						},onClosed:function(){
							$('.tipsy').css({zIndex:'1000'});
						}
					});
					return false;
				});
			} else {
				cAlert(res.message);
			}
			refreshLoader.stop().fadeTo(1000, 0);
		},
		'text'
	);
}

function eventRemind(id,type){
	var html = '<form action="event.php?act=add_reminder" method="post" class="form event_remind_form" id="event_remind_form"><fieldset><h4>'+lang.set_event_remind+'</h4>';
	html += '<fieldset class="radio_wrap label"><b>'+lang.remind_type+lang.colon+'</b><fieldset><label for="remind_mobile"><input type="checkbox" value="1" name="remind_mobile"'+(type =='sms'?' checked="true"':'')+' id="remind_mobile" />'+lang.sms+'</label><label for="remind_email"><input type="checkbox" value="1" name="remind_email"'+(type =='mail'?' checked="true"':'')+' id="remind_email" />'+lang.email+'</label></fieldset></fieldset>';
	html += '<label for="er_mobile"'+(type =='mail'?' style="display:none"':'')+'><b>'+lang.mobile_number+lang.colon+'</b><input type="text" value="" name="mobile" id="er_mobile" /><span class="directions">'+lang.mobile_only_china+'</span></label>';
	html += '<label for="er_email"'+(type =='sms'?' style="display:none"':'')+'><b>'+lang.email_address+lang.colon+'</b><input type="text" value="" name="email" id="er_email" /></label>';
	html += '<div class="submit_wrap"><input type="submit" value="'+lang.confirm+'" tabindex="18" class="submit btn_s2_b"/><input type="hidden" name="event_id"  value="'+id+'" id="er_event_id" /></div></form>';
	var eventName = $('#event_'+id).find('.name').text();
	$.fn.colorbox({scrolling:false,html:html,title:eventName,onCleanup:function(){
		$('.tipsy').remove();
	}});
	$('#er_mobile, #er_email').tipsy({gravity: 'w', fade: true, trigger: 'manual'}).parent().append(status);
	$('#remind_mobile').change(function(){
		if ($(this).attr('checked')) {
			$('#er_mobile').parent().show();
		} else {
			$('#er_mobile').tipsy('hide');
			$('#er_mobile').parent().hide();
		}
	});
	$('#remind_email').change(function(){
		if ($(this).attr('checked')) {
			$('#er_email').parent().show();
		} else {
			$('#er_email').tipsy('hide');
			$('#er_email').parent().hide();
		}
	});
	$('#er_email').blur(function(){
		var em = $(this);
		var email = em.val();
		var status = $('.status',em.parent());
		if (email == '') { 
			em.attr('original-title', lang.error_email_required).tipsy('show');
			status.removeClass('valid');
		} else if (!isValidEmail(email)) {
			em.attr('original-title', lang.error_email_format).tipsy('show');
			status.removeClass('valid');
		} else {
			em.tipsy('hide');
			status.addClass('valid');
		}
	});
	$('#er_mobile').blur(function(){
		var mb = $(this);
		var mbn = parseInt(mb.val());
		var status = $('.status',mb.parent());
		if (isNaN(mbn)) { 
			mb.attr('original-title', lang.error_mobile_required).tipsy('show');
			status.removeClass('valid');
		} else if (mbn < 10000000000) {
			mb.attr('original-title', lang.error_mobile_short).tipsy('show');
			status.removeClass('valid');
		} else {
			mb.tipsy('hide');
			status.addClass('valid');
		}
	});
	$('#event_remind_form').submit(function(){
		if ($('#remind_mobile').attr('checked')) {
			var mb = $('#er_mobile');
			var mbn = parseInt(mb.val());
			var status = $('.status',mb.parent());
			if (isNaN(mbn)) { 
				mb.attr('original-title', lang.error_mobile_required).tipsy('show');
				status.removeClass('valid');
				return false;
			} else if (mbn < 10000000000) {
				mb.attr('original-title', lang.error_mobile_short).tipsy('show');
				status.removeClass('valid');
				return false;
			} else {
				mb.tipsy('hide');
				status.addClass('valid');
			}
		};
		if ($('#remind_email').attr('checked')) {
			var em = $('#er_email');
			var email = em.val();
			var status = $('.status',em.parent());
			if (email == '') { 
				em.attr('original-title', lang.error_email_required).tipsy('show');
				status.removeClass('valid');
				return false;
			} else if (!isValidEmail(email)) {
				em.attr('original-title', lang.error_email_format).tipsy('show');
				status.removeClass('valid');
				return false;
			} else {
				em.tipsy('hide');
				status.addClass('valid');
			}
		};
		var reminder = new Object();
		reminder.remind_mobile  = jQuery('#remind_mobile').attr('checked');
		reminder.remind_email   = jQuery('#remind_email').attr('checked');
		reminder.mobile     = jQuery('#er_mobile').val();
		reminder.email      = jQuery('#er_email').val();
		reminder.id         = jQuery('#er_event_id').val();
		$.post(
			'event.php?act=add_reminder',
			{reminder: $.toJSON(reminder), is_ajax: 1},
			function(response){
				var res = $.evalJSON(response);
				if (res.error > 0) {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="eventRemind('+id+','+type+') return false;"><span>' + lang.re_fill + '</span></a></p></div>'});
				} else {
					$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
				}
			},
			'text'
		);
		return false;
	});
}

function checkLike() {
	var goods = '';
	$('.btn_like[data-id]').each(function(){
		var id = $(this).data('id');
		goods += id+',';
	});
	if (goods != '') {
	$.get(
		'user.php?act=check_like',
		'goods=' + goods,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				$.each(res.liked, function(i, n){
					var target = $('.btn_like[data-id='+n+']');
					target.addClass('btn_liked').attr('href','javascript:unlike('+n+')').html('<i></i><span class="status">'+lang.btn_liked+'</span><span class="act">'+lang.btn_unlike+'</span>');
				});
			}
		},
		'text'
	);
	}
}

function checkFollow() {
	var items = '';
	$('.btn_follow[data-item]').each(function(){
		var item = $(this).data('item');
		items += item+',';
	});
	if (items != '') {
	$.get(
		'user.php?act=check_follow',
		'items=' + items,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				$.each(res.followed, function(i, n){
					var target = $('.btn_follow[data-item='+n+']');
					var item = n.split('|')
					target.addClass('btn_followed').attr('href','javascript:unfollow(\''+item[0]+'\','+item[1]+')').html('<em class="status">'+lang.btn_followed+'</em><em class="act">'+lang.btn_unfollow+'</em>');
				});
			}
		},
		'text'
	);
	}
}

function checkApply(type) {
	var id = '';
	$('.btn_apply[data-type='+type+']').each(function(){
		id += $(this).data('id')+',';
	});
	if (id != '') {
	$.get(
		'user.php?act=check_apply',
		'type='+type+'&id='+id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				$.each(res.applied, function(i, n){
					var target = $('.btn_apply[data-type='+type+'][data-id='+n+']');
					if (type == 'event') {
						target.addClass('btn_applied').attr('href','javascript:unapply(\''+type+'\','+n+')').html('<span><i></i><strong class="status">'+lang.btn_applied_event+'</strong><strong class="act">'+lang.btn_unapply_event+'</strong></span>');
					} else {
						target.addClass('btn_applied').attr('href','javascript:unapply(\''+type+'\','+n+')').html('<span><i></i><strong class="status">'+lang.btn_applied+'</strong><strong class="act">'+lang.btn_unapply+'</strong></span>');
					}
				});
			}
		},
		'text'
	);
	}
}

function apply(type,id) {
	$.get(
		'user.php?act=apply',
		'type='+type+'&id='+id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_apply[data-type='+type+'][data-id='+id+']');
				if (type == 'event') {
					target.addClass('btn_applied').attr('href','javascript:unapply(\''+type+'\','+id+')').html('<span><i></i><strong class="status">'+lang.btn_applied_event+'</strong><strong class="act">'+lang.btn_unapply_event+'</strong></span>');
				} else {
					target.addClass('btn_applied').attr('href','javascript:unapply(\''+type+'\','+id+')').html('<span><i></i><strong class="status">'+lang.btn_applied+'</strong><strong class="act">'+lang.btn_unapply+'</strong></span>');
				}
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}

function unapply(type,id) {
	$.get(
		'user.php?act=unapply',
		'type='+type+'&id='+id,
		function(response){
			var res = $.evalJSON(response);
			if (res.error == 0) {
				var target = $('.btn_apply[data-type='+type+'][data-id='+id+']');
				if (type == 'event') {
					target.removeClass('btn_applied').attr('href','javascript:apply(\''+type+'\','+id+')').html('<span><i></i><strong class="status">'+lang.btn_apply_event+'</strong><strong class="act">'+lang.btn_apply_add_event+'</strong></span>');
				} else {
					target.removeClass('btn_applied').attr('href','javascript:apply(\''+type+'\','+id+')').html('<span><i></i><strong class="status">'+lang.btn_apply+'</strong><strong class="act">'+lang.btn_apply_add+'</strong></span>');
				}
			} else if (res.error == 1) {
				openQuickLogin();
				return false;
			} else {
				$.fn.colorbox({html:'<div class="message_box mb_info">' + res.message + '<p class="action"><a href="javascript:void(0);" class="button brighter_button" onclick="$.fn.colorbox.close(); return false;"><span>' + lang.confirm + '</span></a></p></div>'});
			}
		},
		'text'
	);
}