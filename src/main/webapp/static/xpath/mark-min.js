window.openerCreateLabel=function(id, index, name, xpath, xpathArray, selectType, ispage, selectAttr, multiSelXpathArray, moreOption){
	ncx_et_tool.createLabel(id, index, name, xpath, xpathArray, selectType, ispage, selectAttr, multiSelXpathArray, moreOption);
}
var ncxTableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})();

//cache test
var ncx_traceHighlight = {
	ctrlDown :true,
	isDetail : false,//默认多选
	isallowtrace : 1,
	isHighlight : 0,
	isAddSelector:false,
	element : null,
	timer:null,
	needCloseCover:false,
	needSave:false,
	process : function(h) {
		var g = h.target || h.srcElement;
		if (jQuery(g).get(0).tagName.toLowerCase() != "html"
				&& jQuery(g).attr("class") != "ncx_highlightTool"
				&& ncx_traceHighlight.isallowtrace == 1 && !ncx_et_tool.isAddSelector && !jQuery(g).hasClass("ncx_highlighted")) {
			jQuery('#newcrawler').contents().find('body').find('.ncx_highlighted').removeClass("ncx_highlighted");
			
			if(ncx_traceHighlight.ctrlDown && !jQuery(g).hasClass("ncx-cursor-delete")){
				jQuery(g).addClass("ncx-cursor-add");
			}
			ncx_traceHighlight.isHighlight=1;
			ncx_traceHighlight.element = g;
			
			var i = jQuery(g).offset();
			var outerwidth = jQuery(g).outerWidth();
			var outerheight = jQuery(g).outerHeight();
			
			var c = jQuery('#newcrawler').contents().width();
			if (outerwidth > c) {
				outerwidth = c - 8;
			}
			
			var color="rgb(147, 247, 250)";
			
			var borderCss="1px dashed rgb(151, 75, 75)";
			var borderCss1="2px double "+color;
			
			var left=i.left;
			var top=i.top;
			var width=outerwidth;
			var height=outerheight;
			
			var div="<div style='left:"+(left)+"px; top:"+top+"px; width:"+(width)+"px; height:"+height+"px;z-index : 2999999999;position : absolute;border:"+borderCss1+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_' class='ncx_highlightTool'></div>";
			div+="<div style='left:"+(left+1)+"px; top:"+(top+1)+"px; width:"+(width-2)+"px; height:"+(height-2)+"px;z-index : 2999999999;position : absolute;border:"+borderCss+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_' class='ncx_highlightTool'></div>";
			
			
			jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
			jQuery('#newcrawler').contents().find("#ncx_curlCover").append(div);
			jQuery(g).addClass("ncx_highlighted");
			return true;
		}
		return false;
	}
};

var ncx_innerFun = {
	highlightIndex:0,
	type:null,
	isNullOrEmpty : function(a) {
		return (null == a || "null" == a || "" == a || undefined == a || "undefined" == a || [] == a || undefined == jQuery(a).get(0).tagName)
	},
	innerAppend : function(a, b) {
		a.append(b);
	},
	highlight : function(f, a, b, c, d, e, borderCss, color) {
		if(!color){
			color="#facd93";
		}
		if(!borderCss){
			borderCss="1px dashed #000";
		}
		f.css({
			left : a,
			top : b,
			width : c,
			height : d
		});
		f.css({
			"z-index" : 2999999999,
			position : "absolute",
			"background-color" : color
		});
		f.css(e, borderCss);
		
	},
	highlightCover : function(e, a, b, c, d) {
		e.css({
			left : a,
			top : b,
			width : c,
			height : d
		});
		e.css({
			"z-index" : 99999,
			position : "absolute",
			"background-color" : "#000",
			opacity : 0.5
		});
	},
	getRandomColor:function (index) {
		  var colors=["#F9AEAE", "#F1C194", "#F3E13B", "#CEF57B", "#9CF994", "#75D8BA", "#55C5F5", "#A7A5E4", "#D291FF", "#FF91D5", "#EBD2D6"];
		  var len=colors.length;
		  if(index>=len){
			  index=len-1;
		  }
		  return colors[index];
	},
	getRandomColor2:function () {
		  // creating a random number between 0 and 255
		  var r = Math.floor(Math.random() * 100+Math.random() * 100)+56;
		  var g = Math.floor(Math.random() * 100+Math.random() * 100)+56;
		  var b = Math.floor(Math.random() * 100+Math.random() * 100)+56;
		  // going from decimal to hex
		  var hexR = r.toString(16);
		  var hexG = g.toString(16);
		  var hexB = b.toString(16);

		  // making sure single character values are prepended with a "0"
		  if (hexR.length == 1) {
		    hexR = "0" + hexR;
		  }

		  if (hexG.length == 1) {
		    hexG = "0" + hexG;
		  }

		  if (hexB.length == 1) {
		    hexB = "0" + hexB;
		  }

		  // creating the hex value by concatenatening the string values
		  var hexColor = "#" + hexR + hexG + hexB;
		  
		  return hexColor.toUpperCase();
	},
	addZoomData:function(){
		var b=ncx_et_tool.targetNow ;
		ncx_et_tool.targetArray = Array();
		ncx_et_tool.getTargetArray(b);
		
		jQuery('#newcrawler-csspath').removeData("child");
		jQuery('#newcrawler-csspath').data("child", ncx_et_tool.targetArray);
	},
	addZoomEvent:function(divObj){
		divObj.find('.ncx_zoom').find(".ncx_larger").mouseover(function() {
			jQuery(this).addClass("ncx_on");
		});
		divObj.find('.ncx_zoom').find(".ncx_smaller").mouseover(function() {
			jQuery(this).addClass("ncx_on");
		});
		divObj.find('.ncx_zoom').find(".ncx_setting").mouseover(function() {
			jQuery(this).addClass("ncx_on");
		});
		
		divObj.find('.ncx_zoom').find(".ncx_larger").mouseout(function() {
			jQuery(this).removeClass("ncx_on");
		});
		divObj.find('.ncx_zoom').find(".ncx_smaller").mouseout(function() {
			jQuery(this).removeClass("ncx_on");
		});
		divObj.find('.ncx_zoom').find(".ncx_setting").mouseout(function() {
			jQuery(this).removeClass("ncx_on");
		});
		
		divObj.find('.ncx_zoom').find(".ncx_larger").unbind('click').click(function() {
			ncx_et_tool.larger();
		});
		divObj.find('.ncx_zoom').find(".ncx_smaller").unbind('click').click(function() {
			ncx_et_tool.smaller();
		});
		divObj.find('.ncx_zoom').find(".ncx_setting").unbind('click').click(function() {
			if(!ncx_et_tool.isAddSelector){
        		ncx_traceHighlight.isDetail=!ncx_traceHighlight.isDetail;
	        	ncx_innerFun.preview();
        	}
		});
	},
	addHighlight : function(multiSelIndex, seq, g, isAddSelector, isAddZoom, zoomIndex, i, color, selected, borderCss, hcolor){
		ncx_innerFun.highlightIndex=ncx_innerFun.highlightIndex+1;
		var selectorDiv="";
		if(isAddSelector){
			selectorDiv="<div class='ncx_selector' style='background-color:"+color+"; position: absolute; height: 15px; width: 35px;bottom: -17px; left: -2px;    pointer-events: auto;'>" +
					"<a class='ncx-highlight-button ncx-accept-highlight' lang='"+i+"' style='background: url(\""+newcrawler_server_url+"static/xpath/v2/icon-highlight-accept.svg\") no-repeat 50% 50%;background-size: 10px 10px;left: 20px;padding-right: 10px;display: inline-block;cursor: pointer!important;height: 12px;opacity: .4;position: absolute;margin-top: 1px;'></a>" +
							"<a class='ncx-highlight-button ncx-reject-highlight' lang='"+i+"' style='background: url(\""+newcrawler_server_url+"static/xpath/v2/icon-highlight-reject.svg\") no-repeat 50% 50%;background-size: 10px 10px;left: 5px;padding-right: 10px;display: inline-block;cursor: pointer!important;height: 12px;opacity: .4;position: absolute;margin-top: 1px;'></a></div>";
		}
		var zoomDiv="";
		if(isAddZoom){
			jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool .ncx_zoom").remove();
			
			zoomDiv="<div class='ncx_zoom' style='display:block; background-color:rgb(213, 156, 84); position: absolute; height: 15px; width:65px;    padding: 0px 5px; border-radius: 0px 0px 5px 0px;    pointer-events: auto;'>" +
			"<a class='ncx_larger ncx-highlight-button' lang='"+i+"' title='Larger'></a>" +
			"<a class='ncx_smaller ncx-highlight-button' lang='"+i+"' title='Smaller'></a>" +
			"<a class='ncx_setting ncx-highlight-button' lang='"+i+"' title='Setting'></a>" +
			"</div>";
		}
		
		var i = jQuery(g).offset();
		var outerwidth = jQuery(g).outerWidth();
		var outerheight = jQuery(g).outerHeight();
		
		var c = jQuery('#newcrawler').contents().width();
		if (outerwidth > c) {
			outerwidth = c - 8;
		}
		
		if(!hcolor){
			hcolor="#facd93";
		}
		var borderCss1="2px double "+hcolor;
		
		if(!borderCss){
			borderCss="1px dashed #000";
		}

		var left=i.left;
		var top=i.top;
		var width=outerwidth;
		var height=outerheight;
		
		var div="<div style='left:"+(left)+"px; top:"+top+"px; width:"+(width)+"px; height:"+height+"px;z-index : 3999999999;position : absolute;border:"+borderCss1+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_"+ncx_innerFun.highlightIndex+"' class='ncx_highlightTool "+selected+" seq"+seq+" zoomIndex"+zoomIndex+"' index='"+multiSelIndex+"'>"+zoomDiv+selectorDiv+"</div>";
		div+="<div style='left:"+(left+1)+"px; top:"+(top+1)+"px; width:"+(width-2)+"px; height:"+(height-2)+"px;z-index : 2999999999;position : absolute;border:"+borderCss+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_"+ncx_innerFun.highlightIndex+"' class='ncx_highlightTool "+selected+" seq"+seq+" zoomIndex"+zoomIndex+"' index='"+multiSelIndex+"'></div>";
		
		return div;
	},
	addHighlightEvent:function(divObj){
		ncx_innerFun.addZoomEvent(divObj);
		divObj.find(".ncx-accept-highlight").unbind('click').click(function(){
			var lang=jQuery(this).attr("lang");
			for(var i=0, len=ncx_et_tool.xpathArray.length;i<len;i++){
				if(ncx_et_tool.xpathArray[i].indexOf(':nth-of-type(*)')!=-1 && lang!=i){
					ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
				}
			}
			var b=ncx_et_tool.targetNow;
			jQuery('#newcrawler').contents().find('body').contents().find('.ncx-cursor-delete[ncx-index="'+ncx_et_tool.multiSelIndex+'"]').removeAttr("ncx-index").removeClass("ncx-cursor-delete");
			ncx_innerFun.selectHighlight(b, ncx_innerFun.type, true, ncx_et_tool.multiSelIndex);
		});
		divObj.find(".ncx-reject-highlight").unbind('click').click(function(){
			var lang=jQuery(this).attr("lang");
			for(var i=0, len=ncx_et_tool.xpathArray.length;i<len;i++){
				if(ncx_et_tool.xpathArray[i].indexOf(':nth-of-type(*)')!=-1 && lang==i){
					ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
				}
			}
			var b=ncx_et_tool.targetNow;
			jQuery('#newcrawler').contents().find('body').contents().find('.ncx-cursor-delete[ncx-index="'+ncx_et_tool.multiSelIndex+'"]').removeAttr("ncx-index").removeClass("ncx-cursor-delete");
			ncx_innerFun.selectHighlight(b, ncx_innerFun.type, false, ncx_et_tool.multiSelIndex);
		});
	},
	addMoveHighlight : function(multiSelIndex, seq, g, isAddSelector, isAddZoom, zoomIndex, i, color, selected, borderCss, hcolor){
		ncx_innerFun.highlightIndex=ncx_innerFun.highlightIndex+1;

		var i = jQuery(g).offset();
		var outerwidth = jQuery(g).outerWidth();
		var outerheight = jQuery(g).outerHeight();
		
		var c = jQuery('#newcrawler').contents().width();
		if (outerwidth > c) {
			outerwidth = c - 8;
		}
		
		if(!hcolor){
			hcolor="#facd93";
		}
		var borderCss1="2px double "+hcolor;
		
		if(!borderCss){
			borderCss="1px dashed #facd93";
		}

		var left=i.left;
		var top=i.top;
		var width=outerwidth;
		var height=outerheight;
		
		var div="<div style='left:"+(left)+"px; top:"+top+"px; width:"+(width)+"px; height:"+height+"px;z-index : 2999999999;position : absolute;border:"+borderCss1+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_"+ncx_innerFun.highlightIndex+"' class='ncx_highlightTool "+selected+" seq"+seq+" zoomIndex"+zoomIndex+"' index='"+multiSelIndex+"'></div>";
		div+="<div style='left:"+(left+1)+"px; top:"+(top+1)+"px; width:"+(width-2)+"px; height:"+(height-2)+"px;z-index : 2999999999;position : absolute;border:"+borderCss+";pointer-events:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;' id='ncx_traceHighlight_all_"+ncx_innerFun.highlightIndex+"' class='ncx_highlightTool "+selected+" seq"+seq+" zoomIndex"+zoomIndex+"' index='"+multiSelIndex+"'></div>";
		
		return div;
	},
	innerHighlightRender : function(e) {
		//jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool").remove();
		
		var k = jQuery(e).offset().top;
		var q = jQuery(e).offset().left;
		var a = jQuery(e).outerWidth();
		var p = jQuery(e).outerHeight();
		var m = jQuery('#newcrawler').contents().outerHeight();
		var l = jQuery('#newcrawler').contents().outerWidth();
		if (a > l + 8) {
			a = l;
		}
		ncx_innerFun.innerAppend(jQuery('#newcrawler').contents().find("#ncx_cover-container"), "<div id='ncx_highlightCover_top' class='ncx_highlightCover ncx_highlightTool'></div>");
		ncx_innerFun.innerAppend(jQuery('#newcrawler').contents().find("#ncx_cover-container"), "<div id='ncx_highlightCover_right' class='ncx_highlightCover ncx_highlightTool'></div>");
		ncx_innerFun.innerAppend(jQuery('#newcrawler').contents().find("#ncx_cover-container"), "<div id='ncx_highlightCover_bottom' class='ncx_highlightCover ncx_highlightTool'></div>");
		ncx_innerFun.innerAppend(jQuery('#newcrawler').contents().find("#ncx_cover-container"), "<div id='ncx_highlightCover_left' class='ncx_highlightCover ncx_highlightTool'></div>");
		var b = jQuery('#newcrawler').contents().find("#ncx_highlightCover_top");
		var i = jQuery('#newcrawler').contents().find("#ncx_highlightCover_right");
		var g = jQuery('#newcrawler').contents().find("#ncx_highlightCover_bottom");
		var c = jQuery('#newcrawler').contents().find("#ncx_highlightCover_left");
		ncx_innerFun.highlightCover(b, 0, 0, l + 8, k - 3);
		ncx_innerFun.highlightCover(i, q + 3 + a, k - 3, l - q - 3 - a + 8, p + 6);
		ncx_innerFun.highlightCover(g, 0, k + 3 + p, l + 8, m - k - p + 5 + 150);
		ncx_innerFun.highlightCover(c, 0, k - 3, q - 3, p + 6);
		ncx_traceHighlight.isallowtrace = 0;
		
		/*jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool").unbind("click").click(function() {
			ncx_innerFun.closeCover();
		});*/
	},
	closeCover: function(){
		ncx_innerFun.clearData();
		ncx_innerFun.closeHighlight();
		ncx_innerFun.closeDetail();
	},
	clearData: function(){
		ncx_et_tool.xpathArray = [];
		ncx_et_tool.xpathArray2 = [];
		ncx_et_tool.multiSelXpathArray=new Array();
		ncx_et_tool.multiSelIndex=0;
		ncx_et_tool.isAddSelector=false;
		
		ncx_traceHighlight.isallowtrace = 1;
		ncx_traceHighlight.needSave = false;
		
		jQuery("#ncx_toolbar .ncx-datatypes .active:not(.finished) .ncx-count").text('0');
		jQuery("#ncx_toolbar .ncx-datatypes .active:not(.finished) .ncx-count").attr("lang",'0');
		jQuery("#ncx_toolbar .ncx-datatypes .active.finished .ncx-count").text(jQuery("#ncx_toolbar .ncx-datatypes .active.finished .ncx-count").attr("lang"));
		
		
		jQuery("#ncx-selector-attr optgroup[label=Attr]").empty();
		jQuery("#ncx-selector-attr option[value='innerHTML']").prop("selected", true);
		
		jQuery('#newcrawler-csspath').text("");
		jQuery('#newcrawler').contents().find('body').contents().find('*').each(function(){
			$(this).removeClass("ncx-cursor-delete");
		});
		jQuery('#newcrawler').contents().find('body').contents().find('*').removeAttr("ncx-zoom-index");
	},
	closeDetail: function(){
		jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").remove();
		jQuery('#newcrawler').contents().find("#ncx_curlCover").css({"pointer-events":"none"});
		jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightCover").remove();
		
		ncx_traceHighlight.isDetail=false;
		ncx_traceHighlight.isallowtrace = 1;
	},
	closeHighlight: function(){
		jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
		jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool").remove();
	},
	contrlBtn:function(isSelect){
		jQuery("#ncx_toolbar button.ncx.ncx-button.ncx-save").show();
		jQuery("#ncx_toolbar button.ncx.ncx-button.ncx-test").show();
		jQuery("#ncx_toolbar button.ncx.ncx-button.ncx-view").show();
	},
	preview:function(){
		if(ncx_traceHighlight.isDetail){
			var len=jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.selected").length;
			if(len>0){
				jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
				jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.mouseover").remove();
				
				jQuery('#newcrawler').contents().find("#ncx_curlCover").css({"pointer-events":"auto"});
				var b=ncx_et_tool.targetNow;
				ncx_innerFun.innerHighlightRender(b);
				ncx_et_tool.add_et(b);
			}
		}else{
			ncx_innerFun.closeDetail();
		}
		
	},
	multiSelect:function(){
		if(ncx_traceHighlight.ctrlDown){
			var b = ncx_traceHighlight.element;
			if(!jQuery(b).hasClass("ncx-cursor-delete")){
				jQuery(b).addClass("ncx-cursor-add");
			}
			jQuery('#newcrawler').contents().find("#ncx_curlCover").css({"pointer-events":"none"});
		}else{
			jQuery('#newcrawler').contents().find('body').contents().find('*').removeClass("ncx-cursor-add");
			
			
			var len=jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.selected").length;
			if(len>0){
				jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
				jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.mouseover").remove();
				
				jQuery('#newcrawler').contents().find("#ncx_curlCover").css({"pointer-events":"auto"});
				var b=ncx_et_tool.targetNow;
				ncx_innerFun.innerHighlightRender(b);
				ncx_et_tool.add_et(b);
			}
		}
	},
	multiEvent:function(element){
		var index=jQuery(element).attr("ncx-index");
		jQuery('#newcrawler').contents().find('body').contents().find('.ncx-cursor-delete[ncx-index="'+index+'"]').removeAttr("ncx-index").removeClass("ncx-cursor-delete").addClass("ncx-cursor-add");
		jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool[index='"+index+"']").remove();
		
		var newMultiSelXpathArray=new Array();
		var multiSelXpathArray=ncx_et_tool.multiSelXpathArray;
		for(var i in multiSelXpathArray){
			index=parseInt(index);
			if(index==multiSelXpathArray[i].index){
				continue;
			}
			newMultiSelXpathArray.push(multiSelXpathArray[i])
		}
		ncx_et_tool.multiSelXpathArray=newMultiSelXpathArray;
		var eleCount=ncx_et_tool.count(newMultiSelXpathArray);
		jQuery("#ncx_toolbar .ncx-datatypes .active .ncx-count").text(eleCount);
	},
	showSpend:function(startTime){
		var time=(new Date()).getTime();
		var spend=(time-startTime)/1000;
		//console.log(spend);
		startTime=time;
		return startTime;
	},
	moveSelect:function(b){
		if(ncx_et_tool.isAddSelector || ncx_traceHighlight.isallowtrace==0){
			return;
		}
		//console.clear()
		var startTime=(new Date()).getTime();
		
		
		ncx_et_tool.readCssPath(b);
		
		startTime=ncx_innerFun.showSpend(startTime)
		
		var selector=ncx_et_tool.xpathArray.join('');
		
		jQuery('#newcrawler-csspath').text(selector);
		
		ncx_innerFun.moveHighlight(selector, b);
		startTime=ncx_innerFun.showSpend(startTime);
	},
	moveHighlight:function(selector, targetEle){
		selector = selector.replaceAll(":nth-of-type\\(\\*\\)", "");
		var elements = jQuery('#newcrawler').contents().find(selector);
		var eleCount=elements.length;
		var seq=(new Date()).getTime();
		
		
		var color="rgb(147, 247, 250)";
		var borderCss="1px dashed rgb(151, 75, 75)";
		
		var highlightDivAll="";
		for (var e = 0; e < eleCount; e++) {
			var element = elements[e];
			
			if(ncx_et_tool.isSame(targetEle, element)){
				continue;
			}
			//console.time(e);
			var highlightDiv=ncx_innerFun.addMoveHighlight(-1, seq, element, false, false, -1, 0, null, "mouseover", borderCss, color);
			highlightDivAll+=highlightDiv;
			//console.timeEnd(e);
		}
		jQuery('#newcrawler').contents().find("#ncx_cover-container").append(highlightDivAll);
		
	},
	clickSelect: function(h){
		if(ncx_et_tool.isAddSelector || ncx_traceHighlight.isallowtrace == 0){
			return;
		}
		
		jQuery("#ncx-selector-attr optgroup[label=Attr]").empty();
		jQuery("#ncx-selector-attr option[value='innerHTML']").prop("selected", true);
		
		var propertyName=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").attr("title");
		if(propertyName=="Headline" || propertyName=="Author"){
			jQuery("#ncx-selector-attr option[value='innerTEXT']").prop("selected", true);
		}
		
		if(jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active").length==0){
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow").eq(0).click();
		}
		
		var g = h.target || h.srcElement;
		if(jQuery(g).hasClass("ncx-cursor-delete")){
			ncx_innerFun.multiEvent(g);
			return;
		}
		
		ncx_innerFun.contrlBtn(true);
		
		ncx_et_tool.targetIndex = 0;
		ncx_et_tool.seqHighlight=(new Date()).getTime();
		
		
		if(ncx_traceHighlight.isHighlight==1){
			var b = ncx_traceHighlight.element;
			if(jQuery("#ncx_toolbar .ncx-datatypes .active").hasClass("ncx-cron")){
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-cron").removeClass("active");
				jQuery("#ncx_toolbar .ncx-cron-config").hide();
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow").eq(0).addClass("active");
			}
			if(jQuery("#ncx_toolbar .ncx-datatypes .active").hasClass("ncx-setting")){
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-setting").removeClass("active");
				jQuery("#ncx_toolbar .ncx-setting-config").hide();
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow").eq(0).addClass("active");
			}
			if(!ncx_innerFun.isPage()){
				jQuery("#ncx_toolbar .ncx-setting-config").hide();
				jQuery("#ncx_toolbar .ncx-cron-config").hide();
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-cron").removeClass("active");
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-setting").removeClass("active");
				
				//jQuery("#ncx_toolbar .ncx-datatypes .ncx-data-dot.ncx-yellow").addClass("active");
			}
			//xpath
			ncx_et_tool.targetNow = b;
			ncx_et_tool.readCssPath(b);
			b=ncx_et_tool.targetNow;
			
			if(ncx_et_tool.xpathArray==null || ncx_et_tool.xpathArray.length==0){
				return;
			}
			if(ncx_et_tool.multiSelXpathArray.length>0){
				//如果已经存在则不添加
				for(var i=0,ilen=ncx_et_tool.multiSelXpathArray.length; i<ilen; i++){
					var tempSelector=ncx_et_tool.multiSelXpathArray[i].selector;
					if(tempSelector.length==ncx_et_tool.xpathArray.length){
						var isSame=true;
						for(var j=0,jlen=tempSelector.length; j<jlen; j++){
							if(tempSelector[j]!=ncx_et_tool.xpathArray[j]){
								isSame=false;
							}
						}
						if(isSame){
							return;
						}
					}
				}
			}
			//如下这种情况
			//div.row:nth-of-type(*) > li:nth-of-type(1)|div.row:nth-of-type(*) > li:nth-of-type(2)
			//则改成div.row > li:nth-of-type(*)
			var multiNodeIndex=-1;
			var multSelectCssPath=ncx_et_tool.getMultSelectCssPath();
			if(multSelectCssPath){
				for(var j=0,jlen=multSelectCssPath.length; j<jlen; j++){
					if(multSelectCssPath[j].indexOf(":nth-of-type(*)")!=-1){
						multiNodeIndex=j;
						break;
					}
				}
			}
			
			
			var fieldSize=newcrawler.fieldArray.length;
			if(multiNodeIndex!=-1){
				var newMultiSelXpathArray=new Array();
				for(var i=0,ilen=ncx_et_tool.multiSelXpathArray.length; i<ilen; i++){
					var tempSelector=ncx_et_tool.multiSelXpathArray[i].selector;
					var tempXpathArray=ncx_et_tool.xpathArray.slice(0);
					var parentModified=false;
					var tempMinLen=tempSelector.length;
					if(tempXpathArray.length<tempMinLen){
						tempMinLen=tempXpathArray.length;
					}
					for(var j=0; j<tempMinLen; j++){
						if(tempXpathArray[j]!=tempSelector[j]){
							var nodeCssPath1=tempXpathArray[j];
							var nodeCssPath2=tempSelector[j];
							var hasMultiNode1=false;
							var hasMultiNode2=false;
							
							if(nodeCssPath1.indexOf(":nth-of-type")!=-1){
								nodeCssPath1=nodeCssPath1.substring(0, nodeCssPath1.indexOf(":nth-of-type"));
								hasMultiNode1=true;
							}
							
							if(nodeCssPath2.indexOf(":nth-of-type")!=-1){
								nodeCssPath2=nodeCssPath2.substring(0, nodeCssPath2.indexOf(":nth-of-type"));
								hasMultiNode2=true;
							}
							if((hasMultiNode1 || hasMultiNode2) && nodeCssPath1==nodeCssPath2){
								if(multiNodeIndex>j){
									var nodeCssPath11=ncx_et_tool.xpathArray.slice(multiNodeIndex).join('');
									var nodeCssPath22=tempSelector.slice(multiNodeIndex).join('');
									var nodeNameCssPath11=nodeCssPath11.replaceAll(":nth-of-type\\(.*?\\)", "");
									var nodeNameCssPath22=nodeCssPath22.replaceAll(":nth-of-type\\(.*?\\)", "");
									if(nodeNameCssPath11==nodeNameCssPath22){
										//相同节点
										//tempXpathArray[j]=nodeCssPath1+":nth-of-type(*)";
										tempXpathArray[j]=nodeCssPath1;
										parentModified=true;
										continue;
									}
										
								}else{
									var nodeCssPath11=ncx_et_tool.xpathArray.slice(j+1).join('');
									var nodeCssPath22=tempSelector.slice(j+1).join('');
									
									var nodeNameCssPath11=nodeCssPath11.replaceAll(":nth-of-type\\(.*?\\)", "");
									var nodeNameCssPath22=nodeCssPath22.replaceAll(":nth-of-type\\(.*?\\)", "");
									
									
									if(nodeNameCssPath11==nodeNameCssPath22){
										//相同节点
										if(fieldSize==1){
											tempXpathArray[j]=nodeCssPath1+":nth-of-type(*)";
											if(tempXpathArray[multiNodeIndex].indexOf(":nth-of-type")!=-1){
												tempXpathArray[multiNodeIndex]=tempXpathArray[multiNodeIndex].substring(0, tempXpathArray[multiNodeIndex].indexOf(":nth-of-type"));
											}
											multiNodeIndex=j;
										}else{
											tempXpathArray[j]=nodeCssPath1;
										}
										parentModified=true;
										continue;
									}
								}
								
							}
						}
					}
					if(parentModified){
						ncx_et_tool.xpathArray=tempXpathArray;
						var index=ncx_et_tool.multiSelXpathArray[i].index;
						jQuery('#newcrawler').contents().find('body').contents().find('.ncx-cursor-delete[ncx-index="'+index+'"]').removeAttr("ncx-index").removeClass("ncx-cursor-delete").addClass("ncx-cursor-add");
						jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool[index='"+index+"']").remove();
					}else{
						newMultiSelXpathArray.push(ncx_et_tool.multiSelXpathArray[i]);
					}
				}
				ncx_et_tool.multiSelXpathArray=newMultiSelXpathArray;
			}
			
			
			if(!jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active.finished.edit").hasClass("zero")){
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active.finished.edit .ncx-count").text(0);
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active.finished.edit").addClass("zero");
			}
			
			ncx_et_tool.multiSelIndex++;
			ncx_et_tool.multiSelXpathArray.push({index:ncx_et_tool.multiSelIndex, selector:ncx_et_tool.xpathArray, selector2:ncx_et_tool.xpathArray2, element:ncx_et_tool.targetNow});
			
			var isAccept=false;
			if(newcrawler.fieldArray.length>1){
				isAccept=true;
			}
			jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
			jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.mouseover").remove();
			ncx_innerFun.selectHighlight(b, 1, isAccept, ncx_et_tool.multiSelIndex);
			
			ncx_innerFun.initValue(b);
			ncx_innerFun.addZoomData();
		}
	},
	selectHighlight:function(b, type, isAccept, multiSelIndex){
		if(ncx_innerFun.isPage()){
			for(var len=ncx_et_tool.xpathArray2.length, i=len-1;i>0;i--){
				
				if(ncx_et_tool.xpathArray2[i]=='a' 
					|| ncx_et_tool.xpathArray2[i].indexOf('a:')==0){
					var pageXpathArray=Array();
					for(var len=i, j=0;j<=len;j++){
						pageXpathArray[j]=ncx_et_tool.xpathArray2[j];
					}
					var pagexpath=pageXpathArray.join('');
					pagexpath = pagexpath.replace(":nth-of-type(*)", "");
					
					var pageelements = jQuery('#newcrawler').contents().find(pagexpath);
					var pageelement = pageelements[0];
					b=pageelement;
					
					ncx_et_tool.xpathArray2=pageXpathArray.slice(0);
					ncx_et_tool.xpathArray=pageXpathArray.slice(0);
					break;
				}
			}
		}
		
		if(!isAccept){
			var count=0;
        	for(var i=0, iLen=ncx_et_tool.xpathArray.length; i<iLen; i++){
        		if(ncx_et_tool.xpathArray[i].indexOf(":nth-of-type(*)")!=-1){
        			count++;
        		}
        	}
        	if(count<=1){
        		isAccept=true;
        	}
		}
		jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.seq"+ncx_et_tool.seqHighlight).remove();
		
		var xpathArray=null;
		var xpathArrayLen=0;
		
		if(!ncx_innerFun.isPage()){
			if(newcrawler.fieldArray.length>1){
				xpathArray=newcrawler.fieldArray[1].xpathArray;
				for(var i=1, len=newcrawler.fieldArray.length;i<len;i++){
					for(var j=0, jlen=newcrawler.fieldArray[i].xpathArray.length;j<jlen;j++){
						if(newcrawler.fieldArray[i].xpathArray[j].indexOf(':nth-of-type(*)')!=-1){
							xpathArray=newcrawler.fieldArray[i].xpathArray;
						}
					}
				}
				xpathArrayLen=xpathArray.length;
			}
		}
		
		var count=0;
		
		if(!isAccept){
			for(var i=0, len=ncx_et_tool.xpathArray.length;i<len;i++){
				if(ncx_et_tool.xpathArray[i].indexOf(':nth-of-type(*)')!=-1){
					if(xpathArray!=null){
						if(xpathArrayLen>i){
							if(xpathArray[i].indexOf(':nth-of-type(*)')==-1){
								ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
								continue;
							}
						}else{
							ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
							continue;
						}
					}
					count++;
				}
			}
		}
		
		ncx_et_tool.isAddSelector=false;
		if(count>0){
			ncx_et_tool.isAddSelector=true;
			jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").remove();
			//ncx_traceHighlight.isallowtrace = 1;
			type=1;
		}else{
			if(!ncx_traceHighlight.ctrlDown || ncx_traceHighlight.isDetail){
				ncx_innerFun.innerHighlightRender(b);
				if(type===1){
					ncx_et_tool.add_et(b);
				}else{
					ncx_et_tool.change_et(b);
				}
			}
		}
		ncx_innerFun.type=type;
		
		var tempSubxpath=[];
		var tempArray=[];
		var index=0;
		
		var isExsit=false;
		for(var i=0, len=ncx_et_tool.xpathArray.length;i<len;i++){
			tempArray[i]=ncx_et_tool.xpathArray[i];
			
			if(tempArray[i].indexOf(':nth-of-type(*)')==-1){
				if(!isExsit && i+1==len){
					
				}else{
					continue;
				}
			}
			isExsit=true;
			
			for(var j=i+1;j<len;j++){
				if(ncx_et_tool.xpathArray[j].indexOf(':nth-of-type(*)')!=-1){
					tempArray[j]=ncx_et_tool.xpathArray2[j];
				}else{
					tempArray[j]=ncx_et_tool.xpathArray[j];
				}
			}
			var subxpath=tempArray.join('');
			subxpath = subxpath.replace(":nth-of-type(*)", "");
			
			var elements = jQuery('#newcrawler').contents().find(subxpath);
			var eleCount=elements.length;
			var color=ncx_innerFun.getRandomColor(index);
			index++;
			
			var highlightDivAll="";
			for (var e = 0; e < eleCount; e++) {
				var element = elements[e];
				var zoomIndex=e;
				$(element).removeAttr("ncx-zoom-index").attr("ncx-zoom-index", zoomIndex);
				
				if(ncx_traceHighlight.ctrlDown){
					$(element).removeClass("ncx-cursor-add").addClass("ncx-cursor-delete");
					$(element).attr("ncx-index", multiSelIndex);
				}
				var isAddZoom=false;
				if(ncx_et_tool.isSame(element, b)){
					isAddZoom=true;
				}
				var highlightDiv=ncx_innerFun.addHighlight(multiSelIndex, ncx_et_tool.seqHighlight, element, ncx_et_tool.isAddSelector, isAddZoom, zoomIndex, i, color, "selected");
				highlightDivAll+=highlightDiv;
			}
			var highlightDivAllObj=jQuery(highlightDivAll);
			ncx_innerFun.addHighlightEvent(highlightDivAllObj);
			jQuery('#newcrawler').contents().find("#ncx_cover-container").append(highlightDivAllObj);
			
			tempArray[i]=ncx_et_tool.xpathArray2[i];
		}
		
		var eleCount=ncx_et_tool.count(ncx_et_tool.multiSelXpathArray);
		jQuery("#ncx_toolbar .ncx-datatypes .active .ncx-count").text(eleCount);
		//event
		ncx_traceHighlight.needSave=true;
	},
	isPage:function(){
		return jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active").hasClass("ncx-pagination");
	},
	initValue:function(b){
		var xpath="";
		var multiSelXpathArray=ncx_et_tool.multiSelXpathArray;
		for(var i in multiSelXpathArray){
			if(xpath!=""){
				xpath+='|';
			}
			xpath+=multiSelXpathArray[i].selector.join('');
		}
		jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").val(xpath);
		
		
		if(!ncx_traceHighlight.isDetail){
			jQuery("#ncx-selector-attr optgroup[label=Attr]").empty();
			jQuery("#ncx-selector-attr option[value='innerHTML']").prop("selected", true);
		}
		
		jQuery('#newcrawler-selector').find("select[name='ncx_attr']").empty();
		jQuery('#newcrawler-selector').find("select[name='ncx_attr']").append('<option value=""></option>');
		
		var hasAttr=false;
		var isExistElement=false;
		for(var i in multiSelXpathArray){
			var element=multiSelXpathArray[i].element;
			
			if(element){
				isExistElement=true;
				var node=jQuery(element).get(0);
				for (var i = 0, atts = node.attributes, n = atts.length; i < n; i++){
					var name=atts[i].nodeName.toLowerCase();
					if(name.indexOf("ncx-")!=-1 || name.indexOf("ncx_")!=-1){
						continue;
					}
					var len=jQuery("#ncx-selector-attr optgroup[label=Attr] option[value='"+name+"']").length;
					if(len==0){
						jQuery("#ncx-selector-attr optgroup[label=Attr]").append('<option value="'+name+'">'+name+'</option>');
					}
					jQuery('#newcrawler-selector').find("select[name='ncx_attr']").append('<option value="'+name+'">'+name+'</option>');
					
					hasAttr=true;
				}
			}
		}
		if(!isExistElement){
			var node=jQuery(b).get(0);
			for (var i = 0, atts = node.attributes, n = atts.length; i < n; i++){
				var name=atts[i].nodeName.toLowerCase();
				if(name.indexOf("ncx-")!=-1 || name.indexOf("ncx_")!=-1){
					continue;
				}
				var len=jQuery("#ncx-selector-attr optgroup[label=Attr] option[value='"+name+"']").length;
				if(len==0){
					jQuery("#ncx-selector-attr optgroup[label=Attr]").append('<option value="'+name+'">'+name+'</option>');
				}
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").append('<option value="'+name+'">'+name+'</option>');
				
				hasAttr=true;
			}
		}
		
		var regexFilter=ncx_et_tool.moreOption["regexFilter"];
		if(regexFilter!=undefined && regexFilter!=null){
			jQuery('#newcrawler-selector').find("input[name=ncx_regex]").val(regexFilter);
			
		}
		
		var propertyName=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").attr("title");
		jQuery('#newcrawler-selector').find("input[name=ncx_property_name]").val(propertyName);
		
		if(!ncx_traceHighlight.isDetail){
			if(hasAttr){
				jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='@ATTR']").attr("disabled", false);
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").attr("disabled", false);
			}else{
				jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='@ATTR']").attr("disabled", true);
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").attr("disabled", true);
			}
			
			if(hasAttr && (node.tagName.toLowerCase()=="img" || (node.tagName.toLowerCase()=="a" && propertyName=="Link") || ncx_innerFun.isPage())){
				var defaultProp="src";
				if (node.tagName.toLowerCase()=="img"){
					defaultProp="src";
				}else if ((node.tagName.toLowerCase()=="a" && propertyName=="Link")  || ncx_innerFun.isPage()){
					defaultProp="href";
				}
				
				jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='@ATTR']").prop('checked', true);
				jQuery('#newcrawler-selector').find("select[name='ncx_attr'] option").each(function(){
					var attr=this.value;
					if(attr!=null && attr!=""){
						var content = ncx_et_tool.getContent(ncx_et_tool.multiSelXpathArray, '@ATTR', attr);
						if(content!=null && content!="" && content.toString().toLowerCase().startsWith("http")){
							jQuery('#newcrawler-selector').find("select[name='ncx_attr']").val(attr);
							if(attr==defaultProp){
								return false;
							}
						}
					}
				});
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").change();
				
				jQuery("#ncx-selector-attr optgroup[label='Attr'] option").each(function(){
					var attr=this.value;
					if(attr!=null && attr!=""){
						var content = ncx_et_tool.getContent(ncx_et_tool.multiSelXpathArray, '@ATTR', attr);
						if(content!=null && content!="" && content.toString().toLowerCase().startsWith("http")){
							jQuery(this).prop("selected", true);
							if(attr==defaultProp){
								return false;
							}
						}
					}
				});
			}else{
				if(propertyName=="Headline" || propertyName=="Author"){
					jQuery("#ncx-selector-attr option[value='innerTEXT']").prop('checked', true);
					
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerTEXT']").prop('checked', true);
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerTEXT']").click();
				}else{
					jQuery("#ncx-selector-attr option[value='innerHTML']").prop('checked', true);
					
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerHTML']").prop('checked', true);
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerHTML']").click();
				}
			}
		}
		
		jQuery("#ncx_toolbar .ncx-toolbar-section #ncx-selector-attr").change();
		jQuery('#newcrawler-selector').find("input[name=ncx_regex]").trigger("input");
	},
	removeNcxText:function(html){
		if(html==null || html==""){
			return "";
		}
		html=html.replaceAll("<ncx-text>", "").replaceAll("</ncx-text>", "");
		
		var propertyName=jQuery("#ncx_toolbar .ncx-datatypes .ncx-data-dot.active").attr("title");
		if(propertyName=="Headline" || propertyName=="Author"){
			html = html.replace(/(?:\r\n|\r|\n)/g, '');
			html = html.replace(/\s+/g, ' ');
			html=html.trim();
		}
		return html;
	}
};

var ncx_et_tool = {
	targetIndex : 0,
	targetArray : Array(),
	targetNow : Object(),
	targetDataNow : Object(),
	stateChange : 0,
	selectAttr : '',
	xpathArray : Array(),
	csspathArray : Array(),
	xpathArray2 : Array(),
	csspathArray2 : Array(),
	multiSelXpathArray : Array(),
	multiSelIndex :0,
	moreOption:{},
	getTargetArray : function(b) {
		ncx_et_tool.targetArray.push(b);
		var c = jQuery(b).parent();
		var a = c.get(0);
		if (ncx_innerFun.isNullOrEmpty(a)) {
			return ncx_et_tool.targetArray;
		}
		return ncx_et_tool.getTargetArray(c);
	},
	add_et : function(b) {
		ncx_et_tool.targetDataNow = Object();
		ncx_et_tool.targetNow = b;
		ncx_et_tool.stateChange = 0;
		jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").remove();
		var a = ncx_et_tool.getcode("et_wrap");
		ncx_innerFun.innerAppend(jQuery('#newcrawler-selector'), a);
		
		ncx_et_tool.install("ncx_et_state_10");
		
		ncx_et_tool.alterInstall(b);
		
		ncx_et_tool.init(b);
	},
	change_et : function(a) {
		ncx_et_tool.targetNow = a;
		ncx_et_tool.init(a);
		var node=jQuery(ncx_et_tool.targetNow).get(0);
		var nodeValue=node.innerHTML;
		
		jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerHTML']").prop('checked', true);
		jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name='ncx_selectType'][value='innerHTML']").click();
		
		jQuery('#newcrawler-selector').find("#ncx_copy_xpath_tips").text("");
		jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").css({"background-color":"white"});
		
		jQuery('#newcrawler-selector').find("#ncx_copy_csspath_tips").text("");
		jQuery('#newcrawler-selector').find("#ncx_copy_csspath_text").css({"background-color":"white"});
		
		ncx_innerFun.initValue(a);
	},
	init : function(f) {

		var offset=jQuery(f).offset().top;
		var height=jQuery('#newcrawler').outerHeight()/2;
		
		var top = jQuery('#newcrawler').offset().top;
		var top2 = jQuery('#newcrawler').contents().scrollTop();
		
		var c = jQuery(f).offset().top;
		c=c-top2+top;
		
		var b = jQuery(f).offset().left;
		var i = jQuery(f).outerWidth();
		var d = jQuery(f).outerHeight();
		var h = jQuery('#newcrawler').outerHeight();
		var g = jQuery('#newcrawler').outerWidth();
		
		var toolbarHeight = jQuery('#ncx_toolbar').outerHeight();
		toolbarHeight=0;
		var divH=jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").outerHeight();
		
		if (h - c - d < divH) {
			var a = b + i - 400;
			a=b-3;
			var e = c - divH-2+toolbarHeight;
			if (a <= 0) {
				a = 0;
			}
			if ((a+400) > g) {
				a = b + i - 400+3;
				if (a > g) {
					a = g - 400-10;
				}
			}
			jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").css({
				left : a + "px",
				top : e + "px"
			});
		} else {
			var a = b + i - 400;//397-238=159
			a=b-3;
			var e = c + d + 3+toolbarHeight;
			if (a <= 0) {
				a = 0;
			}
			if ((a+400) > g) {
				a = b + i - 400+3;//397-238=159
				
				if (a > g) {
					a = g - 400-10;
				}
			}
			jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").css({
				left : a + "px",
				top : e + "px"
			});
		}
		
		jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").css({opacity: "1"});
		
		var element = jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool"), oldTop = element.offset().top;
		var topMargin = 47;
		var oldScrollTop=jQuery(jQuery('#newcrawler').contents()).scrollTop();
		
		jQuery(jQuery('#newcrawler').contents()).on('scroll', function(event) {
	        var newScrollTop = jQuery(this).scrollTop();
	        var st=newScrollTop-oldScrollTop;
	        var newTop=oldTop-st;
	        
	        element.stop(false, false).animate({
	            top: newTop<topMargin? topMargin  : (newTop)
	        }, 0);
	    });
		
	},
	getcode : function(b) {
		var a = "";
		switch (b) {
		case "et_wrap":
			a = "<div class='ncx_edit_tpl_tool' style='opacity: 0;position : absolute; z-index : 999990;' id='ncx_edit_tpl_tool'><ul id='ncx_et_bar' class='ncx_et_bar'>";
			/*a += "<li class='ncx_col1'><div id='ncx_larger' class='ncx_larger'></div><div id='ncx_smaller' class='ncx_smaller'></div></li>";*/
			/*a += "<li class='ncx_col2' id='ncx_et_state_2'><span class='ncx_bar_button_tilte'>XPath</span></li>";
			a += "<li class='ncx_col3' id='ncx_et_state_3'><span class='ncx_bar_button_tilte'>CssPath</span></li>";*/
			a += "<li class='ncx_col4' id='ncx_et_state_4'><span class='ncx_bar_button_tilte'>Detail</span></li>";
			a += "</ul><div id='ncx_et_content' class='ncx_et_content'></div></div>";
			break;
		case "et_conetent_inner_20":
			//XPATH
			a = "<div class='ncx_et_content_inner' id='ncx_copy_xpath_container' style='position:relative'>";
			a += "<div style='padding-bottom: 3px;'><input id='ncx_copy_xpath_text' class='ncx_xpath' value=''/></div>";
			a += "<div class='ncx_button'><button id='ncx_copy_xpath_button' class='ncx_xpath_copy'>Copy Selector</button><button class='ncx_et_cancel'></button></div>";
			a += "<div id='ncx_copy_xpath_tips' class='ncx_tips'></div>";
			a += "</div>";
			break;
		case "et_conetent_inner_30":
			//CSSPATH
			a = "<div class='ncx_et_content_inner' id='ncx_copy_csspath_container' style='position:relative'>";
			a += "<div style='padding-bottom: 3px;'><input id='ncx_copy_csspath_text' class='ncx_csspath' value=''/></div>";
			a += "<div class='ncx_button'><button id='ncx_copy_csspath_button' class='ncx_csspath_copy'>Copy Selector</button><button class='ncx_et_cancel'></button></div>";
			a += "<div id='ncx_copy_csspath_tips' class='ncx_tips'></div>";
			a += "</div>";
			break;
		case "et_conetent_inner_40":
			//预览
			a = "<div class='ncx_et_content_inner'>";
			
			a += "<div><input name='ncx_property_name' type='text' value='' placeholder='Property Name' style='vertical-align: middle;height: 25px;    border: solid 1px #B2B2B2;'></div>";
			a += "<div style='padding-bottom: 3px;padding-top: 3px;'><input id='ncx_copy_xpath_text' class='ncx_xpath ncx_expression' value=''/></div>";
			//a += "<div><div class='nc_label'>CssPath</div><pre id='ncx_copy_csspath_text' class='ncx_csspath ncx_expression'>csspath express test!!!</pre></div>";
			
			a += "<div style='height: 22px;'>";
			a += "<div style='float:left;margin-left:0px;width:80px;'><input name='ncx_selectType' type='radio' value='outerHTML' style='vertical-align: middle;'><span>outerHTML</span></div>";
			a += "<div style='float:left;margin-left:0px;width:80px;'><input name='ncx_selectType' type='radio' value='innerHTML' style='vertical-align: middle;' checked='checked' ><span>innerHTML</span></div>";
			a += "<div style='float:left;margin-left:0px;width:80px;'><input name='ncx_selectType' type='radio' value='innerTEXT' style='vertical-align: middle;'><span>innerTEXT</span></div>";
			a += "<div style='float:left;margin-left:0px;width:80px;'><input name='ncx_selectType' type='radio' value='@ATTR' style='vertical-align: middle;display:none;'><span><select name='ncx_attr' style='width: 140px;'></select></span></div>";
			a += "</div>";
			
			a += "<div><input name='ncx_regex' type='text' value='' placeholder='Regex' class='regex' style='width: 100%;vertical-align: middle;height: 25px; border: solid 1px #B2B2B2;'></div>";
			
			a += "<div><pre id='ncx_content_preview' class='ncx_content'></pre></div>";
			
			a += "<div class='ncx_button'>";
			a += "<button id='ncx_copy_xpath_button' class='ncx_xpath_copy'>Copy Selector</button>";
			//a += "<button id='ncx_copy_csspath_button' class='ncx_csspath_copy'>Copy CssPath</button>";
			a += "<button class='ncx_et_cancel'>OK</button>";
			a += "</div>";
			
			a += "<div class='ncx_tips'></div></div>";
			break;
		}
		return a;
	},
	installEvent :function(){
		jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").focus(function(){
			var selectExpress=jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").val();
			jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").attr("lang", selectExpress);
		});
	},
	installCopy :function(){
		//csspath
		var csspathCopy = new ZeroClipboard( document.getElementById("ncx_copy_csspath_button") );
		csspathCopy.on( 'ready', function(event) {
			csspathCopy.on( 'copy', function(event) {
				event.clipboardData.setData('text/plain', jQuery('#newcrawler-selector').find("#ncx_copy_csspath_text").text());
		    });
			csspathCopy.on( 'aftercopy', function(event) {
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner .ncx_tips").text("Copied CssPath.");
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner .ncx_expression").css({"background-color":"white"});
				jQuery('#newcrawler-selector').find("#ncx_copy_csspath_text").css({"background-color":"rgb(236, 248, 233)"});
		    });
		});
		
		//xpath
		var xpathCopy = new ZeroClipboard( document.getElementById("ncx_copy_xpath_button") );
		xpathCopy.on( 'ready', function(event) {
			xpathCopy.on( 'copy', function(event) {
				event.clipboardData.setData('text/plain', jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").val());
		    });
			xpathCopy.on( 'aftercopy', function(event) {
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner .ncx_tips").text("Copied XPath.");
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner .ncx_expression").css({"background-color":"white"});
				jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").css({"background-color":"rgb(236, 248, 233)"});
		    });
		});
	},
	getContent:function(multiSelXpathArray, selectType, attr, childNodeIndex){
		if(selectType=="@ATTR" && !attr){
			attr=jQuery('#newcrawler-selector').find(".ncx_et_content_inner select[name='ncx_attr']").val();
		}
		
		var parentContents = null;
		var multiNodeIndex=-1;
		var cssPathArray=null;
		for(var i in multiSelXpathArray){
			cssPathArray=multiSelXpathArray[i].selector.slice();
			
			for(var ic=0, icLen=cssPathArray.length; ic<icLen; ic++){
	     		if(cssPathArray[ic].indexOf(":nth-of-type(*)")!=-1 ){
	     			multiNodeIndex=ic;
	 			}
			}
			if(multiNodeIndex!=-1){
				var parentCssPath=cssPathArray.slice(0, multiNodeIndex+1).join("").replaceAll(":nth-of-type\\(\\*\\)", "");
				parentContents=jQuery('#newcrawler').contents().find(parentCssPath);
				break;
			}
		}
		
		var nodeIndex=childNodeIndex;
		if(multiNodeIndex!=-1 && (childNodeIndex == null || childNodeIndex==undefined)){
			for(var i in multiSelXpathArray){
				var hasMultiNode=false;
				if(multiSelXpathArray[i].selector[multiNodeIndex].indexOf(":nth-of-type(*)")!=-1 ){
					hasMultiNode=true;
				}
				if(hasMultiNode){
					var nodeCssSelector2=multiSelXpathArray[i].selector2[multiNodeIndex];
	     			var matchRegexp=/:nth-of-type\((\d+)\)/g;
	     			var match=matchRegexp.exec(nodeCssSelector2);
	     			if(match!=null && match.length>0){
	     				nodeIndex=parseInt(match[1]);
	     				nodeIndex--;
	     			}
				}
			}
		}
		var text="";
		
		for(var i in multiSelXpathArray){
			var contents = null;
			if(parentContents){
				var hasMultiNode=false;
				if(multiSelXpathArray[i].selector[multiNodeIndex].indexOf(":nth-of-type(*)")!=-1 ){
					hasMultiNode=true;
				}
				var len=multiSelXpathArray[i].selector.length;
				if(len>multiNodeIndex+1){
					var subCssPath=multiSelXpathArray[i].selector.slice(multiNodeIndex+1).join('');
					var subElements=parentContents.eq(nodeIndex).find(subCssPath);
					if(subElements!=null && subElements.length>0){
						contents = subElements.get(0);
					}
				}else{
					contents = parentContents.get(nodeIndex);
				}
			}else{
				var csspath=cssPathArray.join('')
				contents=jQuery('#newcrawler').contents().find(csspath).get(0);
			}
			if(contents==null || !contents){
				continue;
			}
			
			
			var eleObj=jQuery(contents);
			var data=ncx_et_tool.getContentFromeNode(eleObj, selectType, attr);
			
			if (data!=null && data!=undefined && data!=""){
				if(text!=""){
					text+='\r\n';
				}
				text+=data;
			}
		}
		text=ncx_innerFun.removeNcxText(text);
		return text;
	},
	getContentFromeNode:function(eleObj, selectType, attr){
		var data="";
		if(selectType=="@ATTR"){
			if(attr){
				data=eleObj.prop(attr);
				if (data==null || data==undefined || data=="" || typeof data !== 'string'){
					data=eleObj.attr(attr);
				}
				if(data!=undefined && data!="" && attr=="class"){
	        		data=data.replaceAll("ncx-\\S+", "").replaceAll("ncx_\\S+", "");
				}
				if(data!=undefined && data!="" && attr=="href"){
					data=data.replaceAll("#.*$", "");
				}
			}
		}else{
			var node=eleObj.get(0);
			switch (selectType) {
			case "outerHTML":
				var nodeValue=node.outerHTML;
				data=nodeValue;
				break;
			case "innerHTML":
				var nodeValue=node.innerHTML;
				data=nodeValue;
				break;
			case "innerTEXT":
				var nodeValue=eleObj.text();
				data=nodeValue;
				break;
			}
		}
		return data;
	},
	install : function(b) {
		jQuery('#newcrawler-selector').find("#ncx_et_bar").removeClass("ncx_shape1");
		jQuery('#newcrawler-selector').find(".ncx_bar_button_tilte").removeClass("ncx_on");
		jQuery('#newcrawler-selector').find("#ncx_et_content").removeClass("ncx_shape1");
		jQuery('#newcrawler-selector').find("#ncx_et_content").empty();
		switch (b) {
		case "ncx_et_state_10":
			jQuery('#newcrawler-selector').find("#ncx_et_bar").addClass("ncx_shape1");
			break;
		case "ncx_et_state_20":
			jQuery('#newcrawler-selector').find("#ncx_et_bar").addClass("ncx_shape1");
			jQuery('#newcrawler-selector').find(".ncx_col2 > .ncx_bar_button_tilte").addClass("ncx_on");
			jQuery('#newcrawler-selector').find("#ncx_et_content").addClass("ncx_shape1");
			var a = ncx_et_tool.getcode("et_conetent_inner_20");
			ncx_innerFun.innerAppend(jQuery('#newcrawler-selector').find("#ncx_et_content"), a);
			
			var xpath=ncx_et_tool.readCssPath(jQuery(ncx_et_tool.targetNow).get(0));
			jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").val(xpath);
			ncx_et_tool.installCopy();
			break;
		case "ncx_et_state_30":
			jQuery('#newcrawler-selector').find("#ncx_et_bar").addClass("ncx_shape1");
			jQuery('#newcrawler-selector').find(".ncx_col3 > .ncx_bar_button_tilte").addClass("ncx_on");
			jQuery('#newcrawler-selector').find("#ncx_et_content").addClass("ncx_shape1");
			var a = ncx_et_tool.getcode("et_conetent_inner_30");
			ncx_innerFun.innerAppend(jQuery('#newcrawler-selector').find("#ncx_et_content"), a);
			
			var csspath=ncx_et_tool.readCssPath(jQuery(ncx_et_tool.targetNow).get(0));
			jQuery('#newcrawler-selector').find("#ncx_copy_csspath_text").text(csspath);
			ncx_et_tool.installCopy();
			break;
		case "ncx_et_state_40":
			jQuery('#newcrawler-selector').find("#ncx_et_bar").addClass("ncx_shape1");
			jQuery('#newcrawler-selector').find(".ncx_col4 > .ncx_bar_button_tilte").addClass("ncx_on");
			jQuery('#newcrawler-selector').find("#ncx_et_content").addClass("ncx_shape1");
			var a = ncx_et_tool.getcode("et_conetent_inner_40");
			ncx_innerFun.innerAppend(jQuery('#newcrawler-selector').find("#ncx_et_content"), a);
			
			var node=jQuery(ncx_et_tool.targetNow).get(0);
			var nodeValue=node.innerHTML;
			
			jQuery('#newcrawler-selector').find(".ncx_et_content_inner select[name='ncx_attr']").unbind('change').change(function() {
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType][value='@ATTR']").prop('checked', true);
				if(this.value==""){
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType][value='innerHTML']").prop('checked', true);
					jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType][value='innerHTML']").click();
					return;
				}
				var content = ncx_et_tool.getContent(ncx_et_tool.multiSelXpathArray, '@ATTR');
				jQuery('#newcrawler-selector').find("#ncx_content_preview").text(content);
				
				jQuery('#ncx-selector-attr').val(this.value);
			});
			
			jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType]").unbind('click').click(function() {
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner select[name='ncx_attr']").val("");
				var selectType=jQuery(this).val();
				jQuery('#ncx-selector-attr').val(selectType);
				
				var content = ncx_et_tool.getContent(ncx_et_tool.multiSelXpathArray, selectType);
				jQuery('#newcrawler-selector').find("#ncx_content_preview").text(content);
			});
			jQuery('#newcrawler-selector').find("input[name=ncx_regex]").on("input", function(event){
				var selectType=jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType]:checked").val();
				var content = ncx_et_tool.getContent(ncx_et_tool.multiSelXpathArray, selectType);
				jQuery('#newcrawler-selector').find("#ncx_content_preview").text(content);
				
				
				var regex = jQuery('#newcrawler-selector').find("input[name=ncx_regex]").val();
				if(content!=null && content!="" && regex!=null && regex!=""){
					try{
						var regexObj = new RegExp(regex);
						var result = content.match(regexObj);
						if(result!=null && result.length>1){
							jQuery('#newcrawler-selector').find("#ncx_content_preview").text(result[1]);
						}
					}catch(e){}
				}
			});

			jQuery('#newcrawler-selector').find("input[name=ncx_regex]").keydown(function(ev) {
				var obj = ev.target || ev.srcElement;//获取事件源  
			    var t = obj.type || obj.getAttribute('type');//获取事件源类型  
			    var currKey=0; 
			    currKey=ev.keyCode||ev.which||ev.charCode;//支持IE、FF
			    var className= obj.className;
			    if (className!=null && className=="regex" && 
			    		(ev.ctrlKey && currKey == 70 ) &&    //CtrlF    
			            ((t == "text" ||  t == "textarea" ) && obj.readOnly == false) ) {
			        var str=obj.value;
			    	var newstr=str.replace(/([\^\$\(\)\*\+\?\.\[\\\{\|]{1})/ig,"\\$1");
			    	obj.value=newstr;
			    	ev.keyCode = 0;   
			    	ev.returnValue = false;   
			    }
		    });
			
			ncx_innerFun.initValue(ncx_et_tool.targetNow);
			ncx_et_tool.installCopy();
			ncx_et_tool.installEvent();
			break;
		}
		jQuery('#newcrawler-selector').find(".ncx_et_cancel").unbind('click').click(function() {
			var propertyName=jQuery('#newcrawler-selector').find("input[name=ncx_property_name]").val();
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").attr("title", propertyName);
			
			
			ncx_et_tool.moreOption={};
			var regex=jQuery('#newcrawler-selector').find("input[name=ncx_regex]").val();
			if(regex!=null && regex!=""){
				ncx_et_tool.moreOption={"regexFilter":regex};
			}
			
			var lang=jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").attr("lang");
			var selectExpress=jQuery('#newcrawler-selector').find("#ncx_copy_xpath_text").val();
			if(selectExpress!=lang){
				var labelObj=ncx_et_tool.createCSSpathLabel(selectExpress);
				ncx_et_tool.multiSelXpathArray = labelObj.multiSelXpathArray;
				ncx_et_tool.xpathArray2 = labelObj.multiSelXpathArray[0].selector2;
				ncx_et_tool.xpathArray = labelObj.multiSelXpathArray[0].selector;
				ncx_et_tool.targetNow = labelObj.multiSelXpathArray[0].element;
				
				var isAccept=false;
				if(newcrawler.fieldArray.length>1){
					isAccept=true;
				}
				jQuery('#newcrawler').contents().find("#ncx_curlCover .ncx_highlightTool").remove();
				jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.mouseover").remove();
				ncx_innerFun.selectHighlight(ncx_et_tool.targetNow, 1, isAccept);
			}
			ncx_innerFun.closeDetail();
		});
		
	},
	saveLabel:function(callback){
		ncx_traceHighlight.needSave=false;
		var len=jQuery("#ncx_toolbar .ncx-datatypes .ncx-data-dot.active").length;
		if(len==0){
			return;
		}
		if(jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot").hasClass("active")){
			var count=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").find(".ncx-count").text();
			count=parseInt(count);
			if(count==0){
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active .ncx-delete-datatype").click();
				return;
			}
		}else{
			return;
		}
		
		var index=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").attr("lang");
		var thisGroup = jQuery('#ncx-selector-attr option:selected').parent();
		var label=thisGroup.prop("label");
		
		var selectType="@ATTR";
		var selectAttr="";
		if(label=="Html"){
			selectType=jQuery('#ncx-selector-attr option:selected').val();
		}else{
			selectAttr=jQuery('#ncx-selector-attr option:selected').val();
		}
		var propertyName=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.active").attr("title");
		if(propertyName==null || propertyName==""){
			propertyName="property";
			if(ncx_innerFun.isPage()){
				index=0;
				propertyName="pagination";
			}else{
				for(var n=index; n<500; n++){
					propertyName="property"+n;
					var isExist=false;
					for(var i=1, len=newcrawler.fieldArray.length; i<len; i++){
						if(propertyName==newcrawler.fieldArray[i].name){
							isExist=true;
							break;
						}
					}
					if(!isExist){
						break;
					}
				}
			}
		}
		var xpathArray=[];
		if(ncx_et_tool.multiSelXpathArray.length>0){
			xpathArray=ncx_et_tool.multiSelXpathArray[0].selector;
		}
		var xpath=xpathArray.join('');
		
		ncx_et_tool.createLabel(null, index, propertyName, xpath, xpathArray, selectType, ncx_innerFun.isPage(), selectAttr, ncx_et_tool.multiSelXpathArray, ncx_et_tool.moreOption);
		
		if(callback){
			callback(null, index, propertyName, xpath, xpathArray, selectType, ncx_innerFun.isPage(), selectAttr, ncx_et_tool.multiSelXpathArray);
		}
		ncx_innerFun.contrlBtn(false);
		ncx_et_tool.moreOption={};
	},
	createXpathLabel:function(selectExpress){
		var newXpathArray=[];
		var xpathArray=selectExpress.split("/");
		for(var j=1, len=xpathArray.length; j<len; j++){
			if(xpathArray[j]==""){
				continue;
			}
			if(xpathArray[j].indexOf("*") === 0){
				newXpathArray.push("//"+xpathArray[j]);
			}else{
				newXpathArray.push("/");
				newXpathArray.push(xpathArray[j]);
			}
		}
		return newXpathArray;
	},
	createCSSpathLabel:function(selectExpress){
		ncx_et_tool.multiSelIndex=0;
		var multiSelXpathArray=[];
		var multiSelectExpress=selectExpress.split("|");
		var xpath='';
		var newXpathArray=[];var newXpathArray2=[];
		var element;
		for(var i in multiSelectExpress){
			xpath=multiSelectExpress[i];
			newXpathArray=[];
			newXpathArray2=[];
			
			var xpathArray=multiSelectExpress[i].split(" > ");
			for(var j=0, len=xpathArray.length; j<len; j++){
				if(xpathArray[j]==""){
					continue;
				}
				newXpathArray.push(" > ");
				newXpathArray.push(xpathArray[j]);
				
				newXpathArray2.push(" > ");
				if(xpathArray[j].indexOf(":nth-of-type(*)")!=-1){
					var xpathArrayTemp = xpathArray[j].replace(":nth-of-type(*)", ":nth-of-type(1)");
					newXpathArray2.push(xpathArrayTemp);
				}else{
					newXpathArray2.push(xpathArray[j]);
				}
			}
			if(newXpathArray[0]==' > '){
				newXpathArray=newXpathArray.slice(1);
				newXpathArray2=newXpathArray2.slice(1);
	        }
			for(var n=1;n<=50;n++){
				var xpath=newXpathArray.join('');
				xpath=xpath.replace(":nth-of-type(*)", ":nth-of-type("+n+")");
				var elements = jQuery('#newcrawler').contents().find(xpath);
				var eleCount=elements.length;
				if(eleCount>0){
					newXpathArray2=newXpathArray.slice(0);
					for(var j in newXpathArray2){
						if(newXpathArray2[j].indexOf(":nth-of-type(*)")!=-1){
							newXpathArray2[j]=newXpathArray2[j].replace(":nth-of-type(*)", ":nth-of-type("+n+")");
						}
					}
					element=elements[0];
					break;
				}
			}
			
			ncx_et_tool.multiSelIndex++;
			multiSelXpathArray.push({index:ncx_et_tool.multiSelIndex, selector:newXpathArray, selector2:newXpathArray2, element:element});
		}
		var labelObj={multiSelXpathArray:multiSelXpathArray, xpathArray:newXpathArray, xpath:xpath};
		return labelObj;
	},
	count:function(multiSelXpathArray){
		var eleCount=0;
		for(var i=0, len=multiSelXpathArray.length; i<len; i++){
			var queryXpath=multiSelXpathArray[i].selector.join('').replaceAll(":nth-of-type\\(\\*\\)", "");
			var elements = jQuery('#newcrawler').contents().find(queryXpath).filter(function() {
				var len=jQuery(this).parents("#ncx_cover-container").length;
			    return len==0;
		    });
			eleCount+=elements.length;
		}
		return eleCount;
	},
	createLabel:function(id, index, name, xpath, xpathArray, selectType, ispage, selectAttr, multiSelXpathArray, moreOption){
		var eleCount=ncx_et_tool.count(multiSelXpathArray);
		
		if(ispage){
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-pagination .ncx-count").attr("lang", eleCount);
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-pagination .ncx-count").text(eleCount);
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-pagination").addClass("finished ncx-blue");
			newcrawler.fieldArray[0]={id:id, index:0, name:name, xpath:xpath, xpathArray:xpathArray, selectType:selectType, selectAttr:selectAttr, multiSelXpathArray:multiSelXpathArray, moreOption:moreOption};
		}else{
			var isFinished=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label[lang="+index+"]").hasClass("finished");
			if(isFinished){
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label[lang="+index+"] .ncx-count").attr("lang", eleCount);
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label[lang="+index+"] .ncx-count").text(eleCount);
				//update
				for(var i=1, len=newcrawler.fieldArray.length; i<len; i++){
					if(index!=newcrawler.fieldArray[i].index){
						continue;
					}
					newcrawler.fieldArray[i].name=name;
					newcrawler.fieldArray[i].xpath=xpath;
					newcrawler.fieldArray[i].xpathArray=xpathArray;
					newcrawler.fieldArray[i].selectType=selectType;
					newcrawler.fieldArray[i].selectAttr=selectAttr;
					newcrawler.fieldArray[i].multiSelXpathArray=multiSelXpathArray;
					newcrawler.fieldArray[i].moreOption=moreOption;
					break;
				}
			}else{
				
				jQuery('<a lang="'+newcrawler.index+'" class="ncx-label ncx-data-dot ncx-blue finished" title="'+name+'"><span class="ncx-count" lang="'+eleCount+'">'+eleCount+'</span><span class="ncx-delete-datatype" style="display: none;"></span></a>').insertBefore(jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-yellow.active"));
				newcrawler.fieldArray.push({id:id, index:index, name:name, xpath:xpath, xpathArray:xpathArray, selectType:selectType, selectAttr:selectAttr, multiSelXpathArray:multiSelXpathArray, moreOption:moreOption});
				newcrawler.index=newcrawler.index+1;
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow.active").attr("lang", newcrawler.index);
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow.active").attr("title", "");
				//create
			}
			newcrawler.addFieldMap(name);
		}
		jQuery("#ncx_toolbar .save").attr("disabled", false);
		newcrawler.labelEvent();
	},
	larger: function(){
		var b = jQuery('#newcrawler-csspath').data("child");
		if (ncx_et_tool.targetIndex < b.length) {
			ncx_et_tool.targetIndex++
		}
		var a = b[ncx_et_tool.targetIndex];
		if (!ncx_innerFun.isNullOrEmpty(a)) {
			var b=a[0];
			ncx_et_tool.targetNow = b;
			
			var len=ncx_et_tool.multiSelXpathArray.length;
			ncx_et_tool.multiSelXpathArray=ncx_et_tool.multiSelXpathArray.slice(0, len-1);
			
			ncx_et_tool.readCssPath(b);
			b=ncx_et_tool.targetNow;
			
			var subxpath=ncx_et_tool.xpathArray.join('');
			jQuery('#newcrawler-csspath').text(subxpath);
			
			ncx_et_tool.multiSelIndex++;
			ncx_et_tool.multiSelXpathArray.push({index:ncx_et_tool.multiSelIndex, selector:ncx_et_tool.xpathArray, selector2:ncx_et_tool.xpathArray2, element:ncx_et_tool.targetNow});
			
			ncx_innerFun.selectHighlight(b, 2, false, ncx_et_tool.multiSelIndex);
			
			ncx_innerFun.initValue(b);
		}
	},
	smaller: function(){
		var b = jQuery('#newcrawler-csspath').data("child");
		if (ncx_et_tool.targetIndex > 0) {
			ncx_et_tool.targetIndex--
		}
		var a = b[ncx_et_tool.targetIndex];
		if (!ncx_innerFun.isNullOrEmpty(a)) {
			var b=a[0];
			ncx_et_tool.targetNow = b;
			
			var len=ncx_et_tool.multiSelXpathArray.length;
			ncx_et_tool.multiSelXpathArray=ncx_et_tool.multiSelXpathArray.slice(0, len-1);
			
			ncx_et_tool.readCssPath(ncx_et_tool.targetNow);
			b=ncx_et_tool.targetNow;
			
			var subxpath=ncx_et_tool.xpathArray.join('');
			jQuery('#newcrawler-csspath').text(subxpath);
			
			ncx_et_tool.multiSelIndex++;
			ncx_et_tool.multiSelXpathArray.push({index:ncx_et_tool.multiSelIndex, selector:ncx_et_tool.xpathArray, selector2:ncx_et_tool.xpathArray2, element:ncx_et_tool.targetNow});
			
			ncx_innerFun.selectHighlight(b, 2, false, ncx_et_tool.multiSelIndex);
			
			ncx_innerFun.initValue(b);
		}
	},
	readXPath:function (element) {
		var originElement=element;
		ncx_et_tool.xpathArray = [];
		ncx_et_tool.xpathArray2 = [];
        for (; element && element.tagName !== undefined; element = element.parentNode) {
        	var tagName = element.tagName;
        	if (!tagName) break;
        	tagName = tagName.toLowerCase();
        	
        	if (element.id=="ncx_cover-container" ) {
				continue;
			}
            var parentEle = jQuery(element).parent();
            var sameTagSiblings = parentEle.children(tagName).not("#ncx_cover-container");
            var len=sameTagSiblings.length;
            
            var tagNth="";
        	var tagNth2="";
        	
            if (len > 1) {
            	for(var index=0;index<len;index++){
            		var element2=sameTagSiblings[index];
            		if(ncx_et_tool.isSame(element, element2)){
            			if(tagNth==""){
            				tagNth = '[' + (index+1) + ']';
            			}
            			tagNth2 = '[' + (index+1) + ']';
            			continue;
            		}
            		
            		if(tagNth!='[*]' && ncx_et_tool.xpathArray.length>0){
            			var subXpathExpress=ncx_et_tool.xpathArray2.join('');
            			var subNodesSnapshot = document.evaluate(subXpathExpress, element2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                        var subCount=subNodesSnapshot.snapshotLength;
                        if(subCount>0){
                        	if(subCount>0){
                        		tagNth = '[*]';
                            	continue;
                        	}
                        }
            		}
            	}
            }
            
            if(tagNth!='[*]'){
            	var isUseID=false;
            	var attr="id";
            	var attr_value="";
            	if (element.id && !/\s/.test(element.id)) {
            		isUseID=true;
            		attr_value=element.id;
            	}else if (element.className && !/\s/.test(element.className)) {
            		isUseID=true;
            		attr="class";
            		attr_value=element.className;
            	}
            	
            	if (isUseID) {
            		if(ncx_innerFun.isPage()){
            			isUseID=false;
            			for(var ii=0, iiLen=ncx_et_tool.xpathArray.length; ii<iiLen; ii++){
            				if(ncx_et_tool.xpathArray[ii]=='a' 
            					|| ncx_et_tool.xpathArray[ii].indexOf('a[')==0){
            					isUseID=true;
            					break;
                			}
            			}
            		}
            		
            		if(isUseID){
                        var checkArray=ncx_et_tool.xpathArray.slice(0);//从已有的数组中返回选定的元素。
                    	for(var ic=0, icLen=checkArray.length; ic<icLen; ic++){
            				if(checkArray[ic].indexOf("[*]")!=-1 ){
            					checkArray[ic]=ncx_et_tool.xpathArray2[ic];
                			}
            			}
                    	
                    	var xpathExpressId='//*[@'+attr+'=\"' + attr_value + '\"]';
                    	checkArray.unshift(xpathExpressId);//向数组的开头添加一个或更多元素，并返回新的长度。
                        var xpathExpress=checkArray.join('');
                        nodesSnapshot = document.evaluate(xpathExpress, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                        if(nodesSnapshot.snapshotLength<=1){
                        	if(newcrawler.fieldArray.length>1){
                        		var compareXpathExpressId=newcrawler.fieldArray[1].xpathArray[0];
                            	if(xpathExpressId==compareXpathExpressId){
                            		ncx_et_tool.xpathArray.unshift(xpathExpressId);
                                	ncx_et_tool.xpathArray2.unshift(xpathExpressId);
                                	break;
                            	}
                        	}else{
                        		ncx_et_tool.xpathArray.unshift(xpathExpressId);
                            	ncx_et_tool.xpathArray2.unshift(xpathExpressId);
                            	break;
                        	}
                        	
                        }
            		}
                }
            	
            }else if(tagNth==""){
            	tagNth = '[1]';
            	tagNth2 = '[1]';
            }
            if(tagName=="html" || tagName=="body"){
            	tagNth="";
            	tagNth2="";
            }
            tagNth=tagName + tagNth;
        	tagNth2=tagName + tagNth2;
        	
            ncx_et_tool.xpathArray.unshift(tagNth);
            ncx_et_tool.xpathArray.unshift('/');
            
            ncx_et_tool.xpathArray2.unshift(tagNth2);
            ncx_et_tool.xpathArray2.unshift('/');
        }
        return ncx_et_tool.xpathArray.join('');
    },
    isSame:function(el1, el2) {
    	if(el1==undefined || el2==undefined){
    		return false;
    	}
    	var n=el1.compareDocumentPosition(el2);
    	if(n==0){
    		return true;
    	}
        return false;
    },
	readCssPath:function (element) {
		var originElement=element;
		ncx_et_tool.xpathArray = [];
		ncx_et_tool.xpathArray2 = [];
		
		var firstParentNodes = new Array();
		for(var i in newcrawler.fieldArray){
			var tempMultiSelXpathArray=newcrawler.fieldArray[i].multiSelXpathArray;
			var multiNodeIndex=-1;
			for(var i in tempMultiSelXpathArray){
				var cssPathArray=tempMultiSelXpathArray[i].selector;
				
				for(var ic=0, icLen=cssPathArray.length; ic<icLen; ic++){
		     		if(cssPathArray[ic].indexOf(":nth-of-type(*)")!=-1 ){
		     			multiNodeIndex=ic;
		     			break;
		 			}
				}
				if(multiNodeIndex!=-1){
					var tempArray=cssPathArray.slice(0, multiNodeIndex+1);
					for(var j=tempArray.length-1; j>=0; j--){
						if(tempArray[j]!=" > " && (tempArray[j].indexOf(":nth-of-type(*)")!=-1 || tempArray[j].indexOf(":nth-of-type")==-1)){
							var parentCssPath=tempArray.slice(0, j+1).join("").replace(":nth-of-type(*)", "");
							parentContents=jQuery('#newcrawler').contents().find(parentCssPath);
							if(parentContents!=null && parentContents.length>1){
								firstParentNodes.push(parentContents[0]);
							}
						}
					}
					break;
				}
			}
			if(multiNodeIndex!=-1){
				break;
			}
		}
		
		
		
        for (; element && element.tagName !== undefined; element = element.parentNode) {
        	var tagName = element.tagName;
        	if (!tagName) break;
        	tagName = tagName.toLowerCase();
        	if (element.id=="ncx_cover-container") {
				continue;
			}
        	
        	var parentEle = jQuery(element).parent();
            var sameTagSiblings = parentEle.children(tagName).not("#ncx_cover-container");
            var len=sameTagSiblings.length;
            
            var tagNth="";
        	var tagNth2="";
        	
        	var element2=sameTagSiblings[0];
        	
        	for(var index=0;index<len;index++){
        		element2=sameTagSiblings[index];
        		if(ncx_et_tool.isSame(element, element2)){
        			if(tagNth==""){
        				tagNth = ':nth-of-type(' + (index+1) + ')';
        			}
        			tagNth2 = ':nth-of-type(' + (index+1) + ')';
        			continue;
        		}
        		if(tagNth!=':nth-of-type(*)' && !ncx_innerFun.isPage() && !newcrawler_singlerow){
        			if(firstParentNodes!=null && firstParentNodes.length>0){
        				for(var i in firstParentNodes){
        					if(ncx_et_tool.isSame(firstParentNodes[i], element2)){
        						tagNth = ':nth-of-type(*)';
        						break;
        					}
        				}
                	}
        			if(tagNth!=':nth-of-type(*)'){
        				if(ncx_et_tool.xpathArray.length>0){
            				var subXpathExpress=ncx_et_tool.xpathArray2.join('');
                			var subNodesSnapshot = jQuery(element2).find(subXpathExpress);
                            var subCount=subNodesSnapshot.length;
                            if(subCount>0){
                            		tagNth = ':nth-of-type(*)';
                                	continue;
                            }
            			}else{
            				tagNth = ':nth-of-type(*)';
                        	continue;
            			}
        			}
        		}
        		
        	}
            
            if(tagNth==""){
            	tagNth = '';
            	tagNth2 = '';
            }
            if(tagName=="html" || tagName=="body"){
            	tagNth="";
            	tagNth2="";
            }
            
        	var eleLen=ncx_et_tool.checkLength(tagName);
        	var eleClassName=element.className;
        	var eleId=element.id;
        	if(typeof eleClassName  !=="string"){
        		eleClassName=null;
        	}
        	if (eleClassName) {
        		var eleClassNames=eleClassName.split(" ");
        		var newClassName=null;
        		for(var i=0, len=eleClassNames.length; i<len; i++){
        			if (eleClassNames[i]!="" && eleClassNames[i].indexOf("ncx-")==-1 && eleClassNames[i].indexOf('ncx_')==-1 && !/\d+/.test(eleClassNames[i])) {
        				if(newClassName==null){
        					newClassName=eleClassNames[i];
        					break;
        				}
        			}
        		}
        		eleClassName=newClassName;
        	}
        	
            var isUseID=false;
        	var attr="#";
        	var attr_value="";
        	if (eleClassName && !/\s/.test(eleClassName)) {
        		isUseID=true;
        		attr=".";
        		attr_value=eleClassName;
        	}else if (element.id && !/\s/.test(element.id)) {
        		isUseID=true;
        		attr_value=element.id;
        		if(!isNaN(attr_value)){
        			attr_value="\\3"+element.id;
        		}
        	}
        	
        	if (isUseID) {
        		if(ncx_innerFun.isPage()){
        			isUseID=false;
        			for(var ii=0, iiLen=ncx_et_tool.xpathArray.length; ii<iiLen; ii++){
        				if(ncx_et_tool.xpathArray[ii]=='a' 
        					|| ncx_et_tool.xpathArray[ii].indexOf('a:')==0){
        					isUseID=true;
        					break;
            			}
        			}
        		}
        		if(isUseID){
        			var selector=tagName+attr + attr_value + tagNth;
        			var selector2=tagName+attr + attr_value + tagNth2;
        			
        			var selector3=tagName+attr + attr_value;
        			
        			var eleLenWithId=ncx_et_tool.checkLength(selector3);
        			
                    if(eleLenWithId==eleLen && eleLenWithId!=-1){
                    	var checkArray=ncx_et_tool.xpathArray.slice(0);//从已有的数组中返回选定的元素。
                    	var checkArray2=ncx_et_tool.xpathArray2.slice(0);//从已有的数组中返回选定的元素。
                    	
                    	if(ncx_et_tool.isSameParentFun(selector3, checkArray, checkArray2)){
                    		if(!ncx_innerFun.isPage() && newcrawler.fieldArray.length>1){
                        		var compareXpathExpressId=newcrawler.fieldArray[1].xpathArray[0];
                            	if(selector==compareXpathExpressId){
                            		ncx_et_tool.xpathArray.unshift(selector);
                                	ncx_et_tool.xpathArray2.unshift(selector2);
                                	break;
                            	}else if(tagNth==":nth-of-type(*)"){
                            		if(compareXpathExpressId.indexOf(selector3)==0){
                            			ncx_et_tool.xpathArray.unshift(compareXpathExpressId);
                                    	ncx_et_tool.xpathArray2.unshift(selector2);
                                    	break;
                                	}
                            	}
                        	}else{
                        		ncx_et_tool.xpathArray.unshift(selector);
                            	ncx_et_tool.xpathArray2.unshift(selector2);
                            	break;
                        	}
                    	}
                    	
                    }
                    
        		}
            }
            ncx_et_tool.xpathArray.unshift(tagName + tagNth);
            ncx_et_tool.xpathArray.unshift(' > ');
            
            ncx_et_tool.xpathArray2.unshift(tagName + tagNth2);
            ncx_et_tool.xpathArray2.unshift(' > ');
        }
        if(ncx_et_tool.xpathArray[0]==' > '){
        	ncx_et_tool.xpathArray=ncx_et_tool.xpathArray.slice(1);
        	ncx_et_tool.xpathArray2=ncx_et_tool.xpathArray2.slice(1);
        }
        if(ncx_innerFun.isPage()){
        	var linkIndex=-1;
        	for(var i=ncx_et_tool.xpathArray.length-1; i>=0; i--){
        		var pathnode=ncx_et_tool.xpathArray[i];
        		if(pathnode=='a' || pathnode.indexOf('a:')==0){
        			linkIndex=i;
					break;
    			}
        	}
        	if(linkIndex>0){
        		ncx_et_tool.xpathArray=ncx_et_tool.xpathArray.slice(0, linkIndex+1);
        		ncx_et_tool.xpathArray2=ncx_et_tool.xpathArray2.slice(0, linkIndex+1);
        		
        		var selectorCss=ncx_et_tool.xpathArray.join('');
        		var elements = jQuery('#newcrawler').contents().find(selectorCss);
    			var eleCount=elements.length;
    			if (eleCount>0) {
    				var element = elements[0];
					ncx_et_tool.targetNow = element;
    			}
        	}
        	
        }
        var selectorCss=ncx_et_tool.xpathArray.join('');
        
        var tempXpathArray=ncx_et_tool.getMultSelectCssPath();
    	var multNodeIndex=-1;
    	if(tempXpathArray!=null){
    		for(var i=0, iLen=tempXpathArray.length; i<iLen; i++){
        		if(tempXpathArray[i].indexOf(":nth-of-type(*)")!=-1){
        			multNodeIndex=i;
            	}
        	}
    	}
    	

        if(multNodeIndex!=-1){
        	for(var i=0, iLen=ncx_et_tool.xpathArray.length; i<iLen; i++){
    			if(ncx_et_tool.xpathArray[i].indexOf(":nth-of-type(*)")!=-1){
    				var xpathArray=ncx_et_tool.xpathArray2.slice(0);
            		var xpathArray2=ncx_et_tool.xpathArray2.slice(0);
            		
            		xpathArray[i]=ncx_et_tool.xpathArray[i];
    				if(!ncx_et_tool.isSameParentFun('', xpathArray, xpathArray2)){
    					ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
    				}
    			}
    		}
        	var hasSamePrefix=true;
        	var iLen=ncx_et_tool.xpathArray.length;
        	if(iLen>=multNodeIndex){
        		for(var i=0 ; i<=multNodeIndex; i++){
            		var isSame=true;
            		
            		if((i>=tempXpathArray.length || i>multNodeIndex)){
            			isSame=false;
            		}else {
            			var nodeName1=tempXpathArray[i];
                		var nodeName2=ncx_et_tool.xpathArray[i];
            			
    					var tempNodeName1=nodeName1;
    					var tempNodeName2=nodeName2;
    					
    					if(nodeName1.indexOf(":nth-of-type")!=-1){
    						tempNodeName1=nodeName1.substring(0, nodeName1.indexOf(":nth-of-type"));
    					}
    					if(nodeName2.indexOf(":nth-of-type")!=-1){
    						tempNodeName2=nodeName2.substring(0, nodeName2.indexOf(":nth-of-type"));
    					}
    					
            			if(tempNodeName1!=tempNodeName2){
            				isSame=false;
            			}
            		}
            		if(hasSamePrefix){
            			hasSamePrefix=isSame;
            		}
            	}
        	}else{
        		hasSamePrefix=false;
        	}
        	
        	
        	var isSamePrefix=true;
        	for(var i=0, iLen=ncx_et_tool.xpathArray.length; i<iLen; i++){
        		var isSame=true;
        		
        		if((i>=tempXpathArray.length || i>multNodeIndex || !hasSamePrefix)){
        			isSame=false;
        			ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
        		}else {
        			var nodeName1=tempXpathArray[i];
            		
            		var nodeName2=ncx_et_tool.xpathArray[i];
            		
        			var hasMultiNode1=false;
					var hasMultiNode2=false;
					if(nodeName1.indexOf(":nth-of-type")==-1 || nodeName1.indexOf(":nth-of-type(*)")!=-1){
						hasMultiNode1=true;
					}
					if(nodeName2.indexOf(":nth-of-type")==-1 || nodeName2.indexOf(":nth-of-type(*)")!=-1){
						hasMultiNode2=true;
					}
					var tempNodeName1=nodeName1;
					var tempNodeName2=nodeName2;
					
					if(nodeName1.indexOf(":nth-of-type")!=-1){
						tempNodeName1=nodeName1.substring(0, nodeName1.indexOf(":nth-of-type"));
					}
					if(nodeName2.indexOf(":nth-of-type")!=-1){
						tempNodeName2=nodeName2.substring(0, nodeName2.indexOf(":nth-of-type"));
					}
					
        			if(tempNodeName1!=tempNodeName2){
        				isSame=false;
        			}
        			
        			if(hasMultiNode2){
            			if(isSame){
            				if(!isSamePrefix){
            					ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
            				}else if(nodeName1.indexOf(":nth-of-type")==-1){
            					ncx_et_tool.xpathArray[i]=nodeName1;
            				}else if(newcrawler.fieldArray.length>1){
            					ncx_et_tool.xpathArray[i]=nodeName1;
            				}
            			}else {
            				ncx_et_tool.xpathArray[i]=ncx_et_tool.xpathArray2[i];
                			//isSame=true;
            			}
            		}else if(hasMultiNode1 && isSamePrefix && isSame){
            			ncx_et_tool.xpathArray[i]=nodeName1;
            		}
        		}
        		
        		if(isSamePrefix){
        			isSamePrefix=isSame;
        		}
        	}
        }
        var selectorCss=ncx_et_tool.xpathArray.join('');
        return selectorCss;
    },
    getMultSelectCssPath:function(){
    	var multSelectCssPathArray;
    	if(newcrawler.fieldArray.length>1){
    		for(var i=0, iLen=newcrawler.fieldArray.length; i<iLen; i++){
    			var multiSelXpathArray=newcrawler.fieldArray[1].multiSelXpathArray;
    			for(var j=0, jLen=multiSelXpathArray.length; j<jLen; j++){
    				var selector=multiSelXpathArray[j].selector;
    				for(var k=0, kLen=selector.length; k<kLen; k++){
    					if(selector[k].indexOf(":nth-of-type(*)")!=-1){
    						multSelectCssPathArray=selector;
    						break;
    					}
    				}
    				if(multSelectCssPathArray!=null){
    					break;
    				}
    			}
    			if(multSelectCssPathArray!=null){
					break;
				}
    		}
    		if(multSelectCssPathArray==null){
    			multSelectCssPathArray=newcrawler.fieldArray[1].xpathArray;
        	}
    	}else if(ncx_et_tool.multiSelXpathArray.length>0 ){
    		var multiSelXpathArray=ncx_et_tool.multiSelXpathArray;
    		for(var j=0, jLen=multiSelXpathArray.length; j<jLen; j++){
				var selector=multiSelXpathArray[j].selector;
				for(var k=0, kLen=selector.length; k<kLen; k++){
					if(selector[k].indexOf(":nth-of-type(*)")!=-1){
						multSelectCssPathArray=selector;
						break;
					}
				}
				if(multSelectCssPathArray!=null){
					break;
				}
			}
    		if(multSelectCssPathArray==null){
    			multSelectCssPathArray=ncx_et_tool.multiSelXpathArray[0].selector;
        	}
    	}
    	return multSelectCssPathArray;
    },
    isSameParentFun:function(selector, xpathArray, xpathArray2){
    	var tempParentEle=null;
    	var tempXpathArray=ncx_et_tool.getMultSelectCssPath();
    	if(tempXpathArray!=null){
    		var selector2=tempXpathArray.join('').replace(":nth-of-type(*)", "");
    		jQuery('#newcrawler').contents().find(selector2).each(function(){
    			tempParentEle=ncx_et_tool.getParentElement(this, tempXpathArray);
    			return false;
            });
    	}
        
    	var hasDifferenceParent=false;
    	if(selector!=null && selector!=""){
    		xpathArray.unshift(selector);//向数组的开头添加一个或更多元素，并返回新的长度。
    	}
    	var hasStar=false;
    	for(var ic=0, icLen=xpathArray.length; ic<icLen; ic++){
     		if(xpathArray[ic].indexOf(":nth-of-type(*)")!=-1){
     			hasStar=true;
     			var checkArray2=xpathArray2.slice(0);
     			if(selector!=null && selector!=""){
     				checkArray2.unshift(selector);//向数组的开头添加一个或更多元素，并返回新的长度。
     			}
     			checkArray2[ic]=xpathArray[ic];
     			
     			var parentEle=null;
     			var selector2=checkArray2.join('').replace(":nth-of-type(*)", "");
        		jQuery('#newcrawler').contents().find(selector2).each(function(){
        			parentEle=ncx_et_tool.getParentElement(this, checkArray2);
        			if(tempParentEle==null){
        				tempParentEle=parentEle;
        				return;
        			}
        			if(parentEle!=null && tempParentEle!=null){
            			if(!ncx_et_tool.isSame(tempParentEle[0], parentEle[0])){
            				hasDifferenceParent=true;
            				return false;
            			}
            		}
                });
     		}
    	}
    	if(!hasStar){
    		var selector2=xpathArray.join('');
    		jQuery('#newcrawler').contents().find(selector2).each(function(){
    			parentEle=ncx_et_tool.getParentElement(this, xpathArray);
    			if(tempParentEle==null){
    				tempParentEle=parentEle;
    				return;
    			}
    			if(parentEle!=null && tempParentEle!=null){
        			if(!ncx_et_tool.isSame(tempParentEle[0], parentEle[0])){
        				hasDifferenceParent=true;
        				return false;
        			}
        		}
            });
    	}
    	return !hasDifferenceParent;
    },
    getParentElement:function(obj, checkArray){
    	var len=checkArray.length;
    	var nodeCount=len/2-1;
    	var parentEle=jQuery(obj).parent();
    	for(var i=0; i<nodeCount; i++){
    		parentEle=jQuery(parentEle).parent();
    	}
    	return parentEle;
    },
    checkLength:function(selector){
    	var checkArray=ncx_et_tool.xpathArray.slice(0);//从已有的数组中返回选定的元素。
     	for(var ic=0, icLen=checkArray.length; ic<icLen; ic++){
     		if(checkArray[ic].indexOf(":nth-of-type(*)")!=-1 ){
     			checkArray[ic]=ncx_et_tool.xpathArray2[ic];
 			}
		}
     	checkArray.unshift(selector);//向数组的开头添加一个或更多元素，并返回新的长度。
     	
     	selector=checkArray.join('');
        try{
     		var nodesSnapshot = jQuery('#newcrawler').contents().find(selector);
     		return nodesSnapshot.length;
     	}catch(e){
     		return -1;
     	}
    },
	alterInstall : function() {
		jQuery('#newcrawler-selector').find(".ncx_bar_button_tilte").mouseover(function() {
			jQuery(this).addClass("ncx_onhover");
		});
		jQuery('#newcrawler-selector').find(".ncx_bar_button_tilte").mouseout(function() {
			jQuery(this).removeClass("ncx_onhover");
		});
		jQuery('#newcrawler-selector').find("#ncx_et_state_2").unbind('click').click(function() {
			ncx_et_tool.install("ncx_et_state_20");
		});
		jQuery('#newcrawler-selector').find("#ncx_et_state_3").unbind('click').click(function() {
			ncx_et_tool.install("ncx_et_state_30");
		});
		jQuery('#newcrawler-selector').find("#ncx_et_state_4").unbind('click').click(function() {
			ncx_et_tool.install("ncx_et_state_40");
		});
		
		jQuery('#newcrawler-selector').find("#ncx_et_state_4").trigger("click");
		
		jQuery('#newcrawler-selector').find("#ncx_edit_tpl_tool").drags({handle:".ncx_et_bar"});
	}
};

String.prototype.replaceAll = function(b, a) {
	var data=this.replace(new RegExp(b, "g"), a);
	return data;
};

var newcrawler = {
		dragging:null,
	index:1,
	fieldArray:Array(),
	allowScale : 1,
	webCrawlerId : null,
	siteId : null,
	rulesVerId : null,
	pageNum:0,
	pageSize:20,//GAE limit max 30
	total:0,
	jsonData:null,
	url:null,
	crawlDataLog:null,
	pageX:null,
	pageY:null,
	message:function(action, message, time, style) {
		
		var msgBox = document.getElementById('ncx_message-box');
		if(!msgBox){
			var xpathNode='<div id="ncx_message-box" style="border-radius: 2px;padding: 5px 15px; font-size: 12px; font-color: #333; font-weight: bold; position: fixed!important; top: 50px; left: 50%; z-index: 2147483500; display: none;"></div>';
	    	
			var e = document.createElement('div');
			e.innerHTML = xpathNode;
			document.body.appendChild(e.firstChild);
			
	    	msgBox = document.getElementById('ncx_message-box');
		}else{
			msgBox.innerHTML = '';
			msgBox.style.display = 'none';
		}
		if (action == 'hide') {
			msgBox.innerHTML = '';
			msgBox.style.display = 'none';
			return;
		}
		
		if (action == 'show') {
			msgBox.innerHTML = message;
			msgBox.style.display = 'block';
			msgBox.style.marginLeft = -((msgBox.clientWidth) / 2) + 'px';
		} else if (action == 'fade') {
			msgBox.innerHTML = message;
			msgBox.style.display = 'block';
			msgBox.style.marginLeft = -((msgBox.clientWidth) / 2) + 'px';
			setTimeout(function(){
				newcrawler.message('hide');
			}, time);
		}
		jQuery(document).find("#ncx_message-box").removeClass("message_red");
		jQuery(document).find("#ncx_message-box").removeClass("message_green");
		jQuery(document).find("#ncx_message-box").removeClass("message_yellow");
		
		if(style=="red"){
			jQuery(document).find("#ncx_message-box").addClass("message_red");
		}else if(style=="green"){
			jQuery(document).find("#ncx_message-box").addClass("message_green");
		}else{
			jQuery(document).find("#ncx_message-box").addClass("message_yellow");
		}
		
	},
	cover : '<div id="ncx_cover-container" style="display: block; opacity: 1;">'
			+ '<div id="ncx_curlCover" class="ncx_curlCover"  style="z-index : 1999999999; filter:Alpha(Opacity=100); -moz-opacity: 1; opacity: 1;  pointer-events:none; text-align: left; background : transparent;top:0;left:0;position:absolute;overflow:hidden;">'
			+ '</div></div>',
	after : function() {
		
		jQuery('#newcrawler').contents().find('body').append(newcrawler.cover);
		jQuery('#newcrawler').contents().find('body').css({"cursor" : "pointer"});
		
		jQuery('#newcrawler').contents().find("#ncx_curlCover").unbind("click").click(function() {
			ncx_innerFun.closeCover();
		});
		
		var name=jQuery('#newcrawler').contents().get(0).title;
		
		document.title="NewCrawler ™ "+name;
		
		var b = jQuery('#newcrawler').contents().height();
		var d = jQuery('#newcrawler').contents().width();
		if (d < 600) {
			d = 980;
		}
		var a = d + 8;
		var c = b + 8;
		jQuery('#newcrawler').contents().find("#ncx_curlCover").css({
			width : d,
			height : b + 8
		});
	},
	event : function(){
		var cookie_event=newcrawler.readCookie("NC_IS_EVENT");
		if(cookie_event==1){
			jQuery("#ncx_toolbar .ncx-event input[type=checkbox][name='ncx-isEvent']").prop('checked', true);
			//http://localhost:8070/soso-crawler/member/newcrawler/read?base64=true&webCrawlerId=1&siteId=21&u=%3DkDN0cTMz8Cdv02bj5CelJjduc3d39yL6MHc0RHa&update=1
			jQuery('#newcrawler').contents().find("a").unbind("click").click(function(){
				var href=jQuery(this).prop("href");
				
				
				href=BASE64.encode(href);
				href = href.split('').reverse().join('');
				href = encodeURIComponent(href);
				
				var url=jQuery('#newcrawler').prop("src");
				url=top.window.location.href;
				
				url=url.replace(/&u=.+/g, "&u="+href);
				//jQuery(this).prop("href", url);
				
				top.window.location.href=url;
				return false;
			});
			
			return;
		}
		if(newcrawler_singlerow){
			jQuery("#ncx_toolbar .ncx-single input[type=checkbox][name='ncx-isSingle']").prop('checked', true);
		}
		jQuery('#newcrawler').contents().find("*").unbind();
		jQuery('#newcrawler').contents().find("a").unbind("click").click(function(){
			return false;
		});
		
		jQuery('#newcrawler').contents().find('body').find('*').each(function(){
			jQuery(this).off();
		});
		jQuery('#newcrawler').contents().find('body').find('*').unbind();
		jQuery('#newcrawler').contents().find('body').find('*').each(function(){
			this.onclick = function(){return false;}
			this.onload = function(){return false;}
			this.onerror = function(){return false;}
			this.onmouseleave = function(){return false;}
			this.onmousedown = function(){return false;}
			this.onmouseover = function(){return false;}
		});
		
		
		jQuery('#newcrawler').contents().find('body').find('*').not('iframe').contents().filter(function() {
			var isText=(this.nodeType == 3);
			var hasOthers=false;
			var len=jQuery(this).parent().contents().length;
			if(len>1){
				hasOthers=true;
			}
			var hasContent=false;
			if(isText && hasOthers){
				var nodeValue=this.nodeValue;
				if(nodeValue!=null && nodeValue!="" && nodeValue.search(/\S/)>-1){
					hasContent=true;
				}
			}
			return hasContent;
		}).wrap('<ncx-text></ncx-text>');
		
		jQuery('#newcrawler').contents().find('body').find('*').not('iframe').contents().filter(function() {
			var isText=(this.nodeType == 3);
			var hasOthers=false;
			var len=jQuery(this).parent().contents().length;
			if(len>1){
				hasOthers=true;
			}
			var isBlank=false;
			if(isText && hasOthers){
				var nodeValue=this.nodeValue;
				if(nodeValue!=null && nodeValue!="" && nodeValue.search(/\S/)==-1){
					isBlank=true;
				}
			}
			return isBlank;
		}).wrap('<ncx-text style="display:none;"></ncx-text>');
		
		jQuery('#newcrawler').contents().find('body').find('*').bind("mouseover", function(f){
			f = f || window.event;
			var g = f.target || f.srcElement;
			var tagName=jQuery(g).get(0).tagName.toLowerCase()
			if(tagName!="img"){
				var gContent=jQuery(g).html();
				gContent=gContent.replace(/\s+/g, "");
				if(gContent==null || gContent==""){
					var height=jQuery(g).height();
					if(tagName=="a"){
						if(height>10){
							jQuery(g).css({"height":"10px"});
							return false;
						}
					}else{
						jQuery(g).css({"pointer-events":"none"});
						return false;
					}
					
					
				}
			}
			
			if(ncx_traceHighlight.timer){
				clearTimeout(ncx_traceHighlight.timer)
			}
			
			
			var isProcess=ncx_traceHighlight.process(f);
			
			if(isProcess){
				jQuery('#newcrawler').contents().find("#ncx_cover-container .ncx_highlightTool.mouseover").remove();
				ncx_traceHighlight.timer=setTimeout(function(){
					ncx_traceHighlight.timer=null;
					ncx_innerFun.moveSelect(ncx_traceHighlight.element);
				}, 80);
			}
			
			
			return false;
		});
		
		var ctrlKey = 17,
	        cmdKey = 91,
	        vKey = 86,
	        cKey = 67,
	        spaceKey = 32,
	        enterKey=13,
	        escKey=27,
	        rightKey=39;	
		
		$(document).keydown(function(e) {
			if ((e.ctrlKey || e.metaKey) && e.keyCode == spaceKey) {
				console.log("Ctrl+Space Pressed 1!");
	        	if(!ncx_et_tool.isAddSelector){
	        		ncx_traceHighlight.isDetail=!ncx_traceHighlight.isDetail;
		        	ncx_innerFun.preview();
	        	}
			    return false;
			}else if (e.keyCode == rightKey) {
	        	console.log("RightKey Pressed 1!");
	        	jQuery("#ncx_toolbar .ncx-datatypes .ncx-new-datatype").click();
			    return false;
	        }else if (e.keyCode == escKey) {
	        	console.log("ESC Pressed 1!");
	        	newcrawler.reset();
			    return false;
	        }
	    });
		
		$(document.getElementById('newcrawler').contentWindow.document).keydown(function(e){ 
			if ((e.ctrlKey || e.metaKey) && e.keyCode == spaceKey) {
				console.log("Ctrl+Space Pressed 2!");
	        	if(!ncx_et_tool.isAddSelector){
	        		ncx_traceHighlight.isDetail=!ncx_traceHighlight.isDetail;
		        	ncx_innerFun.preview();
	        	}
			    return false;
			}else if (e.keyCode == rightKey) {
	        	console.log("RightKey Pressed 2!");
	        	jQuery("#ncx_toolbar .ncx-datatypes .ncx-new-datatype").click();
			    return false;
	        }else if (e.keyCode == escKey) {
	        	console.log("ESC Pressed 2!");
	        	newcrawler.reset();
			    return false;
	        }
		});
		
		jQuery('#newcrawler').contents().find("*").each(function(){
			jQuery(this).keydown(function(e) {
				if ((e.ctrlKey || e.metaKey) && e.keyCode == spaceKey) {
					console.log("Ctrl+Space Pressed 3!");
		        	if(!ncx_et_tool.isAddSelector){
		        		ncx_traceHighlight.isDetail=!ncx_traceHighlight.isDetail;
			        	ncx_innerFun.preview();
		        	}
				    return false;
				}else if (e.keyCode == rightKey) {
		        	console.log("RightKey Pressed 3!");
		        	jQuery("#ncx_toolbar .ncx-datatypes .ncx-new-datatype").click();
				    return false;
		        }else if (e.keyCode == escKey) {
		        	console.log("ESC Pressed 3!");
		        	newcrawler.reset();
				    return false;
		        }
		    });
		});
		
		jQuery('#newcrawler').contents().find('body').find('*').each(function(){
			jQuery(this).unbind('click').click(function(f) {
				f = f || window.event;
				ncx_innerFun.clickSelect(f);
				return false;
			});
		});
	},
	toolbarEvent:function(){
		  var url=decodeURIComponent(newcrawler_fetch_url);
		
		  jQuery("#ncx_toolbar #url").text(url);
		  jQuery("#ncx_toolbar #url").parent().attr("href", url).attr("title", url);

		  jQuery("#ncx_toolbar .ncx-save").unbind('click').click(function(){
			  newcrawler.save(newcrawler_server_url, function(){
				  jQuery("#ncx_toolbar .ncx-cron-config").hide();
				  jQuery("#ncx_toolbar .ncx-setting-config").hide();
			  });
		  });

		  jQuery("#ncx_toolbar .ncx-test").click(function(){
			  jQuery("#ncx_toolview").hide(100);
			  jQuery("#ncx_toolbar .ncx-help-info").hide(100);
			  jQuery("#ncx_tooltest .ncx-content-top-details").hide(100);
			  jQuery("#ncx_toolbar .ncx-test .view-pop").toggle(600);
			  jQuery("#ncx_tooltest").toggle(600, function(){
				  if(jQuery( "#ncx_tooltest" ).is(':visible')){
					  var crawlUrl=jQuery("#ncx_toolbar #url").parent().attr("href");
					  newcrawler.test(crawlUrl);
				  }
			  });
		  });
		  jQuery("#ncx_tooltest .ncx-details").click(function(){
			  jQuery("#ncx_tooltest .ncx-content-top-details").toggle(100);
		  });
		  jQuery("#ncx_tooltest .ncx-next").click(function(){
			  var crawlUrl=jQuery("#ncx_tooltest .ncx-details-content .nextUrl").attr("href");
			  if(crawlUrl!=null && crawlUrl!=""){
				  newcrawler.test(crawlUrl);
			  }
		  });
		  
		  jQuery("#ncx_toolbar .ncx-view").click(function(){
			  jQuery("#ncx_tooltest").hide(100);
			  jQuery("#ncx_toolbar .ncx-help-info").hide(100);
			  newcrawler.view();
			  jQuery("#ncx_toolview .ncx-content-top-export").hide(100);
			  
			  jQuery("#ncx_toolbar .ncx-view .view-pop").toggle(600);
			  jQuery("#ncx_toolview").toggle(600, function(){
				  if(jQuery( "#ncx_toolview" ).is(':visible')){
					  document.body.parentNode.style.overflow = "hidden";
					  jQuery("#ncx_toolview #ncx-crawlDataLog").show();
					  
					  if(newcrawler.webCrawlerId!=null & newcrawler.siteId!=null){
						  newcrawler.crawlDataLog["v"]["siteId"]=newcrawler.siteId;
						  newcrawler.crawlDataLog["init"]();
						  
						  var items_per_page=jQuery("#ncx_toolview > .ncx-content-top").find("#ncx-pagination-size").val();
						  if(items_per_page==20){
							  newcrawler.refresh();
						  }
					  }
				  }else{
					  document.body.parentNode.style.overflow = "auto";
					  jQuery("#ncx_toolview #ncx-crawlDataLog").hide();
					  if(newcrawler.webCrawlerId!=null & newcrawler.siteId!=null){
						  newcrawler.crawlDataLog["v"]["siteId"]=newcrawler.siteId;
						  newcrawler.crawlDataLog["destory"]();
					  }
				  }
			  });
		  });
		  
		  jQuery("#ncx_toolbar .ncx-js .isJavaScript").unbind('click').click(function(){
			  newcrawler.save(newcrawler_server_url, function(){
				  top.window.location.href=newcrawler.url;
			  });
		  });
		  jQuery("#ncx_toolbar .ncx-source .isSource").unbind('click').click(function(){
			  var checked=jQuery("#ncx_toolbar .ncx-source input[type=checkbox][name='ncx-isSource']").is(':checked');
			  jQuery('#newcrawler-csspath').text("");
			  jQuery("#ncx_toolbar .ncx-help-info").hide(100);
			  if(checked){
				  viewcode();
			  }else{
				  document.getElementById("viewCodeDiv").style.display="none";
				  document.getElementById("newcrawler").style.display="block";
			  }
		  });
		  jQuery("#ncx_toolbar .ncx-style .isStyle").unbind('click').click(function(){
			  var checked=jQuery("#ncx_toolbar .ncx-style input[type=checkbox][name='ncx-isStyle']").is(':checked');
			  
			  jQuery('#newcrawler').contents().find('link').each(function(){
				  if(checked){
					  var hrefName=$(this).attr("ncx-href");
					  $(this).attr("href", hrefName);
					  $(this).removeAttr("ncx-href");
				  }else{
					  var hrefName=$(this).attr("href");
					  $(this).removeAttr("href");
					  if(hrefName!=null && hrefName!=""){
						  $(this).attr("ncx-href", hrefName);
					  }
				  }
			  });
			 
			  jQuery('#newcrawler').contents().find('body').find('*').filter(function(){
				  return this.nodeName!="NCX-TEXT";
			  }).each(function(){
				  if(checked){
					  var styleName=$(this).attr("ncx-style");
					  $(this).attr("style", styleName);
					  $(this).removeAttr("ncx-style");
				  }else{
					  var styleName=$(this).attr("style");
					  $(this).removeAttr("style");
					  if(styleName!=null && styleName!=""){
						  $(this).attr("ncx-style", styleName);
					  }
					  
				  }
			  });
		  });
		  
		  jQuery("#ncx_toolbar .ncx-event .isEvent").unbind('click').click(function(){
			  var checked=jQuery("#ncx_toolbar .ncx-event input[type=checkbox][name='ncx-isEvent']").is(':checked');
			  if(checked){
				  //write cookie
				  newcrawler.createCookie("NC_IS_EVENT", 1, 7);
				  
				  window.location.reload();
			  }else{
				  //remove cookie
				  newcrawler.eraseCookie("NC_IS_EVENT");
				  
				  newcrawler.initIframe();
			  }
		  });
		  
		  jQuery("#ncx_toolbar .ncx-single .isSingle").unbind('click').click(function(){
			  var checked=jQuery("#ncx_toolbar .ncx-single input[type=checkbox][name='ncx-isSingle']").is(':checked');
			  if(checked){
				  //write cookie
				  newcrawler.createCookie("NC_IS_SINGLE", 1, 7);
				  newcrawler_singlerow=true;
			  }else{
				  //remove cookie
				  newcrawler.eraseCookie("NC_IS_SINGLE");
				  newcrawler_singlerow=false;
			  }
		  });
		  
		  jQuery("#ncx_toolview .ncx-refresh").click(function(){
			  newcrawler.refresh();
		  });
		  
		  jQuery("#ncx_toolview .ncx-export").click(function(){
			  if(jQuery("#ncx_toolview .ncx-export-window").is(':visible')){
				  jQuery("#ncx_toolview .ncx-export-window").hide(100);
			  }else{
				  jQuery("#ncx_toolview .ncx-content-top-export").toggle(100);
			  }
		  });
		  
		  jQuery("#ncx_toolview .ncx-export-plotly").click(function(){
			  var data=newcrawler.plot();
			  
			  var hiddenForm = jQuery('<div id="hiddenform" style="display:none;">'+
				        '<form action="https://plot.ly/datagrid" method="post" target="_blank" accept-charset="utf-8">'+
				        '<input type="text" name="data" /></form></div>').appendTo('body');
			  var graphData = JSON.stringify(data);
			  hiddenForm.find('input').val(graphData);
			  hiddenForm.find('form').submit();
			  hiddenForm.remove();
		  });

		  jQuery("#ncx_toolview .ncx-export-coding").click(function(){
			  if(newcrawler.siteId!=null && newcrawler.siteId!=""){
				  var exportUrl=newcrawler_app_url+"api/data/export?siteId="+newcrawler.siteId+"&pageNum="+(newcrawler.pageNum+1)+"&type=json";
				  
				  jQuery("#ncx_toolview .ncx-export-coding").attr("href", exportUrl);
			  }
		  });
		  jQuery("#ncx_toolview .ncx-export-window .close").click(function(){
			  jQuery("#ncx_toolview .ncx-content-top").show();
			  jQuery("#ncx_toolview .ncx-content-bottom").show();
			  jQuery("#ncx_toolview .ncx-export-window").hide(400);
		  });
		  
		  jQuery("#ncx_toolview .ncx-export-rss.ncx-export-icon").click(function(){
			  
			  jQuery("#ncx_toolview .ncx-content-top-export").hide();
			  jQuery("#ncx_toolview .ncx-content-top").hide();
			  jQuery("#ncx_toolview .ncx-content-bottom").hide();
			  
			  jQuery("#ncx_toolview .ncx-export-window-rss").toggle(600, function(){
				  if(jQuery("#ncx_toolview .ncx-export-window-rss").is(':visible')){
					  
					  
					  var title=jQuery("#ncx_toolview .ncx-export-window-rss .title").text();
					  
					  if(newcrawler.siteId!=null && newcrawler.siteId!=""){
						  
						  newcrawler.jsonrpc["crawlDataExportService"]["query"](
									function(result, exception, profile){
										if(exception){
											  var msg="System errors.";
											  if(exception.msg){
												  msg = exception.msg;
											  }
											  newcrawler.message("fade", msg, 3000, "red");
											  return;
										}
										if(result){
											var data=result;
											data=eval(data);
											newcrawler.parsePublishParamsByRSS(data);
										}
									}, newcrawler.webCrawlerId, newcrawler.siteId, "rss");
						  
						  var exportUrl=newcrawler_app_url+"api/data/export?siteId="+newcrawler.siteId+"&pageNum="+(newcrawler.pageNum+1)+"&type=rss";
						  jQuery("#ncx_toolview .ncx-export-window-rss .ncx-btn-rss").attr("href", exportUrl);
					  }
				  }
			  });
		  });
		  
		  
		  jQuery("#ncx_toolview .ncx-export-wordpress.ncx-export-icon").click(function(){
			  
				  jQuery("#ncx_toolview .ncx-content-top-export").hide();
				  jQuery("#ncx_toolview .ncx-content-top").hide();
				  jQuery("#ncx_toolview .ncx-content-bottom").hide();
				  
				  jQuery("#ncx_toolview .ncx-export-window-wordpress").toggle(600, function(){
					  if(jQuery("#ncx_toolview .ncx-export-window-wordpress").is(':visible')){
						  
						  
						  var title=jQuery("#ncx_toolview .ncx-export-window-wordpress .title").text();
						  
						  if(newcrawler.siteId!=null && newcrawler.siteId!=""){
							  newcrawler.jsonrpc["dataDeployService"]["queryByXpath"](function(result, exception, profile){
								  if(exception){
									  var msg="System errors.";
									  if(exception.msg){
										  msg = exception.msg;
									  }
									  newcrawler.message("fade", msg, 3000, "red");
									  return;
								  }
								  if(result){
									  var data=eval("("+result+")");
									  newcrawler.parsePublishParams(data);
								  }
							  }, newcrawler.webCrawlerId, newcrawler.siteId, title);
						  }
						  
					  }
				  });
			  
		  });
		  
		  jQuery("#ncx_toolview .ncx-export-db.ncx-export-icon").click(function(){
			  
			  jQuery("#ncx_toolview .ncx-content-top-export").hide();
			  jQuery("#ncx_toolview .ncx-content-top").hide();
			  jQuery("#ncx_toolview .ncx-content-bottom").hide();
			  
			  jQuery("#ncx_toolview .ncx-export-window-db").toggle(600, function(){
				  if(jQuery("#ncx_toolview .ncx-export-window-db").is(':visible')){
					  
					  
					  var title=jQuery("#ncx_toolview .ncx-export-window-db .title").text();
					  
					  if(newcrawler.siteId!=null && newcrawler.siteId!=""){
						  
						  newcrawler.jsonrpc["dataDeployService"]["queryByXpath"](function(result, exception, profile){
							  if(exception){
								  var msg="System errors.";
								  if(exception.msg){
									  msg = exception.msg;
								  }
								  newcrawler.message("fade", msg, 3000, "red");
								  return;
							  }
							  if(result){
								  var data=eval("("+result+")");
								  newcrawler.parsePublishParamsByDB(data);
							  }
						  }, newcrawler.webCrawlerId, newcrawler.siteId, title);
					  }
					  
				  }
			  });
		  
	  });
		  
		  jQuery("#ncx_toolview .ncx-run").click(function(){
			  var cronId=jQuery("#ncx_toolbar #ncx-cron-id").val();
			  if(cronId==null){
				  newcrawler.message("fade", "There is no scheduled task.", 3000, "red");
				  return;
			  }
			  newcrawler.jsonrpc["scheduleService"]["execute"](function(result, exception, profile){
				  if(exception){
					  var msg="System errors.";
					  if(exception.msg){
						  msg = exception.msg;
					  }
					  newcrawler.message("fade", msg, 3000, "red");
					  return;
				  }
				  if(result){
					  newcrawler.message("fade", "Task running...", 3000);
					  setTimeout(function(){
						  if(newcrawler.webCrawlerId!=null & newcrawler.siteId!=null){
							  newcrawler.crawlDataLog["v"]["siteId"]=newcrawler.siteId;
							  newcrawler.crawlDataLog["init"]();
						  }
					  },2000); 
				  }else{
					  newcrawler.message("fade", "Task execution failed.", 3000, "red");
				  }
			  }, newcrawler.webCrawlerId, newcrawler.siteId, cronId);
		  });

		  jQuery("#ncx_toolview .ncx-export-csv").click(function(){
			  
			  jQuery("#ncx_data_list")["table2excel"]({
				    "name": "NewCrawler Data",
				    "fileext":".xls",
				    "filename": "NewCrawlerData" //do not include extension
				});
			  
			  /*var startIndex=newcrawler.pageNum*newcrawler.pageSize;
			  var downloadUrl=newcrawler_app_url+"member/api/data/download?startIndex="+startIndex+"&siteId="+newcrawler.siteId;
			  
			  jQuery("#ncx_toolview .downloadCsv").attr("href", downloadUrl);
			  jQuery("#ncx_toolview .downloadCsv span").click();*/
		  });
		  
		  jQuery("#ncx_toolbar #ncx-charset-select").change(function(){
			  var charset=jQuery("#ncx_toolbar #ncx-charset-select").val();
			  if(charset==null || charset==""){
				  jQuery("#ncx_toolbar #ncx-charset").show();
				  jQuery("#ncx_toolbar #ncx-charset").val("");
			  }else{
				  jQuery("#ncx_toolbar #ncx-charset").hide();
				  jQuery("#ncx_toolbar #ncx-charset").val(charset);
			  }
			  
		  });
		  
		  newcrawler.labelEvent();
	},
	delLable:function(labelObj){
		if(labelObj.hasClass("finished")){
			var title=labelObj.attr("title");
			var lang=labelObj.attr("lang");
			var newFieldArray=Array();
			if(lang==0 && labelObj.hasClass("ncx-pagination")){
				newcrawler.fieldArray[0]={};
			}else{
				newFieldArray.push(newcrawler.fieldArray[0]);
			}
			for(var i=1, len=newcrawler.fieldArray.length; i<len; i++){
				var index=newcrawler.fieldArray[i].index;
				if(lang==index){
					continue;
				}
				newFieldArray.push(newcrawler.fieldArray[i]);
			}
			newcrawler.fieldArray=newFieldArray;
			
			if(labelObj.hasClass("ncx-pagination")){
				labelObj.removeClass("finished").removeClass("ncx-blue");
			}else{
				labelObj.remove();
			}
			
			if(jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.finished")==undefined){
				jQuery("#ncx_toolbar .save").attr("disabled", true);
			}
			
			newcrawler.delFieldMap(title);
			
			var obj=jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow").eq(0);
			obj.addClass("active");
			obj.click();
		}
	},
	labelEvent:function(){
		jQuery("#ncx_toolbar .ncx-toolbar-section #ncx-selector-attr").change(function(){
			var thisGroup = jQuery('#ncx-selector-attr option:selected').parent();
			var label=thisGroup.prop("label");
			
			var selectType="@ATTR";
			var selectAttr="";
			
			
			if(label=="Html"){
				selectType=jQuery('#ncx-selector-attr option:selected').val();
			}else{
				selectAttr=jQuery('#ncx-selector-attr option:selected').val();
			}
			jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='"+selectType+"']").prop('checked', true);
			jQuery('#newcrawler-selector').find("select[name='ncx_attr']").val(selectAttr);
			
			if(label=="Html"){
				jQuery('#newcrawler-selector').find(".ncx_et_content_inner input[name=ncx_selectType]:checked").click();
			}else{
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").change();
			}
			
			
			var hasAttr=false;
			if(jQuery('#newcrawler-selector').find("select[name='ncx_attr']").length>0){
				hasAttr=true;
			}
			if(hasAttr){
				jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='@ATTR']").attr("disabled", false);
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").attr("disabled", false);
			}else{
				jQuery('#newcrawler-selector').find("input[name='ncx_selectType'][value='@ATTR']").attr("disabled", true);
				jQuery('#newcrawler-selector').find("select[name='ncx_attr']").attr("disabled", true);
			}
		});
		
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-label .ncx-delete-datatype").unbind("click").click(function(){
			newcrawler.delLable(jQuery(this).parent());
			ncx_innerFun.closeCover();
			return false;
		});
		
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-new-datatype").unbind("click").click(function(){
			if(ncx_et_tool.isAddSelector){
				//在选择中不允许添加
        		return;
        	}
			ncx_et_tool.saveLabel();
			ncx_innerFun.closeCover();
			
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.finished.active").each(function(){
				jQuery(this).removeClass("active").removeClass("edit");
				jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.ncx-data-dot.ncx-yellow").eq(0).addClass("active");
				
				jQuery(this).mouseout();
				
			});
		});
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-data-dot").unbind("click").click(function(){
			if(!jQuery(this).hasClass("active")){
				ncx_innerFun.closeCover();
			}
			if(jQuery(this).hasClass("finished")){
				jQuery(this).addClass("edit").removeClass("zero");
			}
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-data-dot").removeClass("active");
			jQuery(this).addClass("active");
			
			if(jQuery(this).hasClass("ncx-cron") || jQuery(this).hasClass("ncx-setting")){
				if(jQuery(this).hasClass("ncx-cron")){
					if(jQuery( "#ncx_toolbar .ncx-cron-config" ).is(':visible')){
						jQuery("#ncx_toolbar .ncx-cron-config").hide();
						jQuery(this).removeClass("active");
					}else{
						jQuery("#ncx_toolbar .ncx-cron-config").show();
					}
				}else{
					jQuery("#ncx_toolbar .ncx-cron-config").hide();
				}
				
				if(jQuery(this).hasClass("ncx-setting")){
					if(jQuery( "#ncx_toolbar .ncx-setting-config" ).is(':visible')){
						jQuery("#ncx_toolbar .ncx-setting-config").hide();
						jQuery(this).removeClass("active");
					}else{
						jQuery("#ncx_toolbar .ncx-setting-config").show();
					}
				}else{
					jQuery("#ncx_toolbar .ncx-setting-config").hide();
				}
			}else {
				jQuery("#ncx_toolbar .ncx-cron-config").hide();
				jQuery("#ncx_toolbar .ncx-setting-config").hide();
			}
			
			//点击聚焦
			var lang=jQuery(this).attr("lang");
			if(lang!=null && lang!="" && lang!=undefined){
				for(var i in newcrawler.fieldArray){
					var index=newcrawler.fieldArray[i].index;
					if(lang==index){
						ncx_et_tool.xpathArray = newcrawler.fieldArray[i].xpathArray.slice(0);
						ncx_et_tool.xpathArray2 = [];
						ncx_et_tool.multiSelXpathArray=newcrawler.fieldArray[i].multiSelXpathArray.slice(0);
						ncx_et_tool.moreOption=newcrawler.fieldArray[i].moreOption;
						
						var xpath=newcrawler.fieldArray[i].xpath;
						var tempXpathArray = newcrawler.fieldArray[i].xpathArray.slice(0);
						
						xpath=xpath.replace(":nth-of-type(*)", "");
						var elements = jQuery('#newcrawler').contents().find(xpath);
						var eleCount=elements.length;
						
						if(eleCount>0){
							var element = ncx_et_tool.multiSelXpathArray[ncx_et_tool.multiSelXpathArray.length-1].element;
							if(!element){
								element=elements[0];
							}
							
							ncx_et_tool.targetNow = element;
							
							var c = jQuery(element).offset().top;
							var d = jQuery(element).outerHeight();
							var h = jQuery('#newcrawler').contents().outerHeight();
							var e=0;
							if (h - c - d < 65) {
								e = c +1;
								if (e < 0) {
									e = 0;
								}
							}else{
								e = c + d + 3;
							}
							jQuery('#newcrawler').contents().scrollTop(e - 300);
							
						}
						
					}
				}
				//高亮
				newcrawler.mouseoverHighlight(lang, true);
			}
		});
		
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-label").unbind("mouseout").mouseout(function() {
			jQuery(this).find(".ncx-delete-datatype").hide();
			jQuery(this).find(".ncx-delete-datatype").removeClass("visible");
			ncx_traceHighlight.needCloseCover=false;
			if(jQuery(this).hasClass("finished")){
				if(!jQuery(this).hasClass("active")){
					newcrawler.reset();
				}else if(ncx_traceHighlight.needCloseCover){
					ncx_innerFun.closeCover();
				}
				
			}
		})
		
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-label").unbind("mouseover").mouseover(function(){
			jQuery(this).find(".ncx-delete-datatype").show();
			jQuery(this).find(".ncx-delete-datatype").addClass("visible");
			
			jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active.finished").each(function(){
				if(ncx_traceHighlight.needSave){
					ncx_et_tool.saveLabel();
				}
			});
			
			if(jQuery(this).hasClass("finished") && !jQuery(this).hasClass("active")){
				ncx_innerFun.closeCover();
				var lang=jQuery(this).attr("lang");
				
				newcrawler.mouseoverHighlight(lang, false);
				ncx_traceHighlight.needCloseCover=true;
			}
		});
		
		jQuery("#ncx_toolbar .ncx-help-info").hover(function(){
			jQuery(this).css("opacity", 1);
		}, function(){
			jQuery(this).css("opacity", 0.8);
		})
		jQuery("#ncx_toolbar .ncx-setting-dot .ncx-data-dot.ncx-help").unbind("click").click(function(){
			jQuery("#ncx_toolbar .ncx-help-info").slideToggle(250);
		});
	},
	reset:function(){
		ncx_innerFun.closeCover();
		jQuery("#ncx_toolbar .ncx-datatypes .ncx-label.active.finished").each(function(){
			var lang=jQuery(this).attr("lang");
			if(lang!=null && lang!="" && lang!=undefined){
				for(var i in newcrawler.fieldArray){
					var index=newcrawler.fieldArray[i].index;
					if(lang==index){
						ncx_et_tool.xpathArray = newcrawler.fieldArray[i].xpathArray.slice(0);
						ncx_et_tool.xpathArray2 = [];
						ncx_et_tool.multiSelXpathArray=newcrawler.fieldArray[i].multiSelXpathArray.slice(0);
						
						var xpath=newcrawler.fieldArray[i].xpath;
						var tempXpathArray = newcrawler.fieldArray[i].xpathArray.slice(0);
						
						xpath=xpath.replace(":nth-of-type(*)", "");
						var elements = jQuery('#newcrawler').contents().find(xpath);
						var eleCount=elements.length;
						if(eleCount>0){
							var element = elements[0];
							ncx_et_tool.targetNow = element;
						}
					}
				}
				newcrawler.mouseoverHighlight(lang, true);
			}
		});
	},
	mouseoverHighlight:function(lang, isClick){
		var seq=(new Date()).getTime();
		
		for(var i in newcrawler.fieldArray){
			var index=newcrawler.fieldArray[i].index;
			if(lang==index){
				var multiSelXpathArray=newcrawler.fieldArray[i].multiSelXpathArray;
				
				var highlightDivAll="";
				for(var j in multiSelXpathArray){
					var xpath=multiSelXpathArray[j].selector.join('').replace(":nth-of-type(*)", "");
					
					var elements = jQuery('#newcrawler').contents().find(xpath);
					var eleCount=elements.length;
					for (var e1 = 0; e1 < eleCount; e1++) {
						var element = elements[e1];
						
						
						if(isClick){
							
							var zoomIndex=e1;
							$(element).removeAttr("ncx-zoom-index").attr("ncx-zoom-index", zoomIndex);
							
							if(ncx_traceHighlight.ctrlDown){
								$(element).removeClass("ncx-cursor-add").addClass("ncx-cursor-delete");
								$(element).attr("ncx-index", multiSelXpathArray[j].index);
							}
							
							var isAddZoom=false;
							if(ncx_et_tool.isSame(element, ncx_et_tool.targetNow)){
								isAddZoom=true;
							}
							var highlightDiv=ncx_innerFun.addHighlight(multiSelXpathArray[j].index, seq, element, false, isAddZoom, zoomIndex, 0, null, "selected");
							highlightDivAll+=highlightDiv;
						}else{
							var highlightDiv=ncx_innerFun.addHighlight(-1, seq, element, false, false, -1, 0, null, "");
							highlightDivAll+=highlightDiv;
						}
					}
				}
				var highlightDivAllObj=jQuery(highlightDivAll);
				ncx_innerFun.addHighlightEvent(highlightDivAllObj);
				jQuery('#newcrawler').contents().find("#ncx_cover-container").append(highlightDivAllObj);
				
				
				var selectType=newcrawler.fieldArray[i].selectType;
				if(selectType=="@ATTR"){
					var selectAttr=newcrawler.fieldArray[i].selectAttr;
					jQuery("#ncx-selector-attr optgroup[label=Attr]").empty();
					jQuery("#ncx-selector-attr optgroup[label=Attr]").append('<option value="'+selectAttr+'">'+selectAttr+'</option>');
					selectType=selectAttr;
				}
				jQuery("#ncx-selector-attr").val(selectType);
				
				if(isClick){
					var eleCount=ncx_et_tool.count(multiSelXpathArray);
					jQuery("#ncx_toolbar .ncx-datatypes .active .ncx-count").text(eleCount);
				}
			}
		}
		
		
	},
	getUrlParameter:function(sParam){
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	    return "";
	},
	loadToolbar:function(callback){
		
		if(newcrawler.webCrawlerId==null || newcrawler.webCrawlerId==undefined || isNaN(newcrawler.webCrawlerId)){
			return;
		}
		
		jQuery("#ncx_toolbar .save").attr("disabled", true);
		  
		  newcrawler.fieldArray[0]={};
		  var data=null;
		  
		  if(newcrawler.siteId!=null && newcrawler.siteId!=""){
			  jQuery("#ncx_toolbar #ncx-headers").val("");
			  jQuery("#ncx_toolbar #ncx-charset-select").val("");
			  jQuery("#ncx_toolbar #ncx-charset-select").change();
			  
			  urlString=newcrawler_server_url+"member/rules/query?webCrawlerId="+newcrawler.webCrawlerId+"&siteId="+newcrawler.siteId+"&rulesVerId="+newcrawler.rulesVerId;
			  jQuery.ajax({
				  type: "GET",
				  dataType: "json",
				  url: urlString,
				  async:false,
				  success: function(responseText){
					  data=responseText;
				  },
				  error: function(jqXHR, textStatus, errorThrown){
					  console.log(errorThrown);
					  var msg="<span style='color:red;'>System errors.</span>";
					  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("<div>"+msg+"</div>");
					  setTimeout(function(){
						  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("");
					  }, 3000);
				  }
			  });
			  if(data!=null && data!=""){
				  var cronId=data["cronId"];
				  var cronDate=data["cronDate"];
				  var cronTime=data["cronTime"];
				  var pluginId=data["pluginId"];
				  var isJs=data["isJs"];
				  var charset=data["charset"];
				  var headers=data["headers"];
				  
				  var newDataInEndPage=data["newDataInEndPage"];
				  var skipRows=data["skipRows"];
				  
				  var rulesVerId=data["rulesVerId"];
				  newcrawler.rulesVerId=rulesVerId;
				  
				  jQuery("#ncx_toolbar .ncx-js input[type=checkbox][name='ncx-isJs']").prop('checked', isJs);
				  jQuery("#ncx_toolbar .ncx-js #ncx-pluginId").val(pluginId);
				  jQuery("#ncx_toolbar #ncx-cron-id").val(cronId);
				  jQuery("#ncx_toolbar #ncx-cron-date").val(cronDate);
				  jQuery("#ncx_toolbar #ncx-cron-time").val(cronTime);
				 
				  jQuery("#ncx_toolbar #ncx-headers").val(headers);
				  
				  
				  jQuery("#ncx_toolbar #ncx-charset-select").val(charset);
				  jQuery("#ncx_toolbar #ncx-charset-select").change();
				  
				  jQuery("#ncx_toolbar #ncx-skipRows").val(skipRows);
				  if(newDataInEndPage==true || newDataInEndPage=="true"){
					  jQuery("#ncx_toolbar #ncx-newDataInEndPage").attr("checked", true);
				  }
				  
				  data=data["rulesJson"];
				  if(data!=null && typeof data === 'string'){
					  data=eval(data);
				  }
				  for(var i in data){
						if(isNaN(i)){continue;}
						var searchMode=data[i]["searchMode"];
						if(searchMode!=undefined && searchMode!="csspath"){
							continue;
						}
						var id=data[i]["id"];
						var name=data[i]["name"];
						var selectExpress=data[i]["selectExpress"];
						var selectType=data[i]["selectType"];
						var selectAttr=data[i]["selectAttr"];
						var labelType=data[i]["labelType"];
						
						//more option
						var regexFilter=data[i]["regexFilter"];
						var moreOption={"regexFilter":regexFilter};
						
						var labelObj=ncx_et_tool.createCSSpathLabel(selectExpress);
						
						if(labelType=="2"){
							ncx_et_tool.createLabel(id, 0, name, labelObj.xpath, labelObj.xpathArray, selectType, true, selectAttr, labelObj.multiSelXpathArray, moreOption);
						}else{
							ncx_et_tool.createLabel(id, newcrawler.index, name, labelObj.xpath, labelObj.xpathArray, selectType, false, selectAttr, labelObj.multiSelXpathArray, moreOption);
						}
				  }
			  }
		  }
		  
		  if(callback){
			 callback();
		  }
	},
	plot:function(){
		var result={};
		var columnName=new Array();
		
		var table = document.getElementById('ncx_data_list');
		
		//columnName
		var firstRow = table.rows[0];
		var firstCellLength = firstRow.cells.length;
		for(var f=0; f<firstCellLength; f+=1){
			var cell = firstRow.cells[f];
			columnName.push(cell.innerHTML);
		}
		
		//columnValue
		var rowLength = table.rows.length;
		for(var i=1; i<rowLength; i+=1){
		  var row = table.rows[i];
		  var cellLength = row.cells.length;
		  for(var j=0; j<cellLength; j+=1){
		    var cell = row.cells[j];
		    
		    var name=columnName[j];
		    var value=cell.innerHTML;
		    
		    if(result[name]==null || result[name]==undefined){
				result[name]={"data":new Array()};
			}
			result[name]["data"].push(value);
		  }
		}
		return {"cols":result } ;
	},
	setPublishParams:function(params){
		jQuery("#ncx_toolview .ncx-export-window").each(function(){
			if(jQuery(this).is(':visible')){
				var deployName=jQuery(this).find(".title").text();
				var deployParams="";
				if(jQuery(this).hasClass("ncx-export-window-wordpress")){
					var sign=jQuery(this).find("input[name=__sign]").val();
					var deployUrl=jQuery(this).find("input[name=__url]").val();
					if(deployUrl!=null && deployUrl!=""){
						deployUrl="http://"+deployUrl+"/?__ta=post";
					}
					var postStatus=jQuery(this).find("select[name=post_status]").val();
					var accessPassword=jQuery(this).find("input[name=access_password]").val();
					
					var isUploadImage=jQuery(this).find("input[name=isUploadImage]").is(":checked");
					var imageLabels="";
					if(isUploadImage){
						imageLabels=jQuery(this).find("input[name=isUploadImage]").parent().find("input[name=param]").val();
						isUploadImage="Y";
					}
					if(sign!=null && sign!=""){
						deployParams="__sign="+sign;
					}
					if(postStatus!=null && postStatus!=""){
						if(deployParams!=""){
							deployParams+="&";
						}
						deployParams+="postStatus="+postStatus;
					}
					if(accessPassword!=null && accessPassword!=""){
						if(deployParams!=""){
							deployParams+="&";
						}
						deployParams+="accessword="+accessPassword;
					}
					jQuery(this).find(".fieldMap input[name=param]").each(function(){
						var name=this.value;
						var value=jQuery(this).parent().parent().find("select.allFileds").val();
						if(value!=null && value!=""){
							if(deployParams!=""){
								deployParams+="&";
							}
							deployParams+=name+"="+value;
						}
					});
					params["deployUrl"]=deployUrl;
					params["isUploadImage"]=isUploadImage;
					params["imageLabels"]=imageLabels;
				}else if(jQuery(this).hasClass("ncx-export-window-db")){
					var dbType=jQuery(this).find("select[name=dbType]").val();
					var dbHost=jQuery(this).find("input[name=dbHost]").val();
					var dbPort=jQuery(this).find("input[name=dbPort]").val();
					var dbName=jQuery(this).find("input[name=dbName]").val();
					var dbUser=jQuery(this).find("input[name=dbUser]").val();
					var dbPassword=jQuery(this).find("input[name=dbPassword]").val();
					var dbCharset=jQuery(this).find("select[name=dbCharset]").val();
					
					jQuery(this).find(".fieldMap > div:not(.temp)").find("input[name=param]").each(function(){
						var name=this.value;
						var value=jQuery(this).parent().find("input[name=labelName]").val();
						if(value!=null && value!=""){
							if(deployParams!=""){
								deployParams+="&";
							}
							deployParams+=name+"="+value;
						}
					});
					
					params["dbType"]=dbType;
					params["dbHost"]=dbHost;
					params["dbPort"]=dbPort;
					params["dbName"]=dbName;
					params["dbUser"]=dbUser;
					params["dbPassword"]=dbPassword;
					params["dbCharset"]=dbCharset;
				}else if(jQuery(this).hasClass("ncx-export-window-rss")){
					var configMap={};
					
					jQuery(this).find(".fieldMap input[name=param]").each(function(){
						var name=this.value;
						var value=jQuery(this).parent().parent().find("select.allFileds").val();
						if(value==undefined || value==null ){
							value="";
						}
						configMap[name]=value;
					});
					var jsonConfig=$.toJSON(configMap);
					params["export2RSS"]=jsonConfig;
				}
				params["deployParams"]=deployParams;
				params["deployName"]=deployName;
			}
		});
		return params;
	},
	parsePublishParamsByRSS:function(data){
		var value="";
		for(var j in data){
			if(isNaN(j)){continue;}
			var name=data[j]["name"];
			var value=data[j]["value"];
			
			var obj=jQuery("#ncx_toolview .ncx-export-window-rss").find("input[name='param'][value='"+name+"']");
			jQuery(obj).parent().parent().find("select.allFileds").val(value);
		}
	},
	parsePublishParams:function(data){
		var deployName=data["deployName"];
		var deployUrl=data["deployUrl"];
		
		var isUploadImage=data["isUploadImage"];
		var deployParams=data["deployParams"];
		if(isUploadImage=="Y"){
			jQuery("#ncx_toolview .ncx-export-window-wordpress").find("input[name=isUploadImage]").attr("checked", true);
		}
		if(deployUrl.indexOf("http://")==0){
			deployUrl=deployUrl.substring(7);
		}
		if(deployUrl.indexOf("/?__ta=post")!=-1){
			deployUrl=deployUrl.substring(0, deployUrl.indexOf("/?__ta=post"));
		}
		jQuery("#ncx_toolview .ncx-export-window-wordpress").find("input[name=__url]").val(deployUrl);
		
		if(deployParams!=null && deployParams!=""){
			var params=deployParams.split("&");
			for(var i=0, len=params.length; i<len;i++){
				var param=params[i].split("=");
				var name=param[0];
				var value=param[1];
				if(name=="__sign"){
					jQuery("#ncx_toolview .ncx-export-window-wordpress").find("input[name='__sign']").val(value);
					continue;
				}
				if(name=="postStatus"){
					jQuery("#ncx_toolview .ncx-export-window-wordpress").find("select[name='post_status']").val(value);
					continue;
				}
				if(name=="accessword"){
					jQuery("#ncx_toolview .ncx-export-window-wordpress").find("input[name='access_password']").val(value);
					continue;
				}
				var obj=jQuery("#ncx_toolview .ncx-export-window-wordpress").find("input[name='param'][value='"+name+"']");
				jQuery(obj).parent().parent().find("select.allFileds").val(value);
			}
		}
	},
	parsePublishParamsByDB:function(data){
		var deployName=data["deployName"];
		var deployParams=data["deployParams"];
		
		
		var dbHost=data["dbHost"];
		var dbPort=data["dbPort"];
		var dbName=data["dbName"];
		var dbUser=data["dbUser"];
		var dbPassword=data["dbPassword"];
		var dbCharset=data["dbCharset"];
		var dbTable=data["dbTable"];
		
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbHost']").val(dbHost);
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbPort']").val(dbPort);
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbName']").val(dbName);
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbUser']").val(dbUser);
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbPassword']").val(dbPassword);
		jQuery("#ncx_toolview .ncx-export-window-db").find("select[name='dbCharset']").val(dbCharset);
		jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='dbTable']").val(dbTable);
		
		if(deployParams!=null && deployParams!=""){
			var params=deployParams.split("&");
			for(var i=0, len=params.length; i<len;i++){
				var param=params[i].split("=");
				var name=param[0];
				var value=param[1];
				var obj=jQuery("#ncx_toolview .ncx-export-window-db").find("input[name='labelName'][value='"+value+"']");
				jQuery(obj).parent().find("input[name='param']").val(name);
			}
		}
	},
	getRules:function(){
		  var rulesArray=[];
		  var fulltext_option=null;
		  var content_option={};
		  var content_fetchUrlAutoExtract;
		  var content_isFetchUrl;
		  var content_isTemp="";
		  for(var i in newcrawler.fieldArray){
			  var id=newcrawler.fieldArray[i].id;
			  var index=newcrawler.fieldArray[i].index;
			  var propertyName=newcrawler.fieldArray[i].name;
			  
			  var moreOption=newcrawler.fieldArray[i].moreOption;
			  if(!moreOption){
				  moreOption={};
			  }
			  
			  var selectType=newcrawler.fieldArray[i].selectType;
			  var selectAttr=newcrawler.fieldArray[i].selectAttr;
			  
			  var selectExpress='';
			  var multiSelXpathArray=newcrawler.fieldArray[i].multiSelXpathArray;
			  for(var j in multiSelXpathArray){
				  var xpath=multiSelXpathArray[j].selector.join('');
				  if(selectExpress!=''){
					  selectExpress+="|";
				  }
				  selectExpress+=xpath;
			  }
			  
			  if(propertyName==null || propertyName==""){
				  continue;
			  }
			  if(selectExpress==null || selectExpress==""){
				  continue;
			  }
			  var labelType="1";
			  if(index==0){
				  labelType="2";
			  }
			  var isCantNull="";
			  var excludeHtmlTags="";
			  var unique=false;
			  var isAbsolute="";
			  var isFetchUrl="";
			  var fetchUrlAutoExtract="";
			  var absoluteUrlRegex="";
			  
			  var isRegexExcludeText="";
			  var excludeText="";
			  
			  if(propertyName=="Headline"){
				  isCantNull="true";
				  
				  var htmlTags=new Array();
				  htmlTags.push("enter");
				  htmlTags.push("space_trim");
				  excludeHtmlTags=JSON.stringify(htmlTags);
				  
				  unique=true;
			  }else if(propertyName=="Author"){
				  
				  var htmlTags=new Array();
				  htmlTags.push("enter");
				  htmlTags.push("space_trim");
				  excludeHtmlTags=JSON.stringify(htmlTags);
			  }else if(propertyName=="Link"){
				  isCantNull="true";
				  unique=true;
				  isAbsolute="true";
				  
				  isRegexExcludeText="true";
				  var elemTextArray = new Array();
				  elemTextArray.push("#.*$");
				  excludeText=JSON.stringify(elemTextArray);
			  }else if(labelType=="2"){
				  //page
				  moreOption["isAbsolute"]="true";
				  moreOption["filterSort"]="5,0,1,2,3,4,6,7,8,9,10,11,12,13,14,15";
			  }
			  
			  var isTemp="";
			  if(propertyName=="Item"){
				  isTemp="true";
			  }
			  var options={"id":id, "index":index, "name":propertyName, "selectExpress":selectExpress, "selectAttr":selectAttr, "selectType":selectType, "labelType":labelType, 
					  "isCantNull":isCantNull, "isAbsolute":isAbsolute, "isTemp":isTemp, "excludeHtmlTags":excludeHtmlTags, "unique":unique, "isFetchUrl":isFetchUrl, 
					  "fetchUrlAutoExtract":fetchUrlAutoExtract, "absoluteUrlRegex":absoluteUrlRegex, "isRegexExcludeText":isRegexExcludeText, 
					  "excludeText":excludeText, "searchMode":"csspath"};
			  
			  jQuery.extend(options, moreOption);
			  rulesArray.push(options);
		  }
		  
		  return rulesArray;
	},
	save:function(url, callback){
		  var headers=jQuery("#ncx_toolbar #ncx-headers").val();
		  var len=newcrawler.fieldArray.length;
		  if((headers==null || headers=="") && len<2){
			  newcrawler.message("fade", "You need to configure the crawl rule.", 3000, "red");
			  return;
		  }
		  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("<div class='loading'></div>");
		  
		  var rulesArray=newcrawler.getRules();
		  var rulesJson="";
		  if(rulesArray!=null && rulesArray.length>0){
			  rulesJson = JSON.stringify(rulesArray);
		  }
		  
		  var cronId=jQuery("#ncx_toolbar #ncx-cron-id").val();
		  var cronDate=jQuery("#ncx_toolbar #ncx-cron-date").val();
		  var cronTime=jQuery("#ncx_toolbar #ncx-cron-time").val();
		  
		  var pluginId="";
		  var isJs=false;
		  if(jQuery("#ncx_toolbar .ncx-js input[type=checkbox][name='ncx-isJs']").is(':checked')){
			  isJs=true;
			  pluginId=jQuery("#ncx_toolbar .ncx-js #ncx-pluginId").val();
		  }
		  var charset=jQuery("#ncx_toolbar #ncx-charset").val();
		  
		  var skipRows=jQuery("#ncx_toolbar #ncx-skipRows").val();
		  var newDataInEndPage=jQuery("#ncx_toolbar #ncx-newDataInEndPage").is(":checked");
		  
		  urlString=url+"member/rules/save";
		  
		  var data={"webCrawlerId":newcrawler.webCrawlerId, "siteId":newcrawler.siteId, "rulesVerId":newcrawler.rulesVerId, 
				  "rulesJson":rulesJson, "url":jQuery("#ncx_toolbar #url").parent().attr("title"), 
				  "cronId":cronId, "cronDate":cronDate, "cronTime":cronTime, 
				  "isJs":isJs, "pluginId":pluginId, "charset":charset, "headers":headers,
				  "skipRows":skipRows, "newDataInEndPage":newDataInEndPage, "addUrl":"true"
		  };
		  
		  data = newcrawler.setPublishParams(data);
		  
		  jQuery.ajax({
			  type: "POST",
			  data: data,
			  url: urlString,
			  async:true,
			  dataType :"json", 
			  error: function(jqXHR, textStatus, errorThrown){
				  console.log(errorThrown);
				  var msg="<span style='color:red;'>System errors.</span>";
				  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("<div>"+msg+"</div>");
				  setTimeout(function(){
					  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("");
				  }, 3000);
			  },
			  success: function(responseText){
				 
				  var msg=responseText["msg"];
				  var code=responseText["code"];
				  if(code=="1"){
					  var cronId=responseText["cronId"];
					  if(cronId!=null && cronId!=undefined && cronId!="undefined"){
						  jQuery("#ncx_toolbar #ncx-cron-id").val(cronId);
					  }
					  var isNew=responseText["isNew"];
					  var pluginId=responseText["pluginId"];
					  if(pluginId!=null && pluginId!=undefined && pluginId!="undefined"){
						  jQuery("#ncx_toolbar .ncx-js #ncx-pluginId").val(pluginId);
					  }
					  
					  if(responseText["siteId"]!=null && responseText["siteId"]!=""){
						  newcrawler.siteId=responseText["siteId"];
						  if(isNew=="true"){
							  newcrawler.url=newcrawler.url+"&siteId="+newcrawler.siteId;
							  
							  if(newcrawler_addTaskAndRefresh && newcrawler_addTaskAndRefresh!=null && newcrawler_addTaskAndRefresh!=undefined 
									  && newcrawler_addTaskAndRefresh!="undefined"){
								  try {
									  newcrawler_addTaskAndRefresh(newcrawler.webCrawlerId, newcrawler.siteId);
								  } catch (err) {
									  console.log(err.description || err) 
								  }
							  }
						  }
					  }
					  if(responseText["rulesVerId"]!=null && responseText["rulesVerId"]!=""){
						  newcrawler.rulesVerId=responseText["rulesVerId"];
						  if(isNew=="true"){
							  newcrawler.url=newcrawler.url+"&rulesVerId="+newcrawler.rulesVerId;
						  }
					  }
					  
					  if(newcrawler_refresh){
						  if(newcrawler_refresh!=null && newcrawler_refresh!=undefined 
								  && newcrawler_refresh!="undefined"){
							  try {
								  newcrawler_refresh();
							  } catch (err) {
								  console.log(err.description || err) 
							  }
						  }
					  }
					  msg="<span style='color:green;'>"+msg+"</span>";
					  if(callback){
						  callback();
					  }
					  if(isNew=="true"){
						  top.window.location.href=newcrawler.url;
					  }
				  }else{
					  msg="<span style='color:red;'>"+msg+"</span>";
				  }
				  
				  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("<div>"+msg+"</div>");
				  setTimeout(function(){
					  jQuery("#ncx_toolbar .ncx-toolbar-section.msg").html("");
				  }, 3000);
			  }
		  });
	},
	test:function(crawlUrl){
		jQuery("#ncx_tooltest > .ncx-content-top").find(".loading").show();
		
		jQuery("#ncx_tooltest > .ncx-content-top > .ncx-content-top-data table").empty();
		var row="";
		var len=newcrawler.fieldArray.length;
		for(var i=1;i<len;i++){
			var index=newcrawler.fieldArray[i].index;
			var name=newcrawler.fieldArray[i].name;
			row+="<th>";
			row+=name;
			row+="</th>";
		}
		if(row!=""){
			row="<tr><th>index</th>"+row+"</tr>";
			jQuery(row).appendTo(jQuery("#ncx_tooltest > .ncx-content-top > .ncx-content-top-data table"));
		}
		
		newcrawler.jsonrpc["crawlRulesService"]["test"](function(result,exception,profile){
			if(exception){
				  var msg="System errors.";
				  if(exception.msg){
					  msg = exception.msg;
				  }
				  newcrawler.message("fade", msg, 3000, "red");
				  return;
			  }
			
			var data=eval("("+result+")");
			if(data==null || data.list==null || data.list.length<1){
				var row="<tr><td  style='border: none;'>Not Found Data.</td>";
				jQuery(row).appendTo(jQuery("#ncx_tooltest > .ncx-content-top > .ncx-content-top-data table#ncx_data_list_test"));
				return;
			}
			
			jQuery("#ncx_tooltest .ncx-details-content .spider").text(data.spider==null?"":data.spider);
			jQuery("#ncx_tooltest .ncx-details-content .cookie").text(data.cookieString==null?"":data.cookieString);
			var nextPageUrl=data.nextPageUrl==null?"":data.nextPageUrl;
			
			jQuery("#ncx_tooltest .ncx-details-content .nextUrl").text(nextPageUrl);
			jQuery("#ncx_tooltest .ncx-details-content .nextUrl").attr("href", nextPageUrl);
			
			jQuery("#ncx_tooltest .ncx-details-content .costTotal").text(data.times);
			jQuery("#ncx_tooltest .ncx-details-content .costFetch").text(data.readHtmlTimes);
			jQuery("#ncx_tooltest .ncx-details-content .costParse").text(data.readDataTimes);
			
			
			index=0;
			data=data.list;
			for(var i in data){
				if(isNaN(i)){continue;}
				var json=data[i];
				index++;
				var row="<tr><td>"+index+"</td></tr>";
				var rowObj=jQuery(row);
				
				for(var j=1;j<len;j++){
					var name=newcrawler.fieldArray[j].name;
					var isExist=false;
					for(var k in json){
						if(name==json[k]["name"]){
							var value=json[k]["value"];
							
							var tdName='name_'+name;
							var td="<td class='"+tdName+"'></td>";
							rowObj.append(td);
							rowObj.find("."+tdName).text(value);
							isExist=true;
							break;
						}
					}
					if(!isExist){
						var td="<td></td>";
						rowObj.append(td);
					}
				}
				rowObj.find("td").click(function(){
					jQuery(this).attr("title", jQuery(this).text());
				})
				rowObj.appendTo(jQuery("#ncx_tooltest > .ncx-content-top > .ncx-content-top-data table#ncx_data_list_test"));
			    
			}
			jQuery("#ncx_tooltest .ncx-details-content .total").text(index);
			
		},	newcrawler.webCrawlerId, newcrawler.siteId, newcrawler.rulesVerId, crawlUrl, "");
	},
	view:function(){
		if(newcrawler.webCrawlerId==null || newcrawler.webCrawlerId==undefined || isNaN(newcrawler.webCrawlerId) 
				|| newcrawler.siteId==null || newcrawler.siteId==undefined || isNaN(newcrawler.siteId)){
			return;
		}
		newcrawler.logsViewConsole["v"]["webCrawlerId"]=newcrawler.webCrawlerId;
		newcrawler.logsViewConsole["v"]["siteId"]=newcrawler.siteId;
		newcrawler.clickLogs();
	},
	
	refresh:function(){
		jQuery("#ncx_toolview > .ncx-content-top").find(".loading").show();
		
		jQuery("#ncx_toolview > .ncx-content-top > .ncx-content-top-data table").empty();
		var row="";
		var len=newcrawler.fieldArray.length;
		for(var i=1;i<len;i++){
			var index=newcrawler.fieldArray[i].index;
			var name=newcrawler.fieldArray[i].name;
			row+="<th>";
			row+=name;
			row+="</th>";
		}
		if(row!=""){
			row="<tr><th>index</th>"+row+"<th>status</th><th>createDate</th></tr>";
			jQuery(row).appendTo(jQuery("#ncx_toolview > .ncx-content-top > .ncx-content-top-data table"));
		}
		
		newcrawler.pageNum=0;
		newcrawler.queryData(newcrawler.pageNum);
		
		var items_per_page=jQuery("#ncx_toolview > .ncx-content-top").find("#ncx-pagination-size").val();
		
		newcrawler.jsonrpc["crawlDataService"]["count"](function(result,exception,profile){
			newcrawler.total=result;
			var prev=nc["i18n"]("res.page.prev");
			var next=nc["i18n"]("res.page.next");
			jQuery("#ncx_toolview > .ncx-content-top").find("#ncx-pagination")["pagination"](result, {
				"num_edge_entries": 2,//Number of start and end points
				"num_display_entries": 5,//Number of pagination links shown
				"current_page":0,
				"callback": function(index){
					newcrawler.pageNum=index;
					newcrawler.queryData(newcrawler.pageNum);
				},
				"items_per_page":items_per_page,
				"prev_text":prev,
				"next_text":next
			});
		},	newcrawler.webCrawlerId, newcrawler.siteId);
		
	},
	queryData:function(pageNum){
		var len=newcrawler.fieldArray.length;
		var tableObj=jQuery("#ncx_toolview > .ncx-content-top > .ncx-content-top-data table");
		newcrawler.moveAllTrWithObj(tableObj);
		
		var items_per_page=jQuery("#ncx_toolview > .ncx-content-top").find("#ncx-pagination-size").val();
		
		var startIndex=pageNum*items_per_page;
		
		var queryTimes=items_per_page/newcrawler.pageSize;
		
		var queryCount=0;
		var queryFinish=0;
		for(var i=0;i<queryTimes;i++){
			var queryStartIndex=startIndex+(i*newcrawler.pageSize);
			
			if(queryStartIndex>newcrawler.total){
				break;
			}
			var index=1;
			queryCount++;
			
			newcrawler.jsonrpc["crawlDataService"]["query"](function(result,exception,profile){
				queryFinish++;
				var data=eval(result);
				newcrawler.jsonData=data;
				
				if(data!=null && data.length>0){
					newcrawler.pageNum=pageNum;
				}else{
					var row="<tr><td  style='border: none;'>Not Found Data.</td>";
					jQuery(row).appendTo(jQuery("#ncx_toolview > .ncx-content-top > .ncx-content-top-data table#ncx_data_list"));
					return;
				}
				
				
				for(var i in data){
					if(isNaN(i)){continue;}
					var jsonData=data[i]["data"];
					var json=eval(jsonData);
					
					var row="<tr><td>"+index+"</td>";
					var rowObj=jQuery(row);
					
					var createDate=data[i]["createDate"];
					var statusDesc=(data[i]["status"]==1?('<span class="label-info bg-green">'+nc["i18n"]("res.published")+'</span>'):'');
					for(var j=1;j<len;j++){
						var name=newcrawler.fieldArray[j].name;
						var isExist=false;
						for(var k in json){
							if(name==json[k]["name"]){
								var value=json[k]["value"];
								
								var tdName='name_'+name;
								var td="<td class='"+tdName+"'></td>";
								rowObj.append(td);
								rowObj.find("."+tdName).text(value);
								isExist=true;
								break;
							}
						}
						if(!isExist){
							var td="<td></td>";
							rowObj.append(td);
						}
					}
					var td="<td>"+statusDesc+"</td><td>"+createDate+"</td></tr>";
					rowObj.append(td);
					
					rowObj.find("td").click(function(){
						jQuery(this).attr("title", jQuery(this).text());
					})
					rowObj.appendTo(jQuery("#ncx_toolview > .ncx-content-top > .ncx-content-top-data table#ncx_data_list"));
				    index++;
				}
				
			},	newcrawler.webCrawlerId, {'javaClass':"com.soso.web.jsonrpc.bo.CrawlDataBo",
				"siteId":newcrawler.siteId,"startIndex":queryStartIndex,"size":newcrawler.pageSize,
				"searchStarttime":null,"searchEndtime":null});
		}
		var finishVar=setInterval(function(){ 
			if(queryCount===queryFinish){
				jQuery("#ncx_toolview > .ncx-content-top").find(".loading").hide();
				clearInterval(finishVar);
			}
		}, 3000);
		
		
	},
	moveAllTrWithObj:function(tableJQueryObj){  
		var tab=tableJQueryObj.get(0);  
		var rowlen = tab.rows.length;  
		for(var rowIndex = rowlen - 1; rowIndex > 0; rowIndex--){                  
			tab.deleteRow(rowIndex);  
		}  
	},
	initIframe:function(){
		newcrawler.event();
		newcrawler.addStyle();
		newcrawler.after();
	},
	init : function() {
		newcrawler.initIframe();
		newcrawler.url=top.window.location.href;
		jQuery( window ).css("overflow","hidden");
		try{
			newcrawler.toolbarEvent();
			var userAgent=document.getElementById('newcrawler').contentWindow["getNewCrawlerUserAgent"]();
			var charset=document.getElementById('newcrawler').contentWindow["getNewCrawlerCharset"]();
			
			
			if(charset!=null && charset!=""){
				var len=jQuery("#ncx_toolbar #ncx-charset-select option[value="+charset+"]").length;
				
				if(len==0){
					jQuery("#ncx_toolbar #ncx-charset-select").val('');
					jQuery("#ncx_toolbar #ncx-charset").val(charset);
					
				}else{
					jQuery("#ncx_toolbar #ncx-charset-select").val(charset);
					jQuery("#ncx_toolbar #ncx-charset-select").change();
				}
			}
			
			newcrawler.loadToolbar(function(){
				jQuery( document ).on( "mousemove", function( event ) {
					newcrawler.pageX=event.pageX;
					newcrawler.pageY=event.pageY;
				});
				jQuery(".ncx_toolbar_cover").remove();
				
				newcrawler.initFieldMap();
			});
		}catch(e){}
	},
	initFieldMap:function(){
		jQuery("#ncx_toolview .ncx-export-content select.allFileds").each(function(){
			jQuery(this).find("option:gt(0)").remove();
		});
		jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap > div:not(.temp)").remove();
				
		for(var i in newcrawler.fieldArray){
			var index=newcrawler.fieldArray[i].index;
			if(index==0){
				//page label
				continue;
			}
		    var id=newcrawler.fieldArray[i].id;
		    var name=newcrawler.fieldArray[i].name;
		    var selectExpress=newcrawler.fieldArray[i].xpath;
		    
		    if(name==null || name==""){
			  continue;
		    }
		    if(selectExpress==null || selectExpress==""){
			  continue;
		    }
		    jQuery("#ncx_toolview .ncx-export-window-wordpress .ncx-export-content select.allFileds").append("<option value='${"+name+"}'>"+name+"</option>");
		    jQuery("#ncx_toolview .ncx-export-window-rss .ncx-export-content select.allFileds").append("<option value='"+name+"'>"+name+"</option>");
		    
		    
		    var fieldMapTemp=jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap .temp").clone();
			fieldMapTemp.removeClass("temp");
			fieldMapTemp.show();
		    fieldMapTemp.find(".labelName").text(name)
		    fieldMapTemp.find("input[name=labelName]").val("${"+name+"}");
		    fieldMapTemp.find("input[name=param]").val(name);
		    jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap").append(fieldMapTemp);
	    }
	},
	addFieldMap:function(name){
		//wordpress
		jQuery("#ncx_toolview .ncx-export-window-wordpress .ncx-export-content select.allFileds").append("<option value='${"+name+"}'>"+name+"</option>");
		
		//db
		var fieldMapTemp=jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap .temp").clone();
		fieldMapTemp.removeClass("temp");
	    fieldMapTemp.find(".labelName").text(name)
	    fieldMapTemp.find("input[name=labelName]").val("${"+name+"}");
	    fieldMapTemp.find("input[name=param]").val(name);
	    jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap").append(fieldMapTemp);
	    
	    //rss
		jQuery("#ncx_toolview .ncx-export-window-rss .ncx-export-content select.allFileds").append("<option value='"+name+"'>"+name+"</option>");
		
	},
	delFieldMap:function(name){
		//wordpress
		jQuery("#ncx_toolview .ncx-export-window-wordpress .ncx-export-content select.allFileds").each(function(){
			var selectObj=jQuery(this);
			
			if(selectObj.find("option[value='${"+name+"}']").is(":checked")){
				selectObj.val("");
			}
			selectObj.find("option[value='${"+name+"}']").remove();
		});
		
		//db
		jQuery("#ncx_toolview .ncx-export-window-db .ncx-export-content .fieldMap input[name=param][value="+name+"]").parent().remove();
		
		//rss
		jQuery("#ncx_toolview .ncx-export-window-rss .ncx-export-content select.allFileds").each(function(){
			var selectObj=jQuery(this);
			
			if(selectObj.find("option[value='"+name+"']").is(":checked")){
				selectObj.val("");
			}
			selectObj.find("option[value='"+name+"']").remove();
		});
	},
	initLoad: function(){
		newcrawler.loadNewCrawler();
	},
	loadNewCrawler:function(){
		newcrawler.message("fade", "Completed.", 3000, "green");
		
		newcrawler.init();
		
	},
	addStyle:function(){
		var css = '.ncx_larger{float:left;height:15px; width:15px;background:url(//cdn.newcrawler.com/static/xpath/et_tool.png?v1.2) no-repeat -32px -431px;}'
			+'.ncx_larger.ncx_on{background:url(//cdn.newcrawler.com/static/xpath/et_tool.png?v1.2) no-repeat -17px -431px}'
			+'.ncx_smaller{float:left;margin-left:5px;display:inline-block;height:15px; width:15px;background:url(//cdn.newcrawler.com/static/xpath/et_tool.png?v1.2) no-repeat -48px -431px}'
			+'.ncx_smaller.ncx_on{background:url(//cdn.newcrawler.com/static/xpath/et_tool.png?v1.2) no-repeat 0px -431px}'
			+'.ncx_setting{float:left;margin-left:5px;display:inline-block;height:15px; width:15px;background: url(//cdn.newcrawler.com/static/xpath/v2/setting.svg) no-repeat 50% 50%;}'
			+'.ncx_setting.ncx_on{background: url(//cdn.newcrawler.com/static/xpath/v2/setting-hover.svg) no-repeat 50% 50%;}'
			+'.ncx-cursor-not-allowed {cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxNTk5N0RFREJGMTFFNUI1RDNERkQxQUFDMDRERjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxNTk5N0VFREJGMTFFNUI1RDNERkQxQUFDMDRERjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzE1OTk3QkVEQkYxMUU1QjVEM0RGRDFBQUMwNERGMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzE1OTk3Q0VEQkYxMUU1QjVEM0RGRDFBQUMwNERGMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqJDRkIAAAL2SURBVHjavJZPaNJhGMdf/8w8bEJTUEg0sEMTNrzoLHYYUQe3IHbYwDp0Egq6OmKVVods7qDt1CEYBF1slzrIDuLBwxoiO0iDajCGIjEZSCApoj49z4vvcPn7rXTb74Hvz9/v8X2fz+993+d5lAHAa6aQIYtfQCkoB1arVdja2lIEyoGVSgUMBoMi0CMg3SsBPQZUAtoDFNBcLkfQZ4oASSaTCfL5PEEfKwI8L+iJwPOAElDb7dDpdKzRaDCfz8c8Hg/3ZTIZNj4+HqHBKpXq9MkkVuhwOGB5eZnfj42NQbvd/oWQF6jnXbp0JltKsGKxCLVa7bfRaOTQdDpNW3nnzJOmXq9zGNpDVGxxcZED5+bmyLdxHs27hXrQcVzZ29tr41mBRqOhF2mjz3FCDMoB2oV3qDTqC+oj6hHKLAe895dzY3Z2lq8yGo3SKldkYLdQ3+UyHFVFPUVpjgEl3uJ2NpuFZDIJrVaric9vJWD3US0aPjExAaurq7C5uck7VCKRgIWFBVCr1QL8SUDlgGpUFvUKZZWAXUM1aNsjkQhlM0gZvYDFYhHQFVngP0yFytHccDjMAxNwbW0NZmZmYGpqCpaWluDw8JB/t729DXq9nihN1NVBgNdFzWKD4EH9fn/P+dlsNpH5EAwGhf/NIMCXNDkUCvFg6+vrsm1xfn6ej9nZ2RG+Hz2t7T/sMl0wUfiD1Wpl+/v70nuvUvFPp9MpWqZd1FE/phM9l2xkZITZ7XbZwZjlDOuZS2Rqv8ASXXZ3d/kDlg/DmpUc6Ha7GZYIK5VKDFsmuX4O0p0oOni9Xn4+GAhcLlfP+eEOiL8qEI/Hhf/9IElzAVWkAFTgZNT8A4EAjI6OwtDQEExPTx/BDg4OumvxxiBAsrsUYHh4GFKpFMhZuVyGyclJAfs8aOELi9N8rVbLV0ctrdlsclChUIBYLAZms1nAvqEunhZIOf8EVRPnRr2z01W6lUSZTmzefZoNFUV9RdU7DZ0y+QPqptTP0x8BBgCoKq8fjjt0ZAAAAABJRU5ErkJggg==) 0 0, auto;}'
			+'.ncx-cursor-add {cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxNTk5NzlFREJGMTFFNUI1RDNERkQxQUFDMDRERjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxNTk5N0FFREJGMTFFNUI1RDNERkQxQUFDMDRERjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzE1OTk3N0VEQkYxMUU1QjVEM0RGRDFBQUMwNERGMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzE1OTk3OEVEQkYxMUU1QjVEM0RGRDFBQUMwNERGMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlbAVHoAAALUSURBVHjavJVPaBNBFIffbtMUKwY0OVQMtjH1EDSnQrHoxYO0ibZS8eTBHnpp/Ytii0IVe1ELgrSCeBD1ojnoQdqDRUrUoBBIvAQEFWsCaa3G2KCmaUzZrL+ZJmWz3dYkTXfg25l5M7tf5u3shGRZvkE6Fbj4RdZLyoXJZFL2+/26SLkwkUjIJpNJF+mSkLX1kBYI9ZAuE+alwWCQSS/rImRYLBY5FAox6UVdhOslXVW4HlImNCgDRqORMpkMuVwuam5u5jGfz0dOp/M6mywIwto3U36FdrtdHhoa4m2HwyFns9lfkAyCqwq2VSSlTBaNRuX5+fmU2WzmUq/Xy1J5uOKbJp1OcxlKL7jV39/PhZ2dnSw2XmmhgIuE9km8n7toN4bD4U9YsSCKIkUiEdlqte7E2KTWA/aONLE9cBC0gx1gA5gCr8GTt2fefVcLRdTHmYwFUH+22Wwv3G43SZJEHo9HQLhnBdkBVO/BM9AN9oM94Ci4DSYxZwBUKe8TNJZ9KBAIjMXjcWptbZWw0nv4IT0qWReq+0AsIpOj4AhWK/GUagjZQ/xgAtyBbEola8mlrLqE13cTwj5N4WoFMjY/AJqWPbFjhBq22OjC6FmKzH5RD7N9svvN6eAHscSN1qIlY8Wy0UJ1m7ZSdZVBa5i9x14q8h0oS9savgoXuxhKvKlB2Rlsu0a76pxLK+SpbR+hhewCb5942k2xZCw/vb4coVHZMdcuprEglhPzPIoGdVpLFk4rO1fGL1GNoSa3aYapfrON+sbYpgnzWCxZ8N3PlCP0gvP5zmzq59LAgrSYxvjcD5r5/VXr3pflbJqJ3NFVTnmoedIU8S0eQ/VIHa811pIoVFEqM0dZOaseHsOH35E/S0squPExqmF1PJVJUfLvHy3ZR9CV74hlpuccGADp/8x7DvbhRyZWPLxLTO92VKeAGzTmztdv4BV4ANGE+u/pnwADAJY2rJMWYmDjAAAAAElFTkSuQmCC) 0 0, auto;}'
			+'.ncx-cursor-delete {cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODg4NEM2NzNFREIzMTFFNTkwNjNEMDE4MEY4NDJENjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODg4NEM2NzRFREIzMTFFNTkwNjNEMDE4MEY4NDJENjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4ODg0QzY3MUVEQjMxMUU1OTA2M0QwMTgwRjg0MkQ2NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4ODg0QzY3MkVEQjMxMUU1OTA2M0QwMTgwRjg0MkQ2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp/6/tcAAAJvSURBVHjavJVBiBJRGMffjNtEF6F0T0qbuQVCHiKQFrp0CNOKsPbcHrrs0l42yDq4UKcSoogiOkR1ykMF0R6KkKk8CXoSgooWDTd2Y10skDRhfP2/QWV2Uts3686D37w3z/fmN+973zwZ5/wGs6nApV+4XVJdWKvVeDabtUWqC6vVKnc6nbZIu0Jq2yFdJ7RD+o+wI83n8ySdt0VIuN1uXigUSHrFFuFWSQcKt0JKwhFjh6IorNlsskgkwkKhkN6XyWRYMBi8ToMlSdp8MnVW6Pf7eTKZ1NuBQIC3Wq1fkFwDVw14hhJSkpXLZV6v13+7XC5dqqoqhfL00JOm0WjoMpQZcDsej+vCWCxGfW+GLZRw0dC+gP15gPZ4sVj8ghVLsiyzUqnEvV7vPvy22OsBS2NnKQdOgFNgL9hB3eADeOb99uKHWSijPkcy6kD91efzvY1Go0zTNJZKpSR0T/eRHUP1EbwE58FRcBhMgrtgEWMSwGGcJ/VY9slcLrdQqVRYOBzWsNKHeJFpk2wK1SMgbyCSr8AZrFbTQ9pDSA/JgjS4D9mSSTbRDtk2ge27CeGlnsJBBTIanwOHBPOF8uSAp/T8kyw4ccKCjArt4wzb4B4Yy/FNfBURuowITtpjvNl1b44pB/f3Hbw6mWDa8lrndsyKUDHeyKM7mcMzOiCQDnNYhYXf153Ds7cY2670z5SVNePtshWhCi52H7j6U2TuOytJk24fXVbKE2EhPt4/qC5bkC1grmplhSR9iuqOwJTPYKqbaBbDMwcSoPGfca/BEbxkte/hLXjU7UY1C6JgvH2+roD34DFEafPf018BBgCuzILSC+9sGAAAAABJRU5ErkJggg==) 0 0, auto;}',
		   
			style = document.createElement('style');
		var head=jQuery('#newcrawler').contents().find("head").get(0);
		
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	},
	createCookie:function (name, value, days) {
	    var expires;

	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else {
	        expires = "";
	    }
	    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	},
	readCookie:function (name) {
	    var nameEQ = encodeURIComponent(name) + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
	        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	    }
	    return null;
	},
	eraseCookie:function (name) {
		newcrawler.createCookie(name, "", -1);
	}
};

jQuery(document).ready(function(){
	jQuery('#ncx_toolbar #ncx-cron-time')["clockpicker"]({
	    "placement": 'bottom',
	    "align": 'top',
	    "autoclose": true
	});
	
	jQuery('#ncx_toolbar #ncx-cron-date')["datetimepicker"]({
		"timepicker":false,
		"validateOnBlur": false,
		"closeOnDateSelect": true,
		"format":'Y-m-d'
	});
	
	JSONRpcClient["profile_async"] = true;
    JSONRpcClient["max_req_active"] = 2;
    JSONRpcClient["requestId"] = 1;
    newcrawler.webCrawlerId=newcrawler.getUrlParameter("webCrawlerId");
	newcrawler.siteId=newcrawler.getUrlParameter("siteId");
	newcrawler.rulesVerId=newcrawler.getUrlParameter("rulesVerId");
	
    jsonrpc = new JSONRpcClient("../JSON-RPC/MEMBER");
    
    newcrawler.jsonrpc=jsonrpc;
    
	var webCrawlerId=newcrawler.webCrawlerId;
	var siteId=newcrawler.siteId;
    
    if(jQuery(".logsViewConsole").length>0){
	    newcrawler.logsViewConsole=logsViewConsole;
		logsViewConsole["fn"]["init"]();
		
		newcrawler.clickLogs=function(){
			jQuery(".logsViewConsole").click();
		}
		
		var option={
			  	"tableId":"ncx-crawlDataLog",
				"listTableId":"ncx-crawlDataLogList",
				"PER_PAGE_ITEMS":5,
				"ITEMS_COUNT":0,
				"cur_page":0,
				"webCrawlerId":webCrawlerId,
				"siteId":siteId
		}
		newcrawler.crawlDataLog=new crawlDataLog(option);
    }

	var iframe=jQuery('#newcrawler')[0];
	iframe.contentDocument.addEventListener("readystatechange", function(){
		console.log(iframe.readyState);
	})
	iframe.contentDocument.addEventListener("DOMContentLoaded", function(){
    	jQuery(iframe).contents().find('*').each(function(){
    		var fun=this.onerror;
    		if(fun){
    			console.log(this.onerror);
    			this.onerror=function(){};
    		}
    	});
    });
	iframe.onreadystatechange = function(){
		console.log(iframe.readyState);
    };
	if (iframe.attachEvent){
	    iframe.attachEvent("onload", function(){
	        newcrawler.initLoad();
	    });
	} else {
	    iframe.onload = function(){
	        newcrawler.initLoad();
	    };
	}
	newcrawler.message("show", "Loading...");
	iframe.src=newcrawler_url;
});

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 2147483488).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        }).on("mouseout", function(e) {
        	if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);

