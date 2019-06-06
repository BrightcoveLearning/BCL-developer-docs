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
    var possibleMatches =[];
    var possibleLen = 0; {
        var possMatches = document.getElementsByClassName("name");
        possibleLen = possMatches.length;
        for (var i = 0; i < possibleLen; i++) {
            possibleMatches[i] = possMatches[i];
        }
        possMatches = document.getElementsByClassName("readme-section-intro");
        for (var i = 0; i < possMatches.length; i++) {
            possibleMatches[possibleLen + i] = possMatches[i];
        }
        possibleLen = possibleMatches.length;
    }
    
    var actualMatches =[];
    var semiMatches =[];
    
    for (var i = 0; i < possibleLen; i++) {
        var score = 0;
        var possibleMatches_i = possibleMatches[i];
        var current = possibleMatches_i.id;
        if (current.length == 0) {
            continue;
        }
        var stringsArray = current.toLowerCase().split(" ");
        
        var dtParent = possibleMatches_i.parentNode;
        if (possibleMatches_i.tagName == "DT") {
            dtParent = possibleMatches_i;
        }
        
        var ddElement = dtParent.nextElementSibling;
        if (ddElement) {
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
    
    actualMatches.sort();
    semiMatches.sort();
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
        var linkOut = actualMatches[j];
        if (linkOut == "readmeSectionIntro") {
            if (document.getElementsByClassName("brand").length > 0) {
                linkOut = document.getElementsByClassName("brand")[0].innerHTML;
            }
        }
        outString += "<li><a onclick=" + "searchExit()" + " href=#" + actualMatches[j] + ">" + linkOut + "</a></li>";
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
        var linkOut = semiMatches[j];
        if (linkOut == "readmeSectionIntro") {
            if (document.getElementsByClassName("brand").length > 0) {
                linkOut = document.getElementsByClassName("brand")[0].innerHTML;
            }
        }
        outString += "<li><a onclick=" + "searchExit()" + " href=#" + semiMatches[j] + ">" + linkOut + "</a></li>";
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
    /*  Enter is 13.  */
    if (charCode == "13") {
        searchClick();
        return false;
    }
}

function onloadFunction()
{
    var theLink = document.getElementById("feedbackLink");
    var linkStr = "mailto:doc-feedback@ooyala.com?Subject=Feedback%20%7C%20Welcome&body=I%20have%20a%20comment%20for%20the%20page%20%0A%0A%20";
    linkStr += encodeURIComponent(window.location);
    linkStr +="%20%0A%0A%3Cyour%20comment%20here%3E";
    theLink.href = linkStr;
}