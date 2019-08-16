WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'confluence.extra.jira:jira-issues-view-mode-async-resource', location = 'jira/jira-issues-view-mode/lazy-loading.js' */
define("confluence/jim/jira/jira-issues-view-mode/lazy-loading",["jquery","ajs","underscore","confluence/jim/jira/jira-issues-view-mode/fetching-job"],function(c,h,k,a){var l="wr!confluence.extra.jira:refresh-resources";var e;var g={queryJiraIssuesEls:function(){return c(".wiki-content [data-jira-key][data-client-id]")},renderUISingleJIMFromMacroHTML:function(n,m){k.each(n,function(q,p){var o=m.filter('[data-jira-key="'+p+'"]');o.each(function(s,t){var r=c(t);if(r.hasClass("jira-table")){e.updateRefreshedElement(r,q[0])}else{r.replaceWith(q[s]||q[0])}})})},renderUISingleJIMInErrorCase:function(n,p){var m=["aui-message","aui-message-warning","jim-error-message"];var o=h.I18n.getText("jiraissues.unexpected.error")+" "+p;if(n.hasClass("jira-table")){m.push("jim-error-message-table");e.updateRefreshedElement(n,o)}else{m.push("jim-error-message-single");n.find(".summary").text(o);n.find(".jira-status").remove();n.find(".issue-placeholder").remove();n.find(".aui-icon-wait").remove()}n.removeClass("jira-issue jira-table").addClass(m.join(" "))}};var j={handleAjaxSuccess:function(n,m,p){var o=g.queryJiraIssuesEls();k.each(n,function(r){var q=o.filter('[data-client-id="'+r.clientId+'"]');if(r.status===200){g.renderUISingleJIMFromMacroHTML(JSON.parse(r.data).htmlMacro,q)}else{if(r.status!==202){g.renderUISingleJIMInErrorCase(q,r.data)}}})},handleAjaxError:function(p,o){var m=p.clientIds.split(",");var n=g.queryJiraIssuesEls();k.each(m,function(q){var r=n.filter('[data-client-id="'+q+'"]');g.renderUISingleJIMInErrorCase(r,o)})}};var d={findAllClientIdInPageContent:function(){var n=g.queryJiraIssuesEls();var m=k.map(n,function(p){var o=c(p).attr("data-client-id");if(o){return o}});return k.uniq(m)},collectFetchingJobs:function(){var o=d.findAllClientIdInPageContent();var m=[];var n=new a({clientIds:o.join(",")});if(n.clientIds){m.push(n)}return m}};var b={loadOneByOneJiraServerStrategy:function(){var m=d.collectFetchingJobs();var p=m.length;var o=c.Deferred();var n=0;m.forEach(function(q){q.startJobWithRetry().fail(function(t,r,s){j.handleAjaxError(t,s)}).always(function(){if(++n===p){o.resolve()}}).progress(function(t,r,u){j.handleAjaxSuccess.apply(this,arguments);var s=k.reduce(t,function(w,v){if(v.status==202){w.push(v.clientId)}return w},[]);q.clientIds=s.join(",")})});return o.promise()}};var f={loadTableResourceIfNeeded:function(){var n=c.Deferred();var m=c(".wiki-content .jira-table[data-jira-key]");if(m.length){WRM.require(l,function(){e=require("confluence/jim/jira/jira-issues-view-mode/refresh-table");e.init();n.resolve()})}else{n.resolve()}return n.promise()}};var i={init:function(m){return c.when(f.loadTableResourceIfNeeded()).pipe(b.loadOneByOneJiraServerStrategy)}};return i});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jira-issues-view-mode-async-resource', location = 'jira/jira-issues-view-mode/fix-ui.js' */
define("confluence/jim/jira/jira-issues-view-mode/fix-ui",["jquery","ajs"],function(c,a){var b={fixBreakIconInOldConf:function(){var d=b.compareVersion(a.version,"5.4.4")<=0;if(!d){return}c(".jim-error-message").each(function(){var f=c(this);var e=f;if(f.hasClass("jim-error-message-table")){e=f.find(".aui-message")}e.addClass("warning").prepend('<span class="aui-icon icon-warning"></span>')})},compareVersion:function(j,h){if(typeof j!=="string"||typeof h!=="string"){return false}var f=j.split(".");var e=h.split(".");var g=0;var d=Math.max(f.length,e.length);for(;g<d;g++){if((f[g]&&!e[g]&&parseInt(f[g])>0)||(parseInt(f[g])>parseInt(e[g]))){return 1}else{if((e[g]&&!f[g]&&parseInt(e[g])>0)||(parseInt(f[g])<parseInt(e[g]))){return -1}}}return 0}};return b});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jira-issues-view-mode-async-resource', location = 'jira/jira-issues-view-mode/fetching-job.js' */
define("confluence/jim/jira/jira-issues-view-mode/fetching-job",["jquery","ajs","confluence/jim/confluence-shim","confluence/jim/util/retry-caller"],function(d,b,e,a){var c=function(f){this.clientIds=f.clientIds;var g=1000;this.TICK_RETRIES=[0,1*g,1*g,2*g,3*g,5*g,8*g,13*g,13*g,13*g];this.RETRY_HTTP_CODE=202};c.prototype.startJob=function(){return this.fetchSingeJiraServer()};c.prototype.fetchSingeJiraServer=function(){var f=b.contextPath()+"/rest/jiraanywhere/1.0/jira/clientIds/";var g=d.ajax({type:"POST",url:f,data:this.clientIds,contentType:"application/json",cache:true});g.clientIds=this.clientIds;return g};c.prototype.startJobWithRetry=function(){return a(this.startJob,{name:this.clientIds,delays:this.TICK_RETRIES,context:this,tester:function(g,f,h){return h&&h.status===this.RETRY_HTTP_CODE}})};return c});
}catch(e){WRMCB(e)};