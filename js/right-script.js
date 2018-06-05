$(function() {
	/* Mobile Menu Functionality */
	$('.nav-icon').on('click', function(e) {
		e.preventDefault();
		$('.side-nav-container').addClass('open');
		console.log('s')
	});

	$(document).mouseup(function (e) {
		var container = $('nav.open');
		if (!container.is(e.target)	&& container.has(e.target).length === 0) {
			$('.side-nav-container').removeClass('open');
		}
	});
	
	var tstLength = $("#testimonial-pager").children("div").length, tstWidth = $("#testimonial-pager").children("div").width(), elmw;
	elmw = tstLength * tstWidth;
	$("#testimonial-pager").children("div").css({"width":elmw});
	
	var testimonialMinslides = 6;
	var testimonialMaxslides = 6;
	var teamMinslides = 2;
	var teamMaxslides = 3;
	
	if($(window).width() < 1601 && $(window).width() > 1099){
		testimonialMinslides = 5;
		testimonialMaxslides = 5;
	} else if($(window).width() < 1100 && $(window).width() > 799){
		testimonialMinslides = 4;
		testimonialMaxslides = 4;
	} else if($(window).width() < 800){
		testimonialMinslides = 3;
		testimonialMaxslides = 3;
	}
	
	var teamThumbWidth = 333;
	
	if($(window).width() < 1499 && $(window).width() > 749){
		teamMinslides = 2;
		teamMaxslides = 2;
	} else if($(window).width() < 750) {
		teamMinslides = 1;
		teamMaxslides = 1;
		
		if($(window).width() > 449){
			teamThumbWidth = 180;
		}
	}

	//console.log(typeof $('div.testimonial-slider').html());
	if ($('div.testimonial-slider').html() != undefined) {

		var realSlider = $('div.testimonial-slider').bxSlider({
			auto:true,
			nextSelector:'.sales-testimonial-arrow-left',
			prevSelector:'.sales-testimonial-arrow-right',
			nextText: '<img src="images2/arrow-right.png">',
			prevText: '<img src="images2/arrow-left.png">',
			pager:false,
			randomStart:false,
			speed: 1000,
			delay: 5000,
			autoHover: true,
			stopAuto: false,
			pagerCustom: '#testimonial-pager',
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				//var url = $slideElement.find('iframe').data('src');
				//$('.testimonial-slider').children().find('iframe').attr('src', '');
				//$slideElement.find('iframe').attr('src', url);
				changeRealThumb(realThumbSlider, newIndex, realSlider, testimonialMinslides, testimonialMaxslides);
			}
		});
		
		var realThumbSlider = $("#testimonial-pager").bxSlider({
			minSlides: testimonialMinslides,
			maxSlides: testimonialMaxslides,
			slideWidth: 316,
			slideMargin: 0,
			moveSlides: 1,
			pager:false,
			speed:1000,
			nextText:'<span></span>',
			prevText:'<span></span>',
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				/*$j("#sliderThumbReal ul .active").removeClass("active");
				$slideElement.addClass("active"); */
		
			}
		});

	}
	
	if ($('div.team-slider').html() != undefined) {
		var teamSlider = $('div.team-slider').bxSlider({
			auto:false,
			pager:false,
			randomStart:false,
			speed: 1000,
			delay:5000,
			autoHover: true,
			stopAuto: false,
			nextSelector:'.btn-sides-wrapper',
			nextText: 'View Next',
			pagerCustom: '#team-slider-pager',
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				///changeRealThumb(teamThumbSlider, newIndex);
				changeRealThumb(teamThumbSlider, newIndex, teamSlider, teamMinslides, teamMaxslides); 
			}
		}).on('click', function(){
			teamSlider.goToNextSlide();
			var i = teamSlider.getCurrentSlide();
			console.log(i);
			changeRealThumb(teamThumbSlider, i, teamSlider, teamMinslides, teamMaxslides); 
		});
		
		//console.log(teamMinslides+" = "+teamMaxslides);
		
		var teamThumbSlider = $("#team-slider-pager").bxSlider({
			minSlides: teamMinslides,
			maxSlides: teamMaxslides,
			slideWidth: teamThumbWidth,
			slideMargin: 0,
			moveSlides: 1,
			pager:false,
			speed:1000,
			nextSelector:'.team-bottom-pager-link',
			nextText:'More <img src="/images/team-right-arrow.png">',
			prevText:'<span></span>',
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				/*$j("#sliderThumbReal ul .active").removeClass("active");
				$slideElement.addClass("active"); */
		
			}
		});
	}

	if($("#team-slider-pager").html() != undefined){
		linkRealSliders(teamSlider, teamThumbSlider, $("#team-slider-pager"), teamMinslides, teamMaxslides);
	} else if($("#testimonial-pager").html() != undefined){
		linkRealSliders(realSlider, realThumbSlider, $("#testimonial-pager"), testimonialMinslides, testimonialMaxslides);
	}
	
	
	function linkRealSliders(bigS, thumbS, testimonial){
		
  		$(testimonial).on("click","a",function(event){
		    event.preventDefault();
		    var newIndex = $(this).parent().data("slideindex");
		    bigS.goToSlide(newIndex);
	    });
	    
	}

	function changeRealThumb(slider, newIndex, testimonial, minslides, maxsLides) {
	  
	  var $thumbS = $(testimonial);
	  $thumbS.find('.active').removeClass("active");
	  $thumbS.find('div[data-slideindex="'+newIndex+'"]').addClass("active");
	  if(slider.getSlideCount()-newIndex>= minslides)slider.goToSlide(newIndex);
	  else slider.goToSlide(slider.getSlideCount()-minslides);
	
	}
	
	//if($("#testimonial-pager li").length < minslides){
     // $("#testimonial-pager .bx-next").hide();
    //}

	$('.hotel-thumbs').on('click', function(){
		var src = $(this).children('img').attr("src");
		$("#hotel-right").css({"background-image":"url("+src+")"});
	});
	
	$('.video').parent().click(function () {
	    //if($(this).children(".video").get(0).paused){
        $(this).children(".video").get(0).play();
        $(this).children(".playpause").hide();
	});
	
	//$('.video').parent().click();
	//
	
	if ($( "#image-popup" ).html() != undefined) {

		var widthop = 940;

		if($(window).width() < 900 && $(window).width() > 600){
			widthop = 540;
		} else if ($(window).width() <= 600){
			widthop = 340;
		}

		$( "#image-popup" ).dialog({
			resizable: false,
			height: "auto",
			width: widthop,
			modal: true,
			autoOpen: false,
			open: function(event, ui){
				$('.ui-widget-overlay').bind('click', function(){
					$( "#image-popup" ).dialog("close");	
				});
			}
		});
	}

	
		$('.past-events-thumbs a').on('click', function(e){
			e.preventDefault();
			//if($(window).width() < 450){
				var src = $(this).children('img').attr("src");
				$( "#image-popup" ).html('<img src="'+src+'"  width="'+(widthop-30)+'"/>')
				$( "#image-popup" ).dialog("open");	
			//}
		});
		
		if($(window).scrollTop() > 860){
			$('.timer-section').show();
		}
		
		$( window ).scroll(function(){
        	if($(this).scrollTop() > $('.sales-header').height()) {
        		$('.timer-section').show();
        	} else {
        		$('.timer-section').hide();
        	}
        	
	    });
	
	
});