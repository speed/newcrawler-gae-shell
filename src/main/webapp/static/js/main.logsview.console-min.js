var logsViewConsole=new logsViewConsoleFn();function logsViewConsoleFn(){var obj=this;obj.v={webCrawlerId:null,siteId:null,logsTimer:null,isShow:false,logsWindowHeight:200,logsWindowHeightDefault:200};obj.fn={init:function(){if(obj.v.logsTimer!=null){clearTimeout(obj.v.logsTimer)}obj.v.logsTimer=null;var selectdivObj=jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv");if(selectdivObj.length>0){for(var i in webCrawlerJsonData){if(isNaN(i)){continue}var name=webCrawlerJsonData[i]["name"];var console_item='<li class="console_item" lang="'+webCrawlerJsonData[i]["id"]+'">'+name+"</li>";jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").find(".selectdrop").append(console_item)}}jQuery(".logsViewConsole").click(function(){if(jQuery(".logsViewConsoleWindow").is(":hidden")){if(obj.v.webCrawlerId==null||obj.v.webCrawlerId==undefined){if(webCrawlerId==null||webCrawlerId==undefined){showInfo(nc.i18n("res.not.select.crawler"));return}obj.v.webCrawlerId=webCrawlerId}obj.v.isShow=true;jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").find(".selectdrop li").each(function(){var lang=jQuery(this).attr("lang");var name=jQuery(this).text();jQuery(this).removeClass("selectdiv_item_selected");if(lang==webCrawlerId){jQuery(".logsViewConsoleWindow").find(".logs").find(".select_title").text(name);jQuery(this).addClass("selectdiv_item_selected")}})}else{obj.v.isShow=false}if(obj.v.webCrawlerId==null||obj.v.webCrawlerId==undefined){if(webCrawlerId==null||webCrawlerId==undefined){showInfo(nc.i18n("res.not.select.crawler"));return}}obj.fn.moveAllTrWithObj(jQuery(".logsViewConsoleWindow").find(".logs").find("table"));jsonrpc.logService.consoleLogs(function(result,exception,profile){if(exception){return}if(obj.v.isShow){var height=jQuery(".ui-layout-content").height();height=height-(obj.v.logsWindowHeightDefault+28);jQuery(".ui-layout-content").height(height);jQuery(".logsViewConsoleWindow").show();obj.fn.initEvent();obj.fn.log();jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdiv").hover(function(){jQuery(this).addClass("selectdiv_datahighlight");jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdrop").show()},function(){jQuery(this).removeClass("selectdiv_datahighlight");jQuery(".logsViewConsoleWindow").find(".logs").find(".selectdrop").hide()});jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").click(function(){var lang=jQuery(this).attr("lang");var name=jQuery(this).text();obj.fn.changeConsole(jQuery(this),lang,name);jQuery(this).mouseout()});jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").hover(function(){jQuery(this).addClass("selectdiv_item_datahighlight")},function(){jQuery(this).removeClass("selectdiv_item_datahighlight")})}else{var height=jQuery(".ui-layout-content").height();height=height+(obj.v.logsWindowHeightDefault+28);jQuery(".ui-layout-content").height(height);jQuery(".logsViewConsoleWindow").hide();if(obj.v.logsTimer!=null){clearTimeout(obj.v.logsTimer)}}},obj.v.webCrawlerId,obj.v.siteId,obj.v.isShow)})},moveAllTrWithObj:function(tableJQueryObj){var tab=tableJQueryObj.get(0);var rowlen=tab.rows.length;for(var rowIndex=rowlen-1;rowIndex>0;rowIndex--){tab.deleteRow(rowIndex)}},changeConsole:function(obj,webCrawlerId,name){if(webCrawlerId==obj.v.webCrawlerId){return}var old_webCrawlerId=obj.v.webCrawlerId;jsonrpc.logService.consoleLogs(function(result,exception,profile){if(exception){return}obj.v.isShow=true;obj.v.webCrawlerId=webCrawlerId;jQuery(".logsViewConsoleWindow").find(".logs").find(".console_item").each(function(){jQuery(this).removeClass("selectdiv_item_selected")});obj.addClass("selectdiv_item_selected");jQuery(".logsViewConsoleWindow").find(".logs").find(".select_title").text(name);if(obj.v.logsTimer==null){obj.fn.log()}jsonrpc.logService.consoleLogs(function(result,exception,profile){if(exception){return}},old_webCrawlerId,null,false)},webCrawlerId,null,true)},log:function(){jsonrpc.logService.readConsoleLogs(function(result,exception,profile,ele){result=eval(result);for(var i in result){if(isNaN(i)){continue}var row="";var logs=(result[i]["logs"]==null?"":result[i]["logs"]);var remark=(result[i]["remark"]==null?"":result[i]["remark"]);if(result[i]["key"]!=null&&result[i]["key"]!=""){var key=(result[i]["key"]==null?"":("logs_"+result[i]["key"]));row+="<tr id='"+key+"' class='simplehighlight'>";var status=(result[i]["status"]==null?"":result[i]["status"]);var color=(result[i]["color"]==null?"":("logs_"+result[i]["color"]));if(result[i]["isUpdate"]){jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").text(status);jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").removeClass("logs_blue logs_red logs_green");jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_status").addClass(color);jQuery(".logsViewConsoleWindow .logs").find("#"+key).find(".logs_remark").text(remark);continue}else{var type=(result[i]["type"]==null?"":result[i]["type"]);if(type==1){type=nc.i18n("res.logs.type.crawl")}else{if(type==2){type=nc.i18n("res.logs.type.crawl.retry")}else{if(type==3){type=nc.i18n("res.logs.type.deploy")}else{if(type==4){type=nc.i18n("res.logs.type.deploy.retry")}else{if(type==5){type=nc.i18n("res.logs.type.download")}else{if(type==6){type=nc.i18n("res.logs.type.download.retry")}else{type=""}}}}}}var date=(result[i]["date"]==null?"":result[i]["date"]);row+="<td>"+date+"</td>";row+="<td>"+type+"</td>";row+="<td>[<span style='width:70px;display: inline-block;' class='logs_status "+color+"'>"+status+"</span>]</td>"}}else{row="<tr class='simplehighlight'>";row+="<td></td>";row+="<td></td>";row+="<td></td>"}row+='<td><div contenteditable="true" style="overflow: hidden; line-height: 22px; height: 22px; text-overflow: ellipsis;"  class="logs_body"></div></td>';row+='<td><div contenteditable="true" style="overflow: hidden; line-height: 22px; height: 22px; text-overflow: ellipsis;padding-left: 20px;" class="logs_remark" ></div></td>';row+="</tr>";var rowObj=jQuery(row);rowObj.find(".logs_body").text(logs);rowObj.find(".logs_remark").text(remark);rowObj.appendTo(".logsViewConsoleWindow .logs table");jQuery(".logsViewConsoleWindow").find(".logs").animate({scrollTop:jQuery(".logsViewConsoleWindow .logs")[0].scrollHeight},0);jQuery(".logsViewConsoleWindow").find(".logs").find("table").find(".simplehighlight").hover(function(){jQuery(this).children().addClass("logs_datahighlight")},function(){jQuery(this).children().removeClass("logs_datahighlight")})}if(obj.v.isShow){obj.v.logsTimer=setTimeout(function(){obj.fn.log()},1500)}},obj.v.webCrawlerId,obj.v.siteId,0,20)},clean:function(){var tableJQueryObj=jQuery(".logsViewConsoleWindow").find(".logs").find("table");obj.fn.moveAllTrWithObj(tableJQueryObj)},min:function(){var reHeight=obj.v.logsWindowHeight-25;obj.v.logsWindowHeight=25;jQuery(".logsViewConsoleWindow").find(".logs").height(obj.v.logsWindowHeight);var height=jQuery(".ui-layout-content").height();height=height+reHeight;jQuery(".ui-layout-content").height(height);var lang=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(lang).removeClass("resize");jQuery(".logsViewConsoleWindow").find(".logs").find(".min").addClass("resize").removeClass("min");obj.fn.initEvent()},max:function(){var height=jQuery(".ui-layout-content").height();jQuery(".ui-layout-content").height(0);obj.v.logsWindowHeight=obj.v.logsWindowHeight+height;jQuery(".logsViewConsoleWindow").find(".logs").height(obj.v.logsWindowHeight);var lang=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(lang).removeClass("resize");jQuery(".logsViewConsoleWindow").find(".logs").find(".max").addClass("resize").removeClass("max");obj.fn.initEvent()},resize:function(){var reHeight=obj.v.logsWindowHeight-obj.v.logsWindowHeightDefault;var height=jQuery(".ui-layout-content").height();height=height+reHeight;jQuery(".ui-layout-content").height(height);jQuery(".logsViewConsoleWindow").find(".logs").height(obj.v.logsWindowHeightDefault);obj.v.logsWindowHeight=obj.v.logsWindowHeightDefault;var lang=jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("lang");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").addClass(lang).removeClass("resize");obj.fn.initEvent()},initEvent:function(){jQuery(".logsViewConsoleWindow").find(".logs").find(".min").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".max").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").unbind("click");jQuery(".logsViewConsoleWindow").find(".logs").find(".min").click(function(){obj.fn.min()});jQuery(".logsViewConsoleWindow").find(".logs").find(".max").click(function(){obj.fn.max()});jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").click(function(){obj.fn.resize()});jQuery(".logsViewConsoleWindow").find(".logs").find(".min").attr("title",nc.i18n("res.console.min"));jQuery(".logsViewConsoleWindow").find(".logs").find(".max").attr("title",nc.i18n("res.console.max"));jQuery(".logsViewConsoleWindow").find(".logs").find(".resize").attr("title",nc.i18n("res.console.resize"))}}};