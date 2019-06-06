function copyFunction()
{
    var copyNotice = document.getElementById("copyrightNotice");
    var date = new Date();
    var currentYear = date.getFullYear();
    copyNotice.setAttribute('style','font-size: 14px; cursor: pointer; text-align:center;');
    var footerString = "<a href=\"https://brightcove.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Brightcove, Inc. &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/legal/privacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/terms-and-conditions\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved ";
    footerString += "<a href=\"https://help-ooyala.brightcove.com/video-platform/concepts/about.html\" target=\"_blank\">";
    footerString += "&bull; Ooyala Support - Developer Documentation</a>";
    copyNotice.innerHTML=footerString;
    copyNotice.style.display = 'block';
    copyNotice.style.background='#40474F';
    copyNotice.style.color='#FFF';
    copyNotice.style.height='28px';
    copyNotice.style.padding='2px';
    copyNotice.style.margin='auto';
}