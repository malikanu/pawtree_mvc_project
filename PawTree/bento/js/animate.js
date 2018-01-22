// apply the baw effects
$(document).ready(function() {
    
    $('[data-baw-effect]').each(function() {
        
        var effect = $(this).data('bawEffect');
        var trigger = $(this).data('bawTrigger') || 'hover';
        
        applyBaw(this,trigger,effect);
        
    });
    
});

function applyBaw(element,trigger,effect) {
    
    if (trigger == 'hover') {
        $(element).hover(function() {
            $(this).toggleClass('animated '+effect);
        });
    } else {
        $(element).on(trigger,function() {
            $(element).addClass('animated '+effect);
            $(element).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(element).removeClass('animated '+effect);
            });
        });
    }
    
}