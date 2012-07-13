// require
// <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
// <script type="text/javascript" src="https://raw.github.com/cowboy/jquery-resize/master/jquery.ba-resize.min.js"></script>
$(function(){
		
	function getBrowserWidth(){
		if (window.innerWidth){
			return window.innerWidth;
		}  
		else if (document.documentElement && document.documentElement.clientWidth != 0){
			return document.documentElement.clientWidth;
		}
		else if (document.body){
			return document.body.clientWidth;
		}      
		return 0;
	}
	
	function checkBrowserWidth(){
		var browserWidth = getBrowserWidth();
		
		if (browserWidth < 1117){
			$('body').addClass('thin'); 
		}else{
			$('body').removeClass('thin');
		}
	}
	
	$(window).resize(function(e){
		checkBrowserWidth();		
	});
	
	// first time
	checkBrowserWidth();
});
  