WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.whisper.atlassian-whisper-plugin:atlassian-whisper-messages', location = '/js/messages.js' */
define("atlassian-whisper/messages",["require"],function(c){var d=c("wrm/data").claim("com.atlassian.whisper.atlassian-whisper-plugin:atlassian-whisper-messages.WhisperMessagesData");var e=d&&d.messages;var b=(document.querySelector("meta[name=ajs-user-locale]")||{}).content||"en";var a=b.indexOf("en")===0;return{getMessages:function(){return e},hasOverride:function(f){return(e||[]).some(function(g){return(g.experienceOverrides||[]).some(function(h){return h===f})&&((a&&g.defaultEnglish!==false)||Object.keys(g.componentInLanguage||{}).some(function(h){return b.indexOf(h)===0}))})}}});
}catch(e){WRMCB(e)};