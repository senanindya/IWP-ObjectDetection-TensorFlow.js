(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 300;
		function hidePreloader() {
			var preloader = $('.loader-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 300);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
			
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },

            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
 
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
 
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });
    

    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });
    

    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
		var name = $("#name").val();
		var email = $("#email").val();
        var message = $("#message").val();

        $.ajax({
            url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScsiBZM1jUjyrAR5V3uGQEhumY-ooNNbbnmp7D2j0aI6IsRoA/formResponse",
            data: {"entry.1932104752" : name, "entry.786582247" : email, "entry.1681094842" : message}, 
			type: "POST",
    		dataType: "xml",
			statusCode: {
        		0: function() {
            		formSuccess();
        		},
				200: function() {
            		formSuccess();
        		},
        		403: function() {
            		formError();
                    submitMSG(false, text);
				}
    		}
        });
	}

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); 
        $("textarea").removeClass('notEmpty');
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }



    /* Back To Top Button */
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);