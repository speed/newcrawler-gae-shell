var queueManage={v:{formId:"queueForm",tableId:"queueTable",webCrawlerId:null,queueJson:null},fn:{init:function(){queueManage.v.webCrawlerId=webCrawlerId;queueManage.v.queueJson=new Array();var b=""+webCrawlerId;var a=crawlQueueHasImplMap.get(b);if(a===true){queueManage.fn.initSlider(1,10);queueManage.fn.query();$("#queueManageTable").find(".queueConfig").show()}},initSlider:function(b,a){$("#"+queueManage.v.formId).find("#rateSlider").slider({range:"min",min:1,max:100,value:b,slide:function(c,d){$("#"+queueManage.v.formId).find("#rate").val(d.value)}});$("#"+queueManage.v.formId).find("#rate").val($("#"+queueManage.v.formId).find("#rateSlider").slider("value"));$("#"+queueManage.v.formId).find("#maxConcurrentSlider").slider({range:"min",min:1,max:200,value:a,slide:function(c,d){$("#"+queueManage.v.formId).find("#maxConcurrent").val(d.value)}});$("#"+queueManage.v.formId).find("#maxConcurrent").val($("#"+queueManage.v.formId).find("#maxConcurrentSlider").slider("value"))},query:function(callback){moveAllTr(queueManage.v.tableId);queryLoading(queueManage.v.tableId);jsonrpc.crawlQueueService.query(function(result,exception,profile){if(exception){removeLoading($("#"+queueManage.v.formId));return}moveAllTr(queueManage.v.tableId);var data=result;data=eval(data);queueManage.fn.showData(data);var key=""+webCrawlerId;queueJsonDataMap.put(key,data);if(callback){callback()}removeLoading($("#"+queueManage.v.formId))},queueManage.v.webCrawlerId)},showData:function(d){queueManage.v.queueJson=d;for(var e in d){if(isNaN(e)){continue}var c=d[e]["id"];var b=d[e]["name"];var g=d[e]["rate"]+"/"+d[e]["rateUnit"];var a=d[e]["maxConcurrent"];var j=d[e]["size"];var h=d[e]["createDate"]==null?"":d[e]["createDate"];var f=d[e]["updateDate"]==null?"":d[e]["updateDate"];queueManage.fn.addRow(c,b,g,a,j,h,f)}$("#"+queueManage.v.tableId).find(".queueId").click(function(){var i=$(this).parent().parent().find("input[name='id']").val();queueManage.fn.edit(i)});$("#"+queueManage.v.tableId).find(".purgeQueue").click(function(){var i=$(this).parent().parent().find("input[name='name']").val();queueManage.fn.purgeQueue(i)});$("#"+queueManage.v.tableId).find(".viewMessage").click(function(){var i=$(this).parent().parent().find("input[name='name']").val();var k=$(this).parent().parent().find("input[name='size']").val();openConfigBox($(this),function(){queueMessage.fn.init(i,k)})})},edit:function(b){for(var a in queueManage.v.queueJson){if(isNaN(a)){continue}if(queueManage.v.queueJson[a]["id"]==b){$("#"+queueManage.v.formId+" #id").val(queueManage.v.queueJson[a]["id"]);$("#"+queueManage.v.formId+" #name").val(queueManage.v.queueJson[a]["name"]);$("#"+queueManage.v.formId+" #rateUnit").val(queueManage.v.queueJson[a]["rateUnit"]);queueManage.fn.initSlider(queueManage.v.queueJson[a]["rate"],queueManage.v.queueJson[a]["maxConcurrent"]);break}}},create:function(){var c=$("#"+queueManage.v.formId+" #name").val();var d=$("#"+queueManage.v.formId+" #rate").val();var a=$("#"+queueManage.v.formId+" #rateUnit").val();var b=$("#"+queueManage.v.formId+" #maxConcurrent").val();jsonrpc.crawlQueueService.create(function(e,f,g){if(f){return}queueManage.fn.query(function(){queueManage.fn.updateQueueSelect()})},queueManage.v.webCrawlerId,c,d,a,b)},updateQueueSelect:function(){$(".queueSelect").each(function(){var b=$(this).attr("id");var a=$(this).parents("form").attr("id");fillQueue(a,b,true)})},update:function(){var d=$("#"+queueManage.v.formId+" #id").val();if(d==null||d.length==0){showInfo(nc.i18n("res.select"));return}var c=$("#"+queueManage.v.formId+" #rate").val();var a=$("#"+queueManage.v.formId+" #rateUnit").val();var b=$("#"+queueManage.v.formId+" #maxConcurrent").val();jsonrpc.crawlQueueService.update(function(e,f,g){if(f){return}var h=e;if(h){queueManage.fn.query(function(){queueManage.fn.updateQueueSelect()});showInfo(nc.i18n("res.update.success"))}else{showInfo(nc.i18n("res.update.failure"))}},queueManage.v.webCrawlerId,d,c,a,b)},remove:function(){var a=getRadio(queueManage.v.formId,"queueId");if(a==null||a.length==0){showInfo(nc.i18n("res.select"));return}if(!confirm(nc.i18n("res.remove.confirm"))){return}$("#"+queueManage.v.formId+" #id").val(a);jsonrpc.crawlQueueService.remove(function(b,c,d){if(c){return}var e=b;if(e){queueManage.fn.query(function(){queueManage.fn.updateQueueSelect()});showInfo(nc.i18n("res.remove.success"))}else{showInfo(nc.i18n("res.remove.failure"))}},queueManage.v.webCrawlerId,a)},purgeQueue:function(a){if(!confirm("Are you sure you want to purge all tasks from "+a+"?")){return}jsonrpc.crawlQueueService.purgeQueue(function(b,c,d){if(c){return}var e=b;if(e){queueManage.fn.query(function(){queueManage.fn.updateQueueSelect()});showInfo(nc.i18n("res.remove.success"))}else{showInfo(nc.i18n("res.remove.failure"))}},queueManage.v.webCrawlerId,a)},addRow:function(h,c,f,b,d,e,g){var a="<tr class='simplehighlight'>";a+="<td nowrap>";if(h!=null){a+='&nbsp;<input type="radio" name="queueId" class="queueId" value="'+h+'"/>'}a+='<input type="hidden" name="id" value="'+h+'" />';a+='<input type="hidden" name="name" value="'+c+'" />';a+='<input type="hidden" name="size" value="'+d+'" />';a+="</td>";a+="<td nowrap>"+c+"</td>";a+="<td nowrap>"+f+"</td>";a+="<td nowrap>"+b+"</td>";a+="<td nowrap>"+d+"</td>";a+="<td nowrap>";a+='<input type="button" value="Purge Queue" class="jfk-button jfk-button-standard purgeQueue"/>';a+='<input type="button" value="View Message" class="jfk-button jfk-button-standard viewMessage" lang="QueueMessage.html"/>';a+="</td>";a+="</tr>";$(a).appendTo("#"+queueManage.v.tableId);$("#"+queueManage.v.tableId+" tr:even").css("background","#EEE");$("#"+queueManage.v.tableId+" tr:odd").css("background","#FFFFFF");$("#"+queueManage.v.tableId+" .simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})}}};