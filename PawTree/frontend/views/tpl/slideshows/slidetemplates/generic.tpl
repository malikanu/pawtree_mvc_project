<img src="{$generatedSlideshowSlide.backgroundImage}" alt="{$generatedSlideshowSlide.text1}" />
<div class="slide-text">
    <h4 class="white fjalla">{$generatedSlideshowSlide.text1}</h4>
    <h3 class="white">{$generatedSlideshowSlide.text2}</h3>
    {if $generatedSlideshowSlide.buttonUrl}
        <a class="btn btnblue sessionToShop" href="{$generatedSlideshowSlide.buttonUrl}">{$generatedSlideshowSlide.buttonText}</a>
    {/if}
</div>