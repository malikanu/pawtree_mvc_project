// Pet Photo Upload

// Everywhere a pets photo appears, it should be contained in a
// div with class "pet-thumb", and a data-pet-id attribute of the pets id.
// to enable photo-upload, add a data-image-upload attribute
// <div class="pet-thumb" data-pet-id="123" data-image-upload="true">whatev</div>

var petPhotoUpload = {
    
    init: function(settings) {
        
        // add links
        $('.pet-thumb:not(.petphotoupload-enabled)').each(function() {
            
            var petThumb = $(this);
            var addOns = '<div class="pet-thumb-change" style="display: none;" data-pet-id="'+petThumb.data('pet-id')+'"><img src="/bento/img/newphoto.png"/></div>';
            
            petThumb.append(addOns);
            
        });
        
        // add image upload popup if it doesnt exist
        var uploadPopup = $('#pet-thumb-upload');
        if (uploadPopup.length == 0) {
            // create it
            var thumbUploadHTML = '\
                <div id="pet-thumb-upload" class="modal fade" role="dialog" >\
                    <div class="modal-dialog" role="document"><div class="modal-content">\
                        <div class="modal-body">\
                            <div id="progress"><p>Uploading, please wait...</p><br/><img src="/bento/img/ajax-loader.gif"/></div>\
                            <div class="step1">\
                                <form method="post" target="upload_target" action="/petprofile/petThumbUpload" enctype="multipart/form-data">\
                                    <input type="hidden" name="upload" value="1"/>\
                                    <h3>Upload your pet\'s photo</h3>\
                                    <input type="file" name="fileupload" id="fileupload"/>\
                                    <!-- <input type="submit" value="Continue"/> -->\
                                    <div class="bottom">\
                                        <hr/>\
                                        <div class="button cancel btn btnbrown">Cancel</div>\
                                        <div class="button save btn btngreen">Continue</div>\
                                    </div>\
                                </form>\
                            </div>\
                            <div class="step2">\
                                <form method="post" target="upload_target" action="/petprofile/petThumbUpload" accept-charset="UTF-8">\
                                    <input type="hidden" name="crop" value="1"/>\
                                    <input type="hidden" name="image" value=""/>\
                                    <input type="hidden" name="imageData" value=""/>\
                                    <input type="hidden" name="pet_id" value=""/>\
                                    <div class="uploadedPhoto"><img src=""/></div>\
                                    <div class="bottom">\
                                        <hr/>\
                                        <div class="button cancel btn btnbrown">Cancel</div>\
                                        <div class="button save btn btngreen">Save</div>\
                                        <div class="button rotate btn">Rotate</div>\
                                    </div>\
                                </form>\
                            </div>\
                            <div class="error">\
                                <p class="errormsg"></p>\
                                <div class="bottom">\
                                    <hr/>\
                                    <div class="button startover btn btnbrown">Reset</div>\
                                </div>\
                            </div>\
                            <iframe id="upload_target" name="upload_target" src="about:blank" style="width:0;height:0;border:0px solid #fff;"></iframe>\
                        </div>\
                    </div></div>\
                </div>\
            ';
            $('#container').append(thumbUploadHTML);
            
            // attach events to it
            $("#pet-thumb-upload .step1 .save").on("click",function() { $('#pet-thumb-upload .step1 form').submit(); });
            $("#pet-thumb-upload .step1 form").on("submit",function() {
                $('#pet-thumb-upload #progress').show();
                $('#pet-thumb-upload .step1 form').hide();
            });
            $("#pet-thumb-upload .cancel").on("click",{closeWindow: true},petPhotoUpload.resetPopup);
            $("#pet-thumb-upload .startover").on("click",petPhotoUpload.resetPopup);
        }
        
        $('#pet-thumb-upload .error').hide();
        $('#pet-thumb-upload form').trigger('reset');
        $('#pet-thumb-upload .step1').show();
        $('#pet-thumb-upload .step1 form').show();
        $('#pet-thumb-upload .step2').hide();
        $('#pet-thumb-upload .step2 .uploadedPhoto img').attr('src','');
        $('#pet-thumb-upload #progress').hide();
        
        // edit button on hover
        $('.pet-thumb[data-image-upload][data-pet-id]:not(.petphotoupload-enabled)').hover(function() {
            $(this).children('.pet-thumb-change').stop().fadeIn('fast');
        }, function() {
            $(this).children('.pet-thumb-change').stop().fadeOut();
        });
        
        // image upload popup on click
        $(".pet-thumb:not(.petphotoupload-enabled)").on("click",".pet-thumb-change",petPhotoUpload.showUpload);
        
        
        // mark these elements as enabled
        $(".pet-thumb:not(.petphotoupload-enabled)").addClass('petphotoupload-enabled');
        
        
    },
    
    showUpload: function(passedData) {
        
        // set data
        $('#pet-thumb-upload .step2 input[name="pet_id"]').val($(this).data('pet-id'));
        
        //$('#pet-thumb-upload').dialog({
        //    dialogClass: "pet-thumb-dialog",
        //    modal: true,
        //    width: 'auto',
        //    height: "auto",
        //    close: petPhotoUpload.resetPopup,
        //    resizable: false,
        //    create: function(){
        //        $(this).css('maxWidth', Math.min($(window).width(),600));
        //        $(this).css('minWidth', Math.min($(window).width(),600));
        //    }
        //});
        
        $('#pet-thumb-upload').modal({
            open:true
        });
        
        $('#pet-thumb-upload').on('hidden.bs.modal',function(e) {
            petPhotoUpload.resetPopup();
        });
        
        return false;
        
    },
    
    petPhotoUploaded: function(uploadedPhoto) {
        
        $('#pet-thumb-upload #progress').hide();
        
        // set data
        $('#pet-thumb-upload .step2 input[name="image"]').val(uploadedPhoto);
        
        // set image
        $('#pet-thumb-upload .step2 .uploadedPhoto img').attr('src',httpUrl+uploadedPhoto);
        
        var cropImage = $('#pet-thumb-upload .step2 .uploadedPhoto > img');
        cropImage.cropper({
            aspectRatio: 1,
            zoomable: false,
            dragCrop: false
        });
        
        $('#pet-thumb-upload .step2 .rotate').off('click').on('click',function() {
            cropImage.cropper('rotate',90);
        });
        
        $('#pet-thumb-upload .step1').hide();
        $('#pet-thumb-upload .step2').show();
        
        // make save button work
        $('#pet-thumb-upload .step2 .save').off('click').on('click',function() {
            var cropData = cropImage.cropper('getData',true);
            // set data
            $('#pet-thumb-upload .step2 input[name="imageData"]').val(JSON.stringify(cropData));
            $('#pet-thumb-upload .step2 form').submit();
            cropImage.cropper('destroy');
            $('#pet-thumb-upload .step2').hide();
            $('#pet-thumb-upload #progress').show();
        });
        
    },
    
    cropCompleted: function(origImage,newImage,pet_id) {
        
        // update pet-thumbs on page with new one
        $('.pet-thumb[data-pet-id="'+pet_id+'"] > img').attr('src',httpUrl+newImage);
        
        // update new pet profile form
        $('input[name="pp_image"]').val(origImage);
        $('input[name="pp_avatar"]').val(newImage);
        
        // reset form
        petPhotoUpload.resetPopup();
        
    },
    
    resetPopup: function(event) {
        
        $('#pet-thumb-upload .error').hide();
        $('#pet-thumb-upload form').trigger('reset');
        $('#pet-thumb-upload .step1').show();
        $('#pet-thumb-upload .step1 form').show();
        $('#pet-thumb-upload .step2').hide();
        $('#pet-thumb-upload .step2 .uploadedPhoto img').attr('src','');
        $('#pet-thumb-upload #progress').hide();
        $('#pet-thumb-upload').modal('hide');
        
    },
    
    error: function(errorMsg) {
        
        $('#pet-thumb-upload .step1').hide();
        $('#pet-thumb-upload .step2').hide();
        $('#pet-thumb-upload #progress').hide();
        $('#pet-thumb-upload .error .errormsg').html(errorMsg);
        $('#pet-thumb-upload .error').show();
        
    }
    
};

$(document).ready(petPhotoUpload.init);