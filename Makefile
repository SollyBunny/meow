all: build zip

build: build_chrome build_firefox
zip: zip_chrome zip_firefox

build_chrome:
	-mv meow.crx bak.meow.crx
ifneq ("$(wildcard meow.pem)","")
	`which chrome` --pack-extension=extensionchrome --pack-extension-key=meow.pem
	mv extensionchrome.crx meow.crx
else
	`which chrome` --pack-extension=extensionchrome
	-mv extensionchrome.crx meow.crx
	-mv extensionchrome.pem meow.pem
endif

build_firefox:
	-mv meow.xpi bak.meow.xpi
	cd extensionfirefox; zip -r -FS -D -9 meow.xpi *; mv meow.xpi ..

zip_chrome:
	-mv meowchrome.zip bak.meowchrome.zip
	cd extensionchrome; zip -r -FS -D -9 meowchrome.zip *; mv meowchrome.zip ..

zip_firefox:
	-mv meowfirefox.zip bak.meowfirefox.zip
	cd extensionfirefox; zip -r -FS -D -9 meowfirefox.zip *; mv meowfirefox.zip ..