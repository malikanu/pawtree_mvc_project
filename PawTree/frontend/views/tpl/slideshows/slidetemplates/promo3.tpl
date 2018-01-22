<div class="generatedSlideshowSlide" data-popup-id="{$generatedSlideshowSlide.id}">
    <div class="background" style="background: url('/{$generatedSlideshowSlide.backgroundImage}');">
        
        <div class="row">
            <div class="col7">
                <div class="text1">{$generatedSlideshowSlide.text1}</div>
                <div class="text2">{$generatedSlideshowSlide.text2}</div>
                <div class="bottomTexts">
                    <span class="text3">{$generatedSlideshowSlide.text3}</span>
                    {if $generatedSlideshowSlide.buttonUrl}<a href="{$generatedSlideshowSlide.buttonUrl}" class="ctaButton">{$generatedSlideshowSlide.buttonText} &gt;</a>{/if}
                </div>
            </div>
            <div class="col5">
                <img src="/{$generatedSlideshowSlide.image1}" class="image1" alt=""/>
            </div>
        </div>
        
    </div>
</div>