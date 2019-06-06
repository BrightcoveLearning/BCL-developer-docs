function copyJSONFunction()
{
    var copyNotice = document.getElementById("copyrightJSON");
    copyNotice.setAttribute('style','font-size: 16px; text-align:center;');
    var date = new Date();
    var currentYear = date.getFullYear();
    var footerString = "<a href=\"https://brightcove.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Brightcove, Inc. &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/legal/privacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/terms-and-conditions\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved ";
    footerString += "<a href=\"https://help-ooyala.brightcove.com/video-platform/concepts/about.html\" target=\"_blank\">";
    footerString += "&bull; Ooyala Support - Developer Documentation</a>";
    copyNotice.innerHTML=footerString;
}
