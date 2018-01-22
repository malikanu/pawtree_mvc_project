$(document).ready(function(){
    $('body.home .flexslider').flexslider({
       	animation: "slide",
       	touch: true,
       	controlNav: true,
       	pauseOnHover: true,
        slideshowSpeed: 3500
    });

    // pause slideshow when hover over mini profile
//    $('.slide-contents .mini-profile').on('hover', function(){
//	$('.flexslider').flexslider('pause');
//    });
    
    // stop the slideshow once they start putting in content
    $('.slide-contents .mini-profile input').on('change',function() {
	$('.flexslider').flexslider('stop');
    });
    $('.slide-contents .mini-profile .file-upload').on('click',function() {
	$('.flexslider').flexslider('stop');
    });
    
    if($('#home-testimonials').length){
      if(testimonialImageList.length){
        var tempList = testimonialImageList;
        for(var i=0;i<6;i++){
          var rand = Math.floor(Math.random() * tempList.length);
          $('#testimonials-images').append('<img src="/image.php?f='+tempList[rand]['value']+'&h=130" />');
          tempList.splice(rand,1);
        }
        var numbers = [0,1,2,3,4,5];
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
    
});