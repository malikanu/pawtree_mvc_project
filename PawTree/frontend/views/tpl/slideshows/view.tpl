{* $generatedSlideshow should be the output of SlideshowModel->getSlideshow() *}
<div class="flexslider generatedSlideshow {$generatedSlideshow.show.classname}" data-slideshow-id="{$generatedSlideshow.show.id}">
    <ul class="slides">
        {foreach from=$generatedSlideshow.slides item=generatedSlideshowSlide}
        <li class="slidetemplate-{$generatedSlideshowSlide.template}">
            {assign var=template value=$generatedSlideshowSlide.template}
            {include file="tpl/slideshows/slidetemplates/$template.tpl"}
        </li>
        {/foreach}
    </ul>
</div>