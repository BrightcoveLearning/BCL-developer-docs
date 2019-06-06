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

function showParents(theId)
{
    var elt = document.getElementById(theId);
    var parentsArray = [];
    var currentParent = elt;

    for ( ; currentParent.tagName.toLowerCase() != "html"; currentParent = currentParent.parentElement)
    {
        if (currentParent.className)
        {
            var classArray = currentParent.className.split(" ");
            var found = false;
            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "panel-collapse")
                {
                  found = true;  break;
                }
            }

            if (!found) {continue;}
            found = true;

            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "in")
                {
                  found = false;  break;
                }
            }
            if (!found) {continue;}

            var heading = currentParent.previousElementSibling;
            if (heading.className) {} else {continue;}
            if (heading.className == "panel-heading") {} else {continue;}
            var headingChildren = heading.childNodes;

            found = false;
            for (var j = 0; j < headingChildren.length; j++)
            {
                var currChild = headingChildren[j];
                if (currChild.tagName) {} else {continue;}
                if (currChild.tagName.toLowerCase() == "h4")
                {
                    headingChildren = currChild.childNodes;  found = true;  break;
                }
            }
            if (!found) {continue;}

            for (var j = 0; j < headingChildren.length; j++)
            {
                var currChild = headingChildren[j];
                if (currChild.tagName) {} else {continue;}
                if (currChild.tagName.toLowerCase() == "a") {} else {continue;}
                parentsArray[parentsArray.length] = headingChildren[j];  break;
            }
        }
    }

    for (var i = parentsArray.length - 1; i >= 0; i--)
    {
        parentsArray[i].click();
    }

    parentsArray = [];
    var finishSearching = true;
    currentParent = document.getElementById(theId);

    for ( ; currentParent.tagName.toLowerCase() != "html"; currentParent = currentParent.parentElement)
    {
        if (currentParent.className)
        {
            var classArray = currentParent.className.split(" ");
            var found = false;
            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "modal")
                {
                    for (var j = 0; j < classArray.length; j++)
                    {
                        if (i == j) {continue;}
                        if (classArray[j] == "fade")
                        {
                            found = true;  finishSearching = false;  break;
                        }
                    }
                    if (found) {break;}
                }
            }

            if (!found) {continue;}
            found = true;

            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "in")
                {
                  found = false;  break;
                }
            }
            if (!found) {continue;}
            //
            currentParent.className += " in";
            currentParent.setAttribute("aria-hidden", "false");
            currentParent.style.display = "block";
            var oldColor = currentParent.backgroundColor;
            currentParent.setAttribute("style", "background-color: rgba(0, 0, 0, 0.4); display: block;");
            document.getElementsByTagName("body")[0].className = "modal-open";

            var descendants = currentParent.getElementsByTagName("*");
            for (var i = 0; i < descendants.length; i++)
            {
                if (descendants[i].className == "close")
                {
                    descendants[i].setAttribute("aria-hidden", "false");
                    descendants[i].onclick = function ()
                    {
                        currentParent.className = "modal fade";
                        currentParent.setAttribute("aria-hidden", "true");
                        currentParent.style.display = "none";
                        currentParent.setAttribute("style", "background-color: " + oldColor + ";");
                        document.getElementsByTagName("body")[0].className = "";
                    }
                    continue;
                }
            }
            break;

        }
    }

    var currParent = document.getElementById(theId);


    for ( ; currParent.tagName.toLowerCase() != "html"; currParent = currParent.parentElement)
    {
        if (currParent.className)
        {
            var classArray = currParent.className.split(" ");
            var found = false;
            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "tab-pane")
                {
                  found = true;  break;
                }

                if (classArray[i] == "modal-body")
                {
                    finishSearching = true;  break;
                }
            }
            if (finishSearching) {break;}
            if (!found) {continue;}
            found = false;

            for (var i = 0; i < classArray.length; i++)
            {
                if (classArray[i] == "active")
                {
                  found = true;  break;
                }
            }
            if (found) {break;}

            var isRequest = false;

            if (currParent.previousElementSibling)
            {

                currParent.previousElementSibling.className = "tab-pane";
                currParent.className = "tab-pane active";
                isRequest = true;
                currParent = currParent.parentElement;
            }
            else if (currParent.nextElementSibling)
            {

                currParent.nextElementSibling.className = "tab-pane";
                currParent.className = "tab-pane active";
                currParent = currParent.parentElement;
            }
            while (currParent.className)
            {
                if (currParent.className == "nav nav-tabs") {break;}
                currParent = currParent.previousElementSibling;
            }
            if (currParent.className != "nav nav-tabs") {break;}
            var responseRequestTabs = currParent.childNodes;
            if (responseRequestTabs.length <= 1) {break;}
            for (var k = 0; k < responseRequestTabs.length; k++)
            {
                var currTab = responseRequestTabs[k];
                if (currTab.className)
                {
                    if (currTab.className == "active") {currTab.className = "";  continue;}
                }
                currTab.className = "active";
            }
            break;
        }
    }


}

function searchExit(theId)
{
    //showParents(theId);
    var searchOut = document.getElementById("searchAnswers");
    searchOut.style.display = "none";
    document.getElementById("resultsTxt").innerHTML = "";
    showParents(theId);
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

function getParentTitle(theId)
{
    var currParent = document.getElementById(theId);

    var outString = "";

    for ( ; currParent.tagName.toLowerCase() != "html"; currParent = currParent.parentElement)
    {
        if (currParent.className) {} else {continue;}

        var classArray = currParent.className.split(" ");
        var found = false;
        var inModal = false;
        for (var i = 0; i < classArray.length; i++)
        {
            if (classArray[i] == "modal-body")
            {
              found = true;  inModal = true;  break;
            }
            if (classArray[i] == "panel-collapse")
            {
              found = true;  break;
            }
        }
        if (!found) {continue;}
        currParent = currParent.previousElementSibling;
        if (currParent) {} else {break;}
        if (currParent.className) {} else {break;}

        if (inModal)
        {
            if (currParent.className == "modal-header") {} else {break;}
        }
        else if (currParent.className == "panel-heading") {} else {break;}

        var possibleMatches = currParent.getElementsByTagName("*");
        var possibleLen = possibleMatches.length;

        for (var i = 0; i < possibleLen; i++)
        {
            var curr = possibleMatches[i];
            if (curr) {} else {continue;}
            if (curr.className) {} else {continue;}
            if (curr.className == "parent") {} else {continue;}
            outString += curr.innerHTML.trim();
            outString += removeInnerHTMLFromString(curr.parentElement.innerHTML).trim();
            break;
        }

        break;
    }

    return outString;
}

function searchClick()
{
    var searchOut = document.getElementById("searchAnswers");

    searchOut.setAttribute("aria-hidden", false);
    searchOut.setAttribute("style", "background-color: rgba(0, 0, 0, 0.4); display: block;");

    var myTab = searchOut.getElementsByClassName("tab-content")[0];
    myTab.setAttribute("style", "border: solid 1px;");

    var closeBtn = document.getElementsByClassName("closeSearch")[0];
    searchOut.style.display = "block";
    closeBtn.onclick = function () {
        searchOut.setAttribute("aria-hidden", true);
        searchOut.style.display = "none";
    }

    var inputTxtUpper = document.getElementById("inputTxt").value;
    var txtResults = document.getElementById("resultsTxt");
    txtResults.innerHTML = "No results matching &quot;<b>" + inputTxtUpper + "</b>&quot;.";
    var inputTxt = inputTxtUpper.toLowerCase();
    if (inputTxt == "") {
        return false;
    }
    var possibleMatches = document.getElementsByTagName("*");

    var possibleLen = possibleMatches.length;



    var actualMatches =[];
    var semiMatches =[];

    var inputArray = inputTxt.trim().split(" ");
    var inputLen = inputArray.length;

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
        return false;
    }
    var outString = "";
    if (actualLen > 1) {
        outString = "Results matching &quot;<b>" + inputTxtUpper + "</b>&quot;&#58;<br/><ul>";
    }
    for (var j = 1; j < actualLen; j++) {
        var parentTitle = getParentTitle(actualMatches[j]);
        var linkOut = document.getElementById(actualMatches[j]);
        var theId = linkOut.id;
        if (parentTitle)
        {
            outString += "<li><b>In " + parentTitle + ": </b><br/><a onclick=" + "searchExit('" + theId + "')" + " href=#" + theId + ">" + removeHtmlTagsFromString(linkOut.innerHTML) + "</a></li>";
        }
        else
        {
            outString += "<li><a onclick=" + "searchExit('" + theId + "')" + " href=#" + theId + ">" + removeHtmlTagsFromString(linkOut.innerHTML) + "</a></li>";
        }
    }
    if (actualLen > 1) {
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
        var parentTitle = getParentTitle(semiMatches[j]);
        var linkOut = document.getElementById(semiMatches[j]);
        var theId = linkOut.id;
        if (parentTitle)
        {
            outString += "<li><b>In " + parentTitle + ": </b><br/><a onclick=" + "searchExit('" + theId + "')" + " href=#" + theId + ">" + removeHtmlTagsFromString(linkOut.innerHTML) + "</a></li>";
        }
        else
        {
            outString += "<li><a onclick=" + "searchExit('" + theId + "')" + " href=#" + theId + ">" + removeHtmlTagsFromString(linkOut.innerHTML) + "</a></li>";
        }
    }
    if (semiLen > 0) {
        outString += "</ul>";
    }
    txtResults.innerHTML = outString;
    return false;
}

function copyRAMLFunction() {
    var copyNotice = document.getElementById("copyrightRAML");
    var date = new Date();
    var currentYear = date.getFullYear();
    copyNotice.setAttribute('style', 'font-size: 16px; cursor: pointer; text-align:center; padding-bottom:8px;');
    var footerString = "<a href=\"https://brightcove.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Brightcove, Inc. &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/legal/privacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/terms-and-conditions\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved ";
    footerString += "<a href=\"https://help-ooyala.brightcove.com/video-platform/concepts/about.html\" target=\"_blank\">";
    footerString += "&bull; Ooyala Support - Developer Documentation</a>";
    copyNotice.innerHTML = footerString;

}

function styleNavTabs()
{
    var navTabs = document.getElementsByClassName("nav nav-tabs");
    for (var i = 0; i < navTabs.length; i++)
    {
        var current = navTabs[i];
        current.style.backgroundColor = "#4F4E52";
        current.style.borderColor     = "#4F4E52";
        current.style.borderStyle     = "solid";
        current.style.borderWidth     = "2px 2px 1px 2px";
    }
}

function styleSearchBar()
{
    var inputBar     = document.getElementById("inputTxt");
    var searchBtn    = document.getElementById("searchButton");
    var pillBox      = document.getElementsByClassName("nav")[0];
    var searchArea   = document.getElementById("searchBarLi");
    var blankLogoPtr = document.getElementsByClassName("blankLogo")[0];

    searchArea.style.backgroundColor = "#000";
    searchArea.style.borderRadius = "4px";
    searchArea.style.marginBottom = "1px";

    inputBar.style.marginTop    = "7px";
    inputBar.style.marginBottom = "3px";
    inputBar.style.height       = "20px";

    inputBar.style.borderColor  = "#000";
    inputBar.style.borderStyle  = "solid";
    inputBar.style.borderRadius = "4px";
    inputBar.style.paddingLeft  = "4px";

    searchBtn.style.marginTop = "4px";
    searchBtn.style.backgroundColor = "#000";
    searchBtn.style.color = "#FFF";
    searchBtn.style.fontWeight = "bold";
    searchBtn.style.borderColor = "#000";
    searchBtn.style.borderStyle = "solid";

    var dx = -10;  var dy = -3;  var dWidth = 20;

    inputBar.style.width  = (parseInt(searchArea.style.width) - parseInt(searchBtn.style.width) - 4) + 'px';
    inputBar.style.height = "27px";

    inputBar.style.marginLeft = "4px";

    inputBar .style.marginTop    = (parseInt(inputBar .style.marginTop)    + dy) + 'px';
    searchBtn.style.marginTop    = (parseInt(searchBtn.style.marginTop)    + dy) + 'px';
    inputBar .style.marginBottom = (parseInt(inputBar .style.marginBottom) - dy) + 'px';
    searchBtn.style.marginBottom = (parseInt(searchBtn.style.marginBottom) - dy) + 'px';

    blankLogoPtr.style.display = 'none';


}

var ramlResizeBoolHigh = true;
function ramlResize()
{

    var searchBarLi  = document.getElementById("searchBarLi");
    var sidebar      = document.getElementById("sidebar");
    var blankLogoPtr = document.getElementsByClassName("blankLogo")[0];

    if (sidebar.getBoundingClientRect().top > 1500)
    {
        if (ramlResizeBoolHigh)
        {
            var pageHeader   = document.getElementsByClassName("page-header")[0];
            pageHeader.insertBefore(searchBarLi, pageHeader.getElementsByTagName("H1")[0]);

            var inputBar  = document.getElementById("inputTxt");
            var searchBtn = document.getElementById("searchButton");

            searchBarLi.style.backgroundColor = "#4F4E52";
            searchBtn.style.backgroundColor   = "#4F4E52";
            searchBtn.style.borderColor       = "#4F4E52";
            inputBar.style.borderColor        = "#4F4E52";

            searchBarLi.style.position    = "absolute";
            searchBarLi.style.marginRight = "15px";

            if (window.frameElement)
            {
                blankLogoPtr.style.display = 'block';
            }

            ramlResizeBoolHigh = false;
        }

        searchBarLi.style.top         = "-5px";
        searchBarLi.style.right       = "0px";
    }
    else
    {
        if (!ramlResizeBoolHigh)
        {
            var theParent   = document.getElementsByClassName("nav nav-pills nav-stacked")[0];
            theParent.insertBefore(searchBarLi, theParent.firstChild);

            var inputBar  = document.getElementById("inputTxt");
            var searchBtn = document.getElementById("searchButton");

            searchBarLi.style.backgroundColor = "#000";
            searchBtn.style.backgroundColor   = "#000";
            searchBtn.style.borderColor       = "#000";
            inputBar.style.borderColor        = "#000";

            searchBarLi.style.position    = "relative";
            searchBarLi.style.marginRight = "0px";

            searchBarLi.style.top         = "0px";
            searchBarLi.style.right       = "0px";

            blankLogoPtr.style.display = 'none';

            ramlResizeBoolHigh = true;
        }
    }
}

function hideTheLogo()
{
    if (!(window.frameElement)) {return;}

    var logoPtr = document.getElementsByClassName("ourLogo")[0];
    logoPtr.style.display = 'none';
}

function removeExcessTabs()
{
    var excessLinks = document.getElementsByClassName("removeParentLi");

    for (var i = excessLinks.length - 1; i >= 0; i--)
    {
        var current = excessLinks[i].parentNode;
        current.parentNode.removeChild(current);
    }


}

function onloadFunction()
{
    hideTheLogo();
    removeExcessTabs();

    var theLink = document.getElementById("feedbackLink");
    var linkStr = "mailto:docs@brightcove.com?Subject=Feedback%20%7C%20Welcome&body=I%20have%20a%20comment%20for%20the%20page%20%0A%0A%20";
    linkStr += encodeURIComponent(window.location);
    linkStr += "%20%0A%0A%3Cyour%20comment%20here%3E";
    theLink.href = linkStr;
    copyRAMLFunction();

    document.getElementById("inputTxt").onkeypress =
    function (ev) {
        var event = ev || window.event;
        var charCode = event.which || event.keyCode;

        if (charCode == "13") {
            searchClick();
            return false;
        }
    }
    styleNavTabs();
    styleSearchBar();
    ramlResize();
}
