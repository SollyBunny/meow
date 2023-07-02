PHONY: build_chrome build_firefox

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