# meow
## An HTML cat cursor

This a little webtoy based on [Webneko](https://webneko.net/).

You can find the excessively overdesigned website [here](https://sollybunny.xyz/meow/)!

## Browser Extensions

This webtoy is available as a browser extention which will add the kitty to every page you visit.

*NOTE: Some pages which overuse elements like `iframe`s confuse the kitty*

### Chrome
You can download the `.crx` file and install it
1. Download `meow.crx`
2. Go to [`chrome://extensions/`](chrome://extensions/)
3. Drag `meow.crx` in from the file explorer of your choice

### Firefox
I cant get the `.xpi` format to work. Instead, use the unpacked loader. 
1. Download the folder `extensionfirefox`
2. Go to [`about:debugging#/runtime/this-firefox`](about:debugging#/runtime/this-firefox)
3. Press "Load Temporary Add-on"
4. Navigate to the downloaded folder
5. Press "Select folder"

## Script

This webtoy can also be added to any website using a single script

*NOTE: This is compatible with the browser extension*

1. Download [`cat.js`](https://github.com/SollyBunny/meow/blob/main/cat.js)
2. Include using a script tag
	```html
	<script src="cat.js"></script>
	```
3. Optionally, add a `<meowbed>` element to specify where the cat will spawn (multiple can be placed for the cat to spawn in a random one)
	```html
	<meowbed></meowbed>
	```
4. Enjoy having a cat on your site!

