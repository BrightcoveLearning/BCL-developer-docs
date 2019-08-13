WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.comalatech.adhoccanvas:canvas-blueprint-resources', location = 'com/comalatech/adhoccanvas/blueprint/templates/soy/blueprints.soy' */
// This file was automatically generated from blueprints.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Canvas.Blueprints.
 */

if (typeof Canvas == 'undefined') { var Canvas = {}; }
if (typeof Canvas.Blueprints == 'undefined') { Canvas.Blueprints = {}; }


Canvas.Blueprints.iframe = function(opt_data, opt_ignored) {
  return '<div id="cnv-pickerloading" class="cnv-loading" style="height: ' + soy.$$escapeHtml(opt_data.height) + 'px">&nbsp;</div><iframe id="cnv-pickeriframe" frameborder=\'0\' scrolling="no" width=\'100%\' height=\'' + soy.$$escapeHtml(opt_data.height) + '\' class=\'canvas hidden\' src="' + soy.$$escapeHtml(opt_data.contextPath) + '/plugins/servlet/adhoccanvas/picker?spaceKey=' + soy.$$escapeHtml(opt_data.spaceKey) + '&blueprint=true"></iframe>';
};
if (goog.DEBUG) {
  Canvas.Blueprints.iframe.soyTemplateName = 'Canvas.Blueprints.iframe';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.comalatech.adhoccanvas:canvas-blueprint-resources', location = 'com/comalatech/adhoccanvas/blueprint/js/canvaspickerblueprint.js' */
Canvas.PickerBlueprint=Backbone.View.extend({className:"cnv-wizard-picker",events:{"canvas:enableCreate":"enableCreate","canvas:disableCreate":"disableCreate"},initialize:function(){this.render()},show:function(a,b){this.$el.html(Canvas.Blueprints.iframe({contextPath:AJS.contextPath(),spaceKey:b,height:342}));var d=this.$("#cnv-pickerloading");var e=this.$("#cnv-pickeriframe");e.on("load",function(){d.remove();e.removeClass("hidden")});var c=AJS.$("#"+a.id);this.$createButton=AJS.$(".cnv-blueprint-create",c);this.disableCreate()},enableCreate:function(b,a){this.table=a;this.$createButton.attr("aria-disabled","false")},disableCreate:function(){this.$createButton.attr("aria-disabled","true")},makeBoard:function(){return this.table.get("board")},render:function(){this.$el.html("");return this}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.comalatech.adhoccanvas:canvas-blueprint-resources', location = 'com/comalatech/adhoccanvas/blueprint/js/adhoccanvasblueprints.js' */
function CanvasBlueprint(b,d){var c=b;this.wizard=function(h,j,g){var f=new c();var l=AJS.$("#"+h.id);var k=h.addPage("cnv-blueprint-dialog "+d),i=function(o){var p=f.makeBoard();if(!p){return}var n={markup:JSON.stringify(p.toJSON())};var m="<![CDATA["+JSON.stringify(p.toJSON())+"]]>";var q=a(p.get("name"),j,m);$(document.body).append(q);q.submit()};k.addHeader("Create Canvas").addPanel("SinglePanel",f.$el,"singlePanel").addButton("Back",function(m){m.prevPage();m.page.pop()},"hello-blueprint-back-button").addButton("Create",i,"cnv-blueprint-create").addLink("Cancel",function(m){m.remove()},"button-panel-cancel-link");l.find(".cnv-blueprint-create").removeClass("button-panel-button").addClass("aui-button aui-button-primary");AJS.$("h2.dialog-title",k.getPage(1).element).prepend(helpLink());if(f.show){f.show(h,j)}};helpLink=function(){var f=AJS.$("<a></a>",{href:"https://wiki.comalatech.com/x/KoTn",target:"_blank","class":"cml-help-link"}).html("Help");help=AJS.$("<div></div>",{"class":"dialog-help-link"}).html(f);return help};function a(i,h,f){var g=$("<form></form>");g.attr("method","post");g.attr("action",Confluence.getContextPath()+"/plugins/adhoccanvas/create.action");g.append(e("markup",f));g.append(e("spaceKey",h));g.append(e("title",i||""));g.append(e("atl_token",Confluence.getXsrfToken()));return g}function e(f,g){var h=$("<input>");h.attr("name",f);h.attr("value",g);h.attr("type","hidden");return h}Confluence.Blueprint.register("com.comalatech.adhoccanvas:"+d,this.wizard)}(function(a){new CanvasBlueprint(Canvas.Wizard.Roadmap,"canvas-blueprint-roadmap-webitem");new CanvasBlueprint(Canvas.Wizard.TasksBoard,"canvas-blueprint-tasks-webitem");new CanvasBlueprint(Canvas.PickerBlueprint,"canvas-blueprint-picker-webitem")})(AJS.$);
}catch(e){WRMCB(e)};