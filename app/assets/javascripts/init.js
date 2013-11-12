/* Copyright (C) 2009 - 2011 Shopiy, Shopiy许可协议 (http://www.shopiy.com/license) */
$(document).ready(function() {


$('.goods_list').GoodsCleariy();
$('.nav li, .category li, .switcher .item, .filter .item').hover(function(){
	if ($(this).hasClass('parent')) {
		$(this).addClass('parent_hover');
	} else {
		$(this).addClass('hover');
	}
	if ($(this).hasClass('current')) {
		$(this).addClass('current_hover');
	}
}, function(){
	if ($(this).hasClass('parent_hover')) {
		$(this).removeClass('parent_hover');
	} else {
		$(this).removeClass('hover');
	}
	if ($(this).hasClass('current_hover')) {
		$(this).removeClass('current_hover');
	}
});
$('.all_cat_wrapper').hover(function(){
	$(this).addClass('all_cat_wrapper_hover');
}, function(){
	$(this).removeClass('all_cat_wrapper_hover');
});
$('#keyword').tipsy({
	trigger:'manual',gravity:'e',fade: true
}).focusout(function() {
	$(this).tipsy('hide');
}).keypress(function() {
	$(this).tipsy('hide');
});
$("#search").submit(function(){
	var k = $("#keyword").val();
	if (k.length == 0) {
		$('#keyword').focus();
		$('#keyword').tipsy('show');
		return false;
	} else {
		return true;
	}
});
/*
$("#search").mouseenter(function(){
	$('#search .hot_search_wrapper').show();
}).mouseleave(function(){
	$('#search .hot_search_wrapper').hide();
});
*/
if(screen.width>=800){
$('.quick_login').live('click',function(){
	openQuickLogin();
	return false;
});
}
$('#cart').mouseenter(function(){
	if (typeof(ajax_cart_disabled) == 'undefined') {
		if ($('#cart_loaded').length < 1) {
			loadCart();
		}
		$('#cart .list_wrapper').show();
	}
});
$('#cart').mouseleave(function(){
	$('#cart .list_wrapper').hide();
});
$('a[rel="external"]').click(function(){window.open(this.href);return false;});
$('a.zoom').colorbox();
$('.slider').Slidiy();
$('.goods_slider').mSlidiy({num:6,step:3});
$('.goods_slider_big').mSlidiy({num:3,step:1});
//$('.col_sub .goods_slider').mSlidiy({vertical:true,num:5,step:1});
$('.display a[title!=""]').tipsy({gravity: $.fn.tipsy.autoSNiy,fade: true});
$('.promo[title!=""]').tipsy({gravity: 'e',fade: true,html: true});
$('.tip').tipsy({gravity: 's',fade: true,html: true});
$('.more[title!=""]').tipsy({gravity: 'se'});
$('.fittings_list li[title!=""]').tipsy({gravity: 's',fade: true});
$('.back_to_top').click(function(){
	$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	$body.animate({scrollTop: $('body').offset().top}, 800);
	return false;
});
$('.end_time[time]').each(function(){
	var countdown = $(this);
	countdown.parent().find('.label').text(lang.remaining_time + lang.colon);
	var time = parseInt(countdown.attr('time')) - server_time;
	if (countdown.attr('timezone')) {
		time -= parseInt(countdown.attr('timezone'))*3600;
	}
	var until = '+'+time;
	if (countdown.attr('onExpiry')) {
		expiryActcon = countdown.attr('onExpiry');
		if (expiryActcon == 'refreshPage') {
			countdown.countdown({
				until: until,
				format: 'dhms',
				onExpiry: refreshPage
			});
		} else if (expiryActcon == 'auctionRefresh') {
			countdown.countdown({
				until: until,
				format: 'dhms',
				onExpiry: auctionRefresh
			});
		} else {
			countdown.countdown({
				until: until,
				format: 'dhms'
			});
		}
	} else {
		countdown.countdown({
			until: until,
			format: 'dhms'
		});
	}
});
$('.end_time[title]').each(function(){
	var countdown = $(this);
	countdown.parent().find('.label').text(lang.remaining_time + lang.colon);
	var end_date = countdown.attr('title').split('-');
	countdown.removeAttr('title');
	var date = new Date(end_date[0],end_date[1]-1,end_date[2],end_date[3],end_date[4],end_date[5]);
	countdown.countdown({
		until: date,
		format: 'dhms'
	});
});
$('.goods_list li').hover(function(){
	$(this).addClass('hover');
}, function(){
	$(this).removeClass('hover');
});

$('.one_col .tab_wrapper .tabs').hoverscroll({
	width: 960,
	height: 39
});
$('.tab_wrapper .tabs a[href^=javascript]').click(function(){
	$(this).addClass('current').siblings().removeClass('current');
});
$('#keyword').liveSearch();

$('.goods_list li').each(function(){
	var item = $(this);
	var id = parseInt(item.data('id'));
	if (id > 0) {
		var html = '<a href="javascript:like('+id+')" class="btn_like" data-id="'+id+'"><i></i><span class="status">'+lang.btn_like+'</span><span class="act">'+lang.btn_like_add+'</span></a>';
		item.append(html);
	}
});
if ($('#user_area .name').length) {
	checkLike();
	checkFollow();
}

});