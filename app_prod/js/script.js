$(document).ready(function(){



/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/
/*--js-placeholder--*/
$('input,textarea').on('focus', function(){
	$(this).siblings('.i-placeholder').slideUp();
});
$('input,textarea').on('focusout', function(){
	if($(this).val().replace(/ /g, "") == "")
	{
		$(this).siblings('.i-placeholder').slideDown();
	}
	
});

/*---Verify if exist value---*/
$('input').each(function(){
	if($(this).is('[value]')){
		var value = $(this).val();
		if(value.length>0){
			$(this).siblings('span.i-placeholder').hide();
		}
	}
});

$('textarea').each(function(){
	if($(this).text().length>0){
		$(this).siblings('span.i-placeholder').hide();
	}
});


/*-------Ui slide--------*/
$(function(){
	$('#slider').slider({
		value: 80,
		orientation: "horizontal",
		range: "min",
		animate: true

	});

});


/*-------HeaderMenu--------*/
$('.menuBtn').on('click', function(){
	$(this).toggleClass('open').siblings('.menu-list').toggleClass('open');
});



/*
|--------------------------------------------------------------------------
| select
|--------------------------------------------------------------------------
|
*/
var numSlt = 0;
$('body').find('select.i-slt').each(function(){
	numSlt++
	var idSlt = 'slt_'+numSlt;
	var select = $(this);

	select.addClass(idSlt);


	/*------*/
	var list = select.html();
	var Newlist = "";
	select.find('option').each(function(){
		if($(this).is('[value]')){
			var value = "value='"+$(this).attr("value")+"'";
		}else{
			var value = "";
		}

		if($(this).is('[selected]')){
			var selected = "selected='"+$(this).attr("selected")+"'";
		}else{
			var selected ="";
		}

		var dataSelect = 'data-select="'+idSlt+'"';
		
		Newlist +="<li "+value+" "+selected+" "+dataSelect+">"+$(this).html()+"</li>";
	});




	/*---Composition slt select---*/
	select.after('<span class="'+idSlt+'_view slt_view" id="'+idSlt+'"><span class="'+idSlt+'_display slt_display"></span><ul class="'+idSlt+'_list slt_list">'+Newlist+'</ul></span>');
	var display = select.find('span.'+idSlt+'_display');
	select.hide();
});

/*---Control if selected---*/
$('select.i-slt').find('option').each(function(){
	if($(this).is('[selected]')){
		var content = $(this).text();
		$(this).closest('select').siblings('.slt_view').find('.slt_display').text(content);
		$(this).closest('select').siblings('span.i-placeholder').hide();
	}
	
});



/*===---Click---===*/
$('body').on('click', 'span.slt_display', function(){
	$(this).addClass('open').siblings('ul').addClass('open');
});
$('body').on('click', 'ul[class*="slt_"] li', function(){
	var  elem = $(this);
	var elemParent = elem.attr('data-select');
	var display = elem.closest('ul').siblings('span.'+elemParent+'_display');
	var elemContenut = elem.text();
	var elemValue = elem.attr('value');
	display.text(elemContenut);
	var select = $('body').find('select.'+elemParent);
	select.find('option[value="'+elemValue+'"]').attr('selected', 'selected').siblings().removeAttr('selected');
	elem.closest('ul').removeClass('open').siblings('span.slt_display').removeClass('open');

	$('.'+elemParent).siblings('span.i-placeholder').hide();
});


$('body').on('click', function(e){
	var el= e.target;
	var idElem = el.id;
	if(!el.closest('[id*="slt_"]')){
		$(this).find('span.slt_display, ul.slt_list').removeClass('open');
	}
});







/*
|--------------------------------------------------------------------------
| select
|--------------------------------------------------------------------------
|
*/

function spwAnimate(Nivo_scroll)
{
	var Ht_Ecran = $(window).height();

		//Top
		$('[class*="a__top"]').each(function(){
			var Elem = $(this);
			var Ht_Elem = Elem.height();
			var Nivo_Elem = Elem.offset().top;
			var PcgeApparution_Elem =  ((100*parseInt(Ht_Ecran)) - (100*parseInt(Nivo_Elem)) + (100*parseInt(Nivo_scroll))) / parseInt(Ht_Elem);
			if(PcgeApparution_Elem >= 75){
				Elem.addClass('js-on');
			}
		});


		//Bottom
		$('[class*="a__bottom"]').each(function(){
			var Elem = $(this);
			var Ht_Elem = Elem.height();
			var Nivo_Elem = Elem.offset().top;
			var PcgeApparution_Elem =  ((100*parseInt(Ht_Ecran)) - (100*parseInt(Nivo_Elem)) + (100*parseInt(Nivo_scroll))) / parseInt(Ht_Elem);
			if(PcgeApparution_Elem >= 45){
				Elem.addClass('js-on');
			}
		});

		//Left
		$('[class*="a__left"]').each(function(){
			var Elem = $(this);
			var Ht_Elem = Elem.height();
			var Nivo_Elem = Elem.offset().top;
			var PcgeApparution_Elem =  ((100*parseInt(Ht_Ecran)) - (100*parseInt(Nivo_Elem)) + (100*parseInt(Nivo_scroll))) / parseInt(Ht_Elem);
			if(PcgeApparution_Elem >= 45){
				Elem.addClass('js-on');
			}
		});

		//Left
		$('[class*="a__right"]').each(function(){
			var Elem = $(this);
			var Ht_Elem = Elem.height();
			var Nivo_Elem = Elem.offset().top;
			var PcgeApparution_Elem =  ((100*parseInt(Ht_Ecran)) - (100*parseInt(Nivo_Elem)) + (100*parseInt(Nivo_scroll))) / parseInt(Ht_Elem);
			if(PcgeApparution_Elem >= 45){
				Elem.addClass('js-on');
			}
		});


		//Scale
		$('[class*="a__scale"]').each(function(){
			var Elem = $(this);
			var Ht_Elem = Elem.height();
			var Nivo_Elem = Elem.offset().top;
			var PcgeApparution_Elem =  ((100*parseInt(Ht_Ecran)) - (100*parseInt(Nivo_Elem)) + (100*parseInt(Nivo_scroll))) / parseInt(Ht_Elem);
			if(PcgeApparution_Elem >= 45){
				Elem.addClass('js-on');
			}
		})


	}//€nd spwAnimate




	spwAnimate(5);





	//si on scroll
	$(window).scroll(function(){
		var Nivo_scroll = $(window).scrollTop();
		spwAnimate(Nivo_scroll);
	});



});//End document