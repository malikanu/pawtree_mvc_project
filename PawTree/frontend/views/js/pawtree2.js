var imageAreaSelect;

$(document).ready(function(){

    //Social Slidout for Condensed layout
    $('#header .fixed-social').on('click', function(){
        if($(this).hasClass('closed')){
            $(this).removeClass('closed');
        }else{
            $(this).addClass('closed');
        }
    });
    setTimeout(function() {
        $('#header .fixed-social').addClass('closed');
    },3000);

    //PetPro Express Order
    if($('form#expressOrder').length > 0){

        $('.food-select select').on('change', function(){
            foodValidation($(this));
        });

        function foodValidation(ele){
            console.log('called foodValidation');
            var p = ele.closest('.inner.row');
            if(ele.val() != "none"){
                p.find('input:text').attr('required', 'required');
            }else{
                p.find('input:text').removeAttr('required');
            }
        }

        $('.order-supplements .supplement-group input.supplement-checkbox').each(function(){
            if($(this).prop('checked')){
                $(this).parent('li').find('select.supplement-quantity').show();
            }
        });
        var expressOrderForm = $('#food-form-clean').html();
        var nextIndex = $('.order-form-container > div').length;
        var regID = new RegExp("_0", "g");
        var regIndex = new RegExp(/(\[\d\])/g);
        $('a#add_pet').on('click', function(){

            var newOrderForm = expressOrderForm.replace(regID, "_"+nextIndex);
            newOrderForm = newOrderForm.replace(regIndex, '['+nextIndex+']');

            $('.order-form-container').append(newOrderForm);

            $('.food-select select').each(function(){
                var hasEvent = $._data($(this).get(0), 'events');
                if(hasEvent == undefined){
                   $(this).on('change', function(){
                        foodValidation($(this));
                   });
                }
            });

            nextIndex++;
            
        });

        $('.order-supplements .supplement-group input.supplement-checkbox').on('click', function(){
            if($(this).prop('checked')){
                $(this).parent('li').find('select.supplement-quantity').show();
            }else{
                $(this).parent('li').find('select.supplement-quantity').hide();
            }
        });

        $('.order-form-container').on('click', 'a.add_pet_name', addPetName);

        function addPetName(){
            var parent = $(this).parent('.pets');
            var ele = parent.find('.pet-name-wrap:first').clone();
            var input = ele.find('.pet-name-input');
            var count = parseInt(parent.data('petnum'));
            count++;
            input.val('').removeAttr('required').attr('id', input.attr('id')+'_'+count);
            parent.data('petnum', count).attr('data-petnum', count);
            ele.append('<a class="pet-name-close" href="javascript:void(0)">X</a>');
            ele.find('.pet-name-close').on('click', closeName);
            $(this).parent('.pets').find('.field').append(ele);

        }

        $('.order-form-container').on('click', 'a.close-bag', function(){
            nextIndex--;
            $(this).parent('.inner').remove();
        });

        function closeName(){
            var parent = $(this).parent('.pet-name-wrap').parent('.field').parent('.pets');
            var count = parseInt(parent.data('petnum'));
            count--;
            parent.data('petnum', count).attr('data-petnum', count);
            $(this).parent('.pet-name-wrap').remove();
        }

        $('#expressOrder #user_email').on('blur', function(){
            var ele = $(this);
            var email = ele.val();
            $.ajax({
                url: httpUrl+'petprotools/ajaxemailcheck?email='+email,
                success: function(r){
                    var resp = JSON.parse(r);
                    if(resp.data != false){
                        ele.parent().find('.account-info').addClass('has-content').text('Ordering for '+resp.data['FirstName']+' '+resp.data['LastName']+' (ID: '+resp.data['DealerID']+')');
                        console.log(resp.data);
                    }else{
                        ele.parent().find('.account-info').addClass('has-content').text('Generating New Customer');
                    }
                },
            });
        });

        $('#expressOrder #affiliate_url').on('blur', function(){
            var ele = $(this);
            var url = ele.val();
            if(url.length > 0){
                if(url.indexOf('/') > -1){
                    url = url.substring(url.lastIndexOf('/')+1);
                    ele.val(url);
                }
                $.ajax({
                    url: httpUrl+'petprotools/ajaxreplicatedcheck?url='+url,
                    success: function(r){
                        var resp = JSON.parse(r);
                        if(resp.data != false){
                            ele.removeClass('error');
                            ele.parent().find('.affiliate-name').text(resp.data[2]+' '+resp.data[3]+' (ID: '+resp.data[1]+')');
                        }else{
                            ele.addClass('error').focus().parent().find('.affiliate-name').text('');
                            alert(url+' is not a valid replicated site.');
                        }
                    },
                });
            }else{
                ele.removeClass('error');
            }
        });
        
    }
    
    // pet profile
    $.validator.addMethod(
        "petBirthday",
        function(value, element) {
            // mm-dd-yyyy
            //var re = /^\d{2}-\d{2}-\d{4}$/;
            var re = /^\d{2}(\/?-?){1}\d{2}(\/?-?){1}\d{4}$/; // allow 03-20-1984 or 03/20/1984
            // valid if optional and empty OR if it passes the regex test
            return (this.optional(element) && value=="") || re.test(value);
        }
    );
    jQuery.extend(jQuery.validator.messages, {
        dateISO: "Please enter a valid date in yyyy-mm-dd format, or no date at all.",
        petBirthday: "Please enter a valid date in mm-dd-yyyy format, or no date at all."
    });
    
    $('.petprofileForm select[name="pp_dogbreed_category"]').on('change',function() {
        var categoryElement = $(this);
        $breedSelector.val(null).trigger("change");
        $('#pp_dogbreed option').removeAttr('disabled');
        $('.petprofileForm .select2-container .breedSelector').css('display','none');
        if (categoryElement.val() == 'Mixed Breed') {
            $breedSelector.val("Mixed Breed").trigger("change");
        } else {
            var selectedBreedCat = categoryElement.val();
            $('#pp_dogbreed option[class!='+categoryElement.val()+']').attr('disabled','disabled');
            $breedSelector.select2({containerCssClass: "breedSelector"});
            $('.petprofileForm .select2-container .breedSelector').css('display','block');
        }
    });
    
    $('.petprofileForm .dogsizeOption .dogsizeIcon').on('click',function() {
        $('.petprofileForm .dogsizeOption .dogsizeIcon').removeClass('selected');
        var dogsizeElement = $(this);
        dogsizeElement.addClass('selected');
        $('input[name="pp_dogsize"]').val(dogsizeElement.attr('data-dogsize'));
    });
    
    $('.petprofileForm .catsizeOption .catsizeIcon').on('click',function() {
        $('.petprofileForm .catsizeOption .catsizeIcon').removeClass('selected');
        var catsizeElement = $(this);
        catsizeElement.addClass('selected');
        $('input[name="pp_catsize"]').val(catsizeElement.attr('data-catsize'));
    });
    
    $('.petprofileForm').validate( {
        errorLabelContainer: "#validationErrors",
        wrapper: "li"
    });
    
    $('.tooltip').tooltip( { track: true } );
    $('.view-weight-diagram').tooltip( { track: true, tooltipClass: "weightdiagram-popup", content: function() { return '<div style="width: 500px; height: 375px;"><img src="'+httpUrl+'bento/img/weightdiagram.gif"/></div>'; } } );
    
    // grouping pets
    $('.petgroup .grouplist').sortable({
        connectWith: ".petgroup .grouplist",
        update: createFoodNames,
        placeholder: "sortable-placeholder"
    }).disableSelection();
    
    $('input[name="foodLabel"]').on('keydown change',function() {
        $(this).parent().siblings('.approveLabelContainer').children('input[name="labelApproval"]').prop('checked',false);
    });
    
    $('input[name="labelApproval"]').on('click',function() {
        if ($(this).is(':checked')) {
            
            if ($(this).parent().parent().find('.foodLabelInput').val() == ''){
                alert('Cannot approve without a food name');
                $(this).prop('checked', false); // Unchecks it
            } else {
                // scroll to next one
                var distanceToScroll = 486;
                var scrolledDistance = 0;
                var scrollNow = 1;
                var scrollInterval = setInterval(function() {
                    if (scrollNow < 1) {
                        scrollNow = 1;
                    }
                    window.scrollBy(0,scrollNow);
                    scrolledDistance += scrollNow;
                    if (scrolledDistance > distanceToScroll/1.5) {
                        scrollNow = scrollNow*0.95;
                    } else {
                        scrollNow = scrollNow*1.15;
                    }
                    if (scrolledDistance >= distanceToScroll) {
                        clearInterval(scrollInterval);
                    }
                },32);
            }
        }
    });
    
    $('.btnForward.gotorecommend').on('click',saveGroupsAndGotoRecommend);
    createFoodNames();
    
    // product recommend
    var orderForm = $('#mcomOrderForm');
    if(orderForm.length) {
        $('.orderItem .removeItem').hide();
        updateOrder();
        $('.orderItem .removeItem').on('click',function() {
            var uniqueID = $(this).data('uniqueId');
            $('.orderItem .row[data-unique-id="'+uniqueID+'"] .blind').show();
            $('.orderItem[data-unique-id="'+uniqueID+'"]').data('include','no');
            updateOrder();
        });
        $('.orderItem .blind .addItemToCart').on('click',function() {
            var uniqueID = $(this).data('uniqueId');
            $('.orderItem .row[data-unique-id="'+uniqueID+'"] .blind').hide();
            $('.orderItem[data-unique-id="'+uniqueID+'"]').data('include','yes');
            updateOrder();
        });
        $('#partyIdSelector').on('change',function() {
            updateOrder();
        });
        $('.revealFullRecommend').on('click',function() {
            $(this).remove();
            $('.orderItem .removeItem').show();
            // add all items to cart
            $('.orderItem').data('include','yes');
            $('.orderItem .row .blind').hide();
            $('.orderItem').slideDown();
            $('.fullRecommend').slideDown();
            updateOrder();
        });
        $('.trainingItem .addItemToCart').on('click',function() {
            var uniqueID = $(this).data('uniqueId');
            var shipCycle = $(this).data('shipcycle');
            $('.trainingItem[data-unique-id="'+uniqueID+'"]').data('include','yes').data('shipcycle',shipCycle);
            $('.trainingItem .removeItem[data-unique-id="'+uniqueID+'"]').show();
            $('.trainingItem .multiAdd[data-unique-id="'+uniqueID+'"]').hide();
            updateOrder();
        });
        $('.trainingItem .removeItem').on('click',function() {
            var uniqueID = $(this).data('uniqueId');
            // uncheck design checkboxes
            $('.trainingItem[data-unique-id="'+uniqueID+'"] input').prop('checked',false);
            $('.orderItem .row[data-unique-id="'+uniqueID+'"] .blind').show();
            $('.trainingItem[data-unique-id="'+uniqueID+'"]').data('include','no').data('shipcycle','once');
            $('.trainingItem .multiAdd[data-unique-id="'+uniqueID+'"]').show();
            $(this).hide();
            updateOrder();
        });
        
        // stylize change product size selects
        $('select.productSizeSelection').select2({
            containerCssClass: 'productSizeSelect2',
            minimumResultsForSearch: Infinity
        });
        
        // change productSize on recommended items
        $('.orderItem').on('change','.productSizeSelection',function() {
            var orderItemUniqueId = $(this).data('uniqueId');
            var selectedSize = $(this).children(':selected');
            var orderItem = $('.orderItem[data-unique-id="'+orderItemUniqueId+'"]');
            var doseDiff = selectedSize.data('doses')/orderItem.data('doses');
            var pricePerDay = parseFloat(orderItem.data('costperday')) * doseDiff;
            
            //console.log('New price per day = ' + pricePerDay);
            
            orderItem.data('productNumber',selectedSize.val());
            orderItem.data('costperday',pricePerDay);
            orderItem.data('doses',selectedSize.data('doses'));
            orderItem.data('price',selectedSize.data('price'));
            
            orderItem.find('.ppd').html('$'+pricePerDay);
            orderItem.find('.productPrice').html('Price (per unit) $' + selectedSize.data('price'));
            updateOrder();
        });
        
        // special case for dog pads and other items
        $('.trainingItem .productSizeSelection').on('change',function() {
            var uniqueID = $(this).data('uniqueId');
            // change the product id and price
            var newProductId = $(this).val();
            var newProductPrice = $("option:selected", this).data('price');
            $('.trainingItem[data-unique-id="'+uniqueID+'"]').data('productNumber',newProductId);
            $('.trainingItem[data-unique-id="'+uniqueID+'"]').data('price',newProductPrice);
            $('.trainingItem[data-unique-id="'+uniqueID+'"] .productPrice').html('$'+newProductPrice);
        });
    }
    
    //$('.changeFoodOptions .changeFoodButton').on('click',function() {
    //    var groupid = $(this).data('groupId');
    //    var meatPref = $('.changeFoodOptions .changeFoodSelect[data-group-id="'+groupid+'"]').val();
    //    showLoadingMessage();
    //    savePreferredMeatAndGotoRecommend(groupid,meatPref);
    //});
    
    $('.petprofileForm select.select2-default').select2();
    $('.petprofileForm select.select2-nosearch').select2({minimumResultsForSearch: Infinity});
    var $breedSelector = $('.petprofileForm .dogbreed select.select2-breed').select2({containerCssClass: "breedSelector"});
    
    var breedSelectorList = $('#pp_dogbreed');
    if (breedSelectorList.length) {
        var preselectedBreed = breedSelectorList.children('[selected="selected"]');
        if(preselectedBreed.length){
            $('.petprofileForm .select2-container .breedSelector').css('display','block');
            var preselectedBreedType = preselectedBreed.attr('class');
            $('.petprofileForm select[name="pp_dogbreed_category"]').select2({minimumResultsForSearch: Infinity}).val(preselectedBreedType).trigger('change');
            $breedSelector.val(preselectedBreed.val()).trigger('change');
        }
    }
    
    $('.petprofileForm #pp_currentfood').on('change',function() {
        if ($(this).val() == '*other*' || $(this).val() == "dont know") {
            $('body.body-petprofile form .field.wherebuy').show();
        } else {
            $('body.body-petprofile form .field.wherebuy').hide();
        }
    });
    $('.petprofileForm #pp_currentfood').trigger('change'); // force initial state
    
    $(".orderDetails .changeFood .changeFoodLink" ).click(function() {
        
        var maxWidth = $( window ).width();
        var height = 'auto';
        if (maxWidth > 820) {
            maxWidth = 820;
        } else {
            height = $(window).height();
        }
        $('#alternates_'+$(this).data('alternatesId')).dialog({
            width: maxWidth,
            height: height,
            modal: true,
            dialogClass: "changeFoodOptionsPopup"
        });
        return false; // stop the #anchor
    });
    
    $('.changeFoodOptions table.alternateItemList tr[data-product-id]').click(function() {
        var toSelect = $(this).data('productId');
        $('.changeFoodOptions table.alternateItemList tr').removeClass('highlight');
        $(this).addClass('highlight');
        $('.changeFoodOptions .alternateItemDetails').hide();
        $('.changeFoodOptions .whyGrainFreeDetails').hide();
        $('.changeFoodOptions .alternateItemDetails[data-product-id="'+toSelect+'"]').show();
    });
    
    $('.changeFoodOptions .whyGrainFreeButton').click(function() {
        $('.changeFoodOptions .alternateItemDetails').hide();
        $('.changeFoodOptions .whyGrainFreeDetails').show();
        return false;
    });
    
    $('.changeFoodOptions').on('click',function() {
        // if showing "why grain free", hide it and show last viewed food
        var foodToShow = $('.changeFoodOptions table.alternateItemList tr.highlight');
        var foodId = foodToShow.data('productId');
        if($('.changeFoodOptions .whyGrainFreeDetails').is(":visible")) {
            $('.changeFoodOptions table.alternateItemList tr').removeClass('highlight');
            $('.changeFoodOptions .whyGrainFreeDetails').hide();
            $('.changeFoodOptions .alternateItemDetails[data-product-id="'+foodId+'"]').show();
            foodToShow.addClass('highlight');
        } else {
            // do nothing
        }
    });
    
    $('.changeFoodOptions .changeFoodButton').on('click',function() {
        var groupid = $(this).data('groupId');
        var productid = $(this).data('productId');
        showLoadingMessage();
        savePreferredFoodAndGotoRecommend(groupid,productid);
    });
    
    // verify their changes before submitting form
    $('#mcomOrderForm').on('submit',function() {
        
        var incompleteUpdate = false;
        var unknownParty = false;
        
        $('.changeFoodOptions').each(function() {
            if($(this).is(':visible')) {
                incompleteUpdate = true;
            }
        });
        
        // party selection
        var partySelection = parseInt($('#partyIdSelector').val(),10);
        if(partySelection == 0) {
            $('.selectPartyDialog').dialog({
                width: 400,
                height: 160,
                modal: true,
                title: 'Select Pawlooza'
            });
            return false; // stop the form submission
        }
        
        if(incompleteUpdate) {
            return confirm('Are you sure you want to continue, without updating your food selection?');
        } else {
            return true;
        }
        
    });
    
    // team tabs
    $('.teamTabs').tabs({
        collapsible: true,
        activate: function (e, ui) {
            e.currentTarget.blur(); // hack to disable keyboard commands
            if ( $(this).tabs("option", "loaded") === false ) {
                $(this).tabs("option", "loaded", true);
                e.preventDefault();
                return;
            }
            var anchor = $( ui.newPanel );
            $('html, body').stop().animate({
                scrollTop: anchor.offset().top
            }, 500, 'easeInOutExpo');
            e.preventDefault();
        }
    });
    
    $('.shoptabs').tabs({
        activate: function (e, ui) {
            e.currentTarget.blur(); // hack to disable keyboard commands
            if ( $(this).tabs("option", "loaded") === false ) {
                $(this).tabs("option", "loaded", true);
                e.preventDefault();
                return;
            }
            var anchor = $('.shoptabs');
            $('html, body').stop().animate({
                scrollTop: anchor.offset().top
            }, 500, 'easeInOutExpo');
            e.preventDefault();
        }
    });
    
    // scrolling sidebar menu
    var scrollingElement = $('.scrollWithPage');
    if(scrollingElement.length > 0) {
        var previousPosition = scrollingElement.css('position');
        var topPosition = scrollingElement.offset().top - parseFloat(scrollingElement.css('marginTop').replace(/auto/, 0));
        $(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = $(this).scrollTop();
            
            // whether that's below the .scrollWithPage
            if (y >= topPosition) {
                // if so, ad the fixed class
                scrollingElement.css('position','fixed');
                scrollingElement.css('top','0');
            } else {
                // otherwise remove it
                scrollingElement.css('position',previousPosition);
            }
        });
    }
    
    // video popups
    //var videoPopupLink = $('.videoPopup');
    if($('.videoPopup').length > 0) {
       $('.videoPopup').on('click',function() {
            var videoFile = $(this).data('videoSource');
            if(videoFile) {
                console.log(videoFile);
                var dialogPopup = $(document.createElement('div'));
                dialogPopup.html('<iframe src="' + videoFile + '" width="640" height="360" frameborder="0" marginwidth="0" marginheight="0" allowtransparency="true" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>');
                dialogPopup.dialog( {
                    width: 670,
                    height: 417,
                    modal: true,
                    close: function() { $(this).dialog('destroy').empty(); }
                });
                
            }
            return false;
            
        });
    }
    
    // paw club dialog
    $( ".pawclub-dialog-open" ).click(function() {
        $( "#pawclub-dialog" ).dialog( {
            width: 650,
            modal: true,
            title: 'Paw Club'
        });
        return false; // stop the #anchor
    });
    
    // 3NFree dialog
    // paw club dialog
    $( ".threenfree-dialog-open" ).click(function() {
        $( "#threenfree-dialog" ).dialog( {
            width: 650,
            modal: true,
            title: '3NFree'
        });
        return false; // stop the #anchor
    });
    
    var learnmoreWidth = $( window ).width() * 0.66;
    var learnmoreHeight = $( window ).height() * 0.66;
    
    // product recommend dialogs
    $( ".orderDetails .orderItem .learnmore-link" ).click(function() {
        $('#'+$(this).data('learnmoreId')).dialog({
            width: learnmoreWidth,
            height: learnmoreHeight,
            modal: true
        });
        return false; // stop the #anchor
    });
    $( ".trainingItems .trainingItem .learnmore-link" ).click(function() {
        $('#'+$(this).data('learnmoreId')).dialog({
            width: learnmoreWidth,
            height: learnmoreHeight,
            modal: true
        });
        return false; // stop the #anchor
    });
    
});

function savePreferredMeatAndGotoRecommend(groupId,meatPref) {
    
    var senddata = {
        "group_id": groupId,
        "meat": meatPref
    }
    
    $.ajax({
        url: httpUrl+'petprofile/SavePreferredProtein',
        dataType: 'json',
        data: senddata,
        success: function(data,textStatus,jqXHR) {
            if(data.result=='success') {
                
                // groups saved, take them to product recommender
                window.location.href = httpUrl+"petprofile/products";
                
            } else {
                alert(data.error);
            }
        },
        error: function(jqXHR,textStatus,error) {
            alert('Server communication error, please try again later.');
            $('#loadingmessage').dialog('destroy').empty();
        }
    });
    
}

function savePreferredFoodAndGotoRecommend(groupId,foodId) {
    
    var senddata = {
        "group_id": groupId,
        "food_id": foodId
    }
    
    $.ajax({
        url: httpUrl+'petprofile/SavePreferredFood',
        dataType: 'json',
        data: senddata,
        success: function(data,textStatus,jqXHR) {
            if(data.result=='success') {
                
                // groups saved, take them to product recommender
                window.location.href = httpUrl+"petprofile/products";
                
            } else {
                alert(data.error);
            }
        },
        error: function(jqXHR,textStatus,error) {
            alert('Server communication error, please try again later.');
            $('#loadingmessage').dialog('destroy').empty();
        }
    });
    
}

function saveGroupsAndGotoRecommend() {
    
    // get the order of each group
    var hasError = false;
    var errorMsg;
    var groups = [];
    var group = {};
    var pets = [];
    var petgroup;
    
    //loop trough dom and build groups
    $('.petgroup').each( function(e) {
        
        // make sure group isnt empty
        petgroup = $(this);
        var petList = $(this).find('ul.grouplist').children('li:not(.tempHolder)');
        
        if(petList.length != 0) {
            
            group = {};
            pets = [];
            
            petList.each(function(i) {
                petprofileid = $(this).data('petprofileid');
                pets.push(petprofileid);
            });
            
            group.foodname = petgroup.find('input[name="foodLabel"]').val();
            group.approved = petgroup.find('.approveLabelContainer input[name="labelApproval"]:checked').val();
            group.id = petgroup.data('groupid');
            group.petprofiles = pets;
            groups.push(group);
            
            if(group.foodname == '' || group.foodname == undefined) {
                hasError = true;
                //errorMsg = 'Please type the name of your dog food and approve label';
            }
            
            if(group.approved == '' || group.approved == undefined) {
                hasError = true;
                //errorMsg = 'Please type the name of your dog food and approve label';
            }
            
        }
        
    });
    
    if(hasError) {
        $('#content div.alert-container').fadeIn('fast');
        $('#content div.alert-container input').on('click', function(){
            $(this).parent('div.alert-popup').parent('div.alert-container').hide(); 
        });
    } else {
        
        showLoadingMessage();
        
        // groups organized, save them to the database
        var senddata = {
            "savegroups": true,
            "groups": groups
        }
        
        $.ajax({
            url: httpUrl+'petprofile/SaveGrouppets',
            dataType: 'json',
            data: senddata,
            success: function(data,textStatus,jqXHR) {
                if(data.result=='success') {
                    
                    // groups saved, take them to product recommender
                    window.location.href = httpUrl+"petprofile/products";
                    
                } else {
                    alert(data.error);
                }
            },
            error: function(jqXHR,textStatus,error) {
                alert('Server communication error, please try again later.');
            }
        });
        
    }
    
}

function showLoadingMessage(message) {
    
    if (arguments.length === 0) {
        message = "Fetching your custom nutrition plan";
    }
    
    var loadingPopup = $(document.createElement('div')).attr('id',"loadingmessage");
    loadingPopup.html('<div style="text-align: center;">'+message+'<br/><br/><img src="/bento/img/ajax-loader.gif"/></div>');
    loadingPopup.dialog( {
        closeOnEscape: false,
        dialogClass: 'no-close',
        width: 300,
        height: 100,
        modal: true,
        close: function() { $(this).dialog('destroy').empty(); }
    });
}

function updateOrder() {
    
    // generate new orderxml
    generateOrderXML();
    
    // update order total
    $('.prtTotal').html('$' + calcualateOrderTotal());
    
    // update price per day total
    $('.prtTotalperday').html('$' + calculateOrderPricePerDay());
    
    // update shipping cycles
    calculateShipcycleTotals();
    
    // paw club qualify check
    pawclubEligible();
    
}

function calcualateOrderTotal() {
    
    var total = 0;
    
    $('.orderItem').each(function() {
        if($(this).data('include') == "yes") {
            total += $(this).data('price') * $(this).data('quantity');
        }
    });
    
    // training items now effect ordertotal
    $('.trainingItem').each(function() {
        if($(this).data('include') == "yes") {
            total += $(this).data('price') * $(this).data('quantity');
        }
    });
    
    return total.toFixed(2);
    
}

function calculateOrderPricePerDay() {
    
    var total = 0;
    
    $('.orderItem').each(function() {
        if($(this).data('include') == "yes") {
            total += $(this).data('costperday');
        }
    });
    
    $('.trainingItem').each(function() {
        if($(this).data('include') == "yes" && $(this).data('shipcycle') != "once") {
            total += $(this).data('costperday');
        }
    });
    
    return total.toFixed(2);
    
}

function pawclubEligible() {
    
    var pricePoint = parseFloat($('.pawclubnotice').data('pricepoint'),10);
    var orderTotal = parseFloat(calcualateOrderTotal(),10);
    
    if (orderTotal > pricePoint) {
        $('.pawclubnotice.ineligible').hide();
        $('.pawclubnotice.eligible').show();
    } else {
        $('.pawclubnotice.ineligible .pawclubpricediff').html('$' + (pricePoint-orderTotal).toFixed(2));
        $('.pawclubnotice.eligible').hide();
        $('.pawclubnotice.ineligible').show();
    }
    
}

function calculateShipcycleTotals() {
    
    var intervals = {};
    var shipinterval = 0;
    
    $('.orderItem').each(function() {
        shipinterval = $(this).data('shipcycle');
        if($(this).data('include') == "yes") {
            if(intervals[shipinterval]) {
                intervals[shipinterval].costperday += parseFloat($(this).data('costperday'));
                intervals[shipinterval].subtotal += parseFloat($(this).data('price') * $(this).data('quantity'));
            } else {
                intervals[shipinterval] = {};
                intervals[shipinterval].costperday = parseFloat($(this).data('costperday'));
                intervals[shipinterval].subtotal = parseFloat($(this).data('price') * $(this).data('quantity'));
            }
        }
    });
    
    $('.trainingItem').each(function() {
        shipinterval = $(this).data('shipcycle');
        if($(this).data('include') == "yes") {
            if(intervals[shipinterval]) {
                intervals[shipinterval].costperday += parseFloat($(this).data('costperday'));
                intervals[shipinterval].subtotal += parseFloat($(this).data('price') * $(this).data('quantity'));
            } else {
                intervals[shipinterval] = {};
                intervals[shipinterval].costperday = parseFloat($(this).data('costperday'));
                intervals[shipinterval].subtotal = parseFloat($(this).data('price') * $(this).data('quantity'));
            }
        }
    });
    
    var shippingIntervals = Object.keys(intervals);
    var shipCycle;
    
    // hide all by default
    $('.prtShipcycle').hide();
    
    if(shippingIntervals.length > 1) {
        
        $(".prtSinglecycle").html('&nbsp;');
        
        for (var i=0;i<shippingIntervals.length;i++) {
            shipCycle = intervals[shippingIntervals[i]];
            if (shippingIntervals[i] != "once") {
                $(".prtShipcycle[data-shipinterval='"+shippingIntervals[i]+"'] .prtCostperday").html('$' + shipCycle.costperday.toFixed(2));
            }
            $(".prtShipcycle[data-shipinterval='"+shippingIntervals[i]+"'] .prtSubtotal").html('$' + shipCycle.subtotal.toFixed(2));
            $(".prtShipcycle[data-shipinterval='"+shippingIntervals[i]+"']").show();
        }
        
    } else {
        
        // only 1 shipping cycle
        $(".prtSinglecycle").html(shippingIntervals[0]+' Days');
        
    }
}

function generateOrderXML() {
    
    var senddata = {};
    senddata.product = new Array;
    senddata.training = new Array;
    
    // get order details
    $('.orderItem').each(function() {
        var productRecord = {}
        productRecord.productNumber = $(this).data('productNumber');
        productRecord.quantity = $(this).data('quantity');
        productRecord.recurring = $(this).data('recurring');
        productRecord.shipCycle = $(this).data('shipcycle');
        productRecord.questions = {question: 'Label ID', answer: $(this).data('labelId') };
        productRecord.petProfileIds = $(this).data('petids');
        if($(this).data('include') == "yes") { senddata.product.push(productRecord); }
    });
    
    // add training items
    $('.trainingItem').each(function() {
        var productRecord = {}
        productRecord.productNumber = $(this).data('productNumber');
        productRecord.quantity = $(this).data('quantity');
        productRecord.shipCycle = $(this).data('shipcycle');
        if (productRecord.shipCycle != "once") {
            productRecord.recurring = true;
        } else {
            productRecord.recurring = false;
        }
        if($(this).data('include') == "yes") { senddata.product.push(productRecord); }
    });
    
    
    var partyId = $('#partyIdSelector').val();
    senddata.partyId = partyId;
    
    showLoadingMessage('Loading');
    
    $.ajax({
        url: httpUrl+'petprofile/GetOrderXML',
        dataType: 'json',
        data: senddata,
        success: function(data,textStatus,jqXHR) {
            if(data.result=='success') {
                
                $('#OrderXML').val(data.response);
                
            } else {
                
                alert('Unable to get OrderXML (' + data.response + ')');
                
            }
        },
        error: function(jqXHR,textStatus,error) {
            alert('Server communication error, please try again later.');
        },
        complete: function() {
            $('#loadingmessage').remove();
        }
    });
    
}

function updatePetGroupBoxes() {
    
    var groupId;
    var petList;
    var nameSuggestion;
    var nameSuggestions;
    var nameSuggestionEats = new Array('Batch', 'Bites', 'Bits', 'Brunch', 'Buffet', 'Chow', 'Crunch', 'Cuisine', 'Delight', 'Din Din', 'Eats', 'Feast', 'Food', 'Gourmet Grub', 'Grub', 'Lunch', 'Morsels', 'Munchies', 'Nibbles', 'Nosh', 'Pieces', 'Rations', 'Supper', 'Tasty Bites', 'Yappetizer', 'Yummies', 'Zupper');
    var petNames;
    var eat;
    var suggestionContainer;
    var lastPet;
    
    $('.petgroup').each(function() {
        
        // make sure 3 are in the onlabel, and the rest are moved to offlabel
        $(this).find('.grouplist').each(function() {
            $this = $(this);
            if ($this.hasClass('onlabel')) {
                $this.children('li').each(function(index,element) {
                    if (index >= 3) {
                        $this.siblings('.grouplist.offlabel').append(element);
                    }
                });
            } else {
                //see if onlabel has room
                if ($this.siblings('.grouplist.onlabel').children().length < 3) {
                    $this.siblings('.petgroup .grouplist.onlabel').append($this.children('li').first());
                }
            }
        });
        
        groupId = $(this).data('groupid');
        petList = $(this).find('.grouplist li');
        suggestionContainer = $(this).find('.labelSuggestions');
        
        // if more than 3 pets, hide the spacer and show the decision info
        if (petList.length > 3) {
            $(this).find('.spacer').hide();
            $(this).find('.decisionContainer').show();
        }
        
        // if less than 4 pets, add extra spacing above food label
        if (petList.length < 4) {
            $(this).find('.spacer').show();
            $(this).find('.decisionContainer').hide();
        }
        
        // if 0 pets, show the instructions
        if (petList.length == 0) {
            $(this).find('.instructionContainer').show();
            $(this).find('.approveLabelContainer').hide();
            suggestionContainer.hide();
        } else {
            $(this).find('.instructionContainer').hide();
            $(this).find('.approveLabelContainer').show();
            suggestionContainer.show();
        }
        
        // generate food name suggestions
        suggestionContainer.empty();
        nameSuggestions = '';
        petNames = '';
        lastPet = '';
        
        // append first 3 pet names together
        petList.each(function(p) {
            if (p < 3) {
                petNames += $(petList[p]).data('petname') + ", ";
                lastPet = $(petList[p]).data('petname');
            }
        });
        if (petList.length == 1) {
            petNames = petNames.substring(0,(petNames.length-2));
        } else {
            // remove last name, add &, and readd last name
            petNames = petNames.substring(0,petNames.length - lastPet.length - 4) + " & " + lastPet;
        }
        
        // append food names
        for(e=0; e<nameSuggestionEats.length; e++) {
            nameSuggestion = petNames + "'s " + nameSuggestionEats[e];
            if (nameSuggestion.length > 27) {
                nameSuggestion = 'My dog\'s ' + nameSuggestionEats[e];
            }
            nameSuggestions = nameSuggestions + '<div class="suggestionItem">' + nameSuggestion + "</div>";
        };
        
        // add to dom
        suggestionContainer.html(nameSuggestions);
        
        // make them work
        suggestionContainer.children('.suggestionItem').on('click',function() {
            var thisGroupId = $(this).parent().parent().parent().parent().data('groupid');
            var value = $(this).text();
            if (value.length > 27) {
                alert('Food name is too long, and has been trimmed to fit. Please double check it!');
                value = value.substring(0,27);
            }
            $(this).parent().parent().parent().find('.foodLabelInput').val(value);
            $(this).parent().parent().parent().find('.approveLabelContainer').children('input[name="labelApproval"]').prop('checked',false);
        });
        
        
    });
    
}

function createFoodNames() {
    
    updatePetGroupBoxes(); // this is new method to support more than 3 pets
    
    /*var labelPart2 = new Array('Batch', 'Bites', 'Bits', 'Brunch', 'Buffet', 'Chow', 'Crunch', 'Cuisine', 'Delight', 'Din Din', 'Eats', 'Feast', 'Food', 'Gourmet Grub', 'Grub', 'Lunch', 'Morsels', 'Munchies', 'Nibbles', 'Nosh', 'Pieces', 'Rations', 'Supper', 'Tasty Bites', 'Yappetizer', 'Yummies', 'Zupper');
    
    $('.petgroup').each(function() {
        
        // clear out the placeholder message
        $(this).children('ul').children('.tempHolder').remove();
        
        var petgroup = $(this);
        var petList = $(this).children('ul').children('li');
        var suggestionsTitle = $(this).children('.labelSuggestionsTitle');
        var suggestionContainer = $(this).children('.labelSuggestions');
        var suggestions = '';
        var petNames = new Array();
        var foodNames = new Array();
        var labelPart1 = '';
        
        if(petList.length != 0) {
            petList.each(function(i) {
                petNames.push($(this).data('petname'));
            });
        }
        
        if(petNames.length != 0) {
            
            if (petNames.length <= 1) {
                labelPart1 = petNames.join();
            } else {
                labelPart1 = petNames.slice(0, -1).join(", ") + " & " + petNames[petNames.length-1];
            }
            
        }
        
        if(labelPart2.length != 0 && labelPart1 != '') {
            
            for(var i=0; i<labelPart2.length; i++) {
                var part2 = labelPart2[i];
                var labelName = labelPart1 + "'s " + part2;
                foodNames.push(labelName);
            }
            
        }
        
        suggestionContainer.empty();
        
        if(foodNames.length != 0) {
            
            suggestionsTitle.show();
            
            for(var i=0; i<foodNames.length; i++) {
                var foodLabel = foodNames[i];
                suggestions += '<div class="suggestionItem">'+foodLabel+'</div>';
            }
            suggestionContainer.html(suggestions);
            
        } else {
            
            $(this).children('ul').html('<li class="tempHolder">Drag a pet\'s photo here if you prefer that they have their own bag of food.');
            suggestionsTitle.hide();
            
        }
        
    });
    */
}