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
}

function takeCareOfExit(theId) {
    var elt = document.getElementById(theId);
    var parentsArray = [];
    var currentParent = elt;
    
    //document.getElementsByTagName("h1")[0].innerHTML = "";
    while (currentParent.tagName.toLowerCase() != "html")
    {
        
        if (currentParent.tagName)
        {
            //document.getElementsByTagName("h1")[0].innerHTML += " " + currentParent.tagName;
            if (currentParent.tagName.toLowerCase() == 'dd')
            {
                if (currentParent.previousElementSibling.tagName.toLowerCase() == 'dt')
                {
                    currentParent = currentParent.previousElementSibling;
                }
            }
            if (currentParent.tagName.toLowerCase() == 'dt')
            {
                var ddElement = currentParent.nextElementSibling;
                //document.getElementsByTagName("h1")[0].innerHTML += " " + ddElement.style.display;
                if (ddElement.style.display == "none")
                {
                    parentsArray[parentsArray.length] = currentParent;
                }
            }
        }
        currentParent = currentParent.parentElement;
    }
    
    for (var i = parentsArray.length - 1; i >= 0; i--)
    {
        //parentsArray[i].fireEvent('onclick');
        //parentsArray[i].next('.new-block').toggle(200);
        objAction(parentsArray[i].id);
        parentsArray[i].nextElementSibling.style.display = "block";
    }
    
    window.location.hash = theId;
    //document.getElementsByTagName("h1")[0].innerHTML = elt.id;
    searchExit();
}

function searchClick() {

    var searchOut = document.getElementById("searchAnswers");
    var closeBtn = document.getElementsByClassName("close")[0];
    searchOut.style.display = "block";
    closeBtn.onclick = function () {
        searchOut.style.display = "none";
    }
    
    var inputTxtUpper = document.getElementById("inputTxt").value;
    var txtResults = document.getElementById("resultsTxt");
    txtResults.innerHTML = "No results matching &quot;<b>" + inputTxtUpper + "</b>&quot;.";
    var inputTxt = inputTxtUpper.toLowerCase();
    if (inputTxt == "") {
        return false;
    }
    var possibleMatches = document.getElementsByTagName("DT");
    var possibleLen = possibleMatches.length;
    
    // For debug.
    // document.getElementsByTagName("h1")[0].innerHTML = possibleMatches[0].innerHTML;
    
    var actualMatches =[];
    var semiMatches =[];
    
    for (var i = 0; i < possibleLen; i++) {
        var score = 0;
        var possibleMatches_i = possibleMatches[i];
        var current = possibleMatches_i.id;
        
        if (current.length == 0) {
            continue;
        }
        var stringsArray = [];
        
        var ddElement = possibleMatches_i.nextElementSibling;
        if (ddElement) {
            if (ddElement.innerHTML) {
                    stringsArray = stringsArray.concat(ddElement.innerHTML.trim().split(" "));
                }
            if (ddElement.childNodes) {
                var descendantNodes = ddElement.childNodes;
                var chilLen = descendantNodes.length;
                
                for (var j = 0; j < chilLen; j++) {
                    if (descendantNodes[j].innerHTML) {
                        stringsArray = stringsArray.concat(descendantNodes[j].innerHTML.trim().split(" "));
                    }
                }
            }
        }
        
        var inputArray = inputTxt.trim().split(" ");
        var inputLen = inputArray.length;
        var stringsLen = stringsArray.length;
        
        var shouldBreak = false;
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
        
        var bestScore = scoreLim + 1;
        for (var j = 0; j < stringsLen; j++) {
            for (var k = 0; k < inputLen; k++) {
                score = stringDist(stringsArray[j].toLowerCase(), inputArray[k]);
                if (score < bestScore) {
                    bestScore = score;
                }
                if (score == 0) {
                    break;
                }
            }
            if (score == 0) {
                break;
            }
        }
        
        if (bestScore == 0) {
            actualMatches[actualMatches.length] = current;
        } else if (bestScore < scoreLim) {
            semiMatches[semiMatches.length] = current;
        }
    }
    
    //actualMatches.sort();
    //semiMatches.sort();
    var actualLen = actualMatches.length;
    var semiLen = semiMatches.length;
    if ((actualLen == 0) && (semiLen == 0)) {
        return false;
    }
    var outString = "";
    if (actualLen > 0) {
        outString = "Results matching &quot;<b>" + inputTxtUpper + "</b>&quot;&#58;<br/><ul>";
    }
    for (var j = 0; j < actualLen; j++) {
        var linkOut = document.getElementById(actualMatches[j]).innerHTML;
        // onclick=objAction(this.id)
        outString += "<li><a onclick=" + "takeCareOfExit('" + actualMatches[j] + "')" + " href=#" + actualMatches[j] + ">" + linkOut + "</a></li>";
    }
    if (actualLen > 0) {
        outString += "</ul>";
    }
    if (semiLen > 0) {
        if (actualLen > 0) {
            outString += "Or are you looking for&#58;<br/><ul>";
        } else {
            outString += "Are you looking for&#58;<br/><ul>";
        }
    }
    for (var j = 0; j < semiLen; j++) {
        var linkOut = document.getElementById(semiMatches[j]).innerHTML;
        outString += "<li><a onclick=" + "takeCareOfExit('" + semiMatches[j] + "')" + " href=#" + semiMatches[j] + ">" + linkOut + "</a></li>";
    }
    if (semiLen > 0) {
        outString += "</ul>";
    }
    txtResults.innerHTML = outString;
    return false;
}

document.getElementById("inputTxt").onkeypress =
function (ev) {
    var event = ev || window.event;
    var charCode = event.which || event.keyCode;
    
    if (charCode == "13") {
        searchClick();
        return false;
    }
}

function onloadFunction()
{
    var theLink = document.getElementById("feedbackLink");
    var linkStr = "mailto:docs@brightcove.com?Subject=Feedback%20%7C%20Welcome&body=I%20have%20a%20comment%20for%20the%20page%20%0A%0A%20";
    linkStr += encodeURIComponent(window.location);
    linkStr +="%20%0A%0A%3Cyour%20comment%20here%3E";
    theLink.href = linkStr;
}
