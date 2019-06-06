

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
    linksArray = [];linksArray[count] = "_o_o_nielsen_plugin_8h_source.html";  count++;linksArray[count] = "annotated.html";  count++;linksArray[count] = "classes.html";  count++;linksArray[count] = "dir_19007b95dd619c294092084eae37ede6.html";  count++;linksArray[count] = "dir_9bec7083027963d9f9ceae2cc7474de5.html";  count++;linksArray[count] = "dir_a9a542df34c83735a17dbfbf9e45713f.html";  count++;linksArray[count] = "dir_c80f15470cfaa31bd7576f7a74f9622f.html";  count++;linksArray[count] = "functions.html";  count++;linksArray[count] = "functions_func.html";  count++;linksArray[count] = "functions_prop.html";  count++;linksArray[count] = "functions_vars.html";  count++;linksArray[count] = "hierarchy.html";  count++;linksArray[count] = "index.html";  count++;linksArray[count] = "interface_o_o_nielsen_plugin-members.html";  count++;linksArray[count] = "interface_o_o_nielsen_plugin.html";  count++;
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
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: OONielsenPlugin.h Source File 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('_o_o_nielsen_plugin_8h_source.html','');});       OONielsenPlugin.h         1&#160;    9&#160;#import &lt;Foundation/Foundation.h&gt;   10&#160;   11&#160;@class OOOoyalaPlayer;   12&#160;@class NielsenAppApi;   16&#160;@interface OONielsenPlugin : NSObject   17&#160;   28&#160;- (instancetype)initWithPlayer:(OOOoyalaPlayer *)player   29&#160;                         appId:(NSString *)appId   30&#160;                    appVersion:(NSString *)appVersion   31&#160;                       appName:(NSString *)appName   32&#160;                        sfcode:(NSString *)sfcode   33&#160;                    parameters:(NSDictionary *)otherParameters;   34&#160;   39&#160;- (NielsenAppApi *)getNielsenAppApi;   40&#160;   42&#160;@property (nonatomic, retain) NSDictionary *customMetadata;   43&#160;   44&#160;@endOONielsenPlugin::customMetadataNSDictionary * customMetadatacutomer metadata that overrides server values Definition: OONielsenPlugin.h:42 OONielsenPluginOoyala Nielson analytics plugin implementation. Definition: OONielsenPlugin.h:16 -[OONielsenPlugin getNielsenAppApi]NielsenAppApi * getNielsenAppApi()Get the underlying nielsen app api. Definition: OONielsenPlugin.m:76     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 1) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class List 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('annotated.html','');});       Class List     Here are the classes, structs, unions and interfaces with brief descriptions:  &#160;COONielsenPluginOoyala Nielson analytics plugin implementation        	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 2) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Index 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('classes.html','');});       Class Index     O  &#160;&#160;O&#160;&#160;   OONielsenPlugin&#160;&#160;&#160;   O     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 3) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: OoyalaNielsenSDK Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_19007b95dd619c294092084eae37ede6.html','');});       OoyalaNielsenSDK Directory Reference       Files file &#160;OONielsenPlugin.h [code] &#160; file &#160;OONielsenPlugin.m &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 4) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: git Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_9bec7083027963d9f9ceae2cc7474de5.html','');});       git Directory Reference       Directories directory &#160;ios-sdk &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 5) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: sdk Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_a9a542df34c83735a17dbfbf9e45713f.html','');});       sdk Directory Reference       Directories directory &#160;OoyalaNielsenSDK &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 6) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: ios-sdk Directory Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('dir_c80f15470cfaa31bd7576f7a74f9622f.html','');});       ios-sdk Directory Reference       Directories directory &#160;sdk &#160;      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 7) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Members 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Variables       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions.html','');});    Here is a list of all class members with links to the classes they belong to: _isPlaying : OONielsenPlugin  _lastPlayhead : OONielsenPlugin  addObservers: : OONielsenPlugin  channelName : OONielsenPlugin  configureMetadata : OONielsenPlugin  customMetadata : OONielsenPlugin  dealloc : OONielsenPlugin  dictToJson: : OONielsenPlugin  getNielsenAppApi : OONielsenPlugin  initWithPlayer:appId:appVersion:appName:sfcode:parameters: : OONielsenPlugin  insertMetaDataFromDictionary: : OONielsenPlugin  isCMS : OONielsenPlugin  metaData : OONielsenPlugin  nielsenApi : OONielsenPlugin  nielsenAppApi:errorOccurred: : OONielsenPlugin  nielsenAppApi:eventOccurred: : OONielsenPlugin  onAdEvent: : OONielsenPlugin  onApplicationWillResignActive: : OONielsenPlugin  onCurrentItemChanged: : OONielsenPlugin  onJson: : OONielsenPlugin  onPlayhead: : OONielsenPlugin  onStateChanged: : OONielsenPlugin  player : OONielsenPlugin  playheadPosition: : OONielsenPlugin  removeNielsenInvalidCharacters: : OONielsenPlugin  sendID3: : OONielsenPlugin  sendPlay : OONielsenPlugin  sendStop : OONielsenPlugin  stringForAdType: : OONielsenPlugin       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 8) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Members - Functions 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Variables       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions_func.html','');});    &#160; addObservers: : OONielsenPlugin  configureMetadata : OONielsenPlugin  dealloc : OONielsenPlugin  dictToJson: : OONielsenPlugin  getNielsenAppApi : OONielsenPlugin  initWithPlayer:appId:appVersion:appName:sfcode:parameters: : OONielsenPlugin  insertMetaDataFromDictionary: : OONielsenPlugin  isCMS : OONielsenPlugin  nielsenAppApi:errorOccurred: : OONielsenPlugin  nielsenAppApi:eventOccurred: : OONielsenPlugin  onAdEvent: : OONielsenPlugin  onApplicationWillResignActive: : OONielsenPlugin  onCurrentItemChanged: : OONielsenPlugin  onJson: : OONielsenPlugin  onPlayhead: : OONielsenPlugin  onStateChanged: : OONielsenPlugin  playheadPosition: : OONielsenPlugin  removeNielsenInvalidCharacters: : OONielsenPlugin  sendID3: : OONielsenPlugin  sendPlay : OONielsenPlugin  sendStop : OONielsenPlugin  stringForAdType: : OONielsenPlugin       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 9) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Members - Properties 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Variables       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions_prop.html','');});    &#160; channelName : OONielsenPlugin  customMetadata : OONielsenPlugin  metaData : OONielsenPlugin  nielsenApi : OONielsenPlugin  player : OONielsenPlugin       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 10) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Members - Variables 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                       All       Functions       Variables       Properties                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('functions_vars.html','');});    &#160; _isPlaying : OONielsenPlugin  _lastPlayhead : OONielsenPlugin       	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 11) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Class Hierarchy 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('hierarchy.html','');});       Class Hierarchy     This inheritance list is sorted roughly, but not completely, alphabetically: [detail level 12] &#160;&#9660;C&lt;NielsenAppApiDelegate&gt; &#160;COONielsenPluginOoyala Nielson analytics plugin implementation  &#160;&#9660;CNSObject &#160;COONielsenPluginOoyala Nielson analytics plugin implementation        	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 12) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Main Page 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('index.html','');});       Ooyala Mobile SDK for iOS: Nielsen SDK Documentation          	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 13) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: Member List 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('interface_o_o_nielsen_plugin.html','');});       OONielsenPlugin Member List      This is the complete list of members for OONielsenPlugin, including all inherited members.    _isPlayingOONielsenPlugin()protected   _lastPlayheadOONielsenPlugin()protected   -&#160;addObservers:OONielsenPlugin   channelNameOONielsenPlugin()   -&#160;configureMetadataOONielsenPlugin   customMetadataOONielsenPlugin   -&#160;deallocOONielsenPlugin   +&#160;dictToJson:OONielsenPluginstatic   -&#160;getNielsenAppApiOONielsenPlugin   -&#160;initWithPlayer:appId:appVersion:appName:sfcode:parameters:OONielsenPlugin   -&#160;insertMetaDataFromDictionary:OONielsenPlugin   -&#160;isCMSOONielsenPlugin   metaDataOONielsenPlugin()   nielsenApiOONielsenPlugin()   -&#160;nielsenAppApi:errorOccurred:OONielsenPlugin   -&#160;nielsenAppApi:eventOccurred:OONielsenPlugin   -&#160;onAdEvent:OONielsenPlugin   -&#160;onApplicationWillResignActive:OONielsenPlugin   -&#160;onCurrentItemChanged:OONielsenPlugin   -&#160;onJson:OONielsenPlugin   -&#160;onPlayhead:OONielsenPlugin   -&#160;onStateChanged:OONielsenPlugin   playerOONielsenPlugin()   -&#160;playheadPosition:OONielsenPlugin()   +&#160;removeNielsenInvalidCharacters:OONielsenPluginstatic   -&#160;sendID3:OONielsenPlugin   -&#160;sendPlayOONielsenPlugin   -&#160;sendStopOONielsenPlugin   +&#160;stringForAdType:OONielsenPluginstatic     	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}

if (index == 14) {
return "   	 		 		 		 		 		 		 		 		 		 		 		 		Ooyala Mobile SDK for iOS: Nielsen SDK: OONielsenPlugin Class Reference 		 		          	 	&times;No results found. 		 			 				 					Ooyala Mobile SDK for iOS: Nielsen SDK v4.44.0 				 			 		&#128270; 		 			 			 				 					 						 							 								               Main&#160;Page       Classes                       Class&#160;List       Class&#160;Index       Class&#160;Hierarchy       Class&#160;Members                                    <div id= splitbar  style= -moz-user-select:none;          class= ui-resizable-handle >      $(document).ready(function(){initNavTree('interface_o_o_nielsen_plugin.html','');});       Instance Methods &#124; Class Methods &#124; Protected Attributes &#124; Properties &#124; List of all members      OONielsenPlugin Class Reference      Ooyala Nielson analytics plugin implementation.    More...  #import &quot;OONielsenPlugin.h&quot;     Inheritance diagram for OONielsenPlugin:                 Instance Methods (instancetype)&#160;- initWithPlayer:appId:appVersion:appName:sfcode:parameters: &#160;Initializes the ID3Meter metering framework.  More... &#160; (NielsenAppApi *)&#160;- getNielsenAppApi &#160;Get the underlying nielsen app api.  More... &#160; (void)&#160;- addObservers:  [implementation] &#160; (void)&#160;- dealloc  [implementation] &#160; (void)&#160;- nielsenAppApi:eventOccurred:  [implementation] &#160; (void)&#160;- nielsenAppApi:errorOccurred:  [implementation] &#160; (void)&#160;- onJson:  [implementation] &#160; (void)&#160;- onStateChanged:  [implementation] &#160; (void)&#160;- onPlayhead:  [implementation] &#160; (void)&#160;- onCurrentItemChanged:  [implementation] &#160; (void)&#160;- onAdEvent:  [implementation] &#160; (void)&#160;- onApplicationWillResignActive:  [implementation] &#160; (void)&#160;- configureMetadata  [implementation] &#160; (BOOL)&#160;- isCMS  [implementation] &#160; (void)&#160;- sendPlay  [implementation] &#160;Send start playing a content.  More... &#160; (void)&#160;- insertMetaDataFromDictionary:  [implementation] &#160; (void)&#160;- sendStop  [implementation] &#160;Send stop or pause playing a content.  More... &#160; (void)&#160;- playheadPosition:  [implementation] &#160;Current playhead position.  More... &#160; (void)&#160;- sendID3:  [implementation] &#160;Send Nielsen ID3 tag data.  More... &#160;   Class Methods (NSString *)&#160;+ dictToJson:  [implementation] &#160; (NSString *)&#160;+ removeNielsenInvalidCharacters:  [implementation] &#160; (NSString *)&#160;+ stringForAdType:  [implementation] &#160;   Protected Attributes long long&#160;_lastPlayhead &#160; BOOL&#160;_isPlaying &#160;   Properties NSDictionary *&#160;customMetadata &#160;cutomer metadata that overrides server values  More... &#160; NielsenAppApi *&#160;nielsenApi  [implementation] &#160; NSString *&#160;channelName  [implementation] &#160; NSMutableDictionary *&#160;metaData  [implementation] &#160; OOOoyalaPlayer *&#160;player  [implementation] &#160;  Detailed Description Ooyala Nielson analytics plugin implementation.  OONielsenPlugin. OONielsenPlugin.h in OoyalaNielsenSDK   Method Documentation                                     - (void) addObservers:                       (OOOoyalaPlayer *)&#160;           player                                  implementation                                               - (void) configureMetadata                                                         implementation                                               - (void) dealloc                                                         implementation                                               + (NSString *) dictToJson:                       (NSDictionary *)&#160;           dict                                  implementation                                        - (NielsenAppApi *) getNielsenAppApi                                                     Get the underlying nielsen app api.  Returnsthe nielsenAppApi instance                                  - (instancetype) initWithPlayer:                       (OOOoyalaPlayer *)&#160;           player                             appId:                      (NSString *)&#160;           appId                             appVersion:                      (NSString *)&#160;           appVersion                             appName:                      (NSString *)&#160;           appName                             sfcode:                      (NSString *)&#160;           sfcode                             parameters:                      (NSDictionary *)&#160;           otherParameters&#160;                                                                      Initializes the ID3Meter metering framework.  Parameters        [in]playerthe ooyala player the plugin associate with      [in]appIdappId provided by Nielsen      [in]appVersionthe app version      [in]appNamethe app name      [in]sfcodethe sfcode      [in]otherParameterssuch as longitude, latitude, dma or cccode         Returnsthe initialized nielsen plugin object Parameters        [in]appIdappId provided by Nielsen      [in]appVersionthe app version      [in]appNamethe app name      [in]sfcodethe sfcode      [in]otherParameterssuch as longitude, latitude, dma or cccode         Returnsreturns (id) pointer to object of a Meter object; nil if error occurred.                                         - (void) insertMetaDataFromDictionary:                       (NSDictionary *)&#160;           dict                                  implementation                                               - (BOOL) isCMS                                                         implementation                                               - (void) nielsenAppApi:                       (NielsenAppApi *)&#160;           appApi                             errorOccurred:                      (NSDictionary *)&#160;           error&#160;                                                                          implementation                                               - (void) nielsenAppApi:                       (NielsenAppApi *)&#160;           appApi                             eventOccurred:                      (NSDictionary *)&#160;           event&#160;                                                                          implementation                                               - (void) onAdEvent:                       (NSNotification *)&#160;           notifcation                                  implementation                                               - (void) onApplicationWillResignActive:                       (NSNotification *)&#160;           notification                                  implementation                                               - (void) onCurrentItemChanged:                       (NSNotification *)&#160;           notification                                  implementation                                               - (void) onJson:                       (NSNotification *)&#160;           notification                                  implementation                                               - (void) onPlayhead:                       (NSNotification *)&#160;           notification                                  implementation                                               - (void) onStateChanged:                       (NSNotification *)&#160;           notification                                  implementation                                               - (void) playheadPosition:                       (long long)&#160;           playheadPos                                  implementation         Current playhead position.  Parameters        playheadPosA long integer value represents offset in second from the beginning of the content                                                + (NSString *) removeNielsenInvalidCharacters:                       (NSString *)&#160;           json                                  implementation                                               - (void) sendID3:                       (NSString *)&#160;           data                                  implementation         Send Nielsen ID3 tag data.  Parameters        dataA string captured from ID3 PRIV info field                                                - (void) sendPlay                                                         implementation         Send start playing a content.                                         - (void) sendStop                                                         implementation         Send stop or pause playing a content.                                         + (NSString *) stringForAdType:                       (OOAdType)&#160;           type                                  implementation           Member Data Documentation                                     - (BOOL) _isPlaying                       protected                                               - (long long) _lastPlayhead                       protected           Property Documentation                                     - (NSString*) channelName                       readwritenonatomicassignimplementation                                               - (NSDictionary*) customMetadata                       readwritenonatomicretain         cutomer metadata that overrides server values                                         - (NSMutableDictionary*) metaData                       readwritenonatomicassignimplementation                                               - (NielsenAppApi*) nielsenApi                       readwritenonatomicassignimplementation                                               - (OOOoyalaPlayer*) player                       readwritenonatomicweakimplementation           The documentation for this class was generated from the following files: OONielsenPlugin.h OONielsenPlugin.m      	Send Feedback   .feedback-button, .feedback-button>a{background-color: #EEEEEE; color: #0094BD; border-radius: 4px; text-align: center; text-decoration: none; padding: 3px; margin-bottom: 14px; width: 150px; cursor: pointer;}          ";}
return "";}
