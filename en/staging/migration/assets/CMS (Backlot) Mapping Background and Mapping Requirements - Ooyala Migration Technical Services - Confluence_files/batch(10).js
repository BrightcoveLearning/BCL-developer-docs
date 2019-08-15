WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:likes', location = '/model/like.js' */
define("confluence/ic/model/like",["backbone"],function(b){var a=b.Model.extend({initialize:function(c,d){if(!c){throw new Error("Attributes is required")}if(!c.username){throw new Error("username is a required attribute")}}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:likes', location = '/model/likes.js' */
define("confluence/ic/model/likes",["ajs","underscore","backbone","confluence/ic/model/like","confluence/ic/likes/likes-manager"],function(b,d,f,c,a){var e=f.Collection.extend({model:c,url:function(){return b.contextPath()+"/rest/likes/1.0/content/"+this.contentId+"/likes"},initialize:function(h,g){d.bindAll(this,"_handleSaveSuccess","_handleDestroySuccess","_handleError");g=g||{};if(g.contentId===undefined){throw new Error("content ID is required.")}this.contentId=g.contentId;if(a.getLikes(g.contentId)){this.reset(a.getLikes(g.contentId))}this.listenTo(f,"ic:likes-received",this.updateLikes);this.bind("add",function(i){i.save(null,{success:this._handleSaveSuccess,error:this._handleError})});this.bind("remove",function(i){i.id="";i.destroy({success:this._handleDestroySuccess,error:this._handleError})});this.currentUserName=b.Meta.get("remote-user")},updateLikes:function(){this.reset(a.getLikes(this.contentId))},addUser:function(g){return this.add({username:g})},removeUser:function(g){return this.remove(this.getUserByName(g))},isLikedByUser:function(g){return !!this.getUserByName(g)},getUserByName:function(g){return this.findWhere({username:g})},toggleLike:function(){if(this.isLikedByUser(this.currentUserName)){this.removeUser(this.currentUserName)}else{this.addUser(this.currentUserName)}},_handleSaveSuccess:function(g){a.add(this.contentId,this.currentUserName)},_handleDestroySuccess:function(g){a.remove(this.contentId,this.currentUserName)},_handleError:function(h,g){this.updateLikes();if(g.status===405&&g.responseText){f.trigger("ic:error","This site is read-only. You can\u0027t make changes right now.")}else{f.trigger("ic:error","Likes cannot be updated.")}}});return e});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:confirm-dialog-view', location = 'view/confirm-dialog/confirm-dialog.soy' */
// This file was automatically generated from confirm-dialog.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.confirmDialog = function(opt_data, opt_ignored) {
  return '<strong class="ic-confirm-label">' + soy.$$escapeHtml(opt_data.label) + '</strong><div class="ic-confirm-message">' + soy.$$escapeHtml(opt_data.message) + '</div><div class="ic-confirm-buttons">' + aui.buttons.button({text: 'Delete', tagName: 'button', extraClasses: ['ic-action-delete-confirm', 'aui-button-compact']}) + aui.buttons.button({text: 'Cancel', tagName: 'button', type: 'link', extraClasses: ['ic-action-cancel-confirm', 'aui-button-compact']}) + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.confirmDialog.soyTemplateName = 'Confluence.Templates.IC.confirmDialog';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:confirm-dialog-view', location = 'view/confirm-dialog/confirm-dialog.js' */
define("confluence/ic/view/confirm-dialog",["backbone","underscore","jquery"],function(d,b,c){var a=d.View.extend({tagName:"div",className:"ic-confirm-container",initialize:function(e){this.$menuEl=e.$menuEl;this.$bodyEl=e.$bodyEl;this.$menuEl.addClass("ic-action-menu-active");this.render();b.bindAll(this,"clickOutside");this.$bodyEl.on("click",this.clickOutside)},events:{"click .ic-action-cancel-confirm":"cancel","click .ic-action-delete-confirm":"confirm"},template:Confluence.Templates.IC.confirmDialog,render:function(){this.$el.html(this.template(this.model.toJSON()));return this},clickOutside:function(f){if(c.contains(this.el,f.target)||this.el===f.target){return}this.cancel()},cancel:function(){this.destroy()},confirm:function(){this.trigger("ic:confirm");this.destroy()},destroy:function(){this.$bodyEl.off("click",this.clickOutside);this.$menuEl.removeClass("ic-action-menu-active");this.remove()}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:common-resource', location = 'common/common.soy' */
// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.authorAvatar = function(opt_data, opt_ignored) {
  return '' + ((opt_data.authorUserName == '') ? aui.avatar.avatar({size: opt_data.size, avatarImageUrl: opt_data.authorAvatarUrl, extraClasses: 'ic-author-avatar'}) : '<a data-username="' + soy.$$escapeHtml(opt_data.authorUserName) + '" href="' + soy.$$escapeHtml("") + '/display/~' + soy.$$escapeHtml(opt_data.authorUserName) + '" title="" data-user-hover-bound="true">' + aui.avatar.avatar({size: opt_data.size, avatarImageUrl: opt_data.authorAvatarUrl, extraClasses: 'ic-author-avatar'}) + '</a>');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.authorAvatar.soyTemplateName = 'Confluence.Templates.IC.authorAvatar';
}


Confluence.Templates.IC.sidebarHeading = function(opt_data, opt_ignored) {
  return '<div class="ic-sidebar-heading"><div id="ic-nav-container">' + ((opt_data.createComment == true) ? Confluence.Templates.IC.navigation({disabled: true, showIndex: false}) : '') + '</div><div class="ic-right-toolbar">' + ((opt_data.showMenu) ? Confluence.Templates.IC.commentMenu(opt_data) : '') + aui.buttons.button({type: 'text', extraClasses: 'aui-button-text ic-action-hide', iconType: 'aui', iconClass: 'aui-icon-small aui-iconfont-close-dialog', text: '', extraAttributes: {title: 'Close sidebar (])'}}) + '</div></div><div class="ic-error"></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.sidebarHeading.soyTemplateName = 'Confluence.Templates.IC.sidebarHeading';
}


Confluence.Templates.IC.commentHeader = function(opt_data, opt_ignored) {
  return '<div class="ic-author">' + Confluence.Templates.IC.authorAvatar({authorUserName: opt_data.authorUserName, authorAvatarUrl: opt_data.authorAvatarUrl, size: 'small'}) + Confluence.Templates.User.usernameLink({canView: opt_data.authorUserName != '', username: opt_data.authorUserName, fullName: opt_data.authorDisplayName}) + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.commentHeader.soyTemplateName = 'Confluence.Templates.IC.commentHeader';
}


Confluence.Templates.IC.timeLink = function(opt_data, opt_ignored) {
  return '<a class="ic-date-link" title="' + soy.$$escapeHtml(opt_data.time) + '" href="' + soy.$$escapeHtml("" + opt_data.commentUrl) + '"><span>' + soy.$$escapeHtml(opt_data.time) + '</span></a>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.timeLink.soyTemplateName = 'Confluence.Templates.IC.timeLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:editor', location = 'editor/editor.js' */
define("confluence/ic/editor/editor",["jquery","ajs","confluence/ic/util/utils","exports"],function(e,h,f,c){function b(){if(!h.Confluence.EditorLoader.resourcesLoaded()){this.$form.find(".loading-container").spin("small")}}function i(){h.Meta.set("content-type","comment");h.Meta.set("use-inline-tasks","false");h.Meta.set("min-editor-height",80)}function m(n){n.$form.find(".loading-container").hide();n.$form.find("#rte-button-publish").text("Save").removeAttr("title");n.$form.find("#toolbar-hints-draft-status").hide();if(this.hideCancelButton){n.$form.find("#rte-button-cancel").hide()}n.editor.onPostProcess.add(j("onPostProcess",n.editor));if(Confluence.Editor&&!Confluence.Editor.getContentType){h.Confluence.QuickEdit.QuickEditPage.disable()}Confluence.Editor.removeAllCancelHandlers();Confluence.Editor.removeAllSaveHandlers()}function k(n){return h.Confluence.QuickEdit.activateEditor({preActivate:b,preInitialise:i,postInitialise:e.proxy(m,n),toolbar:false,$container:n.container,$form:n.form,saveHandler:n.saveHandler,cancelHandler:n.cancelHandler,fetchContent:n.fetchContent(),closeAnyExistingEditor:true,postDeactivate:n.postDeactivate,plugins:f.getSupportedRtePlugins(),excludePlugins:f.getUnsupportedRtePlugins()})}function d(){if(h.Rte&&h.Rte.getEditor()){return h.Confluence.QuickEdit.deactivateEditor()}else{return e.Deferred().resolve()}}function a(){return h.Rte.Content.getHtml()}function g(n){if(n){e(".ic-sidebar #rte-spinner").spin()}else{e(".ic-sidebar #rte-spinner").spinStop()}e("#rte-button-publish").prop("disabled",n)}function j(p,o){var n=function(){tinymce.DOM.setStyle(tinymce.DOM.get(o.id+"_ifr"),"height","80px");o.execCommand("mceAutoResize",{forceExec:true});o[p].remove(n)};return n}function l(n){if(h.DarkFeatures.isEnabled("frontend.editor.v4")){return n===""}else{return n==="<p><br /></p>"}}c.init=k;c.remove=d;c.getContent=a;c.setEditorBusy=g;c.isEmptyContent=l});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:create-comment-view', location = 'view/create-comment/create-comment.soy' */
// This file was automatically generated from create-comment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.createComment = function(opt_data, opt_ignored) {
  return '<div class="ic-comment-container">' + ((opt_data.type == 'topLevel' || opt_data.type == 'pageComment') ? Confluence.Templates.IC.sidebarHeading({showMenu: false, createComment: true, darkFeatures: opt_data.darkFeatures}) : '') + Confluence.Templates.IC.commentForm(opt_data) + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.createComment.soyTemplateName = 'Confluence.Templates.IC.createComment';
}


Confluence.Templates.IC.commentForm = function(opt_data, opt_ignored) {
  var output = '<div class="ic-container ic-create-comment">' + Confluence.Templates.IC.commentHeader(opt_data) + '<div class="ic-body"><form class="aui" action="">';
  if (! opt_data.darkFeatures.RICH_TEXT_EDITOR) {
    var placeholder__soy27 = '' + ((opt_data.type == 'reply') ? soy.$$escapeHtml('Reply') : soy.$$escapeHtml('write a comment\u2026'));
    output += '<textarea class="textarea ic-textarea" name="body" placeholder="' + soy.$$escapeHtml(placeholder__soy27) + '">' + soy.$$escapeHtml(opt_data.text) + '</textarea><div class="ic-actions"><ul><li>' + aui.buttons.button({tagName: 'button', text: 'Save', type: 'link', extraClasses: 'ic-action-save', isDisabled: true}) + '</li>' + ((opt_data.type != 'topLevel') ? '<li>' + aui.buttons.button({text: 'Cancel', type: 'link', extraClasses: 'ic-action-discard'}) + '</li>' : '') + '</ul></div>';
  } else {
    output += '<div class="loading-container" />';
  }
  output += '</form></div></div>';
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.IC.commentForm.soyTemplateName = 'Confluence.Templates.IC.commentForm';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:create-comment-view', location = 'view/create-comment/create-comment.js' */
define("confluence/ic/view/create-comment",["underscore","jquery","backbone","ajs","confluence/ic/model/comment","confluence/ic/model/reply","confluence/ic/util/utils","confluence/ic/editor/editor"],function(h,c,g,f,b,a,e,d){var i=g.View.extend({tagName:"div",className:"ic-create-comment-view",events:{"click .ic-action-save":"saveComment","click .ic-action-discard":"discardComment","keyup .ic-textarea":"onInput","focus .ic-textarea":"onFocus","click #show-page-comment":"showPageComment"},template:Confluence.Templates.IC.createComment,initialize:function(j){this.selection=j.selection;this.type=j.type;this.onFinished=j.onFinished||function(){};this.commentText=j.commentText||"";this.stopFocus=j.stopFocus;this.serializedHighlights=j.serializedHighlights;if(j.type==="edit"||j.type==="reply"){this.template=Confluence.Templates.IC.commentForm;g.trigger("ic:discard-edit");this.listenTo(g,"ic:discard-edit",this.discardComment)}},finish:function(){this.onFinished();f.trigger("ic-jim-async-supported")},render:function(){var k=this._getAuthorObject();var j={type:this.type,text:this.commentText,showMenu:false};var l=h.extend({},k,j,{darkFeatures:e.getDarkFeatures()});this.$el.html(this.template(l));if(e.getDarkFeatures().RICH_TEXT_EDITOR){this.renderEditor()}else{if(!this.stopFocus){setTimeout(h.bind(this.focusEditor,this),1)}}e.addSidebarHeadingTooltip(this);return this},onInput:function(k){var j=this.$(k.target).val().trim()!=="";this._saveDisable(!j)},onFocus:function(){if(this.type==="edit"){var j=this.$(".textarea");e.moveCaretToEnd(j[0]);this._saveDisable(j.text()==="")}},saveComment:function(j){j.preventDefault();if(!this._isValid()){return}this._disableForm();if(this.type==="reply"){this._addReply()}else{if(this.type==="edit"){this._saveEdit()}else{this._addComment()}}},_getAuthorObject:function(){var j;var k;var l;if(this.type==="edit"){j=this.model.get("authorUserName");k=this.model.get("authorAvatarUrl");l=this.model.get("authorDisplayName")}else{j=f.Meta.get("remote-user");k=e.getAuthorAvatarUrl();l=e.getAuthorDisplayName()}return{authorUserName:j,authorAvatarUrl:k,authorDisplayName:l}},_saveEdit:function(){var k=this._getContent();var j={wait:true,beforeSend:h.bind(this.beforeSendAjax,this),success:h.bind(this._onSaveSuccess,this),error:h.bind(this._showEditError,this)};this.model.save({body:k},j)},_showEditError:function(l,k){if(this.showCaptchaError(k)){return}var m;switch(k.status){case 401:m="You don\u0027t have permission to edit this comment.";break;case 405:if(k.responseText){var j=JSON.parse(k.responseText);if(j.reason==="READ_ONLY"){m="This site is read-only. You can\u0027t make changes right now.";break}}default:m="We can\u0027t save your edit. The comment might have been deleted."}this._triggerError(m)},_triggerError:function(k,j){g.trigger("ic:error",k,j);this._disableForm(false)},_addReply:function(){var j=new a({body:this._getContent(),commentId:this.model.get("id"),hasDeletePermission:!!f.Meta.get("remote-user")||this.model.get("hasDeletePermission")});j.save(null,{beforeSend:h.bind(this.beforeSendAjax,this),success:h.bind(this._onSaveSuccess,this),error:h.bind(function(m,l){if(!this.showCaptchaError(l)){if(l.status===405&&l.responseText){var k=JSON.parse(l.responseText);if(k.reason==="READ_ONLY"){g.trigger("ic:error","This site is read-only. You can\u0027t make changes right now.")}}else{this._triggerError("Could not save the reply")}}},this)})},_addComment:function(){var k=new b({originalSelection:this.selection.searchText.selectedText.replace(/\n/g,""),body:this._getContent(),matchIndex:this.selection.searchText.index,numMatches:this.selection.searchText.numMatches,serializedHighlights:this.serializedHighlights});var j={callback:this.bindPageReloadLink};k.save(null,{beforeSend:h.bind(this.beforeSendAjax,this),success:h.bind(this._onSaveSuccess,this),error:h.bind(function(m,l){if(this.showCaptchaError(l)){return}switch(l.status){case 405:this._triggerError("This site is read-only. You can\u0027t make changes right now.");break;case 409:this._triggerError(f.format("Page content is out of date, please {0}refresh{1} and try again.",'<a href="#" class="ic-reload-page">',"</a>"),j);break;case 412:f.trigger("analytics",{name:"confluence.comment.inline.cannot.create"});this._triggerError("We can\u0027t add your inline comment; the section you highlighted may contain a macro or user mention. Try highlighting plain text.");break;default:this._triggerError("Could not save the comment")}},this)})},_isValid:function(){if(d.isEmptyContent(c.trim(this._getContent()))){g.trigger("ic:error","You cannot save an empty comment.");return false}return true},_onSaveSuccess:function(j){switch(this.type){case"topLevel":j.set("hasDeletePermission",true);g.trigger("ic:persist",j);g.trigger("ic:view",j,undefined,{ignoreConfirmDialog:true});break;case"reply":this.model.replies.push(j);g.trigger("ic:reply:persist",j);this.finish();break;case"edit":g.trigger("ic:edit");this.finish();break}},_setEditorIsNotDirty:function(){if(f.Rte.getEditor()){f.Rte.getEditor().isNotDirty=1}},_disableForm:function(j){if(j===undefined){j=true}this._saveDisable(j);if(!e.getDarkFeatures().RICH_TEXT_EDITOR){this.$(".ic-action-discard,.ic-textarea").prop("disabled",j).attr("aria-disabled",j)}},_saveDisable:function(j){if(e.getDarkFeatures().RICH_TEXT_EDITOR){d.setEditorBusy(j);c("#rte-button-cancel")[0].disabled=j}else{this.$(".ic-action-save").prop("disabled",j).attr("aria-disabled",j)}},renderEditor:function(){var l=this.$(".ic-body");var k=this.commentText;var j=f.Confluence.QuickEdit.QuickComment;return d.init({container:l,form:l.find("form.aui"),saveHandler:this.type==="pageComment"?j.createSaveHandler(h.bind(this._successCreatePageComment,this),j.saveCommentErrorHandler):h.bind(this.saveComment,this),cancelHandler:h.bind(this.discardComment,this),fetchContent:function(){var m=new c.Deferred();m.resolve({editorContent:k});return m},postDeactivate:h.bind(function(){g.trigger("ic:clearError");this.finish()},this),hideCancelButton:this.type==="topLevel"}).done(h.bind(this.renderEditorCompleted,this)).fail(h.bind(this.renderEditorFail,this))},showPageComment:function(l){var j=c(l.target).data("comment-id");var k=c("#comment-"+j);k.addClass("focused");k.scrollToElement()},_successCreatePageComment:function(j){Confluence.CommentDisplayManager.addComment(e.getCurrentUserInfo(),j,false,false,true);f.trigger("page.commentAddedOrUpdated",{commentId:j.id});this._setEditorIsNotDirty();if(e.getDarkFeatures().RICH_TEXT_EDITOR){this.keepSidebar=true;d.remove()}this.$el.html(Confluence.Templates.IC.pageComment({commentId:j.id}));e.addSidebarHeadingTooltip(this)},renderEditorCompleted:function(){g.trigger("ic:clearError");if(this.type==="topLevel"||this.type==="pageComment"){this.$("#rte-button-cancel").hide();if(this.type==="pageComment"){g.trigger("ic:error","We can\u0027t add an inline comment to this content. We\u0027ll add it as a page comment instead.");this.focusEditor()}}this.captchaManager=new f.Confluence.QuickEditCaptchaManager(f.Confluence.EditorLoader.getEditorForm())},renderEditorFail:function(l){var j={closeable:true,callback:this.bindPageReloadLink};switch(this.type){case"pageComment":this._setEditorIsNotDirty();break;case"topLevel":this.$(".loading-container").hide();this.$(".ic-create-comment").hide();j.closeable=false;break;case"edit":case"reply":this.finish();break}var k;switch(l){case"READ_ONLY":j.closeable=false;k="This site is read-only. You can\u0027t make changes right now.";break;default:k=f.format("The editor didn\u0027\u0027t load properly. Please {0}reload the page{1} to try again.",'<a href="#" class="ic-reload-page">',"</a>")}g.trigger("ic:error",k,j);g.trigger("ic:editor:load:fail")},bindPageReloadLink:function(){c(".ic-error").off("click",".ic-reload-page").on("click",".ic-reload-page",function(){window.location.reload();return false})},discardComment:function(j){j&&j.preventDefault();g.trigger("ic:clearError");this.finish()},_getContent:function(){if(e.getDarkFeatures().RICH_TEXT_EDITOR){return d.getContent()}else{return this.$("textarea").val()}},focusEditor:function(){if(e.getDarkFeatures().RICH_TEXT_EDITOR){if(this.type==="pageComment"){var j=c(f.Rte.getEditor()&&f.Rte.getEditor().getBody());var k=j.find("div")[0];f.Rte.getEditor().selection.select(k,1);f.Rte.getEditor().selection.collapse(1);k.focus()}else{f.Rte.getEditor()&&f.Rte.getEditor().focus()}}else{this.$(".ic-textarea:visible").focus()}},destroy:function(){if(e.getDarkFeatures().RICH_TEXT_EDITOR){d.remove()}this.remove()},beforeSendAjax:function(k){var j=this.captchaManager.getCaptchaData();if(j&&j.id){k.setRequestHeader("X-Atlassian-Captcha-Id",j.id);k.setRequestHeader("X-Atlassian-Captcha-Response",j.response)}},showCaptchaError:function(j){if(j.status===404&&j.responseText&&j.responseText.search(/captcha/i)!=-1){this.captchaManager.refreshCaptcha();this._triggerError("The typed word did not match the text in the picture.");return true}return false}});return i});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:display-reply-view', location = 'view/display-reply/display-reply.soy' */
// This file was automatically generated from display-reply.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.renderReply = function(opt_data, opt_ignored) {
  return Confluence.Templates.IC.commentHeader(opt_data) + '<div class="ic-body wiki-content"><div class="ic-content ic-reply-content">' + soy.$$filterNoAutoescape(opt_data.body) + '</div></div>' + ((opt_data.darkFeatures.INLINE_COMMENTS && ! opt_data.resolved) ? Confluence.Templates.IC.renderReplyActions(opt_data) : '<div>' + Confluence.Templates.IC.timeLink({time: opt_data.lastModificationDate, commentUrl: opt_data.commentDateUrl}) + '</div>');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.renderReply.soyTemplateName = 'Confluence.Templates.IC.renderReply';
}


Confluence.Templates.IC.renderReplyActions = function(opt_data, opt_ignored) {
  return '<div class="ic-actions"><ul>' + ((opt_data.hasDeletePermission) ? '<li>' + aui.buttons.button({text: 'Delete', type: 'link', extraClasses: 'ic-action-delete-reply'}) + '</li>' : '') + ((opt_data.hasEditPermission) ? '<li>' + aui.buttons.button({text: 'Edit', type: 'link', extraClasses: 'ic-action-edit-reply'}) + '</li>' : '') + '<li class="ic-action-like-reply"></li><li class="ic-date">' + Confluence.Templates.IC.timeLink({time: opt_data.lastModificationDate, commentUrl: opt_data.commentDateUrl}) + '</li></ul></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.renderReplyActions.soyTemplateName = 'Confluence.Templates.IC.renderReplyActions';
}


Confluence.Templates.IC.showmoreReply = function(opt_data, opt_ignored) {
  return '<div id="ic-showmore-container"><div class="ic-decor-line"/><div class="ic-decor-line"/><div class="ic-collapse-decor-center"><span>' + soy.$$escapeHtml(AJS.format('{0} more replies',opt_data.totalReplies)) + '</span></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.showmoreReply.soyTemplateName = 'Confluence.Templates.IC.showmoreReply';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:display-reply-view', location = 'view/display-reply/display-reply.js' */
define("confluence/ic/view/display-reply",["jquery","ajs","underscore","backbone","confluence/ic/util/utils","confluence/ic/view/create-comment","confluence/ic/view/likes"],function(g,b,c,h,f,a,e){var d=h.View.extend({tagName:"div",className:"ic-display-reply",template:Confluence.Templates.IC.renderReply,events:{"click .ic-action-edit-reply":"editReply","click .ic-action-delete-reply":"confirmDelete"},initialize:function(){c.bindAll(this,"onEditCallback");this.$el.attr("data-comment-id",this.model.get("id"))},render:function(){var j=c.extend(this.model.toJSON(),{resolved:this.options.resolved,darkFeatures:f.getDarkFeatures()});if(b.Meta.get("render-mode")==="READ_ONLY"){j.hasEditPermission=false;j.hasDeletePermission=false}var i=this.template(j);this.$el.html(i);this._renderLikes();return this},_renderLikes:function(){if(this.likesView){this.likesView.remove()}this.likesView=new e({contentId:this.model.id}).render();if(this.likesView.$el.is(":empty")){this.$(".ic-action-like-reply").remove()}else{this.$(".ic-action-like-reply").html(this.likesView.el)}},editReply:function(j){var i=this;if(f.confirmProcess()){var k=f.getEditorFormat(this.model.get("id"));k.done(function(l){i.editView=new a({model:i.model,type:"edit",selection:{},onFinished:i.onEditCallback,commentText:l});i.$el.html(i.editView.$el);i.editView.render()}).fail(function(){h.trigger("ic:error","We can\u0027t edit this reply. The reply might have been deleted.")})}else{j&&j.currentTarget.blur()}},onEditCallback:function(){this.editView&&this.editView.destroy();this.editView=null;this.render()},deleteFail:function(k,j){switch(j.status){case 401:h.trigger("ic:error","You don\u0027t have permission to delete this comment.");break;case 405:if(j.responseText){var i=JSON.parse(j.responseText);if(i.reason==="READ_ONLY"){h.trigger("ic:error","This site is read-only. You can\u0027t make changes right now.");break}}default:h.trigger("ic:error","Could not complete your request.")}},confirmDelete:function(j){var i=window.confirm("Are you sure you want to delete this reply?");if(i===true){this.deleteReply(j)}},deleteReply:function(i){g(i.target).attr("aria-disabled",true).prop("disabled",true);this.model.destroy({wait:true,error:this.deleteFail,success:function(){h.trigger("ic:reply:delete")}})},destroy:function(){this.likesView&&this.likesView.remove();this.editView&&this.editView.destroy();this.remove()}});return d});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:reply-list-view', location = 'view/reply-list/reply-list.js' */
define("confluence/ic/view/reply-list",["jquery","ajs","underscore","backbone","confluence/ic/view/display-reply","confluence/ic/util/utils"],function(f,a,b,g,c,e){var d=g.View.extend({tagName:"div",className:"ic-replies",events:{"click #ic-showmore-container":"forceShowAllReplies"},initialize:function(h){if(!h.commentModel){throw new Error("Inline Comment Model should be passed as a parameter when init ReplyListView","ReplyListView")}this.replyViews=[];this.collection=h.commentModel.replies;this.source=h.source;this.listenTo(this.collection,"add remove",this.render);if(this.collection.isFetched!==true){this.listenToOnce(this.collection,"sync",this.fetchComplete);this.collection.fetch({reset:true})}this.expandReplies=false;this.COMMENT_NUMBER_TO_COLLAPSE=4},fetchComplete:function(){this.collection.isFetched=true;this.render();e.resizeContentAfterLoadingImages(this.$el)},render:function(h){if(this.collection.isFetched!==true){return this}if(h&&this.collection.last()===h){this.appendReply(h);return}this.cleanUpReplyViews();this.$el.empty();if(this.collection.length>this.COMMENT_NUMBER_TO_COLLAPSE&&this.expandReplies===false&&this.source!=="permalink"&&this.options.commentModel&&!this.options.commentModel.isResolved()){this.renderCollapsibleReplies()}else{this.renderFullReplies()}this.trigger("ic:reply-rendered",this.options.commentModel);this._hightlightReply();a.trigger("ic-jim-async-supported");return this},renderFullReplies:function(){this.collection.each(function(h){this.appendReply(h)},this)},forceShowAllReplies:function(){this.expandReplies=true;this.render()},renderCollapsibleReplies:function(){this.renderExpendButton();var h=this.collection.last();this.appendReply(h)},appendReply:function(i){var h=this.createReplyView(i);this.replyViews.push(h);this.$el.append(h.render().el)},renderExpendButton:function(){this.$el.append(Confluence.Templates.IC.showmoreReply({totalReplies:this.collection.length-1}))},createReplyView:function(h){return new c({model:h,resolved:this.options.commentModel.isResolved()})},_hightlightReply:function(){if(this.source!=="permalink"){return}var j=window.location.search;var i=j.match(/(focusedCommentId|replyToComment)=(\d+)/);if(i==null){return}var h=parseInt(i[2],10);if(h&&h!==0){this.$("[data-comment-id="+h+"]").addClass("ic-comment-reply-highlight")}},cleanUpReplyViews:function(){var h;for(h=0;h<this.replyViews.length;h++){this.replyViews[h].destroy();this.replyViews[h]=null}this.replyViews=[]},destroy:function(){this.cleanUpReplyViews();this.remove()}});return d});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:navigation-view', location = 'view/navigation/navigation.soy' */
// This file was automatically generated from navigation.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.navigation = function(opt_data, opt_ignored) {
  return '' + aui.buttons.button({type: 'text', id: 'ic-nav-next', extraClasses: 'aui-button-text', iconType: 'aui', iconClass: 'aui-icon-small aui-iconfont-arrow-down', text: '', isDisabled: opt_data.disabled, extraAttributes: {tabIndex: opt_data.disabled ? '' : 0, title: 'Next comment (N)'}}) + aui.buttons.button({type: 'text', id: 'ic-nav-previous', extraClasses: 'aui-button-text', iconType: 'aui', iconClass: 'aui-icon-small aui-iconfont-arrow-up', text: '', isDisabled: opt_data.disabled, extraAttributes: {tabIndex: opt_data.disabled ? '' : 0, title: 'Previous comment (P)'}}) + ((opt_data.showIndex) ? '<span class="ic-nav-x-out-of-y">' + soy.$$escapeHtml(AJS.format('{0} of {1}',opt_data.index,opt_data.size)) + '</span>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.navigation.soyTemplateName = 'Confluence.Templates.IC.navigation';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:navigation-view', location = 'view/navigation/navigation.js' */
define("confluence/ic/view/navigation",["backbone"],function(b){var a=b.View.extend({tagName:"div",events:{"click #ic-nav-previous":"showPrevious","click #ic-nav-next":"showNext"},template:Confluence.Templates.IC.navigation,initialize:function(){this.collection=this.model.collection;this.listenTo(this.collection,"change:resolveProperties",this.onResolveToggle);this.disabled=this.collection.getCommentsOnPageCount()<=1;this.listenTo(b,"ic:show-previous",this.showPrevious);this.listenTo(b,"ic:show-next",this.showNext)},render:function(){this.$el.html(this.template({disabled:this.disabled,showIndex:!(this.model.isResolved()||this.model.get("deleted")),index:this.collection.getActiveIndexWithinPageComments()+1,size:this.collection.getCommentsOnPageCount()}));return this},onResolveToggle:function(){this.disabled=this.collection.getCommentsOnPageCount()<=1;this.render()},showPrevious:function(){if(this.disabled){return}var c=this.collection.getPrevCommentOnPage();if(c!=null){b.trigger("ic:view",c,"nav")}},showNext:function(){if(this.disabled){return}var c=this.collection.getNextCommentOnPage();if(c!=null){b.trigger("ic:view",c,"nav")}}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:likes-view', location = 'view/likes/likes.soy' */
// This file was automatically generated from likes.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.likes = function(opt_data, opt_ignored) {
  return '' + ((opt_data.showLikeButton) ? aui.buttons.button({text: opt_data.isLikedByUser ? 'Unlike' : 'Like', type: 'link', extraClasses: 'ic-like-button'}) : '') + ((opt_data.likesCount > 0) ? '<span class="ic-like-summary"><span class="ic-small-like-icon"></span><a class="ic-likes-count" data-content-id="' + soy.$$escapeHtml(opt_data.contentId) + '"><span class="ic-like-summary">' + soy.$$escapeHtml(opt_data.likesCount) + '</span></a></span>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.likes.soyTemplateName = 'Confluence.Templates.IC.likes';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:likes-view', location = 'view/likes/likes.js' */
define("confluence/ic/view/likes",["backbone","ajs","confluence/ic/model/likes","confluence/ic/likes/likes-manager"],function(e,b,d,a){var c=e.View.extend({className:"ic-likes",events:{"click .ic-like-button":"toggleLike","click .ic-likes-count":function(f){Confluence.Likes.showLikeUsers&&Confluence.Likes.showLikeUsers.apply(f.currentTarget,[f])}},initialize:function(f){this.collection=new d(null,{contentId:f.contentId});this.listenTo(this.collection,"add remove reset",this.render);this.currentUserName=b.Meta.get("remote-user")||"";if(f.showLikeButton===undefined){this.showLikeButton=true}else{this.showLikeButton=f.showLikeButton}},render:function(){this.$el.empty();if(a.isLikable()){var i=this.currentUserName!==""&&b.Meta.get("remote-user-has-licensed-access")!==false;var g=this.collection.length;var h=this.collection.isLikedByUser(this.currentUserName);this.showLikeButton=b.Meta.get("render-mode")!=="READ_ONLY";var f=Confluence.Templates.IC.likes({showLikeButton:this.showLikeButton&&i,isLikedByUser:h,likesCount:g,contentId:this.collection.contentId});this.$el.html(f)}return this},toggleLike:function(){this.collection.toggleLike()}});return c});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:likes-view', location = 'view/likes/likes-manager.js' */
define("confluence/ic/likes/likes-manager",["underscore"],function(b){var a={init:function(c){this.likesCache=b.clone(c)||{}},getLikes:function(d){if(this.likesCache&&this.likesCache[d]){var c=b.map(this.likesCache[d].likes,function(e){return{username:e.user.name}});return c}return null},add:function(d,c){if(!this.likesCache[d]){this.likesCache[d]={likes:[]}}this.likesCache[d].likes.push({user:{name:c}})},remove:function(e,d){if(this.likesCache[e]&&this.likesCache[e].likes){var c=b.reject(this.likesCache[e].likes,function(f){return f.user.name===d});this.likesCache[e].likes=c}},isLikable:function(){return this.likesCache!==undefined}};return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:display-comment-view', location = 'view/display-comment/display-comment.soy' */
// This file was automatically generated from display-comment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.displayComment = function(opt_data, opt_ignored) {
  return '<div class="ic-comment-container">' + Confluence.Templates.IC.sidebarHeading({authorUserName: opt_data.authorUserName, hasDeletePermission: opt_data.hasDeletePermission, hasResolvePermission: opt_data.hasResolvePermission, hasEditPermission: opt_data.hasEditPermission, hasReplyPermission: opt_data.hasReplyPermission, showMenu: opt_data.showMenu && ! opt_data.resolveProperties.resolved, darkFeatures: opt_data.darkFeatures}) + ((opt_data.resolveProperties.resolved) ? Confluence.Templates.IC.resolvedMask(null) : Confluence.Templates.IC.comment(opt_data)) + '</div>' + ((! opt_data.resolveProperties.resolved) ? '<div class="ic-list"></div><div class="ic-reply-container">' + ((opt_data.darkFeatures.INLINE_COMMENTS && opt_data.hasReplyPermission) ? '<div class="ic-reply-placeholder">' + Confluence.Templates.IC.commentHeader({authorUserName: opt_data.currentAuthorUserName, authorAvatarUrl: opt_data.currentAuthorAvatarUrl, authorDisplayName: opt_data.currentAuthorDisplayName}) + '<div class="ic-body"><form class="aui"><textarea class="textarea ic-textarea" name="body" placeholder="' + soy.$$escapeHtml('Reply') + '"></textarea></form></div></div>' : '') + '</div>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.displayComment.soyTemplateName = 'Confluence.Templates.IC.displayComment';
}


Confluence.Templates.IC.deleteComment = function(opt_data, opt_ignored) {
  return '<div class="ic-comment-container ic-deleted">' + Confluence.Templates.IC.sidebarHeading({createComment: false, showMenu: false}) + '<div class="ic-delete-comment-view"><h2><span class="aui-icon ic-delete-image line">::before</span>' + soy.$$escapeHtml('Deleted') + '</h2></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.deleteComment.soyTemplateName = 'Confluence.Templates.IC.deleteComment';
}


Confluence.Templates.IC.comment = function(opt_data, opt_ignored) {
  return '<div data-comment-id="' + soy.$$escapeHtml(opt_data.id) + '" class="ic-container ic-display-comment">' + Confluence.Templates.IC.commentHeader(opt_data) + '<div class="ic-body wiki-content"><div class="ic-content">' + ((opt_data.resolveProperties.resolved) ? '<blockquote><span class="ic-resolved-marker">' + soy.$$escapeHtml(opt_data.originalSelection) + '</span></blockquote>' : '') + soy.$$filterNoAutoescape(opt_data.body) + '</div></div>' + ((opt_data.resolveProperties.resolved) ? Confluence.Templates.IC.renderResolvedActions(opt_data) : Confluence.Templates.IC.renderActions(opt_data)) + '</div>' + ((! opt_data.resolveProperties.resolved && opt_data.resolveProperties.resolvedTime > 0 && opt_data.resolveProperties.resolvedUser) ? '<div class="ic-unresolved-message">' + soy.$$escapeHtml(AJS.format('Reopened by {0} {1}',opt_data.resolveProperties.resolvedUser,opt_data.resolveProperties.resolvedFriendlyDate)) + '</div>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.comment.soyTemplateName = 'Confluence.Templates.IC.comment';
}


Confluence.Templates.IC.commentMenu = function(opt_data, opt_ignored) {
  return '' + ((opt_data.darkFeatures.INLINE_COMMENTS && (opt_data.hasDeletePermission || opt_data.hasReplyPermission || opt_data.hasResolvePermission && opt_data.darkFeatures.RESOLVED_INLINE_COMMENTS)) ? aui.buttons.button({type: 'subtle', extraClasses: 'aui-button-compact aui-dropdown2-trigger-arrowless aui-style-default ic-action-menu', iconType: 'aui', iconClass: 'aui-icon-small aui-iconfont-more', text: '', dropdown2Target: 'ic-menu-items'}) + aui.dropdown2.contents({id: 'ic-menu-items', extraClasses: 'aui-style-default', content: '<ul class="aui-list-truncate">' + ((opt_data.hasResolvePermission && opt_data.darkFeatures.RESOLVED_INLINE_COMMENTS) ? '<li class="ic-action-resolve"><a href="#">' + soy.$$escapeHtml('Resolve') + '</a></li>' : '') + ((opt_data.hasReplyPermission) ? '<li class="ic-action-reply"><a href="#">' + soy.$$escapeHtml('Reply') + '</a></li>' : '') + ((opt_data.hasEditPermission) ? '<li class="ic-action-edit"><a href="#">' + soy.$$escapeHtml('Edit') + '</a></li>' : '') + ((opt_data.hasDeletePermission) ? '<li class="ic-action-delete"><a href="#">' + soy.$$escapeHtml('Delete') + '</a></li>' : '') + '</ul>'}) : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.commentMenu.soyTemplateName = 'Confluence.Templates.IC.commentMenu';
}


Confluence.Templates.IC.renderResolvedActions = function(opt_data, opt_ignored) {
  return '' + ((opt_data.darkFeatures.INLINE_COMMENTS) ? '<div class="ic-actions"><ul class="aui-list-truncate">' + ((opt_data.hasResolvePermission && ! opt_data.isDangling) ? '<li>' + aui.buttons.button({text: 'Reopen', type: 'link', extraClasses: 'ic-action-unresolve'}) + '</li>' : '') + '<li class="hidden">' + aui.buttons.button({type: 'link', extraClasses: 'ic-action-show-reply'}) + '</li>' + ((opt_data.hasReply) ? '' : '') + ((opt_data.resolveProperties.resolvedTime > 0) ? '<li class="ic-resolved-message">' + aui.icons.icon({useIconFont: true, size: 'small', icon: 'success'}) + '  <span>' + Confluence.Templates.IC.timeLink({time: '' + ((opt_data.isDangling && opt_data.resolveProperties.resolvedByDangling) ? soy.$$filterNoAutoescape(AJS.format('Resolved because the text was deleted by {0} {1}',opt_data.resolveProperties.resolvedUser,opt_data.resolveProperties.resolvedFriendlyDate)) : soy.$$filterNoAutoescape(AJS.format('Resolved by {0} {1}',opt_data.resolveProperties.resolvedUser,opt_data.resolveProperties.resolvedFriendlyDate))), commentUrl: opt_data.commentDateUrl}) + '</span></li>' : '') + '</ul></div>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.renderResolvedActions.soyTemplateName = 'Confluence.Templates.IC.renderResolvedActions';
}


Confluence.Templates.IC.renderActions = function(opt_data, opt_ignored) {
  return '' + ((opt_data.darkFeatures.INLINE_COMMENTS) ? '<div class="ic-actions"><ul class="aui-list-truncate">' + ((opt_data.hasResolvePermission && opt_data.darkFeatures.RESOLVED_INLINE_COMMENTS) ? '<li>' + aui.buttons.button({text: 'Resolve', type: 'link', extraClasses: 'ic-action-resolve'}) + '</li>' : '') + '<li class="ic-action-like"></li><li class="ic-date">' + Confluence.Templates.IC.timeLink({time: opt_data.lastModificationDate, commentUrl: opt_data.commentDateUrl}) + '</li></ul></div>' : '');
};
if (goog.DEBUG) {
  Confluence.Templates.IC.renderActions.soyTemplateName = 'Confluence.Templates.IC.renderActions';
}


Confluence.Templates.IC.resolvedMask = function(opt_data, opt_ignored) {
  return '<div class="ic-resolved-mask"><div class="ic-resolved-mask-content"><h2 class="ic-resolved-icon">' + aui.icons.icon({useIconFont: true, size: 'large', icon: 'success', extraClasses: 'line'}) + soy.$$escapeHtml('Resolved') + '</h2></div><div class="resolved-message-container"><div class="resolved-message-sideline"><p>' + soy.$$escapeHtml('This comment isn\x27t gone forever! You can see resolved comments at any time.') + '</p>' + aui.buttons.button({text: 'Show me', type: 'link', id: 'show-resolved-comments'}) + '</div></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.resolvedMask.soyTemplateName = 'Confluence.Templates.IC.resolvedMask';
}


Confluence.Templates.IC.pageComment = function(opt_data, opt_ignored) {
  return '<div class="ic-comment-container">' + Confluence.Templates.IC.sidebarHeading({createComment: false, showMenu: false}) + '<div class="ic-page-comment-view"><div class="ic-page-comment"><div class="ic-page-comment-content"><h2 class="ic-resolved-icon">' + aui.icons.icon({useIconFont: true, size: 'large', icon: 'success', extraClasses: 'line'}) + soy.$$escapeHtml('Saved') + '</h2></div><div class="ic-page-comment-message-container"><div class="ic-page-comment-message-sideline"><p>' + soy.$$escapeHtml('Your comment has been saved as a page comment.') + '</p><button id="show-page-comment" class="aui-button aui-button-link" data-comment-id="' + soy.$$escapeHtml(opt_data.commentId) + '">' + soy.$$escapeHtml('Show me') + '</button></div></div></div></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.pageComment.soyTemplateName = 'Confluence.Templates.IC.pageComment';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:display-comment-view', location = 'view/display-comment/display-comment.js' */
define("confluence/ic/view/display-comment",["jquery","ajs","underscore","backbone","confluence/ic/util/utils","confluence/ic/view/create-comment","confluence/ic/view/confirm-dialog","confluence/ic/view/reply-list","confluence/ic/view/resolved-dialog-discovery","confluence/ic/view/navigation","confluence/ic/view/likes"],function(d,g,j,i,e,l,k,h,c,b,a){var f=i.View.extend({tagName:"div",className:"ic-display-comment-view",template:Confluence.Templates.IC.displayComment,events:{"click .ic-action-reply":"replyComment","click .ic-action-resolve":"resolveComment","click .ic-action-edit":"editComment","click #show-resolved-comments":"showResolvedDialogDiscovery","click .ic-reply-placeholder .textarea":"replyComment","focus .ic-reply-container .textarea":"onReplyPlaceholderFocus","keyup .ic-reply-container .textarea":"onReplyPlaceholderType"},initialize:function(m){j.bindAll(this,"confirm","destroy","deleteFail","replyComment","resolveComment","editComment","renderCommentOnly");this.model.set("active",true);this.listenTo(this.model,"change:resolveProperties",this.render);var n=d("body");n.on("click",".ic-action-delete a",this.confirm);n.on("click",".ic-action-reply a",this.replyComment);n.on("click",".ic-action-resolve a",this.resolveComment);n.on("click",".ic-action-edit a",this.editComment);this.replyListView=new h({commentModel:this.model,source:m.source})},render:function(){this.$el.html(this.template(j.extend(this.model.toJSON(),{showMenu:g.Meta.get("render-mode")==="READ_WRITE",currentAuthorUserName:g.Meta.get("remote-user"),currentAuthorAvatarUrl:e.getAuthorAvatarUrl(),currentAuthorDisplayName:e.getAuthorDisplayName(),darkFeatures:e.getDarkFeatures()})));if(this.model.isResolved()){this.$(".ic-comment-container").addClass("ic-resolved")}else{this.$(".ic-list").append(this.replyListView.render().el)}this._renderNavigation();this._renderLikes();e.addSidebarHeadingTooltip(this);return this},_renderNavigation:function(){if(this.navigationView){this.navigationView.remove()}this.navigationView=new b({model:this.model});this.navigationView.render();this.$("#ic-nav-container").html(this.navigationView.el)},_renderLikes:function(){if(this.likesView){this.likesView.remove()}this.likesView=new a({contentId:this.model.id}).render();if(this.likesView.$el.is(":empty")){this.$(".ic-action-like").remove()}else{this.$(".ic-action-like").html(this.likesView.el)}},editComment:function(n){n.preventDefault();var m=this;if(this.editView){this.editView.focusEditor()}else{if(e.confirmProcess()){var o=e.getEditorFormat(this.model.get("id"));o.done(function(p){m.editView=new l({model:m.model,type:"edit",selection:{},onFinished:m.renderCommentOnly,commentText:p});m.$(".ic-display-comment").html(m.editView.$el);m.editView.render()}).fail(function(){i.trigger("ic:error","We can\u0027t edit this comment. The comment might have been deleted.")})}}},renderCommentOnly:function(){this.editView&&this.editView.destroy();this.editView=null;var m=j.extend(this.model.toJSON(),{darkFeatures:e.getDarkFeatures()});this.$(".ic-display-comment").html(d(Confluence.Templates.IC.comment(m)).children());this._renderLikes()},replyComment:function(m){m&&m.preventDefault();if(this.createReplyView){this.createReplyView.focusEditor()}else{if(e.confirmProcess()){this.createReplyView=new l({model:this.model,type:"reply",onFinished:j.bind(function(){this.createReplyView&&this.createReplyView.destroy();this.createReplyView=null},this)});this.$(".ic-reply-container").prepend(this.createReplyView.$el);this.createReplyView.render()}else{m&&m.currentTarget.blur()}}},confirm:function(n){n.preventDefault();if(this.model.replies.length>0){i.trigger("ic:error","You can\u0027t delete inline comment threads with replies.");return false}var m=new k({model:new i.Model({label:"Delete",message:"Are you sure you want to delete the comment?"}),$menuEl:d(".ic-action-menu"),$bodyEl:d("body")});this.$(".ic-sidebar-heading").append(m.$el);this.listenTo(m,"ic:confirm",this.deleteComment)},deleteComment:function(){var m=j.bind(function(){this.$el.html(Confluence.Templates.IC.deleteComment());this.model.set("deleted",true);this._renderNavigation();e.removeInlineLinksDialog(this.model.highlights);e.addSidebarHeadingTooltip(this);i.trigger("ic:delete")},this);this.model.destroy({wait:true,success:m,error:this.deleteFail})},deleteFail:function(o,n){switch(n.status){case 401:i.trigger("ic:error","You don\u0027t have permission to delete this comment.");break;case 405:if(n.responseText){var m=JSON.parse(n.responseText);if(m.reason==="READ_ONLY"){i.trigger("ic:error","This site is read-only. You can\u0027t make changes right now.")}}else{i.trigger("ic:error","Could not complete your request.")}break;case 409:i.trigger("ic:error",n.responseText);break;default:i.trigger("ic:error","Could not complete your request.")}},destroy:function(m){var n=d("body");n.off("click",".ic-action-delete a",this.confirm);n.off("click",".ic-action-reply a",this.replyComment);n.off("click",".ic-action-resolve a",this.resolveComment);n.off("click",".ic-action-edit a",this.editComment);this.createReplyView&&this.createReplyView.destroy();this.editView&&this.editView.destroy();this.replyListView.destroy();this.navigationView&&this.navigationView.remove();this.likesView&&this.likesView.remove();m!==true&&this.remove()},resolveComment:function(m){m&&m.preventDefault();if(e.confirmProcess(true)){this.model.resolve(true,{wait:true,success:j.bind(this.onResolveComplete,this),error:this.onResolveFail})}},onResolveComplete:function(){this.createReplyView&&this.createReplyView.destroy();this.createReplyView=null;i.trigger("ic:resolved");e.removeInlineLinksDialog(this.model.highlights)},onResolveFail:function(o,n){switch(n.status){case 401:i.trigger("ic:error","You don\u0027t have permission to resolve this comment.");break;case 405:if(n.responseText){var m=JSON.parse(n.responseText);if(m.reason==="READ_ONLY"){i.trigger("ic:error","This site is read-only. You can\u0027t make changes right now.");break}}default:i.trigger("ic:error","Could not complete your request.")}},showResolvedDialogDiscovery:function(){(new c()).show();i.trigger("ic:resolved:show:recovery")},onReplyPlaceholderFocus:function(o){if(e.getDarkFeatures().RICH_TEXT_EDITOR){var m=(navigator.userAgent.indexOf("Safari")!==-1&&navigator.userAgent.indexOf("Chrome")===-1);var n=g.Meta.get("access-mode")==="READ_ONLY";(n||m)&&o.currentTarget.blur()}},onReplyPlaceholderType:function(m){if(g.Meta.get("access-mode")==="READ_ONLY"){var n=d(m.currentTarget);n.val("");n.blur()}}});return f});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:resolved-comment-view', location = 'view/resolved-comment/resolved-comment-list.soy' */
// This file was automatically generated from resolved-comment-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.resolvedCommentDialog = function(opt_data, opt_ignored) {
  return '' + aui.dialog.dialog2({id: 'ic-resolved-comment-dialog', removeOnHide: true, extraClasses: 'ic-resolved-comment-dialog-content', modal: true, titleText: 'Resolved comments', footerActionContent: '' + aui.buttons.button({id: 'resolved-dialog-close-button', text: 'Close', type: 'link'}), content: '<!-- Placeholder for error message --><div id="ic-resolved-comment-dialog-error" />'});
};
if (goog.DEBUG) {
  Confluence.Templates.IC.resolvedCommentDialog.soyTemplateName = 'Confluence.Templates.IC.resolvedCommentDialog';
}


Confluence.Templates.IC.resolvedDiscovery = function(opt_data, opt_ignored) {
  return '<p>' + soy.$$escapeHtml('Got more to say? You can reopen resolved comments to continue the discussion.') + '</p>' + aui.buttons.button({id: 'ic-resolved-discovery-dismiss', text: 'OK, got it', type: 'link'});
};
if (goog.DEBUG) {
  Confluence.Templates.IC.resolvedDiscovery.soyTemplateName = 'Confluence.Templates.IC.resolvedDiscovery';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:resolved-comment-view', location = 'view/resolved-comment/resolved-comment.js' */
define("confluence/ic/view/resolved-comment-item",["jquery","underscore","ajs","backbone","confluence/ic/util/utils","confluence/ic/view/reply-list","confluence/ic/view/likes"],function(g,b,a,h,f,e,d){var c=h.View.extend({tagName:"div",className:"ic-display-comment-view",template:Confluence.Templates.IC.comment,events:{"click .ic-action-unresolve":"unresolveComment","click .ic-action-show-reply":"showReply"},initialize:function(){b.bindAll(this,"onUnresolveComplete","destroy");this.replyListView=new e({commentModel:this.model});this.listenTo(this.replyListView,"ic:reply-rendered",function(){this.renderNumberOfReplies()})},render:function(){var i=this.template(b.extend(this.model.toJSON(),{showMenu:false,isDangling:this.model.isDangling(),darkFeatures:f.getDarkFeatures(),hasReply:this.model.replies.length>0}));this.$el.html(i);if(this.likesView){this.likesView.remove()}this.likesView=new d({contentId:this.model.id,showLikeButton:false}).render();this.$(".ic-action-like").html(this.likesView.el);this.$el.append(this.replyListView.$el.hide());this.replyListView.render();return this},unresolveComment:function(){h.trigger("ic:resolvedClearError");this.model.resolve(false,{wait:true,success:this.onUnresolveComplete,error:this.onUnresolveFail})},onUnresolveComplete:function(){h.trigger("ic:unresolved");this.$el.slideUp(this.destroy)},onUnresolveFail:function(k,j){switch(j.status){case 401:h.trigger("ic:resolvedError","You don\u0027t have permission to resolve this comment.");break;case 405:var i=JSON.parse(j.responseText);if(i.reason==="READ_ONLY"){h.trigger("ic:resolvedError","This site is read-only. You can\u0027t make changes right now.")}else{h.trigger("ic:resolvedError","Could not complete your request.")}break;default:h.trigger("ic:resolvedError","Could not complete your request.")}},showReply:function(){this.$(".ic-action-show-reply").parent().remove();this.$(".ic-replies").slideDown()},renderNumberOfReplies:function(){var k=this.model.replies.length;var j=this.$(".ic-action-show-reply");if(k>0){var i;if(k===1){i=a.format("{0} reply",1)}else{i=a.format("{0} replies",k)}j.text(i);j.parent().removeClass("hidden")}else{j.parent().remove()}},destroy:function(){this.replyListView.destroy();this.remove()}});return c});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:resolved-comment-view', location = 'view/resolved-comment/resolved-comment-list.js' */
define("confluence/ic/view/resolved-comment-list",["jquery","underscore","backbone","ajs","confluence/ic/view/resolved-comment-item"],function(e,c,f,b,d){var a=f.View.extend({events:{"click #resolved-dialog-close-button":"destroy"},template:Confluence.Templates.IC.resolvedCommentDialog,initialize:function(){c.bindAll(this,"render","destroy","_onKeyDown");this._resolvedCommentViews=[];this.listenTo(this.collection,"change:resolveProperties",this.onResolvedChanged);this.listenTo(f,"ic:resolvedError",this.displayError);this.listenTo(f,"ic:resolvedClearError",this.clearErrors);var g=e(this.template());this.setElement(g);this.dialog=b.dialog2(this.$el);e(document).bind("keydown",this._onKeyDown);b.trigger("remove-bindings.keyboardshortcuts")},render:function(){var g=e("<div>");var h=this.collection.getResolvedCount();if(h!==0){c.each(this.collection.getResolvedCommentsDesc(),function(j){var i=new d({model:j});this._resolvedCommentViews.push(i);g.append(i.render().$el)},this)}else{this.displayNoCommentMessage()}this.$(".aui-dialog2-content").append(g);this.dialog.show();if(this.options.focusCommentId){this.scrollToComment(this.options.focusCommentId)}f.trigger("ic:resolved:view",h);b.trigger("ic-jim-async-supported");return this},onResolvedChanged:function(){if(this.collection.getResolvedCount()===0){this.displayNoCommentMessage()}},displayNoCommentMessage:function(){b.messages.generic(this.$(".aui-dialog2-content"),{body:"There are no resolved comments on this page.",closeable:false})},displayError:function(g){this.clearErrors();b.messages.error(this.$("#ic-resolved-comment-dialog-error"),{body:g,closeable:false})},clearErrors:function(){this.$("#ic-resolved-comment-dialog-error").empty()},scrollToComment:function(h){var i=this.$(b.format("[data-comment-id={0}]",h));if(i.length){i.addClass("focused");return this.$(".aui-dialog2-content").animate({scrollTop:i.parent().position().top},100)}var g=new e.Deferred();return g.reject()},_onKeyDown:function(g){if(this.$el&&this.$el.is(":visible")&&g.keyCode===b.keyCode.ESCAPE){this.destroy()}},destroy:function(){b.trigger("add-bindings.keyboardshortcuts");e(document).unbind("keydown",this._onKeyDown);this.dialog.hide();this.dialog.remove();c.each(this._resolvedCommentViews,function(g){g.destroy()});this._resolvedCommentViews=null;this.remove()}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:resolved-comment-view', location = 'view/resolved-comment/resolved-dialog-discovery.js' */
define("confluence/ic/view/resolved-dialog-discovery",["jquery","underscore","backbone","ajs"],function(d,c,e,b){var a=e.View.extend({DIALOG_BACKGROUND_COLOR:"#ffffff",DIALOG_BORDER_COLOR:"#f79232",initialize:function(){c.bindAll(this,"getDiscoveryDialogContent","destroy","onEndScroll")},template:Confluence.Templates.IC.resolvedDiscovery,show:function(){d.when(this.scrollTop()).done(this.onEndScroll)},onEndScroll:function(){this.showToolsMenu();this._discoveryDialog=this.createDiscoveryDialog();this._discoveryDialog.show()},showToolsMenu:function(){var f=d("#action-menu");f.on("aui-dropdown2-hide",this.destroy);d("#action-menu-link").trigger("aui-button-invoke");f.find("a.active").removeClass("active");f.find("#view-resolved-comments").addClass("active").focus()},createDiscoveryDialog:function(){var g={gravity:"w",hideCallback:this.destroy,width:280,noBind:true};var f=b.InlineDialog(d("#view-resolved-comments"),"ic-resolved-dialog-discovery",this.getDiscoveryDialogContent,g);f.on("click focusin mousedown",function(h){h.stopPropagation()});return f},getDiscoveryDialogContent:function(g,f,j){var h=this.template();g.html(h);var i=this;g.find("#ic-resolved-discovery-dismiss").on("click",function(){e.trigger("ic:resolved:dismiss:recovery");i._discoveryDialog.hide()});j();return false},scrollTop:function(){var f=d("#splitter-content");var h=!!f.length;var i=(h)?f:d("html, body");var g=(i.scrollTop()===0)?1:300;return i.animate({scrollTop:0},g)},destroy:function(){var f=d("#action-menu");f.off("aui-dropdown2-hide");if(f.is(":visible")){d("#action-menu-link").trigger("aui-button-invoke")}this._discoveryDialog.remove();this.remove()}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:highlight-view', location = 'view/highlight-text/highlight-text.js' */
define("confluence/ic/view/highlight-text",["backbone","ajs","confluence/ic/util/text-highlighter","confluence/ic/util/utils"],function(e,b,c,d){var a=e.View.extend({el:"#content .wiki-content:first",events:{"click .inline-comment-marker.valid":"commentClick"},initialize:function(){if(this.collection){this.listenTo(this.collection,"sync remove change:deleted",this.render);this.listenTo(this.collection,"change:active",this.setActive)}this.listenTo(e,"ic:view ic:overlap ic:sidebar-hidden",this.clearSelection);this.listenTo(e,"ic:persist",this.persistComment);this.listenTo(e,"ic:delete",this.render);b.bind("qr:add-new-highlight-text",this._addQuickReloadMarker)},render:function(){this.inlineLinks=[];this.$(".inline-comment-marker").removeClass("valid");this.collection.each(function(f){if(!f.isResolved()&&!f.get("deleted")&&f.highlights){f.highlights.addClass("valid");this._pushToInlineLinks(f.highlights)}},this);this._setupLinkDialog()},_pushToInlineLinks:function(g){var f=this;g.each(function(){var h=d.getInlineLinks(this);h.each(function(){if($(this).attr("href")){f.inlineLinks.push($(this))}})})},_setupLinkDialog:function(){var f={width:200,onHover:true,noBind:true,calculatePositions:this._calculatePositions,hideDelay:1000};$(this.inlineLinks).each(function(){var g=this;b.InlineDialog(g,"inline-comment-link",function(i,h,j){i.addClass("inline-comment-link");i.html(Confluence.Templates.IC.highlightTextLink({link:g.attr("href")}));j();return false},f)})},_calculatePositions:function(f,g,h){return{displayAbove:true,popupCss:{top:g.target.offset().top-f.height()-10,left:h.x-(f.width()/2)},arrowCss:{top:f.height(),left:f.width()/2-4}}},setActive:function(g){this.$(".inline-comment-marker").removeClass("active");var f=this.$('.inline-comment-marker[data-ref="'+g.get("markerRef")+'"]');if(g.get("active")&&f.length){f.addClass("active")}},commentClick:function(f){f.preventDefault();var g=this.$(f.currentTarget);if(!g.hasClass("active")){this.displayComment(g)}else{e.trigger("ic:hide-sidebar",f,true)}},displayComment:function(i,h){var g=i.data("ref");var f=this.collection.findWhere({markerRef:g});e.trigger("ic:view",f,h)},clearSelection:function(){(new c()).removeHighlight()},persistComment:function(f){this.$(".ic-current-selection").removeClass("ic-current-selection").addClass("inline-comment-marker").attr("data-ref",f.get("markerRef"));this.collection.add(f)},_addQuickReloadMarker:function(j,h,f){var k=h.comment;var g=this.$('.inline-comment-marker[data-ref="'+k.dataRef+'"]');if(g.length){f.resolve(h);return}var i=(new c()).deserializeHighlights(k.serializedHighlights,k.dataRef);if(i){f.resolve(h)}else{f.reject(h)}}});return a});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:highlight-view', location = 'view/highlight-text/highlight-text.soy' */
// This file was automatically generated from highlight-text.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.IC.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.IC == 'undefined') { Confluence.Templates.IC = {}; }


Confluence.Templates.IC.highlightTextLink = function(opt_data, opt_ignored) {
  return aui.icons.icon({useIconFont: true, size: 'small', icon: 'link'}) + '<a href=\'' + soy.$$escapeHtml(opt_data.link) + '\'>' + soy.$$escapeHtml(opt_data.link) + '</a>';
};
if (goog.DEBUG) {
  Confluence.Templates.IC.highlightTextLink.soyTemplateName = 'Confluence.Templates.IC.highlightTextLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:sidebar-view', location = 'view/sidebar/sidebar.js' */
define("confluence/ic/view/sidebar",["underscore","backbone","jquery","confluence/ic/view/display-comment","confluence/ic/view/create-comment","confluence/ic/util/utils","ajs"],function(d,h,f,c,a,e,b){var g=h.View.extend({tagName:"div",className:"ic-sidebar",events:{"click button.ic-action-hide":function(i){this.hide(i,true);h.trigger("ic:sidebar:close")}},initialize:function(i){var j=this;this.listenTo(h,"ic:view ic:overlap",this.displayComment);this.listenTo(h,"ic:create",this.displayCreateComment);this.listenTo(h,"ic:error",this.displayError);this.listenTo(h,"ic:hide-sidebar",this.hide);this.listenTo(h,"ic:clearError",this.clearError);if(e.getDarkFeatures().RICH_TEXT_EDITOR){b.bind("rte-quick-edit-ready",function(){var l=j.$el.find("#wysiwygTextarea_ifr");if(l.length!==0){var m=new MutationObserver(function(){l.resize()});m.observe(l[0],{attributes:true,attributeFilter:["style"]});if(!b.Rte.getEditor().getContent()){j._scrollToEditorView(l)}}else{var k=j.$el.is(":visible");if(!k){e.getPageContainer().css("padding-right","0");j.$wikiContent.css("position","static");e.getPageContainer().css({"min-height":0})}}})}else{b.bind("init.rte",d.bind(this.hideInEditMode,this))}this.defaultNavOffset=130;this.defaultPermalinkedCommentOffset=100;this.$wikiContent=i.$wikiContent||f("#content .wiki-content").first();this.sidebarObserver=new MutationObserver(d.bind(this.setSidebarYPos,this));this.sidebarObserver.observe(this.el,{childList:true,subtree:true});f(window).resize(d.debounce(d.bind(this.setSidebarYPos,this),100));b.bind("sidebar.expanded sidebar.collapsed",d.debounce(d.bind(this.setSidebarYPos,this),50))},displayComment:function(m,l,i){var k=function(){if(m.highlight.is(":hidden")){e.showHighlightContent(m.highlight);if(m.highlight.is(":hidden")){return}}this.distanceToTop=this.previousHighlightOffset||this.defaultNavOffset;this._emptySidebar(true);this.commentView=new c({model:m,source:l});this.show(true);this.previousHighlightOffset=m.highlight.position().top;var n=this.commentView.render().$el;n.css("visibility","hidden");if(l==="nav"){this._scrollToComment(m)}else{if(l==="permalink"){this._scrollToPermalinkedComment(m,this.defaultPermalinkedCommentOffset,i)}else{if(l==="quickreload"){this._scrollToQuickReloadComment(m)}}}this.$el.html(n);Confluence.Binder&&Confluence.Binder.userHover()};var j=(i===undefined)||(i.ignoreConfirmDialog===false);if(j){if(e.confirmProcess(true)){k.call(this)}}else{k.call(this)}b.trigger("ic-jim-async-supported")},_scrollToQuickReloadComment:function(k){var j=f(".qr-feedback:first");var i=this.defaultPermalinkedCommentOffset;if(j.length>0){i=j.height()+67}this._scrollToPermalinkedComment(k,i)},_scrollToEditorView:function(j){var k=e.isDocTheme()?e.getSplitterContent():f("body, html");var l=this.$(".ic-display-comment-view").position().top;var i=j.closest(".ic-create-comment-view").position().top+l;if(k.height()<i||k.scrollTop()>i){k.animate({scrollTop:i},100)}},_scrollToPermalinkedComment:function(m,j,l){var k;if(e.isDocTheme()){var i=40;k=m.highlight.offset().top+e.getSplitterContent().scrollTop()-i;e.getSplitterContent().animate({scrollTop:k-j},100).promise().done(d.bind(this._scrollToPermalinkedCommentCompleted,this,l))}else{k=m.highlight.offset().top;f("html, body").animate({scrollTop:k-j},100).promise().done(d.bind(this._scrollToPermalinkedCommentCompleted,this,l))}},_scrollToPermalinkedCommentCompleted:function(i){if(i&&i.isReplyComment){this.commentView.replyComment()}},_scrollToComment:function(j){var i=j.highlight.position().top;if(e.isDocTheme()){e.getSplitterContent().animate({scrollTop:e.getSplitterContent().scrollTop()+i-this.distanceToTop},100)}else{f("html, body").animate({scrollTop:window.pageYOffset+i-this.distanceToTop},100)}},displayCreateComment:function(j,k,l){var i=this.isOnUnsupportedMacro();this._emptySidebar(true);this.createCommentView=new a({collection:j,selection:k,type:i?"pageComment":"topLevel",isFocus:false,stopFocus:true,commentText:i?"<blockquote>"+b.escapeHtml(k.text)+"</blockquote> <div/>":"",onFinished:d.bind(function(){if(!this.createCommentView.keepSidebar){if(this.isShowing){this.hide()}}},this),serializedHighlights:l});this.show();this.createCommentView.$el.css("visibility","hidden");this.$el.html(this.createCommentView.$el);this.createCommentView.render()},isOnUnsupportedMacro:function(){var i=f(".ic-current-selection");return e.containUnsupportedMacro(i)||e.containInternalLink(i)||e.containUserMetion(i)},displayError:function(j,i){i=d.extend({closeable:false},i);this.clearError();b.messages.error(".ic-error",{body:j,closeable:i.closeable});i.callback&&i.callback()},clearError:function(){f(".ic-error").empty()},show:function(i){if(this.isShowing){return}this._toggleSidebar(i);this.isShowing=true},hideInEditMode:function(i){if(b.Meta.get("content-type")!=="comment"){this.sidebarObserver.disconnect();this.hide(i)}},hide:function(j,i){j&&j.preventDefault();if(e.confirmProcess(true)){if(!this.isShowing){return}e.getPageContainer().css({"min-height":"initial"});this._toggleSidebar(i);h.trigger("ic:sidebar-hidden");this.isShowing=false}},_toggleSidebar:function(i){var m=this;var n=f(".inline-comment-marker.active:first, .ic-current-selection:first");var l;var k=(e.isDocTheme()?e.getSplitterContent().scrollTop():window.pageYOffset);if(n.length>0){l=n.offset().top-k}var j=f.Deferred();var o=j.promise();if(this.isShowing){if(i&&e.isAnimationSupported()){o=e.animateSidebar(this,false)}else{e.getPageContainer().css("padding-right","0");this.$wikiContent.css("position","static");this._emptySidebar();j.resolve()}}else{e.getPageContainer().css("padding-right","280px");if(i&&e.isAnimationSupported()){o=e.animateSidebar(this,true)}else{j.resolve()}this.$wikiContent.css("position","relative")}o.done(function(){e.scrollToCommentAfterToggleSideBar(l,n)})},_emptySidebar:function(i){if(this.commentView){this.commentView.model.unset&&this.commentView.model.unset("active");this.commentView.destroy();this.commentView=null}if(this.createCommentView){this.createCommentView.keepSidebar=i;this.createCommentView.destroy();this.createCommentView=null}},setSidebarYPos:function(){if(!this.isShowing){return}var i=this.$el.offset().top;var l,j;if(this.commentView!=null){l=this.commentView.$el;j=this.commentView.model.highlight}else{if(this.createCommentView!=null){l=this.createCommentView.$el;j=f(".ic-current-selection")}else{return}}if(!j){return}var k=this.$(".ic-sidebar-heading").height();l.css({visibility:"visible",position:"absolute",top:(j.offset().top-i-k)+"px"});e.recalculateContentHeight(l)}});return g});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:loader', location = '/app/loader.js' */
define("confluence/ic/app/loader",["jquery","backbone","ajs","confluence/ic/model/comment","confluence/ic/model/comment-collection","confluence/ic/view/highlight-text","confluence/ic/view/sidebar","confluence/ic/view/resolved-comment-list","confluence/ic/util/text-highlighter","confluence/ic/util/utils","confluence/ic/analytics","confluence/ic/likes/likes-manager"],function(g,n,l,d,e,b,j,f,i,h,m,k){var a=null;var c={init:function(o){a=o;var p=new j({$wikiContent:g("#content .wiki-content").first()});h.getPageContainer().append(p.$el);new b({collection:a}).render();if(Confluence&&Confluence.Likes&&Confluence.Likes.getLikesCache){Confluence.Likes.getLikesCache().done(function(q){k.init(q);n.trigger("ic:likes-received")})}if(!h.getDarkFeatures().INLINE_COMMENTS){return}},loadSidebarOnClick:function(q){if(h.confirmProcess()){n.trigger("ic:highlight-panel-click");g(".inline-comment-marker").removeClass("active");var o=h.overlappedSelection(q,a);if(o){var p=g('.inline-comment-marker[data-ref="'+o.get("markerRef")+'"]');Confluence.HighlightAction.clearTextSelection();o.highlight=p;n.trigger("ic:overlap",o)}else{var r=(new i()).removeHighlight().highlight(q.range);n.trigger("ic:create",a,q,r)}}},updateResolvedCommentCountInToolsMenu:function(){var o=g("#view-resolved-comments>span");o.text("Resolved comments"+l.format(" ({0})",a.getResolvedCount()))},afterSyncCommentCollection:function(){var o=this;a.once("sync",function(p){o.displayPermalinkedComment(p)});a.on("change:resolveProperties",function(){o.updateResolvedCommentCountInToolsMenu()});this.updateResolvedCommentCountInToolsMenu()},displayPermalinkedComment:function(o){var p=window.location.search;h.showFocusedComment(o,p,f)},createResolvedCommentListView:function(){new f({collection:a}).render()}};return c});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-inline-comments:library', location = 'lib/jquery.textHighlighter.js' */
(function(f,e,b,g){var a={ELEMENT_NODE:1,TEXT_NODE:3};var d={name:"textHighlighter"};function c(i,h){this.context=i;this.$context=f(i);this.options=f.extend({},f[d.name].defaults,h);this.init()}c.prototype={init:function(){this.$context.addClass(this.options.contextClass);this.bindEvents()},destroy:function(){this.unbindEvents();this.$context.removeClass(this.options.contextClass);this.$context.removeData(d.name)},bindEvents:function(){},unbindEvents:function(){},highlightHandler:function(i){var h=i.data.self;h.doHighlight()},doHighlight:function(k){var i=k||this.getCurrentRange();if(!i||i.collapsed){return}var j=i.toString();var l="";if(this.options.onBeforeHighlight(i)==true){var m=f.textHighlighter.createWrapper(this.options);var h=this.highlightRange(i,m);l=this.normalizeHighlights(h);this.options.onAfterHighlight(l,j)}this.removeAllRanges();return l},getCurrentRange:function(){var i=this.getCurrentSelection();var h;if(i.rangeCount>0){h=i.getRangeAt(0)}return h},removeAllRanges:function(){var h=this.getCurrentSelection();h.removeAllRanges()},getCurrentSelection:function(){var i=this.getCurrentWindow();var h;if(i.getSelection){h=i.getSelection()}else{if(f("iframe").length){f("iframe",top.document).each(function(){if(this.contentWindow===i){h=rangy.getIframeSelection(this);return false}})}else{h=rangy.getSelection()}}return h},getCurrentWindow:function(){var h=this.getCurrentDocument();if(h.defaultView){return h.defaultView}else{return h.parentWindow}},getCurrentDocument:function(){return this.context.ownerDocument?this.context.ownerDocument:this.context},highlightRange:function(o,q){if(o.collapsed){return}var s=["SCRIPT","STYLE","SELECT","BUTTON","OBJECT","APPLET"];var l=o.startContainer;var t=o.endContainer;var n=o.commonAncestorContainer;var r=true;if(o.endOffset==0){while(!t.previousSibling&&t.parentNode!=n){t=t.parentNode}t=t.previousSibling}else{if(t.nodeType==a.TEXT_NODE){if(o.endOffset<t.nodeValue.length){t.splitText(o.endOffset)}}else{if(o.endOffset>0){t=t.childNodes.item(o.endOffset-1)}}}if(l.nodeType==a.TEXT_NODE){if(o.startOffset==l.nodeValue.length){r=false}else{if(o.startOffset>0){l=l.splitText(o.startOffset);if(t==l.previousSibling){t=l}}}}else{if(o.startOffset<l.childNodes.length){l=l.childNodes.item(o.startOffset)}else{l=l.nextSibling}}var m=false;var k=l;var p=[];do{if(r&&k.nodeType==a.TEXT_NODE){if(/\S/.test(k.nodeValue)){var i=q.clone(true).get(0);var h=k.parentNode;if(f.contains(this.context,h)||h===this.context){var j=f(k).wrap(i).parent().get(0);p.push(j)}}r=false}if(k==t&&(!t.hasChildNodes()||!r)){m=true}if(f.inArray(k.tagName,s)!=-1){r=false}if(r&&k.hasChildNodes()){k=k.firstChild}else{if(k.nextSibling!=null){k=k.nextSibling;r=true}else{k=k.parentNode;r=false}}}while(!m);return p},normalizeHighlights:function(i){this.flattenNestedHighlights(i);this.mergeSiblingHighlights(i);var h=f.map(i,function(j){if(typeof j.parentElement!="undefined"){return j.parentElement!=null?j:null}else{return j.parentNode!=null?j:null}});return h},flattenNestedHighlights:function(i){var h=this;f.each(i,function(k){var o=f(this);var l=o.parent();var n=l.prev();var m=l.next();if(h.isHighlight(l)){if(l.css("background-color")!=o.css("background-color")){if(h.isHighlight(n)&&!o.get(0).previousSibling&&n.css("background-color")!=l.css("background-color")&&n.css("background-color")==o.css("background-color")){o.insertAfter(n)}if(h.isHighlight(m)&&!o.get(0).nextSibling&&m.css("background-color")!=l.css("background-color")&&m.css("background-color")==o.css("background-color")){o.insertBefore(m)}if(l.is(":empty")){l.remove()}}else{var j=b.createTextNode(l.text());l.empty();l.append(j);f(i[k]).remove()}}})},mergeSiblingHighlights:function(i){var h=this;function j(l,k){return k&&k.nodeType==a.ELEMENT_NODE&&f(l).css("background-color")==f(k).css("background-color")&&f(k).hasClass(h.options.highlightedClass)?true:false}f.each(i,function(){var k=this;var n=k.previousSibling;var m=k.nextSibling;if(j(k,n)){var l=f(n).text()+f(k).text();f(k).text(l);f(n).remove()}if(j(k,m)){var l=f(k).text()+f(m).text();f(k).text(l);f(m).remove()}})},setColor:function(h){this.options.color=h},getColor:function(){return this.options.color},removeHighlights:function(j){var h=(j!==g?j:this.context);var l=function(n){return f(n).contents().unwrap().get(0)};var k=function(p){var o=p.previousSibling;var n=p.nextSibling;if(o&&o.nodeType==a.TEXT_NODE){p.nodeValue=o.nodeValue+p.nodeValue;o.parentNode.removeChild(o)}if(n&&n.nodeType==a.TEXT_NODE){p.nodeValue=p.nodeValue+n.nodeValue;n.parentNode.removeChild(n)}};var i=this;var m=this.getAllHighlights(h,true);m.each(function(){if(i.options.onRemoveHighlight(this)==true){var n=l(this)}})},getAllHighlights:function(i,j){var h="."+this.options.highlightedClass;var k=f(i).find(h);if(j==true&&f(i).hasClass(this.options.highlightedClass)){k=k.add(i)}return k},isHighlight:function(h){return h.hasClass(this.options.highlightedClass)},serializeHighlights:function(l){var k=l||this.getAllHighlights(this.context);var i=this.context;var m=[];var h=this;var j=function(o,q){var p=[];do{var n=f.inArray(o,o.parentNode.childNodes);p.unshift(n);o=o.parentNode}while(o!==q);return p};k.each(function(p,o){var r=0;var q=o.firstChild.length;var n=j(o,i);var s=f(o).clone().empty().get(0).outerHTML;if(o.previousSibling&&o.previousSibling.nodeType===a.TEXT_NODE){r=o.previousSibling.length}m.push([f(o).text(),n.join(":"),r,q])});return JSON.stringify(m)},deserializeHighlights:function(i,o){try{var n=JSON.parse(i)}catch(m){throw"Can't parse serialized highlights: "+m}var l=[];var h=this;var j=function(w){var v=w[0];var y=w[1].split(":");var z=w[2];var t=w[3];var u=y.pop();var x=null;var r=h.context;while((x=y.shift())!==g){r=r.childNodes[x]}if(r.childNodes[u-1]&&r.childNodes[u-1].nodeType===a.TEXT_NODE){u-=1}var s=r.childNodes[u];var p=s.splitText(z);p.splitText(t);if(p.nextSibling&&p.nextSibling.nodeValue==""){p.parentNode.removeChild(p.nextSibling)}if(p.previousSibling&&p.previousSibling.nodeValue==""){p.parentNode.removeChild(p.previousSibling)}if(v!==p.nodeValue){throw"Different text"}var q=f(p).wrap(o).parent().get(0);l.push(q)};var k=true;f.each(n,function(q,p){try{j(p)}catch(r){console&&console.warn&&console.warn("Can't deserialize "+q+"-th descriptor. Cause: "+r);k=false;return true}});return k&&l}};f.fn.getHighlighter=function(){return this.data(d.name)};f.fn[d.name]=function(h){return this.each(function(){if(!f.data(this,d.name)){f.data(this,d.name,new c(this,h))}})};f.textHighlighter={createWrapper:function(h){return f("<span></span>").css("backgroundColor",h.color).addClass(h.highlightedClass)},defaults:{color:"#ffff7b",highlightedClass:"highlighted",contextClass:"highlighter-context",onRemoveHighlight:function(){return true},onBeforeHighlight:function(){return true},onAfterHighlight:function(){}}}})(jQuery,window,document);
}catch(e){WRMCB(e)};