#!/bin/bash
# This script copies the latest iOS SDK and Plugin files from GitHub and replaces what resides on BCL-developer-docs
echo "Copy iOS SDK and Plugin GitHub Repositories"

# Enter the path to your local GitHub repo for BCL-developer-docs
mypath=~/Downloads/
echo $mypath

#**** iOS SDK
# If the input iOS SDK directory exists, then delete it
if [ -d "brightcove-player-sdk-ios" ]; then
    echo "input iOS SDK Directory found and removed"
    rm -rf "brightcove-player-sdk-ios"
fi

# If the input iOS SDK directory doesn't exist, then clone a copy of it
if [ ! -d "brightcove-player-sdk-ios" ]; then
  echo "iOS SDK directory NOT found, cloning Repo"
    git clone https://github.com/brightcove/brightcove-player-sdk-ios.git
fi

# If the output iOS SDK directory exists, delete it
sdkpath=$mypath"ios-sdk"
echo "output dir = " $sdkpath
if [ -d $sdkpath ]; then
    echo "deleting iOS SDK in BCL-developer-docs"
    rm -rf $sdkpath
fi

# Copy iOS SDK html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios/html/. $sdkpath


#**** FreeWheel plugin
# If the input FreeWheel plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-fw" ]; then
    echo "FreeWheel Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-fw"
fi

# Clone the FreeWheel plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-fw.git

# If the output FreeWheel plugin directory exists, delete it
fwpath=$mypath"ios-plugins/freewheel"
echo "output dir = " $fwpath
if [ -d $fwpath ]; then
    echo "deleting FreeWheel plugin in BCL-developer-docs"
    rm -rf $fwpath
fi

# Copy FreeWheel html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-fw/html/. $fwpath


#**** Googlecast plugin
# If the input Googlecast plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-googlecast" ]; then
    echo "Googlecast Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-googlecast"
fi

# Clone the Googlecast plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-googlecast.git

# If the output Googlecast plugin directory exists, delete it
gcpath=$mypath"ios-plugins/googlecast"
echo "output dir = " $gcpath
if [ -d $gcpath ]; then
    echo "deleting Googlecast plugin in BCL-developer-docs"
    rm -rf $gcpath
fi

# Copy Googlecast html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-googlecast/html/. $gcpath


#**** IMA plugin
# If the input IMA plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-ima" ]; then
    echo "IMA Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-ima"
fi

# Clone the IMA plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-ima.git

# If the output IMA plugin directory exists, delete it
imapath=$mypath"ios-plugins/ima"
echo "output dir = " $imapath
if [ -d $imapath ]; then
    echo "deleting IMA plugin in BCL-developer-docs"
    rm -rf $imapath
fi

# Copy IMA html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-ima/html/. $imapath


#**** Omniture plugin
# If the input Omniture plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-omniture" ]; then
    echo "Omniture Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-omniture"
fi

# Clone the Omniture plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-omniture.git

# If the output Omniture plugin directory exists, delete it
ompath=$mypath"ios-plugins/omniture"
echo "output dir = " $ompath
if [ -d $ompath ]; then
    echo "deleting Omniture plugin in BCL-developer-docs"
    rm -rf $ompath
fi

# Copy Omniture html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-omniture/html/. $ompath


#**** Pulse plugin
# If the input Pulse plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-pulse" ]; then
    echo "Pulse Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-pulse"
fi

# Clone the Pulse plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-pulse.git

# If the output Pulse plugin directory exists, delete it
pulsepath=$mypath"ios-plugins/pulse"
echo "output dir = " $pulsepath
if [ -d $pulsepath ]; then
    echo "deleting Pulse plugin in BCL-developer-docs"
    rm -rf $pulsepath
fi

# Copy Pulse html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-pulse/html/. $pulsepath

#**** SSAI plugin
# If the input SSAI plugin directory exists, then delete it
if [ -d "brightcove-player-sdk-ios-ssai" ]; then
    echo "SSAI Plugin Directory found and removed"
    rm -rf "brightcove-player-sdk-ios-ssai"
fi

# Clone the SSAI plugin
git clone https://github.com/brightcove/brightcove-player-sdk-ios-ssai.git

# If the output SSAI plugin directory exists, delete it
ssaipath=$mypath"ios-plugins/ssai"
echo "output dir = " $ssaipath
if [ -d $ssaipath ]; then
    echo "deleting SSAI plugin in BCL-developer-docs"
    rm -rf $ssaipath
fi

# Copy SSAI html folder to BCL-developer-docs
cp -a brightcove-player-sdk-ios-ssai/html/. $ssaipath
