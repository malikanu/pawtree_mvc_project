<div id="generatedslideshowslide-{$generatedSlideshowSlide.id}">
    <a href="{$generatedSlideshowSlide.buttonUrl}">
    <div class="background" style="background: url('/{$generatedSlideshowSlide.backgroundImage}');">
        <div class="row">
            <div class="col5">
                <div class="desktop-only">&nbsp;</div>
            </div>
            <div class="col7">
                <div class="blackframe">
                    <div class="row">
                        <div class="col12">
                            <div class="photocontainer">
                                <img src="/image.php?f={$generatedSlideshowSlide.image1}&w=320&h=320&effect=bestfit" class="image1"/>
                            </div>
                            <div class="contentcontainer">
                                <div class="text1">{$generatedSlideshowSlide.text1}</div>
                                <div class="text2">{$generatedSlideshowSlide.text2}</div>
                                {if $generatedSlideshowSlide.buttonUrl}<div class="ctaButton"><a href="{$generatedSlideshowSlide.buttonUrl}">{$generatedSlideshowSlide.buttonText}</a></div>{/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </a>
</div>