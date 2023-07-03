#!/bin/sh

ASSETDIR="assets"

copyasset () {
	NAME=`basename "$1"`
	rm -f "$1"
	cp "$ASSETDIR/$NAME" "$1"
	echo Copied "$NAME"
}
copyfile () {
	NAME=`basename "$1"`
	rm -f "$1"
	cp "$NAME" "$1"
	echo Copied "$NAME"
}

# Main

copyasset "cat.png"

# Chrome Extension

copyasset "extensionchrome/cat.png"
copyasset "extensionchrome/icon16.png"
copyasset "extensionchrome/icon32.png"
copyasset "extensionchrome/icon64.png"
copyasset "extensionchrome/icon128.png"

copyasset "extensionchrome/icondisabled16.png"
copyasset "extensionchrome/icondisabled32.png"
copyasset "extensionchrome/icondisabled64.png"
copyasset "extensionchrome/icondisabled128.png"

copyfile "extensionchrome/cat.js"

# Firefox Extension

copyasset "extensionfirefox/cat.png"
copyasset "extensionfirefox/icon16.png"
copyasset "extensionfirefox/icon32.png"
copyasset "extensionfirefox/icon64.png"
copyasset "extensionfirefox/icon128.png"

copyasset "extensionfirefox/icondisabled16.png"
copyasset "extensionfirefox/icondisabled32.png"
copyasset "extensionfirefox/icondisabled64.png"
copyasset "extensionfirefox/icondisabled128.png"

copyfile "extensionfirefox/cat.js"