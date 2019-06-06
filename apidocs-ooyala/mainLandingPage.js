/* Used by landing page index.html and also land.html and landForProduction.html*/

function defaultDisplayLink(base)
{
    return "index.html";
}

function getDisplayLink(paramTag)
{
    var windowLocation = window.location.href;
    var params = window.location.search.substring(1);

    var outBase = "";
    {
        var outBaseIndex = windowLocation.indexOf("index.html");
        if (outBaseIndex >= 0)
        {
            outBase = window.location.href.substring(0, outBaseIndex);
        }
    }

    {
        var sineQuaNon = params.indexOf("linkToDisplay=");
        if (sineQuaNon == -1) {return defaultDisplayLink(outBase);}
    }

    {
        var indexOfLink = params.indexOf("?linkToDisplay=");
        while (indexOfLink >= 0)
        {
            params = params.substring(indexOfLink + 1);
            indexOfLink = params.indexOf("?linkToDisplay=");
        }
    }

    {
        var allowed = ["docs-staging", "https://docs-staging", "apidocs", "https://apidocs", "https://pulse-sdks"];
        var foundBool = 0;
        var indexStrStart = params.indexOf("=") + 1;
        for (var i = 0; i < allowed.length; i++)
        {
            var currString = allowed[i];
            var compareString = params.substring(indexStrStart, currString.length + indexStrStart);
            if (currString === compareString)
            {
                foundBool = 1;  break;
            }
        }

        if (foundBool == 0) {return defaultDisplayLink(outBase);}
    }

    var paramsArray = params.split('&');

    for (var i = 0; i < paramsArray.length; i++)
    {
        var current = paramsArray[i];
        var setPosition = current.indexOf('=');

        if (setPosition <= 0) {continue;}
        if (paramTag != current.substring(0, setPosition)) {continue;}

        var returnString = current.substring(setPosition + 1);

        if ((outBase + "index.html") === returnString) {return defaultDisplayLink(outBase);}

        return returnString;
    }

    return defaultDisplayLink(outBase);
}
