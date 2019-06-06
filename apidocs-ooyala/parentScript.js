

var hidingOn = 1; // Do NOT change this line.
var stackingMode = "stackingOn";
var headerWidth = 0;

var newBlockWidths = [];
var originalButtonWidths = [];
var originalParentWidths = [];

function adjustTabs()
{
    if (stackingMode[9] == 'f') {return;  }
    headerWidth = document.getElementsByTagName("header")[0].clientWidth;
    
    var parentArray   = document.getElementsByClassName("parent");
    var newBlockArray = document.getElementsByClassName("new-block");
    
    for (var i = 0; i < newBlockArray.length; i++)
    {
        var parentPtr = parentArray[i];
        var currBlockPtr = newBlockArray[i];
        
        //if (hidingOn == 1) //Always starts hidden!
        {
            originalButtonWidths.push(parentPtr.clientWidth);
        }
        
        var oldID = currBlockPtr.id;
        currBlockPtr.id = 'tEmPiD';
        $('#tEmPiD').show("fast");
        currBlockPtr.id = oldID;
        newBlockWidths.push(currBlockPtr.clientWidth);
    }
    
    for (var i = 0; i < parentArray.length; i++)
    {
        var parentPtr = parentArray[i];
        var currBlockPtr = newBlockArray[i];
        
        
         
           //Do not erase this block.
         currBlockPtr.style.borderBottom = '1px solid #4F4E52';
         currBlockPtr.style.borderRight  = '1px solid #4F4E52';
         currBlockPtr.style.borderLeft   = '2px solid #4F4E52';
         currBlockPtr.style.borderTop    = '2px solid #4F4E52';
         // top, right, bottom, left:
         currBlockPtr.style.margin       = '3px 0px 3px 3px';
         currBlockPtr.style.padding      = '3px 3px 3px 3px';
         
        
        currBlockPtr.style.marginTop = '0px';
        parentPtr.style.marginTop = '5px';
        
        parentPtr.style.width = (currBlockPtr.clientWidth - 11) + 'px';
        parentPtr.style.border = '2px solid #4F4E52';
        parentPtr.style.borderBottomLeftRadius = '0px';
        parentPtr.style.borderBottomRightRadius = '0px';
        parentPtr.style.marginBottom = '0px';
        
        parentPtr.style.width = (newBlockWidths[i] - 11) + 'px';
        currBlockPtr.style.width = (newBlockWidths[i]) + 'px';
        
        originalParentWidths.push(newBlockWidths[i]);
        
        {
            var pRad = 10;//parentPtr.style.borderTopLeftRadius;
            currBlockPtr.style.borderRadius = '0px 0px ' + pRad + 'px ' + pRad + 'px';
        }
        
        var idStr = parentPtr.id;
        var indexOfH = idStr.indexOf('H');
        var indexOfN = idStr.indexOf('N');
        var stackNumber = Number(idStr.substring(indexOfH + 1, indexOfN));
        
        if ((stackNumber % 2) == 0)
        {
            currBlockPtr.style.backgroundColor = "#F0F0F0";
        }
        else
        {
            currBlockPtr.style.backgroundColor = "#FFF";
        }
        
        if (hidingOn == 1)
        {
            objAction(idStr);
            
            var oldID = currBlockPtr.id;
            currBlockPtr.id = 'tEmPiD';
            $('#tEmPiD').hide("fast");
            currBlockPtr.id = oldID;
        }
    }
}

function objAction(idStr)
{
    if (stackingMode[9] == 'f') {return;  }
    var indexOfH = idStr.indexOf('H');
    var indexOfN = idStr.indexOf('N');
    var stackNumber = Number(idStr.substring(indexOfH + 1, indexOfN));
    var countNumber = Number(idStr.substring(indexOfN + 1) - 1);
    
    var parentPtr = document.getElementById(idStr);
    var currBlockPtr = document.getElementsByClassName("new-block")[countNumber];
    
    if (currBlockPtr.style.display != "none")
    {
        parentPtr.style.width = (originalButtonWidths[countNumber]) + 'px';
        {
            var pRad = 10;//parentPtr.style.borderTopLeftRadius;
            parentPtr.style.borderRadius = pRad + 'px';
            parentPtr.style.borderWidth = '0px';
            parentPtr.style.marginTop = '2px';
            parentPtr.style.marginBottom = '2px';
        }
        return;
    }
    
    currBlockPtr.style.marginTop = '0px';
        
    parentPtr.style.width = (newBlockWidths[countNumber] - 11) + 'px';
    parentPtr.style.border = '2px solid #4F4E52';
    parentPtr.style.borderBottomLeftRadius = '0px';
    parentPtr.style.borderBottomRightRadius = '0px';
    parentPtr.style.marginBottom = '0px';
        
    currBlockPtr.style.width = (newBlockWidths[countNumber]) + 'px';
        
    if ((stackNumber % 2) == 0)
    {
        currBlockPtr.style.backgroundColor = "#F0F0F0";
    }
    else
    {
        currBlockPtr.style.backgroundColor = "#FFF";
    }
}

function resizeBrowzer()
{
    //return 
    var parentArray   = document.getElementsByClassName("parent");
    var newBlockArray = document.getElementsByClassName("new-block");
    
    var headerPtr = document.getElementsByTagName("header")[0];
    var newHeaderWidth = headerPtr.clientWidth;
    var dw = newHeaderWidth - headerWidth;
    
    var prevDepth = -1;
    var widthStack = [];
    var stackCapacity = 0;
    for (var i = 0; i < parentArray.length; i++)
    {
        var parentPtr = parentArray[i];
        var currBlockPtr = newBlockArray[i];
        
        var orgParent = originalParentWidths[i];
        var marVar2 = 17;
        
        var idStr = parentPtr.id;
        var indexOfH = idStr.indexOf('H');
        var indexOfN = idStr.indexOf('N');
        var stackNumber = Number(idStr.substring(indexOfH + 1, indexOfN));
        
        var currWidth = 0;
        if (stackNumber == prevDepth)
        {
            currWidth = widthStack[prevDepth - 1] - marVar2;
            if (currWidth > orgParent) {currWidth = orgParent;}
            widthStack[stackNumber] = currWidth;
        }
        else if (stackNumber > prevDepth)
        {
            if (stackNumber == 0) {currWidth = newHeaderWidth;}
            else
            {
                currWidth = widthStack[prevDepth] - marVar2;
                if (currWidth > orgParent) {currWidth = orgParent;}
            }
            if (stackCapacity == stackNumber) {widthStack.push(currWidth);  stackCapacity++;}
            else {widthStack[stackNumber] = currWidth;}
        }
        else // if (stackNumber < prevDepth)
        {
            if (stackNumber == 0) {currWidth = newHeaderWidth;}
            else
            {
                currWidth = widthStack[stackNumber - 1] - marVar2;
                if (currWidth > orgParent) {currWidth = orgParent;}
            }
            widthStack[stackNumber] = currWidth;
        }
        
        newBlockWidths[i] = currWidth;
        prevDepth = stackNumber;
        
        if (currBlockPtr.style.display != "none") {parentPtr.style.width = (newBlockWidths[i] - 11) + 'px';}
        currBlockPtr.style.width = (newBlockWidths[i]) + 'px';
    }
    
    headerWidth = newHeaderWidth;
}

$(document).ready(function () {
  if (stackingMode[9] == 'f')
  {
    $('.new-block').show();  
  }
  adjustTabs();
  
  $('.parent').on('click',function(){$(this).next('.new-block').toggle(200);});
  $('.generalParent').on('click',function(){$(this).next('.new-block').toggle(200);});
});

