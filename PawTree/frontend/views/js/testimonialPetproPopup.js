var TestimonialPetproPopup = {
    
    init: function(settings) {
        
        var testimonialPetproPopup = $('#write-petpro-testimonial');
        if (testimonialPetproPopup.length == 0) {
            
            var popupHTML = '\
            <div id="write-petpro-testimonial" class="modal fade" role="dialog">\
            <div class="modal-dialog" role="document"><div class="modal-content">\
                <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&#215;</span></button>\
                </div>\
                <div class="modal-body">\
                <div class="response"></div>\
                <div class="progress"><p>Submitting, please wait...</p><br/><img src="/bento/img/ajax-loader.gif"/></div>\
                \
                <div class="step1">\
                    <h3>Submit a Testimonial</h3>\
                    <form method="post" action="/testimonial/submitpetpro" target="testimonial_target" enctype="multipart/form-data">\
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_name">Your First Name</label>\
                            <input type="text" class="form-control" name="name" id="testimonial_name" placeholder="" required="required">\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_lname">Your Last Name</label>\
                            <input type="text" class="form-control" name="lname" id="testimonial_lname" placeholder="">\
                        </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_email">Your Email</label>\
                            <input type="text" class="form-control" name="email" id="testimonial_email" placeholder="" required="required">\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_startdate">Start Date</label>\
                            <input type="text" class="form-control" name="startdate" id="testimonial_startdate" placeholder="Month and Year" required="required">\
                        </div>\
                        </div>\
                    </div>\
                    <!-- \
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_products">Product Name(s)</label>\
                            <select class="form-control select2-multi" name="products[]" id="testimonial_products" multiple>\
                            <option value="bedsblankets">Bed &amp; Blankets</option>\
                            <option value="bladdersupport">Bladder Support Plus</option>\
                            <option value="catfood">Cat Food</option>\
                            <option value="collars">Collars</option>\
                            <option value="dentalsticks">Dental Sticks</option>\
                            <option value="dogfood">Dog Food</option>\
                            <option value="earwash">Ear Wash &amp; Dry</option>\
                            <option value="fleaspray">Flea &amp; Tick Spray</option>\
                            <option value="gastroproplus">Gastro Pro Plus</option>\
                            <option value="hairballsupport">Hairball Support Plus</option>\
                            <option value="jointsupport">Joint Support Plus</option>\
                            <option value="pawbox">MY pawBox&trade;</option>\
                            <option value="oxyshot">Oxy Shot</option>\
                            <option value="superfood">pawPairings Superfood Seasoning</option>\
                            <option value="treats">pawTreats</option>\
                            <option value="poopbags">Poop Bags</option>\
                            <option value="dogpads">Quilted Dog Pads</option>\
                            <option value="salmonoil">Salmon Oil</option>\
                            <option value="skinsupport">Skin Support Plus</option>\
                            <option value="urineeliminator">Urine Eliminator</option>\
                            </select>\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_issues">Related Issue(s)</label>\
                            <select class="form-control select2-multi" name="issues[]" id="testimonial_issues" multiple>\
                            <option value="badbreath">Bad Breath</option>\
                            <option value="gas">Bad Gas</option>\
                            <option value="bladderhealth">Bladder Health</option>\
                            <option value="immunesystem">Boost Immune System</option>\
                            <option value="eatspoop">Companion Dog Eats Cat Poop</option>\
                            <option value="digestiveissues">Digestive Issues</option>\
                            <option value="dryskin">Dry Skin</option>\
                            <option value="dullcoat">Dull Coat</option>\
                            <option value="shedding">Excessive Shedding</option>\
                            <option value="hairballs">Hairballs</option>\
                            <option value="hotspots">Hot Spots</option>\
                            <option value="itchfleas">Itch From Fleas</option>\
                            <option value="itching">Itching (other)</option>\
                            <option value="itchyears">Itchy or Smelly Ears</option>\
                            <option value="loosestool">Loose Stool</option>\
                            <option value="lowenergy">Low Energy</option>\
                            <option value="oralhealth">Oral Health</option>\
                            <option value="redskin">Red &amp; Irritable Skin</option>\
                            <option value="allergies">Seasonal Allergies</option>\
                            <option value="sensitivestomach">Sensitive Stomach</option>\
                            <option value="stiffjoints">Stiff or Sore Joints</option>\
                            <option value="tartar">Tartar Build-up</option>\
                            <option value="urinarytract">Urinary Tract Health</option>\
                            </select>\
                        </div>\
                        </div>\
                    </div>\
                    --> \
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_hoursperweek">Hours Per Week</label>\
                            <input type="text" class="form-control" name="hoursperweek" id="testimonial_hoursperweek" placeholder="" required="required">\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                            <div class="form-group">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_city">City</label>\
                            <input type="text" class="form-control" name="city" id="testimonial_city" placeholder="" required="required">\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_state">State</label>\
                            <select class="form-control select2" name="state" id="testimonial_state">\
                            <option value="" disabled selected>SELECT</option>\
                            <option value="AL">Alabama</option>\
                            <option value="AK">Alaska</option>\
                            <option value="AZ">Arizona</option>\
                            <option value="AR">Arkansas</option>\
                            <option value="CA">California</option>\
                            <option value="CO">Colorado</option>\
                            <option value="CT">Connecticut</option>\
                            <option value="DE">Delaware</option>\
                            <option value="DC">District Of Columbia</option>\
                            <option value="FL">Florida</option>\
                            <option value="GA">Georgia</option>\
                            <option value="HI">Hawaii</option>\
                            <option value="ID">Idaho</option>\
                            <option value="IL">Illinois</option>\
                            <option value="IN">Indiana</option>\
                            <option value="IA">Iowa</option>\
                            <option value="KS">Kansas</option>\
                            <option value="KY">Kentucky</option>\
                            <option value="LA">Louisiana</option>\
                            <option value="ME">Maine</option>\
                            <option value="MD">Maryland</option>\
                            <option value="MA">Massachusetts</option>\
                            <option value="MI">Michigan</option>\
                            <option value="MN">Minnesota</option>\
                            <option value="MS">Mississippi</option>\
                            <option value="MO">Missouri</option>\
                            <option value="MT">Montana</option>\
                            <option value="NE">Nebraska</option>\
                            <option value="NV">Nevada</option>\
                            <option value="NH">New Hampshire</option>\
                            <option value="NJ">New Jersey</option>\
                            <option value="NM">New Mexico</option>\
                            <option value="NY">New York</option>\
                            <option value="NC">North Carolina</option>\
                            <option value="ND">North Dakota</option>\
                            <option value="OH">Ohio</option>\
                            <option value="OK">Oklahoma</option>\
                            <option value="OR">Oregon</option>\
                            <option value="PA">Pennsylvania</option>\
                            <option value="RI">Rhode Island</option>\
                            <option value="SC">South Carolina</option>\
                            <option value="SD">South Dakota</option>\
                            <option value="TN">Tennessee</option>\
                            <option value="TX">Texas</option>\
                            <option value="UT">Utah</option>\
                            <option value="VT">Vermont</option>\
                            <option value="VA">Virginia</option>\
                            <option value="WA">Washington</option>\
                            <option value="WV">West Virginia</option>\
                            <option value="WI">Wisconsin</option>\
                            <option value="WY">Wyoming</option>\
                            </select>\
                        </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_title">PetPro Title</label>\
                            <input type="text" class="form-control" name="title" id="testimonial_title" placeholder="" required="required">\
                        </div>\
                        </div>\
                        <div class="col-sm-6">\
                        <div class="form-group">\
                            <label for="testimonial_photo">Upload Photo or Video <small>(up to 90 seconds)</small></label>\
                            <input type="file" name="media" id="testimonial_photo" class="form-control" required="required"/>\
                        </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-sm-12">\
                        <div class="form-group">\
                            <label for="testimonial_testimonial">Write Your Testimonial</label>\
                            <textarea class="form-control" name="testimonial" id="testimonial_testimonial" placeholder="" required="required"></textarea>\
                        </div>\
                        </div>\
                    </div>\
                    <div class="row">\
                        <div class="col-sm-12">\
                        <div class="text-center"><div class="btn btnblue save">Submit</div></div>\
                        </div>\
                    </div>\
                    </form>\
                </div>\
                <iframe id="testimonial_target" name="testimonial_target" src="about:blank" style="width:0;height:0;border:0;"></iframe>\
                </div>\
            </div>\
            </div>\
            ';
            
            $('#container').append(popupHTML);
            
        }
        
        // show popup
        $('.add-petpro-testimonial').on('click',TestimonialPetproPopup.showPopup);
        
        // make form submit
        $("#write-petpro-testimonial .step1 .save").on("click",function() {
            $('#write-petpro-testimonial .step1 form').submit();
            $('#write-petpro-testimonial .step1').hide();
            $('#write-petpro-testimonial .progress').show();
            $('#write-petpro-testimonial .response').hide(); // previous response
        });
        
        // clear validation
        $('#write-petpro-testimonial #testimonial_name').on('change keydown',function() {
            $(this).removeClass('error');
        });
        $('#write-petpro-testimonial #testimonial_testimonial').on('change keydown',function() {
            $(this).removeClass('error');
        });
        
    },
    
    reset: function() {
        
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').hide();
        $('#write-petpro-testimonial .step1 form').trigger('reset');
        $('#write-petpro-testimonial .response').html('');
        $('#write-petpro-testimonial .step1').show();
        
        $('#write-petpro-testimonial #testimonial_testimonial').removeClass('error');
        $('#write-petpro-testimonial #testimonial_name').removeClass('error');
        
    },
    
    showPopup: function() {
        
        TestimonialPetproPopup.reset();
        
        //$('#write-testimonial').dialog({
        //    dialogClass: "write-testimonial",
        //    modal: true,
        //    width: 'auto',
        //    height: 'auto',
        //    resizable: false,
        //    title: 'Submit a Testimonial',
        //    create: function(){
        //	$(this).css('maxWidth', Math.min($(window).width(),600)); // for responsive
        //	$(this).css('minWidth', Math.min($(window).width(),600)); // for responsive
        //    }
        //});
        
        $('#write-petpro-testimonial').modal({
                open:true
            });
        
        setTimeout(function() {
            $('#write-petpro-testimonial .select2:not(.init)').select2({
                placeholder: "SELECT"
            });
            $('#write-petpro-testimonial .select2-multi:not(.init)').select2({
                placeholder: "SELECT ALL THAT APPLY"
            });
            $('#write-petpro-testimonial .select2').addClass('init');
            $('#write-petpro-testimonial .select2-multi').addClass('init');
        },1000)
        
    },
    
    // called when testimonial is successfully submitted
    testimonialSaved: function() {
        
        $('#write-petpro-testimonial .response').html('Thank you! Your testimonial will appear once approved.');
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').show();
        
    },
    
    // called after testimonial with video is uploded
    videoUploaded: function() {
        
        $('#write-petpro-testimonial .response').html('Thank you! Your testimonial has been saved, please wait while we process the video...<hr/><div id="#videoUploaded">...</div>');
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').show();
        
    },
    
    // called when validation error on form
    validationError: function() {
        
        $('#write-petpro-testimonial .step1').show();
        $('#write-petpro-testimonial .response').html('<ul class="errorMsgs"><li>Please complete the required fields.</li></ul>');
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').show();
        
        if ($('#write-petpro-testimonial #testimonial_name').val() == '') {
            $('#write-petpro-testimonial #testimonial_name').addClass('error');
        }
        
        if ($('#write-petpro-testimonial #testimonial_title').val() == '') {
            $('#write-petpro-testimonial #testimonial_title').addClass('error');
        }
        
        if ($('#write-petpro-testimonial #testimonial_testimonial').val() == '') {
            $('#write-petpro-testimonial #testimonial_testimonial').addClass('error');
        }
        
        if ($('#write-petpro-testimonial #testimonial_photo').val() == '') {
            $('#write-petpro-testimonial #testimonial_photo').addClass('error');
        }
        
    },
    
    // called when server error (unable to save to database)
    serverError: function() {
        
        $('#write-petpro-testimonial .step1').show();
        $('#write-petpro-testimonial .response').html('<ul class="errorMsgs"><li>Internal server error, unable to save data. Please try again.</li></ul>');
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').show();
        
    },
    
    // called when unable to upload photo
    // called when validation error on form
    photoError: function() {
        
        $('#write-petpro-testimonial .step1').show();
        $('#write-petpro-testimonial .response').html('<ul class="errorMsgs"><li>Internal server error, unable to save photo. Please try again.</li></ul>');
        $('#write-petpro-testimonial .progress').hide();
        $('#write-petpro-testimonial .response').show();
        
    }
    
}

$(document).ready(function() {
    TestimonialPetproPopup.init();
});