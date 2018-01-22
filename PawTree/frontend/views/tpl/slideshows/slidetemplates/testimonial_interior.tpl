<div id="generatedslideshowslide-{$generatedSlideshowSlide.id}" class="generatedSlideshowSlide" data-popup-id="{$generatedSlideshowSlide.id}">
    <div class="whiteframe">
        
        <div class="row">
            <div class="col5">
                <div class="photocontainer">
                    <img src="/image.php?f={$generatedSlideshowSlide.image1}&w=320&h=320&effect=bestfit" class="image1"/>
                </div>
            </div>
            <div class="col7">
                <div class="pad20">
                    <div class="testimonials">Testimonials</div>
                    <div class="seedifference">See the difference</div>
                    <div class="text1">{$generatedSlideshowSlide.text1}</div>
                    <div class="text2">{$generatedSlideshowSlide.text2}</div>
                    <div class="text3">{$generatedSlideshowSlide.text3} {if $generatedSlideshowSlide.text4} <a href="" class="fullTestimonialLink">Full testimonial &raquo;</a>{/if}</div>
                    <div class="text4" id="generatedslideshowslide-{$generatedSlideshowSlide.id}-testimonial" data-popup-id="{$generatedSlideshowSlide.id}">{$generatedSlideshowSlide.text4}</div>
                    <div class="ctaButton"><a href="{$generatedSlideshowSlide.buttonUrl}">{$generatedSlideshowSlide.buttonText}</a></div>
                </div>
            </div>
        </div>
        
    </div>
</div>