var imageAreaSelect;
var formVar;
var loc;

//full width header pet thumbs 82px each allow for 7 thumbs visible
var numThumb = 7;
var thumbWidth;
if($(window).width() > 1050){
    thumbWidth = 82;
}else if($(window).width() < 1050 && $(window).width() > 700){
    thumbWidth = 55;
}else{
    numThumb = 3;
    thumbWidth = 56;
    $('.pet-welcome .pets > a:gt(1)').addClass('hidable');
    $('#all-pets-button #more-pets-count .number').text($('.pet-welcome .pets').data('number') - 2);
    $('#all-pets-button').removeClass('tooltip');
}

//Arrays for Find/Replace in breadcrumbs
var find = ['petprofile', 'petprofile/grouppets', 'petprofile/petlimit', 'user/profile', 'petprofile/edit', 'petprofile/products', 'footer', 'petprofile/delete', 'petpro', 'newpetpro', 'petprofile/grouppetsquestion'];
var replace = ['Pet Profile', '', 'Pet Limit', 'Profile', 'Edit Pet Profile', 'Recommended Products', '', 'Delete Pet Profile', 'Your petPro', 'New petPro Welcome', 'Group Pets?'];

$(document).ready(function() {

    if($(window).width() < 700){
        mobileNav();
    }
    /*$(window).resize(function(){
        if($(window).width() < 700){
            mobileNav();
        }else{
            $('#container #header ul.nav.mobile').unbind('click');
            $('#container #header ul.nav').removeClass('mobile');
        }
    });*/


    //Find/Replace in breadcrumbs
    $('div.breadcrumbs a').each(function(){
        for(var i=0;i<find.length;i++){
            if($(this).text() == find[i]){
                $(this).text(replace[i]);
                if(find[i] == 'footer'){
                    $(this).parent('div.breadcrumbs').empty();
                }
            }
        }
    });
    
    // header login
    $('a.loginLink').on('click',function() {
        $('#loginBox').fadeToggle();
    })
    
    //mini-profile
    // old
    //$('.mini-profile .file-upload').on('click', function(){ $(this).parent().parent().parent().parent().parent().find('.imageUpload').fadeIn(); });
    // new
    $('.mini-profile .file-upload').on('click',petPhotoUpload.showUpload);
    
    //$('.imageUpload .step1 .save').on('click',function() { $('.imageUpload .step1 form').submit(); });
    //$('.imageUpload .step1 .cancel, .imageUpload .step2 .cancel').on('click',function() { $('div.imageUpload, .imgareaselect-outer').hide(); });
    //$('.imageUpload .step2 .save').on('click',function() { $('.imageUpload .step2 form').submit(); });

    // pet profile and slider mini-profile
    $('.petprofileForm #pp_dogname').on('keyup',function() { $('#dogName').html($(this).val()); });
    
    // old
    //$('.petprofileForm .openImageUpload, .slider.mini-profile .file-upload').on('click',function() { $('#imageUpload').fadeIn(); });
    // new
    $('.petprofileForm .openImageUpload, .slider.mini-profile .file-upload').on('click',petPhotoUpload.showUpload);
    //$('#imageUpload .step1 .save').on('click',function() { $('#imageUpload .step1 form').submit(); });
    //$('#imageUpload .step1 .cancel').on('click',function() { $('#imageUpload').hide(); });
    //$('#imageUpload .step2 .save').on('click',function() { $('#imageUpload .step2 form').submit(); });
    //$('#imageUpload .step2 .cancel').on('click',function() { $('#imageUpload, .imgareaselect-outer').hide(); });
    
    // PetPro Tools
    $('.shareContainer input').on('click',function() {
        $(this).select();
    });
    var networks = ['twitter','facebook','email'];
    $('.shareContainer .shareLinks').each(function() {
        $(this).share({
            networks: networks,
            urlToShare: $(this).data('url'),
            title: $(this).data('title'),
            pageDesc: $(this).data('description'),
            media: $(this).data('image')
        });
    });
    
    // Tabs
    $('.hover-tabs').tabs( { event: 'mouseover' } );

    //petpro page faqs
    $('.become-petpro-faq li').on('click', function(e){
        $(this).toggleClass('open').find('.faq-content').slideToggle('fast');
    });
    $('.become-petpro-faq .faq-content').on('click', function(e){
    e.stopPropagation();
    });
    //page slidshows
    $('.page-slideshow .flexslider').flexslider({
        animation: "slide",
        touch: true,
        controlNav: false,
        pauseOnHover: true,
        slideshowSpeed: 7000
    });
    $('.page-slideshow .testimonial a.full-text').on('click', function(){
      $('.page-slideshow .flexslider').flexslider('pause');
      var testimonialPopup = $(document.createElement('div'));
      testimonialPopup.html($(this).closest('div').find('.full-testimonial').html());
      testimonialPopup.dialog({
          width: 500,
          modal: true,
          title: $(this).closest('div').find('h4').text(),
          close: function(){
            $(this).dialog('destroy').empty();
            $('.page-slideshow .flexslider').flexslider('play');
          }
      });
    });
    
});

/*
function startUpload(location){
    formVar == location;
    if(location == undefined || location == 2){ loc = '#'; }else if(location == 1){ loc = '.'; }
    $(loc+'imageUpload '+loc+'progress').show();
    return true;
}

function uploadComplete(success){
    var result = '';
    if(success) {
        
        var newimage = $('<img />', {src : httpUrl+success, id: "fullImage"}).on('load',function() {
            newimage.addClass('fullImage');
            $(loc+'imageUpload '+loc+'progress').hide();
            $(loc+'imageUpload .step1').hide();
            $(loc+'imageUpload .step2').show();
            createCropper(success);
            $(loc+'imageUpload .step2 form input[name="image"]').val(success);
        });
        $(loc+'imageUpload '+loc+'result').html(newimage);
        
    }
    
    return true;   
}

function uploadCompleteMobile(avatarImage,fullsizeImage){
    
    $(loc+'imageUpload .step1').show();
    $(loc+'imageUpload .step2').hide();
    $(loc+'imageUpload').hide();
    
    // add avatar to form
    if(formVar == undefined){
        $('#dogAvatar').html('<img class="circle" src="'+httpUrl+'image.php?f='+avatarImage+'&w=100"/>');
    }
    
    $('.petprofileForm input[name="pp_image"]').val(fullsizeImage);
    $('.petprofileForm input[name="pp_avatar"]').val(avatarImage);
    
    return true;   
}

function avatarComplete(avatarImage,fullsizeImage) {
    
    // reset and hide the image uploader
    imageAreaSelect.cancelSelection();
    $(loc+'imageUpload .step1').show();
    $(loc+'imageUpload .step2').hide();
    $(loc+'imageUpload').hide();
    
    // add avatar to form
    if(formVar == undefined){
        $('#dogAvatar').html('<img class="circle" src="'+httpUrl+'image.php?f='+avatarImage+'&w=100"/>');
    }
        $('.petprofileForm input[name="pp_image"]').val(fullsizeImage);
        $('.petprofileForm input[name="pp_avatar"]').val(avatarImage);
}

function noFileSelected() {
    
    alert('No File Selected');
    $(loc+'imageUpload '+loc+'progress').hide();
    $(loc+'imageUpload form').show();
    return true;
    
}

function createCropper(image) {
    
    var fullImage = $(loc+'imageUpload '+loc+'fullImage');
    imageuploadWidth = fullImage.width();
    imageuploadHeight = fullImage.height();
    uploadedImage = fullImage.attr('src');
    
    // initial select area
    //var x1 = (320/2)-50;
    //var y1 = (240/2)-50;
    //var x2 = x1+100;
    //var y2 = y2+100;
    
    var x1 = 110;
    var y1 = 70;
    var x2 = 210;
    var y2 = 170;
    
    //$('#imageUpload #preview').show().html('<img src="'+httpUrl+'/'+image+'"/>');
    //$('#imageUpload #fullImage').imgAreaSelect({ aspectRatio: '1:1', handles: true, onSelectChange: previewThumbnail, onSelectEnd: updateCordinateVars });
    imageAreaSelect = $(fullImage).imgAreaSelect({ aspectRatio: '1:1', instance: true, handles: true, onSelectEnd: updateCordinateVars, x1: x1, y1: y1, x2: x2, y2: y2 });
    //console.log(imageAreaSelect);
    
    // set defaults
    updateCordinateVars(null,{x1: x1, y1: y1, x2: x2, y2: y2})
    
}

function previewThumbnail(img, selection) {
    var scaleX = 100 / (selection.width || 1);
    var scaleY = 100 / (selection.height || 1);
    
    $(loc+'imageUpload '+loc+'preview > img').css({
        width: Math.round(scaleX * imageuploadWidth) + 'px',
        height: Math.round(scaleY * imageuploadHeight) + 'px',
        marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
        marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
    });
}

function updateCordinateVars(img, selection) {
    $(loc+'imageUpload .step2 form input[name="x1"]').val(selection.x1);
    $(loc+'imageUpload .step2 form input[name="y1"]').val(selection.y1);
    $(loc+'imageUpload .step2 form input[name="x2"]').val(selection.x2);
    $(loc+'imageUpload .step2 form input[name="y2"]').val(selection.y2);
    $(loc+'imageUpload .step2 form input[name="scale_width"]').val(imageuploadWidth);
    $(loc+'imageUpload .step2 form input[name="scale_height"]').val(imageuploadHeight);
}
*/

function mobileNav(){
    $('#container #header ul.nav').addClass('mobile');
    $('#container #header ul.nav.mobile').on('click', function(){
        $(this).find('>li').slideToggle('slow');
    });
}
if($('.ninety-testimonials').length){
  $('#content').addClass('rootpage-90daydiff');
  if(testimonialImageList.length){
    var tempList = testimonialImageList;
    for(var i=0;i<8;i++){
      var rand = Math.floor(Math.random() * tempList.length);
      $('#testimonials-images').append('<img src="/image.php?f='+tempList[rand]['value']+'&h=130" />');
      tempList.splice(rand,1);
    }
    var numbers = [0,1,2,3,4,5,6,7];
    numbers.sort(function() { return 0.5 - Math.random() });
    function fadeIn(n, delay){
      setTimeout(function(){
          $('#testimonials-images img:eq('+n+')').hide().css('opacity', '1').fadeIn(delay);
        }, 500);
    }
    setTimeout(function(){
      for(var i=0;i<numbers.length;i++){
        var delay = parseInt(Math.ceil(Math.random() * 3000) + 500);
        fadeIn(numbers[i],delay);
      }
    },1000);
  }
}