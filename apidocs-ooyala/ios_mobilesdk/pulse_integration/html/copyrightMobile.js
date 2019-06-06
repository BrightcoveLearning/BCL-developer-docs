

var linksArray = [];

function initializeUrlRoot()
{
    var arr = window.location.href.split("/");
    var str = "";
    for (var i = 0; i < arr.length - 1; i++)
    {
        str += arr[i] + "/";
    }
    return str;
}

var sdkRoot = initializeUrlRoot();

function initializeLinksArray()
{
    if (linksArray.length > 0) {return;}
    var count = 0;
    linksArray = [];linksArray[count] = "_o_o_pulse_manager_8h_source.html";  count++;linksArray[count] = "annotated.html";  count++;linksArray[count] = "classes.html";  count++;linksArray[count] = "dir_9bec7083027963d9f9ceae2cc7474de5.html";  count++;linksArray[count] = "dir_a9a542df34c83735a17dbfbf9e45713f.html";  count++;linksArray[count] = "dir_c80f15470cfaa31bd7576f7a74f9622f.html";  count++;linksArray[count] = "dir_ccd8defecaf9fd5ad92f2e36d8d31d15.html";  count++;linksArray[count] = "functions.html";  count++;linksArray[count] = "functions_func.html";  count++;linksArray[count] = "functions_prop.html";  count++;linksArray[count] = "hierarchy.html";  count++;linksArray[count] = "index.html";  count++;linksArray[count] = "interface_o_o_pulse_manager-members.html";  count++;linksArray[count] = "interface_o_o_pulse_manager.html";  count++;linksArray[count] = "protocol_o_o_pulse_manager_delegate_01-p-members.html";  count++;linksArray[count] = "protocol_o_o_pulse_manager_delegate_01-p.html";  count++;
}


function feedbackFunction() {
    var theLink = document.getElementById("feedbackLink");
    var linkStr = "mailto:docs@brightcove.com?Subject=Feedback%20%7C%20Welcome&body=I%20have%20a%20comment%20for%20the%20page%20%0A%0A%20";
    linkStr += encodeURIComponent(window.location);
    linkStr += "%20%0A%0A%3Cyour%20comment%20here%3E";
    theLink.href = linkStr;
}

function stringDist(strA, strB) {
    var lenA = strA.length;
    var lenB = strB.length;
    if (lenA == 0) {
        return lenB;
    }
    if (lenB == 0) {
        return lenA;
    }
    var bounds = lenB + 1;
    var prevCalc =[];
    var calc =[];
    for (var j = 0; j < bounds; j++) {
        prevCalc[j] = j;
    }
    for (var i = 0; i < lenA; i++) {
        calc[0] = i + 1;
        for (var j = 0; j < lenB; j++) {
            var cost = 1;
            if (strA.charAt(i) == strB.charAt(j)) {
                cost = 0;
            }
            var minimal = calc[j] + 1;
            var temp = prevCalc[j + 1] + 1;
            if (temp < minimal) {
                minimal = temp;
            }
            temp = prevCalc[j] + cost;
            if (temp < minimal) {
                minimal = temp;
            }
            calc[j + 1] = minimal;
        }
        for (var j = 0; j < bounds; j++) {
            prevCalc[j] = calc[j];
        }
    }
    return calc[lenB];
}

function searchExit() {
    var searchOut = document.getElementById("searchAnswers");
    searchOut.style.display = "none";
    document.getElementById("resultsTxt").innerHTML = "";
    
    
}

function takeCareOfExit(theId) {
    searchExit();
}

function removeInnerHTMLFromString(str) {
    var stackHeight = 0;
    var strLen = str.length;
    var i = 0;
    var startIndex = 0;
    for (i = 0; i < strLen; i++) {
        var current = str.charAt(i);
        if (current == '<') {
            var tagCloseIndex = str.indexOf('>', i);
            if (tagCloseIndex == -1) {
                str = str.substring(0, startIndex);
                break;
            }
            
            
            if (str.charAt(i + 1) != '/') //opening tag
            {
                var eliminate = false;
                if (str.substring(i, tagCloseIndex + 1) == "<br>") {
                    eliminate = true;
                } else if (str.substring(i, tagCloseIndex + 1).indexOf("<link href=") >= 0) {
                    eliminate = true;
                } else if (str.substring(i, tagCloseIndex + 1).indexOf("<meta ") >= 0) {
                    eliminate = true;
                } else if (str.substring(i, tagCloseIndex + 1).indexOf("<input ") >= 0) {
                    eliminate = true;
                }
                
                if (eliminate || (str.charAt(tagCloseIndex - 1) == '/')) {
                    if (stackHeight == 0) {
                        str = (str.substring(0, i) + str.substring(tagCloseIndex + 1));
                        i--;
                        strLen = str.length;
                        continue;
                    }
                } else {
                    if (stackHeight == 0) {
                        startIndex = i;
                    }
                    stackHeight++;
                }
                i = tagCloseIndex;
                
                continue;
            }
            
            //else closing tag
            stackHeight--;
            
            if (stackHeight == 0) {
                str = (str.substring(0, startIndex) + str.substring(tagCloseIndex + 1));
                i = startIndex - 1;
                strLen = str.length;
                continue;
            }
        }
    }
    
    if (stackHeight != 0)
    {
        str = str.substring(0, startIndex);
        strLen = str.length;
    }
    
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/\//g, "&#47;");
    
    
    
    return str;
}

function removeHtmlTagsFromString(str)
{
    str = str.replace(/<[^<>]*>/g, "");
    return str
}

function searchDocElement(inputTxtUpper, inputArray, inputLen, matchExists)
{
    var outputString = "<p>No results matching &quot;<b>" + inputTxtUpper + "</b>&quot;.</p>";
    
    if (inputTxtUpper == "") {
        return outputString;
    }
    var possibleMatches = document.getElementsByTagName("*");
    //var possibleMatches = document.getElementsByTagName("body")[0].getElementsByTagName("*");
    var possibleLen = possibleMatches.length;
    
    // For debug.
    // document.getElementsByTagName("h1")[0].innerHTML = possibleMatches[0].innerHTML;
    
    var actualMatches =[];
    var semiMatches   =[];
    
    //For debug.
    //var exString = "";
    
    for (var i = 0; i < possibleLen; i++) {
    
        
    
        var score = 0;
        var possibleMatches_i = possibleMatches[i];
        
        if (possibleMatches_i.innerHTML) {} else {continue;}
        
        if (possibleMatches_i.id) {
            var curr = possibleMatches_i.id;
            if (curr == "inputTxt") {continue;}
            if (curr == "resultsTxt") {continue;}
            if (curr == "searchButton") {continue;}
            if (curr == "searchCapsule") {continue;}
        } else {
            possibleMatches_i.id = "UUID__custom_" + i;
        }
        
        if (possibleMatches_i.className) {
            var curr = possibleMatches_i.className;
            if (curr == "modal") {continue;}
            if (curr == "modal-content") {continue;}
            if (curr == "close") {continue;}
        }
        
        if (possibleMatches_i.tagName) {
            var curr = possibleMatches_i.tagName;
            if (curr == "SCRIPT") {continue;}
            if (curr == "STYLE") {continue;}
        }
        
        //exString += "<br/><br/>Number " + i + ":<br/><br/>";
        //exString += removeInnerHTMLFromString(possibleMatches_i.innerHTML.trim());
        //continue;
        
        var current = possibleMatches_i.id;
        var parsedString = removeHtmlTagsFromString(removeInnerHTMLFromString(possibleMatches_i.innerHTML.trim()));
        if (parsedString.length == 0) {continue;}
        var stringsArray = parsedString.split(" ");
        var stringsLen = stringsArray.length;
        
        
        
        var scoreLim = 5;
        for (var k = 0; k < inputLen; k++) {
            var currLength = inputArray[k].length;
            if (currLength <= 1) {
                scoreLim = 1;
                break;
            }
            if (currLength < scoreLim + 1) {
                scoreLim = currLength - 1;
            }
        }
        
        var isSubstring = false;
        var bestScore = scoreLim + 1;
        for (var j = 0; j < stringsLen; j++) {
            for (var k = 0; k < inputLen; k++) {
                var strings_j = stringsArray[j].toLowerCase();
                score = stringDist(strings_j, inputArray[k]);
                if (score < bestScore) {
                    bestScore = score;
                }
                if (score == 0) {
                    break;
                }
                if (stringsLen >= 1)
                {
                    if (strings_j.indexOf(inputArray[k]) >= 0) {isSubstring = true;  bestScore = 1;  break;}
                }
            }
            if ((score == 0) || (isSubstring)) {break;}
        }
        
        if (bestScore == 0) {
            actualMatches[actualMatches.length] = current;
        } else if ((bestScore < scoreLim) || isSubstring) {
            semiMatches[semiMatches.length] = current;
        }
    }
    
    
    var actualLen = actualMatches.length;
    var semiLen = semiMatches.length;
    if ((actualLen <= 1) && (semiLen == 0)) {
        return outputString;
    }
    matchExists.value = 1;
    var outString = "";
    if (actualLen > 1) {
        outString = "Results matching &quot;<b>" + inputTxtUpper + "</b>&quot;&#58;<br/><ul>";
    }
    for (var j = 1; j < actualLen; j++) {
        var linkOut = removeInnerHTMLFromString(document.getElementById(actualMatches[j]).innerHTML);
        outString += "<li><a onclick=" + "takeCareOfExit('" + actualMatches[j] + "')" + " href=#" + actualMatches[j] + ">" + linkOut + "</a></li>";
    }
    if (actualLen > 0) {
        outString += "</ul>";
    }
    if (semiLen > 0) {
        if (actualLen > 1) {
            outString += "Or are you looking for&#58;<br/><ul>";
        } else {
            outString += "Are you looking for&#58;<br/><ul>";
        }
    }
    for (var j = 0; j < semiLen; j++) {
        var linkOut = removeInnerHTMLFromString(document.getElementById(semiMatches[j]).innerHTML);
        outString += "<li><a onclick=" + "takeCareOfExit('" + semiMatches[j] + "')" + " href=#" + semiMatches[j] + ">" + linkOut + "</a></li>";
    }
    if (semiLen > 0) {
        outString += "</ul>";
    }
    outputString = outString;
    return outputString;
}

function searchAllDocRoots()
{
    var outStr = "";
    
    var inputTxtUpper = document.getElementById("inputTxt").value;
    var inputArray  = inputTxtUpper.toLowerCase().trim().split(" ");
    var inputLen    = inputArray.length;
    var matchExists = {value: 0};
    
    var currPageStr = searchDocElement(inputTxtUpper, inputArray, inputLen, matchExists);
    
    initializeLinksArray();
    var linksArrayLen = linksArray.length;
    
    var scoreLim    = 2;
    var outPagesStr ="";
    
    for (var i = 0; i < linksArrayLen; i++)
    {
        var bestScore = scoreLim + 1;
        var bestIndex = -1;
        
        var stringsArray = getHTML(i).trim().split(" ");
        var stringsLen   = stringsArray.length;
        
        {
            for (var k = 0; k < inputLen; k++)
            {
                var currLength = inputArray[k].length;
                if (currLength <= 1) {scoreLim = 1;  break;}
                if (currLength < scoreLim + 1) {scoreLim = currLength - 1;}
            }
        
            var isSubstring = false;
        
            for (var j = 0; j < stringsLen; j++) {
                for (var k = 0; k < inputLen; k++) {
                    var strings_j = stringsArray[j];
                    score = stringDist(strings_j, inputArray[k]);
                    if (score < bestScore) {bestScore = score;  bestIndex = j;}
                    if (score == 0) {bestScore = 0;  bestIndex = j;  break;}
                    if (stringsLen >= 1)
                    {
                        if (strings_j.indexOf(inputArray[k]) >= 0)
                        {
                            isSubstring = true;  bestScore = 1;  bestIndex = j;  break;
                        }
                    }
                }
                if ((score == 0) || (isSubstring)) {break;}
            }
        }
        
        if (bestScore <= scoreLim)
        {
            var displayString = "";
            var initBound = bestIndex - 3;
            var limBound  = bestIndex + 3;
            for (var k = initBound;  k <= limBound; k++)
            {
                if (k < 0) {continue;}  if (k >= stringsLen) {break;}
                if (k > initBound) {displayString += " ";}
                else if (k > 0) {displayString += "...";}
                
                var strings_k = stringsArray[k];
                strings_k = strings_k.replace(/</g, "&lt;");
                strings_k = strings_k.replace(/>/g, "&gt;");
                strings_k = strings_k.replace(/\//g, "&#47;");
                strings_k = strings_k.replace(/"/g, "&quot;");
                
                if (k == bestIndex)
                {
                    var inIndex = -1;
                    var appropriateInd = -1;
                    var inElement = "";
                    for (var j = 0; j < inputLen; j++)
                    {
                        appropriateInd = strings_k.indexOf(inputArray[j]);
                        if (appropriateInd >= 0)
                        {
                            inElement = inputArray[j];
                            inIndex = j;  break;
                        }
                    }
                    if (inIndex >= 0)
                    {
                        displayString += strings_k.substring(0, appropriateInd) + "<b>" + strings_k.substring(appropriateInd, appropriateInd + inElement.length) + "</b>" + strings_k.substring(appropriateInd + inElement.length);
                    }
                    else
                    {
                        displayString += "<b>" + strings_k + "</b>";
                    }
                }
                else
                {
                    displayString += strings_k;
                }
                
                if (k == limBound)
                {
                    if (k < stringsLen - 1) {displayString += "...";}
                }
            }
            outPagesStr += "\n<li>In <a href=" + sdkRoot + linksArray[i] + ">" + linksArray[i] + "</a>&#58;<br/>" + displayString + "</li>";
            
        }
    }
    
    if ((matchExists.value == 0) && (outPagesStr.length > 0))
    {
        outStr += "<p>No matches on the current page.</p><p>What about&#58;<ul>" + outPagesStr + "</ul></p>";
    }
    else
    {
        outStr += currPageStr;
    
        if (outPagesStr.length > 0)
        {
            outStr += "<p>See also&#58;<ul>" + outPagesStr + "</ul></p>";
        }
    }
    
    document.getElementById("resultsTxt").innerHTML = outStr;
}

function searchClick()
{
    var searchOut = document.getElementById("searchAnswers");
    document.getElementById("resultsTxt").innerHTML = "";
    var closeBtn = document.getElementsByClassName("close")[0];
    searchOut.style.display = "block";
    closeBtn.onclick = function () {
        searchOut.style.display = "none";
    }
    searchAllDocRoots();
    return false;
}

function copyMobileFunction() {
    var copyNotice = document.getElementById("copyrightMobile");
    var date = new Date();
    var currentYear = date.getFullYear();
    copyNotice.setAttribute('style', 'font-size: 14px; cursor: pointer; text-align:center;');
    var footerString = "<a href=\"https://brightcove.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Brightcove, Inc. &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/legal/privacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/terms-and-conditions\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved ";
    footerString += "<a href=\"http://help.ooyala.com/video-platform/concepts/about.html\" target=\"_blank\">";
    footerString += "&bull; Ooyala Support - Developer Documentation</a>";
    copyNotice.innerHTML = footerString;
    copyNotice.style.display = 'block';
    copyNotice.style.background = '#EEEEEE';
    
    copyNotice.style.color = '#0094BD';
    copyNotice.style.height = '28px';
    copyNotice.style.padding = '2px';
    copyNotice.style.margin = 'auto';
    copyNotice.style.borderRadius = '4px';
    
    copyNotice.id = "nav-path";
    copyNotice.className = "navpath";
    
    feedbackFunction();
    
    if (document.getElementById("inputTxt")) {
        document.getElementById("inputTxt").onkeypress =
        function (ev) {
            var event = ev || window.event;
            var charCode = event.which || event.keyCode;
            
            if (charCode == "13") {
                searchClick();
                return false;
            }
        }
    }
    
    if (document.getElementById("searchAnswers")) {
        document.getElementById("searchAnswers").style.display = "none";
    }
}
function getHTML(index) {

if (index == 0) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: OOPulseManager.h Source File 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('_o_o_pulse_manager_8h_source.html','');});       OOPulseManager.h         1&#160;//    2&#160;//  OOPulseManager.h    3&#160;//  PulseOVPTestApp    4&#160;//    5&#160;//  Created on 03/02/16.    6&#160;//  Copyright © 2016 Brightcove, Inc. All rights reserved.    7&#160;//    8&#160;    9&#160;#import &lt;OoyalaSDK/OOAdSpotPlugin.h&gt;   10&#160;#import &quot;OOPulsePlayerOptions.h&quot;   11&#160;   12&#160;#ifndef OOPulseManager_h   13&#160;#define OOPulseManager_h   14&#160;   15&#160;@class OOPulseManager;   16&#160;@protocol OOPulseVideoAd;   17&#160;@protocol OOPulseSession;   18&#160;@class OOContentMetadata;   19&#160;@class OORequestSettings;   20&#160;@class OOOoyalaPlayer;   21&#160;@class OOVideo;   22&#160;   30&#160;@protocol OOPulseManagerDelegate &lt;NSObject&gt;   31&#160;   48&#160;- (id&lt;OOPulseSession&gt;)pulseManager:(OOPulseManager *)manager   49&#160;             createSessionForVideo:(OOVideo *)video   50&#160;                     withPulseHost:(NSString *)pulseHost   51&#160;                   contentMetadata:(OOContentMetadata *)contentMetadata   52&#160;                   requestSettings:(OORequestSettings *)requestSettings;   53&#160;   54&#160;@optional   55&#160;   69&#160;- (void)pulseManager:(OOPulseManager *)manager openClickThrough:(id&lt;OOPulseVideoAd&gt;)ad;   70&#160;   71&#160;@end   72&#160;   76&#160;@interface OOPulseManager : NSObject&lt;OOAdPlugin&gt;   77&#160;   85&#160;- (instancetype)initWithPlayer:(OOOoyalaPlayer*)player;   86&#160;   87&#160;- (instancetype)initWithPlayer:(OOOoyalaPlayer *)player pulsePlayerOptions:(OOPulsePlayerOptions *)pulsePlayerOptions;   88&#160;   94&#160;@property (weak, nonatomic) id&lt;OOPulseManagerDelegate&gt; delegate;   95&#160;@property (strong, nonatomic) OOPulsePlayerOptions *options;   96&#160;   97&#160;@end   98&#160;   99&#160;#endif   OOPulseManager_h  OOPulseManager::optionsOOPulsePlayerOptions * optionsDefinition: OOPulseManager.h:95 OOPulseManager::delegateid&lt; OOPulseManagerDelegate &gt; delegateThe object that acts as the delegate of the Pulse Manager. Definition: OOPulseManager.h:94 OOPulseManagerThe Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player...Definition: OOPulseManager.h:76     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 1) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class List 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('annotated.html','');});       Class List     Here are the classes, structs, unions and interfaces with brief descriptions:  &#160;COOPulseManagerThe Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player  &#160;C&lt;OOPulseManagerDelegate &gt;The OOPulseManagerDelegate protocol provides a way for the OOPulseManager to communicate with the host application        	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 2) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class Index 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('classes.html','');});       Class Index     O  &#160;&#160;O&#160;&#160;   OOPulseManager&#160;&#160;&#160; OOPulseManagerDelegate &#160;&#160;&#160;   O     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 3) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: git Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_9bec7083027963d9f9ceae2cc7474de5.html','');});       git Directory Reference       Directories directory &#160;ios-sdk &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 4) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: sdk Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_a9a542df34c83735a17dbfbf9e45713f.html','');});       sdk Directory Reference       Directories directory &#160;OoyalaPulseIntegration &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 5) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: ios-sdk Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_c80f15470cfaa31bd7576f7a74f9622f.html','');});       ios-sdk Directory Reference       Directories directory &#160;sdk &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 6) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: OoyalaPulseIntegration Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_ccd8defecaf9fd5ad92f2e36d8d31d15.html','');});       OoyalaPulseIntegration Directory Reference       Files file &#160;OOPulseManager.h [code] &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 7) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class Members 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions.html','');});    Here is a list of all class members with links to the classes they belong to: delegate : OOPulseManager  initWithPlayer: : OOPulseManager  initWithPlayer:pulsePlayerOptions: : OOPulseManager  options : OOPulseManager  pulseManager:createSessionForVideo:withPulseHost:contentMetadata:requestSettings: : &lt;OOPulseManagerDelegate &gt;  pulseManager:openClickThrough: : &lt;OOPulseManagerDelegate &gt;       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 8) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class Members - Functions 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions_func.html','');});    &#160; initWithPlayer: : OOPulseManager  initWithPlayer:pulsePlayerOptions: : OOPulseManager  pulseManager:createSessionForVideo:withPulseHost:contentMetadata:requestSettings: : &lt;OOPulseManagerDelegate &gt;  pulseManager:openClickThrough: : &lt;OOPulseManagerDelegate &gt;       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 9) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class Members - Properties 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions_prop.html','');});    &#160; delegate : OOPulseManager  options : OOPulseManager       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 10) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Class Hierarchy 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('hierarchy.html','');});       Class Hierarchy     This inheritance list is sorted roughly, but not completely, alphabetically: [detail level 12] &#160;&#9660;C&lt;NSObject&gt; &#160;COOPulseManagerThe Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player  &#160;C&lt;OOPulseManagerDelegate &gt;The OOPulseManagerDelegate protocol provides a way for the OOPulseManager to communicate with the host application  &#160;&#9660;C&lt;OOAdPlugin&gt; &#160;COOPulseManagerThe Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player        	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 11) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Main Page 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('index.html','');});       Ooyala Player v4 Pulse Integration for iOS Documentation     The Ooyala Pulse Integration framework for iOS allows you to display ads served from Ooyala Pulse along with your video content in the Ooyala Player for iOS. The OOPulseManager class provides the support for displaying Ooyala Pulse ads to your OOOoyalaPlayer. Prerequisites  The Ooyala Player framework for iOS (aka the Ooyala Mobile SDK for iOS) The Ooyala Pulse framework for iOS  Getting Started  Import the Ooyala Pulse Integration framework:     1&#160;@import &lt;OoyalaPulseIntegration/OoyalaPulseIntegration.h&gt; Create an OOPulseManager object and associate it with your OOOoyalaPlayer:     1&#160;self.manager = [[OOPulseManager alloc] initWithPlayer:self.player];    2&#160;self.manager.delegate = self; Optionally, set any ad player options through the OOPulsePlayerOptions object on the OOPulseManager. Possible options are: displayingAdTitle: Boolean indicating whether to show the ad title during the ad playback or not. Default value is false, and indicates to not show the ad title. ``` OOPulsePlayerOptions * pulsePlayerOptions = [[OOPulsePlayerOptions alloc] init]; self.manager.pulsePlayerOptions.displayingAdTitle = true; ```    Implement the OOPulseManagerDelegate method pulseManager:createSessionForVideo:withPulseHost:contentMetadata:requestSettings: in your delegate. Initial values for all parameters in this method are automatically taken from settings in your Backlot account, but if needed, you may modify the host location of your Ooyala Pulse account, persistent ID, content metadata, request settings and so on, before creating the session. For more information about these parameters, refer to Ooyala Video Advertising SDK Parameter Reference.      1&#160;- (id&lt;OOPulseSession&gt;)pulseManager:(OOPulseManager *)manager    2&#160;             createSessionForVideo:(OOVideo *)video    3&#160;                     withPulseHost:(NSString *)pulseHost    4&#160;                   contentMetadata:(VPContentMetadata *)contentMetadata    5&#160;                   requestSettings:(VPRequestSettings *)requestSettings    6&#160;{    7&#160;  // Set the correct pulse host and options    8&#160;  [OOPulse setPulseHost:pulsehost    9&#160;        deviceContainer:nil   10&#160;           persistentId:nil];   11&#160;   12&#160;  // Here we assume a landscape orientation for video playback   13&#160;  requestSettings.width = (NSInteger)MAX(self.view.frame.size.width, self.view.frame.size.height);   14&#160;  requestSettings.height = (NSInteger)MIN(self.view.frame.size.width, self.view.frame.size.height);   15&#160;   16&#160;  // Implement a way of determining the max   17&#160;  // bitrate of ads to request.   18&#160;  requestSettings.maxBitRate = [BandwidthChecker maxBitRate];   19&#160;   20&#160;  return [OOPulse sessionWithContentMetadata:contentMetadata   21&#160;                             requestSettings:requestSettings];   22&#160;}Sample Application The sample integration is coded in OBJ-C and is found here      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 12) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Member List 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('interface_o_o_pulse_manager.html','');});       OOPulseManager Member List      This is the complete list of members for OOPulseManager, including all inherited members.    delegateOOPulseManager   -&#160;initWithPlayer:OOPulseManager   -&#160;initWithPlayer:pulsePlayerOptions:OOPulseManager   optionsOOPulseManager     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 13) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: OOPulseManager Class Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('interface_o_o_pulse_manager.html','');});       Instance Methods &#124; Properties &#124; List of all members      OOPulseManager Class Reference      The Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player.    More...  #import &lt;OOPulseManager.h&gt;     Inheritance diagram for OOPulseManager:                 Instance Methods (instancetype)&#160;- initWithPlayer: &#160;Initialize the Pulse Manager.  More... &#160; (instancetype)&#160;- initWithPlayer:pulsePlayerOptions: &#160;   Properties id&lt; OOPulseManagerDelegate &gt;&#160;delegate &#160;The object that acts as the delegate of the Pulse Manager.  More... &#160; OOPulsePlayerOptions *&#160;options &#160;  Detailed Description The Pulse Manager plugin allows you to display ads from Ooyala Pulse in the Ooyala Player.  Method Documentation                              - (instancetype) initWithPlayer:                       (OOOoyalaPlayer *)&#160;           player                              Initialize the Pulse Manager.  Parameters        playerThe Ooyala Player to associate with this ad manager.        ReturnsThe OOPulseManager instance.                                  - (instancetype) initWithPlayer:                       (OOOoyalaPlayer *)&#160;           player                             pulsePlayerOptions:                      (OOPulsePlayerOptions *)&#160;           pulsePlayerOptions&#160;                                                                        Property Documentation                                     - (id&lt;OOPulseManagerDelegate&gt;) delegate                       readwritenonatomicweak         The object that acts as the delegate of the Pulse Manager.  The delegate must adopt the OOPulseManagerDelegate protocol.                                         - (OOPulsePlayerOptions*) options                       readwritenonatomicstrong           The documentation for this class was generated from the following file: OOPulseManager.h      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 14) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: Member List 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('protocol_o_o_pulse_manager_delegate_01-p.html','');});       &lt;OOPulseManagerDelegate &gt; Member List      This is the complete list of members for &lt;OOPulseManagerDelegate &gt;, including all inherited members.    -&#160;pulseManager:createSessionForVideo:withPulseHost:contentMetadata:requestSettings:&lt;OOPulseManagerDelegate &gt;   -&#160;pulseManager:openClickThrough:&lt;OOPulseManagerDelegate &gt;     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 15) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Player v4 Pulse Integration for iOS: &lt;OOPulseManagerDelegate &gt; Protocol Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Player v4 Pulse Integration for iOS v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('protocol_o_o_pulse_manager_delegate_01-p.html','');});       Instance Methods &#124; List of all members      &lt;OOPulseManagerDelegate &gt; Protocol Reference      The OOPulseManagerDelegate protocol provides a way for the OOPulseManager to communicate with the host application.    More...  #import &lt;OOPulseManager.h&gt;     Inheritance diagram for &lt;OOPulseManagerDelegate &gt;:                 Instance Methods (id&lt; OOPulseSession &gt;)&#160;- pulseManager:createSessionForVideo:withPulseHost:contentMetadata:requestSettings: &#160;Requests the delegate to create a Pulse ad session, which contains information about all ads that should be played along with the current video content.  More... &#160; (void)&#160;- pulseManager:openClickThrough: &#160;This method is called when the app should show the clickthrough link.  More... &#160;  Detailed Description The OOPulseManagerDelegate protocol provides a way for the OOPulseManager to communicate with the host application.  This delegate allows you to override the content metadata and request settings from Ooyala Backlot dynamically, and customize your response to clickthrough events.  Method Documentation                              - (id&lt;OOPulseSession&gt; OOPulseManagerDelegate) pulseManager:                       (OOPulseManager *)&#160;           manager                             createSessionForVideo:                      (OOVideo *)&#160;           video                             withPulseHost:                      (NSString *)&#160;           pulseHost                             contentMetadata:                      (OOContentMetadata *)&#160;           contentMetadata                             requestSettings:                      (OORequestSettings *)&#160;           requestSettings&#160;                                                                      Requests the delegate to create a Pulse ad session, which contains information about all ads that should be played along with the current video content.  The content metadata and request settings are pre-populated with information from Backlot according to this scheme. The implementation may freely override any or all of these properties. Parameters        managerThe Pulse Manager which will create the session.      videoThe current video content.      pulseHostYour Pulse account host.      contentMetadataThe content metadata.      requestSettingsThe request settings.         ReturnsThe newly created Pulse ad session.                                         - (void OOPulseManagerDelegate) pulseManager:                       (OOPulseManager *)&#160;           manager                             openClickThrough:                      (id&lt; OOPulseVideoAd &gt;)&#160;           ad&#160;                                                                          optional         This method is called when the app should show the clickthrough link.  The app must trigger OOPulseVideoAd.adClickThroughTriggered to notify the session if the clickthrough link has been opened. You can obtain the URL to open with OOPulseVideoAd.clickthroughURL NoteIf you leave this method unimplemented, the Pulse Manager automatically opens the clickthrough link when clicked using the default iOS browser. Parameters        managerThe Pulse Manager from which this request originated.      adThe Ad for which the clickthrough URL must be opened.            The documentation for this protocol was generated from the following file: OOPulseManager.h      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}
return "";}
