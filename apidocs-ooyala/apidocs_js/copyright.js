function copyFunction()
{
    var copyNotice = document.getElementById("copyrightNotice");
    var date = new Date();
    var currentYear = date.getFullYear();
    var footerString = "<a href=\"https://brightcove.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Ooyala, Inc. &bull;</a>";
    footerString += "<a href=\"https://www.brightcove.com/en/legal/privacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"http://ooyala.com/websitetos\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved";
    copyNotice.innerHTML=footerString;
}

copyFunction();