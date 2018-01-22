function matchParentHeight(){
	$('.match-parent-height').each(function(){
		$(this).css({ 'min-height' : $(this).parent().outerHeight(true)+'px' });
	});
}
function checkIfComplete(){
	var bxSize = parseInt($('.my-pawbox #quantity').val());
	if($('.pawbox-items .item:not(.empty)').length == bxSize){
		generateXML();
	}else{
		$('#pawboxOrderForm .submit').addClass('disabled').attr('disabled');
	}
}
function generateXML(){
	var bxSize = $('.my-pawbox #quantity').val();
	var product = {};
	var senddata = {};
	senddata.product = new Array;
	product.productNumber = "PBOX"+bxSize;
	product.quantity = 1;
    product.recurring = true;
    product.shipCycle = $('.my-pawbox #frequency').val();
    var contents = [];
    
    $('.my-pawbox .pawbox-items .item').each(function(){
	var temp = {};
	temp.productNumber = $(this).find('.inner').data('id');
	temp.quantity = 1;
	temp.recurring = false;
	contents = addOrUpdateProductList(contents,temp);
    });
    
//    $('.my-pawbox .pawbox-items .item').each(function(){
//	var temp = {};
//	temp.productNumber = $(this).find('.inner').data('id');
//	temp.quantity = 1;
//	temp.recurring = false;
//	contents.push(temp);
//    });

    product.contents = contents;
    senddata.product.push(product);
    $.ajax({
        url: httpUrl+'petprofile/GetOrderXML',
        dataType: 'json',
        data: senddata,
        success: function(data,textStatus,jqXHR) {
            if(data.result=='success') {
                $('#OrderXML').val(data.response);
                $('#pawboxOrderForm .submit').removeClass('disabled').removeAttr('disabled');
            }else{
                alert('Unable to get OrderXML ('+data.response+')');
            }
        },
        error: function(jqXHR,textStatus,error) {
            alert('Server communication error, please try again later.');
        }
    });
}

function addOrUpdateProductList(myarr, item) {
    var found = false;
    var i = 0;
    while (i < myarr.length) {
        if (myarr[i].productNumber === item.productNumber) {
            found = true;
	    // add to quantity
	    myarr[i].quantity += item.quantity;
            break;
        }
        i++;
    }

    // Add the item
    if (!found)
        myarr.push(item);

    return myarr;
}

function updateMobileCount(){
	$('#pawbox-count > span').text($('.pawbox-items .item:not(.empty)').length);
}
$(document).ready(function(){
	/* FAQ Accordion */
	$('.faq-accordion h2').on('click', function(){
		$(this).parent('.faq-accordion').toggleClass('open');
	});
	// pawTree Story Video
	$('.story-hero .btnvideo').on('click', function(){
		$('.story-hero .video-wrap').fadeToggle();
	});
	$('.story-hero .video-wrap a.close').on('click', function(){
		$('.story-hero .video-wrap').fadeToggle();
	});
	$('.owl-carousel').owlCarousel({
	    items : 3,
	    itemsDesktop : [1600,3],
	    itemsDesktopSmall : [992,3],
	    itemsTablet: [768,2,],
	    itemsMobile : 1,
	    navigation : true
  	});
 	$('.flexslider').flexslider({
 		//controlNav: false
 	});
 	$('#mobile-my-box, .my-pawbox .close').on('click', function(){
 		$('.build-pawbox .my-pawbox').toggleClass('slide-in');
 	});
 	$('.loginLink').on('click', function(){
 		$('.utility').toggleClass('form-open').find('#loginBox').slideToggle();
 	});
 	$(document).on('click', function(){
 		if($('.utility').hasClass('form-open')){
 			$('.utility').toggleClass('form-open').find('#loginBox').slideToggle();
 		}
 	});
 	$('.utility').on('click', function(e){
 		if($(this).hasClass('form-open')){
 			e.stopPropagation();
 		}
 	});
 	/* Take A Look Videos */
 	$('ul.video-links > li').on('click', function(){
 		$('ul.video-tabs li').each(function(){
 			//$(this).fadeOut('fast');
			$(this).hide();
 		});
 		//$('ul.video-tabs > li').eq($(this).index()).fadeIn('fast');
		$('ul.video-tabs > li').eq($(this).index()).show();
 	});
 	/* Pawbox Intro Form */
 	if($('.start-pawbox').length){
	 	function updateIntroForm(){
	 		var qty = Math.round(q.noUiSlider.get());
	 		var frq = Math.round(f.noUiSlider.get());
	 		$('#quantity').val(qty);
	 		$('#frequency').val(frq);
	 		$('#quantity-upsell').html(m[qty]);
	 		$('#total-price').text('$'+(p*qty));
			if (qty < 2) {
				$('#quantity-upsell').removeClass('green').addClass('orange');
			} else {
				$('#quantity-upsell').removeClass('orange').addClass('green');
			}
	 		if(qty < 3){
	 			$('#free-shipping').fadeOut('fast');
	 		}else{
	 			$('#free-shipping').fadeIn('fast');
	 		}
	 	}
	 	var p = $('#price-per').val();
	 	var q = $('#quantity-slide')[0];
	 	var f = $('#frequency-slide')[0];
	 	var m = {1:'Choose 3 items to receive <strong>FREE SHIPPING*</strong>.',3:'<strong>FREE SHIPPING*</strong> on Boxes with 3+ Items',5:'<strong>FREE SHIPPING*</strong>, Plus a <strong>FREE</strong> Bonus Item'};
	 	noUiSlider.create(q, {
	 		start: 3,
	 		step: 2,
	 		range: {
	 			min : 1,
	 			max : 5
	 		},
	 		pips: {
	 			mode : 'values',
	 			values : [1,3,5],
	 			density: 150
	 		}
	 	});
	 	q.noUiSlider.on('change', function(values, handle){
	 		updateIntroForm();
	 	});
	 	noUiSlider.create(f, {
	 		start: 60,
	 		step: 30,
	 		range: {
	 			min : 30,
	 			max : 90
	 		},
	 		pips: {
	 			mode : 'values',
	 			values : [30,60,90],
	 			density: 150,
	 			format: {
				  to: function(value){
					return value + '\xa0days';
				  },
				  from: function(value){
					return value.replace('\xa0days', '');
				  }
				}
	 		}
	 	});
	 	f.noUiSlider.on('change', function(values, handle){
	 		updateIntroForm();
	 	});
	 	updateIntroForm();
	}
	$('.pawbox-overview #get-started').on('click', function(){
		$('.pawbox-hero .start-modal').addClass('open');
	});
	$('.pawbox-hero .start-modal .close').on('click', function(){
		$('.pawbox-hero .start-modal').removeClass('open');
	});
	$('.build-pawbox .pawbox-select').on('click', function(){
		var html = $(this).closest('.inner').clone();
		$('.my-pawbox .pawbox-items .empty.item:first').removeClass('empty').prepend(html);
		updateMobileCount();
		checkIfComplete();
	});
	$('.my-pawbox .pawbox-items').on('click', 'a.remove', function(){
		$(this).closest('.item').empty().addClass('empty').append('<a href="javascript:void(0)" class="remove uppercase">Remove</a>');
		updateMobileCount();
		checkIfComplete();
	});
	$('.my-pawbox #quantity').on('change', function(){
		var qty = $(this).val();
		if(qty > $('.pawbox-items .item').length){
			if($('.pawbox-items .item').length == 1){
				$('.pawbox-items .item').last().attr('data-text', 'SELECT A PRODUCT');
			}else{
				$('.pawbox-items .item').last().attr('data-text', 'SELECT ANOTHER PRODUCT');
			}
			while($('.pawbox-items .item').length < qty){
				var i = $('.pawbox-items .item').length+1;
				$('.pawbox-items').append('<div class="empty item item-'+i+'" data-text="SELECT ANOTHER PRODUCT"><a href="javascript:void(0)" class="remove uppercase">Remove</a></div>');
			}
			$('.pawbox-items .item').last().attr('data-text', 'SELECT ONE MORE PRODUCT');
		}else{
			while(qty < $('.pawbox-items .item').length){
				$('.pawbox-items .item').last().remove();
			}
			$('.pawbox-items .item').last().attr('data-text', 'SELECT ONE MORE PRODUCT');
		}
		if(qty < 3){
 			$('#free-shipping').fadeOut('fast');
			$('#free-gift').fadeOut('fast');
 		}else{
 			$('#free-shipping').fadeIn('fast');
			if (qty >= 5) {
				$('#free-gift').fadeIn('fast');
			} else {
				$('#free-gift').fadeOut('fast');
			}
 		}
 		$('#total-price').text('$'+(qty * $('#orig-each').val()));
 		updateMobileCount();
 		checkIfComplete();
	});
 	matchParentHeight();
 	$(window).resize(function(){
 		matchParentHeight();
 	});
});
$(window).load(function(){
	//build a pawbox sidebar position
	//this function scrolled the sidebar with the page, but the page does not seem long enough to need it. Will revisit if more content is added to this page.
	/*var pawBoxSidebar = debounce(function(){
		var u = $('.utility').height();
		var w = $(window).scrollTop();
		var d = w - u;
		if(d < 0) d = 0;
		$('.build-pawbox .my-pawbox').animate({ 'margin-top' : d+'px' }, 150);
	},250);
	if($(window).scrollTop() > 62){
		pawBoxSidebar();
	}*/
	
	// hide main nav when mouseout
	$('#main-nav .sub.dropdown-menu').on('mouseleave',function() {
		$('#main-nav .in, #main-nav .open').removeClass('in open');
	});
	
	// Meet The Team/Vet Council Hovers
	if($('.team-members').length){
		$('.team-members .team-member .hover .close').on('click', function(){
			$(this).closest('.team-bio').hide();
		});
		$('.team-members .team-member .hover').on('mouseenter', function(){
		    var src = $(this).find('img').attr('src');
		    var parts = src.split('.');
		    src = parts[0]+'-on.'+parts[1];
		    $(this).find('img').attr('src', src);
		    $(this).find('.team-bio').show();
		}).on('mouseleave', function(){
			var src = $(this).find('img').attr('src');
		    var parts = src.split('-on');
		    src = parts[0]+parts[1];
		    $(this).find('img').attr('src', src);
		    $(this).find('.team-bio').hide();
		});
	}
 	var nav = $('#nav-wrap');
 	var last = $(window).scrollTop();
	var pos = nav.offset().top - $('.utility').height();
	
	
	$(window).scroll(function(){
		var current = $(window).scrollTop();
	 	if(current > last){
	 		//$('#main-nav .sub').css({'display' : 'none' });
	 		nav.addClass('flipped');
	 	}else{
	 		nav.removeClass('flipped');
	 	}
	 	//$('#main-nav .sub').css({'display' : 'block' });
	 	last = current;
	 	if(current > pos){
	 		$('body').addClass('scrolling');
	 	}else{
	 		$('body').removeClass('scrolling');
	 	}
		
	 	//pawBoxSidebar();
	});
});
