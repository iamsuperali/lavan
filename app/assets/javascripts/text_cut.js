$(document).ready(function(){
    $("[class^='textcut']").each(function() {
        var cutlength = parseInt($(this).prop('class').replace("textcut", ""));
        var text = $.trim( $(this).html() );
        $(this).prop("title", text); 
        text = (text.length > cutlength + 2) ? (text.substring(0, cutlength) + "...") : text;
        $(this).html(text);
    });

});