var lastBannerVideoUid="";function tmDisplayBanner(banners,divName,width,height,defaultSize,tracking){if(!defaultSize)defaultSize="300x250";var size=width+'x'+height;var adDiv=document.getElementById(divName);if(banners.constructor.toString().indexOf("Array")==-1){var tempArray=[];for(var key in banners){if(key==="tracking"){tracking=banners["tracking"];}
else{tempArray.push(banners[key]);}}
banners=tempArray;}
var newBanners=new Array();for(var i=0;i<banners.length;i++){if(banners[i].type){var newBanner=null;for(var j=0;j<newBanners.length;j++){if(newBanners[j].size==banners[i].size){newBanner=newBanners[j];break;}}
if(newBanner==null){newBanner=new Object();newBanner.size=banners[i].size;newBanner.width=banners[i].width;newBanner.height=banners[i].height;newBanner.guid=banners[i].guid;newBanners[newBanners.length]=newBanner;}
if(banners[i].type=="image"){newBanner.imageUrl=banners[i].imageUrl?banners[i].imageUrl:banners[i].url;newBanner.clickUrl=banners[i].clickUrl;}else if(banners[i].type=="iframe"){newBanner.htmlUrl=banners[i].htmlUrl?banners[i].htmlUrl:banners[i].url;}else if(banners[i].type=="swf"){newBanner.swfUrl=banners[i].swfUrl?banners[i].swfUrl:banners[i].url;}else if(banners[i].type=="htmlSource"||banners[i].type=="html"){newBanner.htmlSource=banners[i].source;}}else{tmDisplaySingleBanner(banners[i],adDiv,width,height,size,defaultSize,tracking);}}
if(newBanners.length>0){for(var i=0;i<newBanners.length;i++){tmDisplaySingleBanner(newBanners[i],adDiv,width,height,size,defaultSize,tracking);}}}
function tmDisplaySingleBanner(banner,adDiv,width,height,size,defaultSize,tracking){var bannerSize=banner.size?banner.size:banner._size;var bannerDisplayed=false;if((bannerSize==null)||(bannerSize=="undefinedxundefined")||(bannerSize=="NaNxNaN")||(bannerSize=="_default")){bannerSize=defaultSize;}
if(bannerSize==size){var adElem=["div","span","iframe","a","object","table"];for(i=0;i<adElem.length;i++){oldElems=adDiv.getElementsByTagName(adElem[i]);if(oldElems.length>0){for(j=0;j<oldElems.length;j++){try{adDiv.removeChild(oldElems[j]);}catch(e){}}}}
var htmlUrl=banner.htmlUrl?banner.htmlUrl:banner._htmlUrl;var htmlSource=banner.htmlSource?banner.htmlSource:banner._htmlSource;var swfUrl=banner.swfUrl?banner.swfUrl:banner._swfUrl;var imageUrl=banner.imageUrl?banner.imageUrl:banner._imageUrl;var clickUrl=banner.clickUrl?banner.clickUrl:banner._clickUrl;if(htmlSource){var div=document.createElement("div");div.innerHTML=htmlSource;adDiv.appendChild(div);bannerDisplayed=true;}else if(htmlUrl){var iframe=document.createElement("iframe");iframe.style.width=width+"px";iframe.style.height=height+"px";iframe.style.border="0";iframe.scrolling="no";iframe.marginWidth="0";iframe.marginHeight="0";iframe.frameBorder="no";adDiv.appendChild(iframe);var new_iframes=adDiv.getElementsByTagName("iframe");if(new_iframes.length==1){var new_iframe=new_iframes[0];new_iframe.src=htmlUrl;new_iframe.frameborder="no";bannerDisplayed=true;}}else if(swfUrl){var objHtml='<object';objHtml+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" id="acudeo_swf">';objHtml+='<param name="movie" value="'+swfUrl+'" />';objHtml+='<param name="quality" value="high" />';objHtml+='<param name="wmode" value="transparent" />';objHtml+='<param name="allowfullscreen" value="true" />';objHtml+='<param name="allowscriptaccess" value="always" />';objHtml+='<!--[if !IE]>-->';objHtml+='<object type="application/x-shockwave-flash" data="'+swfUrl+'" width="'+width+'" height="'+height+'" id="acudeo_swf">';objHtml+='<param name="quality" value="high" />';objHtml+='<param name="wmode" value="transparent" />';objHtml+='<param name="allowfullscreen" value="true" />';objHtml+='<param name="allowscriptaccess" value="always" />';objHtml+='<!--<![endif]-->';objHtml+='<a href="http://www.adobe.com/go/getflashplayer">';objHtml+='<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />';objHtml+='</a>';objHtml+='<!--[if !IE]>-->';objHtml+='</object>';objHtml+='<!--<![endif]-->';objHtml+='</object>';var span=document.createElement("span");if(navigator.appName.indexOf("Microsoft")!=-1){adDiv.appendChild(span);var new_spans=adDiv.getElementsByTagName("span");if(new_spans.length==1){var span=new_spans[0];span.outerHTML=objHtml;}}else{span.innerHTML=objHtml;adDiv.appendChild(span);}
bannerDisplayed=true;}else if(imageUrl){var a=document.createElement("a");a.setAttribute("href",clickUrl);a.setAttribute("target","_blank");a.setAttribute("id",banner.guid);if(tracking){if(tracking.clickTrackUrl){a.onclick=function(){new Image().src=tracking.clickTrackUrl;return true;}}else if(acudeoComponents&&tracking.playerIndex>=0){a.onclick=function(banner){var banner={guid:this.id};acudeoComponents[tracking.playerIndex].tmSendEvent("bannerClick",{banner:banner});return true;}}}
var img=document.createElement("img");img.setAttribute("src",imageUrl);img.setAttribute("border",0);img.setAttribute("width",width);img.setAttribute("height",height);a.appendChild(img);adDiv.appendChild(a);bannerDisplayed=true;}}
var dispatchBannerImpression=true;if(bannerDisplayed){adDiv.style.visibility="visible";if(tracking&&tracking.videoUid){if((lastBannerVideoUid!="")&&(tracking.videoUid==lastBannerVideoUid)){dispatchBannerImpression=false;}
lastBannerVideoUid=tracking.videoUid;}}
if(tracking&&bannerDisplayed&&dispatchBannerImpression){if(tracking.impressionUrls&&tracking.impressionUrls.length){for(var i=0;i<tracking.impressionUrls.length;i++){var img=new Image();img.onerror=function(){tmOnBannerImpLoadError(tracking.errorUrls);};img.src=tracking.impressionUrls[i];}}else if(acudeoComponents&&tracking.playerIndex>=0){acudeoComponents[tracking.playerIndex].tmSendEvent("bannerDisplayed",{banner:banner});}}}
function tmHideBanner(divId){var adDiv=document.getElementById(divId);adDiv.style.visibility="hidden";}
function tmOnBannerImpLoadError(urls){for(var i=0;i<urls.length;i++){new Image().src=urls[i];}}