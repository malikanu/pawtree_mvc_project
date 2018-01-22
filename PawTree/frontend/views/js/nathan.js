/**
MCOMS Check for session
**/
document.cookie = "hasMCOMSession=false; path=/";
function createMCOMIFrame(){
    window.addEventListener("message", onMCOMIFrameMessage, false);
    var oIFrame = document.getElementById("mcomiframe");
    var iframeSrc = backofficeUrl+webserviceDir+'/cli_session.htm';
    if(oIFrame === null) {
        oIFrame = document.createElement('iframe');
        oIFrame.id = "mcomiframe";
        document.body.appendChild(oIFrame);
    }
    oIFrame.setAttribute("src", iframeSrc);
    oIFrame.setAttribute("style", "width: 0; height: 0; border: 0;");
}
function onMCOMIFrameMessage(event) {
    var oData = JSON.parse(event.data);
    if(oData.isLogged) {
      if(oData.sessionType == 2 || oData.sessionType == 3 || oData.sessionType == 101 || oData.sessionType == 4) {
        // user has session on mcom
        document.cookie = "hasMCOMSession=true; path=/";
      }
    }
}
createMCOMIFrame();

$(document).ready(function() {

    // default for select2
    $.fn.select2.defaults.set("minimumResultsForSearch", 10);

    // testimonial read more
    $('#testimonialsContainer').on('click', '.testimonial-message .readmore', function(){
        $(this).parent('.testimonial-message').html($(this).parent('.testimonial-message').data('full-text'));
    });

    // scroll listener
    var efficientResize = debounce(pageResized,250);
    $(window).on('resize',efficientResize);

    // initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // vertically center items
    verticleCenter();

    // equal height items
    setEqualHeight($('.equalHeight'));
    
    // weight diagram tooltip
    $('.view-weight-diagram').tooltip( { track: true, tooltipClass: "weightdiagram-popup", content: function() { return '<div style="width: 500px; height: 375px;"><img src="'+httpUrl+'bento/img/weightdiagram.gif"/></div>'; } } );
    
    // videos
    $('.video-js').each(function(i,e) {
        var player = videojs(e);
        player.on("play", function () {
            $('#'+player.id()).siblings('.text-overlay').hide();
        });
        player.on("pause",function() {
            $('#'+player.id()).siblings('.text-overlay').show();
        });
    });

    // video modals
    $('.modal.video-modal').on('hide.bs.modal',function(e) {
	// get the video element in modal
	var videoElement = $(this).find('.video-js');
	var player = videojs(videoElement.attr('id')).pause();
    });
    $('.modal.video-modal').on('shown.bs.modal',function(e) {
	// get the video element in modal
	var videoElement = $(this).find('.video-js');
	var player = videojs(videoElement.attr('id')).play();
    });

    /** MCOM LOGIN **/
    var ssoLoginUrl = getCookie('mcom_sso_url');
    if (ssoLoginUrl) {
        var cleanUrl = unescape(ssoLoginUrl);
        if ($('body.context-user-actionlogout').length == 0) {

            $('body').append('<iframe id="mcomSSOframe" src="about:blank" style="width:0;height:0;border:0; border:none;"></iframe>');

            // delete the cookie after using it
            // if on gotoback office page, redirect when sso frame is loaded
            $('#mcomSSOframe').on('load',function() {
                deleteCookie('mcom_sso_url');
                createMCOMIFrame();
                if ($('body.context-user-actiongotobackoffice').length) {
                    if (whereToGo != '') {
                        window.location = whereToGo;
                    } else {
                        window.location = backofficeUrl + webserviceDir + '/homepage.htm';
                    }
                }
            });

            $('#mcomSSOframe').attr('src',cleanUrl);

        }
    }

    // clipboard
    var clipboards = new Clipboard('.clipboard');
    clipboards.on('success', function(e) {
        var copyTooltip = $(e.trigger).tooltip({
            placement: 'top',
            title: 'URL Copied!',
            trigger: 'manual'
        });
        copyTooltip.tooltip('show');
        setTimeout(function() {
            copyTooltip.tooltip('hide');
        },3000);
    });

    // popups
    $('.pop').on('click',function(e) {
        var linkElement = $(this);
        window.open(linkElement.attr('href'),'popupWindow','height=400,width=500');
	if (window.focus) {newwindow.focus()}
	e.preventDefault;
    });

    // mcom shop links
    $('a.sessionToShop').on('click',function(e) {
        e.preventDefault();
        sessionToShop($(this).attr('href'));
    });

    /* mobile navigation menu */
    $('.mobileNavHamburger').on('click',function() {
        $('#main-nav-mobile').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
    });
    $('#main-nav-mobile .close').on('click',function() {
        $('#main-nav-mobile').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
    });
    $('#main-nav-mobile .dognavlink').on('click',function() {
        $('#dog-nav-mobile').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
    });
    $('#dog-nav-mobile .close').on('click',function() {
        $('#dog-nav-mobile').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
    });
    $('#main-nav-mobile .catnavlink').on('click',function() {
        $('#cat-nav-mobile').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
    });
    $('#cat-nav-mobile .close').on('click',function() {
        $('#cat-nav-mobile').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
    });
    $('#main-nav-mobile .pawtreenavlink').on('click',function() {
        $('#about-nav-mobile').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
    });
    $('#main-nav-mobile .storiesnavlink').on('click',function() {
        $('#stories-nav-mobile').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
    });
    $('#stories-nav-mobile .close').on('click',function() {
        $('#stories-nav-mobile').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
    });
    $('#about-nav-mobile .close').on('click',function() {
        $('#about-nav-mobile').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
    });

    /***** Page Specific Items *****/

    // label modal name suggestions
    $('#labelModal').on('click','.nameSuggestionsList li',function() {
        var suggestedName = $(this).text();
        var labelId = $(this).parent().attr('data-label-id');
        $('#labelModal input[data-label-id="'+labelId+'"]').val(suggestedName);
        $('#labelModal #labelSuggestions-'+labelId).collapse('hide');
    });

    // user profile page
    if($('body.context-user-actionprofile').length) {

        $('.editLabel').on('click',function() {
            var element = $(this);
            $('#labelModal').modal({open:true});
            $('#labelModal .modal-body').html('<p>Loading...</p>');
            $('#labelModal .modal-body').load("/petprofile/LabelsPopup?editedPetId="+element.data('petId')+"&nextPage=/user/profile",function() {
                verticleCenter();
                petPhotoUpload.init();
            });
        });

        $('.btn-fetchresults').on('click',function(e) {
            e.preventDefault();
            $('#labelModal').modal({open:true});
            $('#labelModal .modal-body').html('<p>Loading...</p>');
            $('#labelModal .modal-body').load("/petprofile/LabelsPopup",function() {
                verticleCenter();
                petPhotoUpload.init();
                $('#saveLabelForm').on('submit',function(e) {
                    // show loading
                    $('#labelModal .modal-body').prepend('<div class="text-center"><img src="/bento/img/ajax-loader.gif" alt="Loading" title="Loading"/><p>Loading... please wait</p></div>');
                    $('#saveLabelForm').hide();
                    $('#labelModal .labelDisclaimer').hide();
                    return true;
                });
            });
        });

    }

    // contact us page
    if ($('#contactForm').length) {

	$('#contactForm').validate({
            ignore:[],
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    if($(validator.errorList[0].element).is(":visible"))
                    {
                        $('html, body').animate({
                            scrollTop: ($(validator.errorList[0].element).offset().top - 200)
                        }, 500);
                    }
                    else
                    {
                        $('html, body').animate({
                            scrollTop: ($($(validator.errorList[0].element).attr("data-focus-selector")).offset().top - 200)
                        }, 500);
                    }
                }
            }
        });

    }

    // petprofile page
    if($('body.context-petprofile-actionindex').length || $('body.context-petprofile-actionedit').length) {

        // dob date picker
        $('input[name="pp_dogdob"]').datepicker({
            autoclose: true,
            orientation: 'bottom',
            endDate: '0d',
	    container: '.dobContainer'
        });
        $('input[name="pp_catdob"]').datepicker({
            autoclose: true,
            orientation: 'bottom',
            endDate: '0d',
	    container: '.dobContainer'
        });

        // breed size selector
        $('.petprofileForm .dogsizeOption .dogsizeIcon').on('click',function() {
            $('.petprofileForm .dogsizeOption .dogsizeIcon').removeClass('selected');
            var dogsizeElement = $(this);
            dogsizeElement.addClass('selected');
            $('input[name="pp_dogsize"]').val(dogsizeElement.attr('data-dogsize'));
            $('input[name="pp_dogsize"]').valid();
        });

        $('.petprofileForm .catsizeOption .catsizeIcon').on('click',function() {
            $('.petprofileForm .catsizeOption .catsizeIcon').removeClass('selected');
            var catsizeElement = $(this);
            catsizeElement.addClass('selected');
            $('input[name="pp_catsize"]').val(catsizeElement.attr('data-catsize'));
            $('input[name="pp_catsize"]').valid();
        });

        // breed selector dogs
	$('.petprofileForm #pp_dogbreed').select2();
	$('.petprofileForm #pp_dogbreed').hide();
        $('.petprofileForm #pp_dogbreed_category').on('change',function() {
	    $('.petprofileForm #pp_dogbreed').hide();
            var breedType = $(this).val();
	    if(!$('.petprofileForm #pp_dogbreed option[class="'+breedType+'"]:selected').length){
		$('.petprofileForm #pp_dogbreed').val(null).trigger("change");
	    }
            $('.petprofileForm #pp_dogbreed option').removeAttr('disabled');
            $('.petprofileForm #pp_dogbreed option[class!="'+breedType+'"]').attr('disabled','disabled');

	    if($('.petprofileForm #pp_dogbreed option[class="'+breedType+'"]').length == 1){
		$('.petprofileForm #pp_dogbreed').val($('.petprofileForm #pp_dogbreed option[class="'+breedType+'"]:first').val()).trigger('change');
		if($('.petprofileForm #pp_dogbreed').hasClass('select2-hidden-accessible')) {
		    $('.petprofileForm #pp_dogbreed').select2("destroy");
		}
		$('.petprofileForm #pp_dogbreed').hide();
	    } else {
		if($('.petprofileForm #pp_dogbreed').hasClass('select2-hidden-accessible')) {
		    $('.petprofileForm #pp_dogbreed').select2("destroy").select2();
		} else {
		    $('.petprofileForm #pp_dogbreed').select2();
		}
		$('.petprofileForm #pp_dogbreed').show();
	    }

        });
        if ($('.petprofileForm #pp_dogbreed option:selected').val()) {
            $('.petprofileForm #pp_dogbreed_category').val($('.petprofileForm #pp_dogbreed option:selected').attr('class')).trigger('change');
	    //$('.petprofileForm #pp_dogbreed').show();
        }



	// breed selector cats
	$('.petprofileForm #pp_catbreed').select2();
	$('.petprofileForm #pp_catbreed').hide();
        $('.petprofileForm #pp_catbreed_category').on('change',function() {
            var breedType = $(this).val();
	    if(!$('.petprofileForm #pp_catbreed option[class="'+breedType+'"]:selected').length){
		$('.petprofileForm #pp_catbreed').val(null).trigger("change");
	    }
            $('.petprofileForm #pp_catbreed option').removeAttr('disabled');
            $('.petprofileForm #pp_catbreed option[class!="'+breedType+'"]').attr('disabled','disabled');

	    if($('.petprofileForm #pp_catbreed option[class="'+breedType+'"]').length == 1){
		$('.petprofileForm #pp_catbreed').val($('.petprofileForm #pp_catbreed option[class="'+breedType+'"]:first').val()).trigger('change');
		if($('.petprofileForm #pp_catbreed').hasClass('select2-hidden-accessible')) {
		    $('.petprofileForm #pp_catbreed').select2("destroy");
		}
		$('.petprofileForm #pp_catbreed').hide();
	    } else {
		if($('.petprofileForm #pp_catbreed').hasClass('select2-hidden-accessible')) {
		    $('.petprofileForm #pp_catbreed').select2("destroy").select2();
		} else {
		    $('.petprofileForm #pp_catbreed').select2();
		}
		$('.petprofileForm #pp_catbreed').show();
	    }
        });
        if ($('.petprofileForm #pp_catbreed option:selected').val()) {
            $('.petprofileForm #pp_catbreed_category').val($('.petprofileForm #pp_catbreed option:selected').attr('class')).trigger("change");
	    //$('.petprofileForm #pp_catbreed').show();
        }

        // currently feeding / where buy
        $('.petprofileForm .pp_wherebuy_container').hide();
        $('.petprofileForm #pp_currentfood').on('change',function() {
            if ($(this).val()) {
                $('.petprofileForm .pp_wherebuy_container').show();
            }
        });
        if ($('.petprofileForm #pp_wherebuy').val() || $('.petprofileForm #pp_currentfood').val()) {
            $('.petprofileForm .pp_wherebuy_container').show();
        }

        // add another pet
        $('.petprofileForm .btnAddpet').on('click',function(e) {

            // validate the form
            if (!validatePetProfile()) { return false; }

            var senddata = $('.petprofileForm').serialize();
            senddata += '&json=1';

            // submit form via ajax
            $.ajax({
                url: httpUrl+'petprofile/submit',
                dataType: 'json',
                data: senddata,
                success: function(data,textStatus,jqXHR) {

                    if(data.result=='success') {

                        // saved, add new pet now
			$('.petprofileForm').trigger('reset');
                        $('#species-modal').modal({open:true, backdrop: 'static', keyboard: false});

                    } else {

                        if (data.response != '') {
                            alert(data.response);
                        } else {
                            alert('unknown error');
                        }

                    }
                },
                error: function(jqXHR,textStatus,error) {

                    alert('system communication error');

                }
            });

            return true;

        });

        // submit form via ajax
        $('.petprofileForm .btnContinue').on('click',function(e) {

            // validate the form
            if (!validatePetProfile()) { return false; }

            var senddata = $('.petprofileForm').serialize();
            senddata += '&json=1';

            // submit form via ajax
            $.ajax({
                url: httpUrl+'petprofile/submit',
                dataType: 'json',
                data: senddata,
                success: function(data,textStatus,jqXHR) {

                    if(data.result=='success') {

			$('.petprofileForm').trigger('reset');
                        $('#labelModal').modal({open:true, backdrop: 'static', keyboard: false});
                        $('#labelModal .modal-body').load("/petprofile/LabelsPopup?editedPetId="+data.response.pet_id,function() {
                            verticleCenter();
                            petPhotoUpload.init();
                            $('#saveLabelForm').on('submit',function(e) {
                                // show loading
                                $('#labelModal .modal-body').prepend('<div class="text-center"><img src="/bento/img/ajax-loader.gif" alt="Loading" title="Loading"/><p>Loading... please wait</p></div>');
                                $('#saveLabelForm').hide();
                                $('#labelModal .labelDisclaimer').hide();
                                return true;
                            });
                        });

                    } else {

                        if (data.response != '') {
                            alert(data.response);
                        } else {
                            alert('unknown error');
                        }

                    }
                },
                error: function(jqXHR,textStatus,error) {

                    alert('system communication error');

                }
            });

            return true;

        });

    }

    // recommender page
    if($('body.context-petprofile-actionproducts').length) {

        // on page load
        updateRecommender();

        // alternate option popup
        $('form.alternate-product-form').each(function(i,e) {
            var alternateProductForm = $(this);
            var productPrice = alternateProductForm.find('.product-price-dollars');
            productPrice.html('$'+$(this).find('select[name="alternate_ProductNumber"] option:selected').attr('data-price'));
            alternateProductForm.find('select[name="alternate_ProductNumber"]').on('change',function() {
                var selection = $(this).find('option:selected');
                productPrice.html('$'+selection.attr('data-price'));
            });
        });

        // change to alternate option
        $('form.alternate-product-form').on('submit',function(e) {

            // prevent from from submitting, and get the form data
            e.preventDefault();
            var formElement = $(this);
            var formData = formElement.serializeObject();

            // close modal
            $('#OrderItemOptions-'+formData.order_item).modal('hide');

            // update the orderItem with new data
            if (typeof formData.order_item != 'undefined') {

                var orderItemElement = $('.orderItem[data-order-item='+formData.order_item+']');
                var currentEzship = orderItemElement.attr('data-autoship-days');
                var currentProductNumber = orderItemElement.attr('data-product-number');

                // visual elements
                var productImage = orderItemElement.find('.product-image img');
                var productTitle = orderItemElement.find('.product-title');
                var productPpd = orderItemElement.find('.product-ppd');
                var productQty = orderItemElement.find('.product-quantity');
                var productPrice = orderItemElement.find('.product-price');
                var productEzship = orderItemElement.find('.product-ezship');

                // show loading
                productImage.attr('src','/bento/img/ajax-loader.gif');

                $.ajax({
                    url: httpUrl+'petprofile/ProductDetails?productNumber='+formData.alternate_ProductNumber+'&petGroupId='+orderItemElement.attr('data-label-id'),
                    dataType: 'json',
                    success: function(data,textStatus,jqXHR) {

                        if(data.result=='success') {

                            // update data attributes
                            orderItemElement.attr('data-include','yes');
                            orderItemElement.attr('data-product-number',formData.alternate_ProductNumber);
                            orderItemElement.attr('data-quantity',formData.alternate_Quantity);
                            orderItemElement.attr('data-autoship-days',formData.alternate_Shipcycle);
                            if (formData.alternate_Shipcycle == "0") { orderItemElement.attr('data-autoship','false'); } else { orderItemElement.attr('data-autoship','true'); }

                            // calculate ppd
                            if (data.response.lbsday != 0) {
                                var ppd = Math.round((data.response.RetailPrice / (parseFloat(data.response.lbs) / data.response.lbsday))*100)/100;
                            } else {
                                var ppd = Math.round(((data.response.RetailPrice * formData.alternate_Quantity) / formData.alternate_Shipcycle)*100)/100;
                            }

                            // visual updates
                            productImage.attr('src',data.response.PictureURL);
                            productTitle.html(data.response.ProductName);
                            productPpd.html('$'+ppd);
                            productQty.html(formData.alternate_Quantity);
                            productPrice.html('$'+data.response.RetailPrice);
                            productEzship.html('EZ Ship '+ formData.alternate_Shipcycle +' Days');

                            // if ezship changed, moved to new container
                            if (currentEzship != formData.alternate_Shipcycle) {

                                // changed, we need to move it.
                                var whatToMove = orderItemElement.parent(); // the "col"umn container

                                //Find where it goes
                                if (formData.alternate_Shipcycle == "0") {
                                    newShippingGroup = $('.orderShipmentGroup[data-autoship-group="group-onetime"] .productData');
                                } else {
                                    newShippingGroup = $('.orderShipmentGroup[data-autoship-group="group-'+formData.alternate_Shipcycle+'"] .productData');
                                }

                                // move it
                                whatToMove.appendTo(newShippingGroup);

                            }

                            // update the page with changes
                            updateRecommender();

                            // notify about EZ ship update
                            if (orderItemElement.data('productType') == 'food' && currentProductNumber != formData.alternate_ProductNumber) {
                                $('#ezshipupdate-modal').modal('show');
                            }

                        } else {

                            if (data.response != '') {
                                alert(data.response);
                            } else {
                                alert('unknown error');
                            }

                        }
                    },
                    error: function(jqXHR,textStatus,error) {

                        alert('system communication error');

                    }
                });


            }

        });

        // remove product
        $('.orderItem').each(function(i,e) {
            var orderItem = $(this);
            orderItem.find('.product-actions .remove').on('click',function() {
                orderItem.addClass('deleted');
                orderItem.attr('data-include','');
                orderItem.find('.product-actions').hide();
                orderItem.find('.product-action-add').removeClass('hidden');
                updateRecommender();
            });
        });

        // add product back
        $('.orderItem').each(function(i,e) {
            var orderItem = $(this);
            orderItem.find('.product-action-add').on('click',function() {
                orderItem.removeClass('deleted');
                orderItem.attr('data-include','yes');
                orderItem.find('.product-actions').show();
                orderItem.find('.product-action-add').addClass('hidden');
                updateRecommender();
            });
        });

        // change EZ ship cycle
        $('select[name="ezshipFrequency"]').on('change',function() {

            // get the items that need EZ ship data updated
            var selectElement = $(this);
            var shippingGroup = $('.orderShipmentGroup[data-autoship-group="group-'+selectElement.attr('data-ezship')+'"]');
            var groupItems = shippingGroup.find('.orderItem');

            groupItems.each(function() {
                var product = $(this);
                product.attr('data-autoship-days',selectElement.val());
                product.find('.product-ezship').html('EZ Ship '+ selectElement.val() +' Days');
                shippingGroup.find('.ezshipTruck').html(selectElement.val() + "<br/>Days");
            });

            updateRecommender();

        });

    }

    // become a petpro page - 1st page - enrollment kit buttons
    if($('.rootpage-become-a-petpro .enrollmentKits .btnenrollmentkit').length && $('.btnenrollment').length) {

        $('.enrollmentKits .btnenrollmentkit').on('click',function(e) {

            e.preventDefault();

            // reset selection
            $('.enrollmentKits .btnenrollmentkit').html('Choose Kit').removeClass('btngreen').addClass('btnbrown');

            var clickedBtn = $(this);

            // show selection
            clickedBtn.removeClass('btnbrown').addClass('btngreen').html('Added');

            // apply selection to enroll button
            $('.btnenrollment').attr('href','/user/enrollment?kit='+clickedBtn.data('productNumber'));
        });

    }
    // become a petpro page - 2nd page - enrollment kit buttons
    if($('.context-user-actionenrollment .enrollmentKits .btnenrollmentkit').length) {

	// select the previously selected kit
	var selectedKitElement = $('input[name="enrollKit"]');
	if (selectedKitElement.val()) {
	    $('.enrollmentKits .btnenrollmentkit').html('Choose Kit').removeClass('btngreen').addClass('btnbrown');
	    $('.enrollmentKits .btnenrollmentkit[data-product-number="'+selectedKitElement.val()+'"]').removeClass('btnbrown').addClass('btngreen').html('Added');
	}

	$.validator.addMethod("replicatedSite", function(value, element) {
	    return /^[a-z][a-z0-9\-]+$/i.test(value);
	}, "Name must not begin with a number or contain any spaces or special characters.");

	$('#enrollmentForm input[name="user_site"]').on('keydown',function() {

	    $('#enrollmentForm .nameStatus').removeClass('label-danger label-success').addClass('label-default').html('checking...').show();
	    debouncedNamecheck();

	});

        $('#enrollmentForm').validate({
            ignore:[],
	//    rules: {
	//	"user_site": {
	//	    required: true,
	//	    replicatedSite: true,
	//	    remote: {
	//		url: "/user/sitenameavailable",
	//		beforeSend: enrollUrlChecking,
	//		complete: enrollUrlChecked
	//	    }
	//	}
	//    },
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    if($(validator.errorList[0].element).is(":visible"))
                    {
                        $('html, body').animate({
                            scrollTop: ($(validator.errorList[0].element).offset().top - 200)
                        }, 500);
                    }
                    else
                    {
                        $('html, body').animate({
                            scrollTop: ($($(validator.errorList[0].element).attr("data-focus-selector")).offset().top - 200)
                        }, 500);
                    }
                }
            }
        });

        $('.enrollmentKits .btnenrollmentkit').on('click',function(e) {

            e.preventDefault();

            // reset selection
            $('.enrollmentKits .btnenrollmentkit').html('Choose Kit').removeClass('btngreen').addClass('btnbrown');

            var clickedBtn = $(this);

            // show selection
            clickedBtn.removeClass('btnbrown').addClass('btngreen').html('Added');

            // apply selection to form
            $('input[name="enrollKit"]').val(clickedBtn.data('productNumber'));

        });

    }
    if($('.enrollmentKits .whatsInIt').length) {

        $('.enrollmentKits .whatsInIt .whatsInIt-link').on('click',function() {
            var element = $(this);
            if (element.hasClass('open')) {
                element.removeClass('open').addClass('closed');
                element.siblings('.whatsInIt-details').slideUp();
                element.children('.opencloseIndicator').html('+');
            } else {
                element.removeClass('closed').addClass('open');
                element.siblings('.whatsInIt-details').slideDown();
                element.children('.opencloseIndicator').html('-');
            }
        });

    }

    // Testimonials page
    if($('body.context-testimonial-actionindex').length) {

        testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();

        // filter menu
        $('.openFiltersButton').on('click',function() {
            $('#testimonialFilters').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
        });
        $('#testimonialFilters .close').on('click',function() {
            $('#testimonialFilters').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
        });

        // filter actions
        $('#testimonialFilters ul.filterlist li input').on('change',function() {
            var checkedFilters = $('#testimonialFilters ul.filterlist li input:checked');
            var filterString = '';
            for(var i=0; i<checkedFilters.length; i++) {
                filterString += $(checkedFilters[i]).val()+',';
            }
            if (filterString.length) { filterString = filterString.substring(0,filterString.length-1); }
	    testimonialsFilters = filterString;
            clearTestimonials();
            getTestimonials(testimonialsFilters,0,testimonialsHowmany,testimonialsSearch);
        });

        // search
        $('.searchTestimonialsContainer .searchQueryInput').keypress(function(e) {
            if(e.which == 13) {
            $('.searchTestimonialsContainer .searchQuerySubmit').trigger('click');
            }
        });
        $('.searchTestimonialsContainer .searchQuerySubmit').on('click',function() {
            testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();
            clearTestimonials();
                getTestimonials(testimonialsFilters,0,testimonialsHowmany,testimonialsSearch);
        });

        // auto loading testimonials
        var testimonialsContainer = document.getElementById('testimonialsContainer');
        if (testimonialsContainer) {
            getTestimonials(testimonialsFilters,testimonialsStart,testimonialsHowmany,testimonialsSearch); // initial page load
            $('#loadmore').on('click',function(e) {
                e.preventDefault();
                if (!isTestimonialsLoading) {
                    getTestimonials(testimonialsFilters,testimonialsStart,testimonialsHowmany,testimonialsSearch); // load more
                }
            });
        }

    }
    // Testimonial page
    if ($('body.context-testimonial-actionview').length) {
        // search
        $('.searchTestimonialsContainer .searchQueryInput').keypress(function(e) {
            if(e.which == 13) {
            $('.searchTestimonialsContainer .searchQuerySubmit').trigger('click');
            }
        });
        $('.searchTestimonialsContainer .searchQuerySubmit').on('click',function() {
            testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();
            window.location = '/testimonial?search='+testimonialsSearch;
        });
    }
    
    // Petpro Testimonials page
    if($('body.context-testimonial-actionpetpros').length) {

        testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();

        // filter menu
        $('.openFiltersButton').on('click',function() {
            $('#testimonialFilters').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
        });
        $('#testimonialFilters .close').on('click',function() {
            $('#testimonialFilters').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
        });

        // filter actions
        $('#testimonialFilters ul.filterlist li input').on('change',function() {
            var checkedFilters = $('#testimonialFilters ul.filterlist li input:checked');
            var filterString = '';
            for(var i=0; i<checkedFilters.length; i++) {
                filterString += $(checkedFilters[i]).val()+',';
            }
            if (filterString.length) { filterString = filterString.substring(0,filterString.length-1); }
            testimonialsFilters = filterString;
            clearTestimonials();
            getPetProTestimonials(testimonialsFilters,0,testimonialsHowmany,testimonialsSearch);
        });

        // search
        $('.searchTestimonialsContainer .searchQueryInput').keypress(function(e) {
            if(e.which == 13) {
                $('.searchTestimonialsContainer .searchQuerySubmit').trigger('click');
            }
        });
        $('.searchTestimonialsContainer .searchQuerySubmit').on('click',function() {
            testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();
            clearTestimonials();
            getPetProTestimonials(testimonialsFilters,0,testimonialsHowmany,testimonialsSearch);
        });

        // auto loading testimonials
        var testimonialsContainer = document.getElementById('testimonialsContainer');
        if (testimonialsContainer) {
            getPetProTestimonials(testimonialsFilters,testimonialsStart,testimonialsHowmany,testimonialsSearch); // initial page load
            $('#loadmore').on('click',function(e) {
                e.preventDefault();
                if (!isTestimonialsLoading) {
                    getPetProTestimonials(testimonialsFilters,testimonialsStart,testimonialsHowmany,testimonialsSearch); // load more
                }
            });
        }

    }
    // Petpro Testimonial page
    if ($('body.context-testimonial-actionpetpro').length) {
        // search
        $('.searchTestimonialsContainer .searchQueryInput').keypress(function(e) {
            if(e.which == 13) {
            $('.searchTestimonialsContainer .searchQuerySubmit').trigger('click');
            }
        });
        $('.searchTestimonialsContainer .searchQuerySubmit').on('click',function() {
            testimonialsSearch = $('.searchTestimonialsContainer .searchQueryInput').val();
            window.location = '/testimonial/petpros?search='+testimonialsSearch;
        });
    }

    // PetPro Tools - View User Profile page
    if ($('body.context-petprotools-actionviewuser').length) {
	$('a.btn.openrecommends').on('click',function() {
	    var openTarget = $(this).attr('data-slideintarget');
	    $('.slidein-recommends[data-targetname="'+openTarget+'"]').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
	});
	$('.slidein-recommends .close').on('click',function() {
	    $('.slidein-recommends').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
	});
	$('a.btn.openezships').on('click',function() {
	    $('.slidein-ezships').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
	});
	$('.slidein-ezships .close').on('click',function() {
	    $('.slidein-ezships').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
	});
	$('a.btn.opencompares').on('click',function() {
	    $('.slidein-compares').removeClass('mobile-nav-slideout').addClass('mobile-nav-slidein');
	});
	$('.slidein-compares .close').on('click',function() {
	    $('.slidein-compares').removeClass('mobile-nav-slidein').addClass('mobile-nav-slideout');
	});
    }

});

// Get Testimonials
var noTestimonials = false;
var isTestimonialsLoading = false;
var testimonialsStart = 0;
var testimonialsHowmany = 20;
var testimonialsFilters = '';
var testimonialsAJAX;
var testimonialsSearch = '';

function getTestimonials(filters,start,count,search) {

    filters = typeof filters !== 'undefined' ? filters : '';
    start = typeof start !== 'undefined' ? start : '0';
    count = typeof count !== 'undefined' ? count : '20';
    search = typeof search !== 'undefined' ? search : '';

    testimonialsStart += count;

    $('#loadmore .loading').show();
    isTestimonialsLoading = true;
    $('#testimonialFilters ul.filterlist li input').attr('disabled',true);

    testimonialsAJAX = $.ajax({
        url: '/testimonial/getTestimonials?filters='+filters+'&start='+start+'&count='+count+'&search='+search,
        dataType: 'json',
        type: 'POST',
        error: function(httpObject,errorReason,errorThrown) {
            //error
        },
        success: function(data,textStatus,httpObject) {
            if(data.result == 'success') {

                // add them to DOM
                if (data.response.length == 0) {
                    noTestimonials = true;
                }

                addTestimonials(data.response);

            } else {
                // error
            }
        },
        complete: function(httpObject,textStatus) {
            $('#loadmore .loading').hide();
            isTestimonialsLoading = false;
            $('#testimonialFilters ul.filterlist li input').removeAttr('disabled');
        }
    });

}

function getPetProTestimonials(filters,start,count,search) {

    filters = typeof filters !== 'undefined' ? filters : '';
    start = typeof start !== 'undefined' ? start : '0';
    count = typeof count !== 'undefined' ? count : '20';
    search = typeof search !== 'undefined' ? search : '';

    testimonialsStart += count;

    $('#loadmore .loading').show();
    isTestimonialsLoading = true;
    $('#testimonialFilters ul.filterlist li input').attr('disabled',true);

    testimonialsAJAX = $.ajax({
        url: '/testimonial/getPetproTestimonials?filters='+filters+'&start='+start+'&count='+count+'&search='+search,
        dataType: 'json',
        type: 'POST',
        error: function(httpObject,errorReason,errorThrown) {
            //error
        },
        success: function(data,textStatus,httpObject) {
            if(data.result == 'success') {

                // add them to DOM
                if (data.response.length == 0) {
                    noTestimonials = true;
                }

                addTestimonials(data.response);

            } else {
                // error
            }
        },
        complete: function(httpObject,textStatus) {
            $('#loadmore .loading').hide();
            isTestimonialsLoading = false;
            $('#testimonialFilters ul.filterlist li input').removeAttr('disabled');
        }
    });

}

// Add Testimonials to page
function addTestimonials(testimonialList) {

    var container = $('#testimonialsContainer');
    var newHTML = '';
    var index;
    var testimonial;

    for (index = 0; index < testimonialList.length; ++index) {

        testimonial = testimonialList[index];

        if (testimonial.htmlRender) {
            newHTML += testimonial.htmlRender;
        }

    }

    container.append(newHTML);

}

// Clear testimonials
function clearTestimonials() {
    testimonialsAJAX.abort();
    var container = $('#testimonialsContainer').html('');
}

// Validate pet profile form
function validatePetProfile() {

    $.validator.setDefaults({ ignore: '' });

    if(!$('.petprofileForm').valid()) {
        var scrollToPosition = 0;
        if ($(".form-control.error").length) {
            scrollToPosition = $(".form-control.error").offset().top - 200;
        } else {
            if ($('input.error[name="pp_dogsize"]').length || $('input.error[name="pp_catsize"]').length) {
                scrollToPosition = $(".dogsizeOption, .catsizeOption").offset().top - 200;
            }
        }
        $('html, body').animate({
            scrollTop: scrollToPosition
        }, 500);
        return false;
    } else {
        return true;
    }

}

// Update recommender page
function updateRecommender() {

    // hide/show shipment groups as needed
    $('.orderShipmentGroup').each(function(i,e) {
        var hasProducts = $(this).find('.orderItem').length;
        if (hasProducts) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });


    // make sure items not included are hidden
    $('.orderItem[data-include!="yes"]').each(function(i,e) {
	var orderItem = $(this);
	orderItem.addClass('deleted');
	orderItem.attr('data-include','');
	orderItem.find('.product-actions').hide();
	orderItem.find('.product-action-add').removeClass('hidden');
    });

    // recalculate total cost per day
    $('.orderShipmentGroup').each(function(i,e) {
        var shipmentGroup = $(this);
        var totalPpd = 0;
        var ppds = shipmentGroup.find('.orderItem[data-include="yes"] .product-ppd');
        ppds.each(function(i,e) {
            var ppd = $(this).html();
            if (ppd.charAt(0) == '$') { ppd = ppd.substring(1); }
            totalPpd += parseFloat(ppd);
        });
        shipmentGroup.find('.shipmentCostperday').html('$'+Math.round(totalPpd*100)/100);
    });

    // recalculate sub totals
    $('.orderShipmentGroup').each(function(i,e) {
        var shipmentGroup = $(this);
        var subTotal = 0;
        var items = shipmentGroup.find('.orderItem[data-include="yes"]');
        items.each(function(i,e) {
            var price = $(this).find('.product-price').html();
            var qty = $(this).attr('data-quantity');
            if (price.charAt(0) == '$') { price = price.substring(1); }
            subTotal += parseFloat(price*qty);
        });
        shipmentGroup.find('.shipmentSubtotal').html('$'+Math.round(subTotal*100)/100);
    });

    // recalculate grand total
    var grandTotal = 0;
    $('.shipmentSubtotal').each(function(i,e) {
        var subTotal = $(this).html();
        if (subTotal.charAt(0) == '$') { subTotal = subTotal.substring(1); }
        grandTotal += parseFloat(subTotal);
    });

    $('.grand-total .price').html('$'+Math.round(grandTotal*100)/100);

    // 3nfree qualify
    var qualifyingItems = $('.orderItem[data-freeshipqualify="yes"][data-include="yes"]');
    var itemCount = 0;

    qualifyingItems.each(function(i) {
        itemCount += (1*$(this).attr('data-quantity'));
    });

    if (itemCount >= 3) {
        $('.freeShippingQualify').removeClass('no').addClass('yes');
        $('.freeShippingNotice').show();
    } else {
        $('.freeShippingQualify').removeClass('yes').addClass('no');
        $('.freeShippingNotice').hide();
    }

    // update order xml
    generateOrderXML();

}

// Generate OrderXML
function generateOrderXML() {

    var checkoutButton = $('.submitOrderXML');
    checkoutButton.prop('disabled', true);

    var senddata = {};
    senddata.product = new Array;

    // get order details
    $('.orderItem').each(function() {

        // get item details
        var productRecord = {}
        productRecord.productNumber = $(this).attr('data-product-number');
        productRecord.quantity = $(this).attr('data-quantity');
        productRecord.recurring = $(this).attr('data-autoship');
        productRecord.shipCycle = $(this).attr('data-autoship-days');
        productRecord.petProfileIds = $(this).attr('data-pet-profiles');
        if ($(this).data('labelId') != '') {
            productRecord.questions = {question: 'Label ID', answer: $(this).attr('data-label-id') };
        }

        // add to send data
        if($(this).attr('data-include') == "yes") { senddata.product.push(productRecord); }

    });

    $.ajax({
        url: httpUrl+'petprofile/GetOrderXML',
        dataType: 'json',
        data: senddata,
        success: function(data,textStatus,jqXHR) {
            if(data.result=='success') {

                $('#OrderXML').val(data.response);
                checkoutButton.prop('disabled', false);

            } else {

                alert('Unable to get OrderXML (' + data.response + ')');

            }
        },
        error: function(jqXHR,textStatus,error) {
            alert('Server communication error, please try again later.');
        }
    });

}


function enrollUrlChecking() {
    $('form#enrollmentForm #username').after('<div class="checking"><img src="/bento/img/ajax-loader.gif" alt="Checking" title="Checking"></div>');
    $('form#enrollmentForm label.error[for="username"]').addClass('hidden');
}
function enrollUrlChecked() {
    $('form#enrollmentForm .checking').remove();
    $('form#enrollmentForm label.error[for="username"]').removeClass('hidden');
}

// Create cart session before shopping.
function sessionToShop(shopUrl) {

    // dont need todo this anymore, just send them on
    window.location = httpUrl+shopUrl;
    return false;

    // setup vars
    if (petproUrl == '') { petproUrl = 'master'; } // petproUrl is global var
    var iframeSource = backofficeUrl+webserviceDir+'/'+petproUrl;

    // create iframe
    if ($('#mcomSessionIframe').length == 0) {
        $('html body').append('<iframe id="mcomSessionIframe" src="about:blank"></iframe>')
    }
    var sessionIframe = $('#mcomSessionIframe');

    // attach redirect event to iframe
    sessionIframe.on('load',function() {
        window.location = httpUrl+shopUrl;
    });

    // change iframe source to create session
    sessionIframe.attr('src',iframeSource);

}


// Vertical center element
function verticleCenter() {

    // JavaScript vertical center
    $('.vCenter').each(function(i,e) {

        var centerElement = $(e);
        var parentElement = centerElement.parent();
        var paddingNeeded = 0;

        if (centerElement.height() < parentElement.height()) {
            paddingNeeded = Math.floor((parentElement.height()-centerElement.height())/2);
            centerElement.css('padding-top',paddingNeeded).css('padding-bottom',paddingNeeded);
        }

    });

}

// Page has resized
function pageResized() {

    verticleCenter();

}

function setEqualHeight(elements) {

    var maxHeight = 0;
    var elementHeight = 0;

    $(elements).each(function() {
	elementHeight = $(this).outerHeight();
	if (elementHeight > maxHeight) {
	    maxHeight = elementHeight;
	}
    });

    $(elements).each(function() {
	$(this).css('height',maxHeight+'px');
    });

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function deleteCookie(cname) {
  document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  return true;
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

var debouncedNamecheck = debounce(function() {

    var siteName = $('#enrollmentForm input[name="user_site"]');
    if (siteName.length) {
	$.ajax({
	    url: '/user/sitenameavailable',
	    data: 'user_site='+siteName.val(),
	    success: function(results) {
		$('#enrollmentForm .nameStatus').show();
		if (results == true) {
		    $('#enrollmentForm .nameStatus').removeClass('label-default label-danger').addClass('label-success').html('Name Available');
		} else {
		    $('#enrollmentForm .nameStatus').removeClass('label-default label-success').addClass('label-danger').html('Name Taken');
		}
	    }
	});
    }

},1000);

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
