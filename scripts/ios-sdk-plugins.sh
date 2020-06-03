#!/bin/bash
# This script copies the latest iOS SDK and Plugin files from GitHub and replaces what resides on BCL-developer-docs
echo " "
echo "This is a script to clone the latest iOS SDK and plugin GitHub Repositories."
echo "Then, the html repo contents are copied into BCL-developer-docs."
echo " "
# To run this script, open Terminal app for the scripts directory.
# bash ios-sdk-plugins.sh

# #**** iOS SDK
# # If the input iOS SDK directory exists, then delete it
# if [ -d "data/brightcove-player-sdk-ios" ]; then
#     echo "input iOS SDK Directory found and removed"
#     rm -rf "data/brightcove-player-sdk-ios"
# fi
#
# # If the input iOS SDK directory doesn't exist, then clone a copy of it
# if [ ! -d "data/brightcove-player-sdk-ios" ]; then
#   echo "iOS SDK directory NOT found, cloning Repo"
#     git clone https://github.com/brightcove/brightcove-player-sdk-ios.git
# fi
#
# # If the output iOS SDK directory exists, delete it
# sdkpath=$mypath"ios-sdk"
# echo "output dir = " $sdkpath
# if [ -d $sdkpath ]; then
#     echo "deleting iOS SDK in BCL-developer-docs"
#     rm -rf $sdkpath
# fi
#
# # Copy iOS SDK html folder to BCL-developer-docs
# cp -a brightcove-player-sdk-ios/html/. $sdkpath
#
#
# #**** FreeWheel plugin
# # If the input FreeWheel plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-fw" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-fw"
#     echo "FreeWheel plugin repo deleted"
# fi
#
# # # Clone the FreeWheel plugin repo
# cd ios-repos
# git clone https://github.com/brightcove/brightcove-player-sdk-ios-fw.git
# echo "FreeWheel plugin repo cloned"
# cd ..
#
# # If the output FreeWheel plugin doc exists, delete it
# fwpath="ios-docs/freewheel"
# if [ -d $fwpath ]; then
#     echo "Deleting FreeWheel docs folder: " $PWD/$fwpath
#     rm -rf $fwpath
# fi
#
# # Copy FreeWheel html folder to doc
# cp -a ios-repos/brightcove-player-sdk-ios-fw/html/. $fwpath
# echo "FreeWheel html folder copied into docs folder: " $PWD/$fwpath


# #**** Googlecast plugin
# # If the input Googlecast plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-googlecast" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-googlecast"
#     echo "Googlecast plugin repo deleted"
# fi
#
# # Clone the Googlecast plugin
# cd ios-repos
# git clone https://github.com/brightcove/brightcove-player-sdk-ios-googlecast.git
# echo "Googlecast plugin repo cloned"
# cd ..
#
# # If the output Googlecast plugin doc exists, delete it
# gcpath="ios-docs/googlecast"
# if [ -d $gcpath ]; then
#     echo "Deleting Googlecast docs folder" $PWD/$gcpath
#     rm -rf $gcpath
# fi
#
# # Copy Googlecast html folder to doc
# cp -a ios-repos/brightcove-player-sdk-ios-googlecast/html/. $gcpath
# echo "Googlecast html folder copied into docs folder: " $PWD/$gcpath


# #**** IMA plugin
# # If the input IMA plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-ima" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-ima"
#     echo "IMA plugin repo deleted"
# fi
#
# # Clone the IMA plugin
# cd ios-repos
# git clone https://github.com/brightcove/brightcove-player-sdk-ios-ima.git
# echo "IMA plugin repo cloned"
# cd ..
#
# # If the output IMA plugin doc exists, delete it
# imapath="ios-docs/ima"
# if [ -d $imapath ]; then
#     echo "Deleting IMA plugin docs folder" $PWD/$imapath
#     rm -rf $imapath
# fi
#
# # Copy IMA html folder to doc
# cp -a ios-repos/brightcove-player-sdk-ios-ima/html/. $imapath
# echo "IMA html folder copied into docs folder: " $PWD/$imapath


# #**** Omniture plugin
# # If the input Omniture plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-omniture" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-omniture"
#     echo "Omniture plugin repo deleted"
# fi
#
# # Clone the Omniture plugin
# cd ios-repos
# git clone https://github.com/brightcove/brightcove-player-sdk-ios-omniture.git
# cd ..
#
# # If the output Omniture plugin doc exists, delete it
# ompath="ios-docs/omniture"
# if [ -d $ompath ]; then
#     echo "Deleting Omniture plugin in docs folder" $PWD/$ompath
#     rm -rf $ompath
# fi
#
# # Copy Omniture html folder to doc
# cp -a ios-repos/brightcove-player-sdk-ios-omniture/html/. $ompath
# echo "Omniture html folder copied into docs folder: " $PWD/$ompath


# #**** Pulse plugin
# # If the input Pulse plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-pulse" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-pulse"
#     echo "Pulse plugin repo deleted"
# fi
#
# # Clone the Pulse plugin
# cd ios-repos
# git clone https://github.com/brightcove/brightcove-player-sdk-ios-pulse.git
# cd ..
#
# # If the output Pulse plugin doc exists, delete it
# pulsepath="ios-docs/pulse"
# if [ -d $pulsepath ]; then
#     echo "Deleting Pulse plugin in docs folder"
#     rm -rf $pulsepath
# fi
#
# # Copy Pulse html folder to doc
# cp -a ios-repos/brightcove-player-sdk-ios-pulse/html/. $pulsepath
# echo "Pulse html folder copied into docs folder: " $PWD/$pulsepath
#
#
# #**** SSAI plugin
# # If the input SSAI plugin repo exists, then delete it
# echo " "
# if [ -d "ios-repos/brightcove-player-sdk-ios-ssai" ]; then
#     rm -rf "ios-repos/brightcove-player-sdk-ios-ssai"
#     echo "SSAI plugin repo deleted"
# fi

# Clone the SSAI plugin
cd ios-repos
git clone https://github.com/brightcove/brightcove-player-sdk-ios-ssai.git
cd ..

# If the output SSAI plugin doc exists, delete it
ssaipath="ios-docs/ssai"
if [ -d $ssaipath ]; then
    echo "Deleting SSAI plugin in docs folder"
    rm -rf $ssaipath
fi

# Copy SSAI html folder to BCL-developer-docs
cp -a ios-repos/brightcove-player-sdk-ios-ssai/html/. $ssaipath
echo "SSAI html folder copied into docs folder: " $PWD/$ssaipath

echo " "
echo "Congratulations! The iOS SDK and plugin document files have been successfully copied from GitHub."
echo "If this is a test, discard all changes in GitHub Desktop. Otherwise, commit changes."
