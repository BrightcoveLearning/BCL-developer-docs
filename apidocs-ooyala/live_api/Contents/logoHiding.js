
var logoHid = 0;

function hideTheLogo()
{
    if (logoHid == 1) {return;}  logoHid = 1;
    
    if (!(window.frameElement))
    {
        var ind = window.location.indexOf("linkToDisplay");
        if (ind != -1) {return;}
    }
    var logoPtr = document.getElementsByClassName("ourLogo")[0];
    logoPtr.style.display='none';
}

hideTheLogo();
