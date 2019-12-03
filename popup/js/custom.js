
$(document).ready(function(){

 	$(document).on('click', ".protected_footSetingBtn", function(){
 		$(this).parent().toggleClass("active");
 		$(".country_select_popOpen").removeClass("open_popup");
 		$(".protected_footGlobalIcon").removeClass("active");
 		$(".lenguage_select_popOpen").removeClass("open_popup");
 		cntryStatus = 1 ;
 		lengStatus = 1 ;
 	});

var cntryStatus = 1 ;

    $(document).on("click",".country-select",function(e){
		$(".lenguage_select_popOpen").removeClass("open_popup");
		$(".protected_footSetingBtn").parent().removeClass("active");

		$(".country_select_popOpen").toggleClass("open_popup");
		$(this).parent().toggleClass("active");

		/*if(cntryStatus == 1){
			$(".country_select_popOpen").addClass("open_popup");
			$(this).parent().addClass("active");
			cntryStatus  = 0 ;
		}else{
			$(".country_select_popOpen").removeClass("open_popup");
			$(this).parent().removeClass("active");
			cntryStatus  = 1 ;
		};*/
	 

 	});



var lengStatus = 1 ;

    $(document).on("click",".prtctd_fotPop_slctLang",function(){
		$(".country_select_popOpen").removeClass("open_popup");
		$(".protected_footSetingBtn").parent().removeClass("active");
		if(lengStatus == 1){
			$(".lenguage_select_popOpen").addClass("open_popup");
			$(this).addClass("active");
			lengStatus  = 0 ;
		}else{
			$(".lenguage_select_popOpen").removeClass("open_popup");
			$(this).removeClass("active");
			lengStatus  = 1 ;
		}
	 });

    $(document).on("mouseover",".protected_footLengIcon.wavesEffects",function(){

		$(".protcted_logoPos").stop().fadeIn(200);
	});
    $(document).on("mouseleave",".protected_footLengIcon.wavesEffects" ,function(){
		$(".protcted_logoPos").stop().fadeOut(200);
	});

    $(document).on("mouseover",".protcted_centerIcon",function(){

	  $(".pprotcted_centerPos").show();
	});

    $(document).on("mouseleave",".protcted_centerIcon",function(){
		$(".pprotcted_centerPos").hide();
	});


});


 



















