#!/bin/sh

ASSETDIR="assets"

linkasset () {
	NAME=`basename "$1"`
	rm -f "$1"
	ln -sr "$ASSETDIR/$NAME" "$1"
	echo Linked "$NAME"
}
linkfile () {
	NAME=`basename "$1"`
	rm -f "$1"
	ln -sr "$NAME" "$1"
	echo Linked "$NAME"
}
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

linkasset "cat.png"

# Chrome Extension

linkasset "extensionchrome/cat.png"
linkasset "extensionchrome/icon16.png"
linkasset "extensionchrome/icon32.png"
linkasset "extensionchrome/icon64.png"
linkasset "extensionchrome/icon128.png"

linkasset "extensionchrome/icondisabled16.png"
linkasset "extensionchrome/icondisabled32.png"
linkasset "extensionchrome/icondisabled64.png"
linkasset "extensionchrome/icondisabled128.png"

linkfile "extensionchrome/cat.js"

# Firefox Extension

copyasset "extensionfirefox/cat.png"
linkasset "extensionfirefox/icon16.png"
linkasset "extensionfirefox/icon32.png"
linkasset "extensionfirefox/icon64.png"
linkasset "extensionfirefox/icon128.png"

linkasset "extensionfirefox/icondisabled16.png"
linkasset "extensionfirefox/icondisabled32.png"
linkasset "extensionfirefox/icondisabled64.png"
linkasset "extensionfirefox/icondisabled128.png"

copyfile "extensionfirefox/cat.js"