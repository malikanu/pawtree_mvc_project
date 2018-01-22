$(document).ready(function() {
    
    // video popup
    $('.slidetemplate-video .generatedSlideshowSlide').each(function(index,slide) {
        
        var popupId = $(slide).data('popupId');
        
        $(slide).find('.text3[data-popup-id="'+popupId+'"]').dialog({
            modal: true,
            autoOpen: false,
            width: 500,
            height: 450
        });
        
        $(slide).find('.openVideoLink').on('click',function(e) {
            $('.text3[data-popup-id="'+popupId+'"]').dialog('open');
            e.preventDefault();
        });
        
    });
    
    // testimonial_interior slide popups
    $('.slidetemplate-testimonial_interior .generatedSlideshowSlide').each(function(index,slide) {
        
        var popupId = $(slide).data('popupId');
        
        $(slide).find('.text4[data-popup-id="'+popupId+'"]').dialog({
            modal: true,
            autoOpen: false
        });
        
        $(slide).find('.fullTestimonialLink').on('click',function(e) {
            $('.text4[data-popup-id="'+popupId+'"]').dialog('open');
            e.preventDefault();
        });
        
    });
    
    // create the slideshow
    $('.generatedSlideshow').flexslider({
        pauseOnHover: true,
        touch: true,
        prevText: "",
        nextText: "",
        controlNav: true
    });
    
});