jQuery classList extension
==================================================

Re-implementation of jQuery class manipulation methods that utilizes the classList interface.

Rationale
--------------------------------------

HTML5 defines the `classList` interface, allowing for adding/removing/toggling classes or checking if an element
contains a specified class using built-in methods as opposed to manually parsing the `className` field where
classes are separated by spaces.

This native interface is much faster that the previous way, two test cases that confirm it are:

1. http://jsperf.com/classlist-v-old-way/5
2. http://jsperf.com/classlist-v-old-way/7

Unfortunately, jQuery currently doesn't utilize this interface by default, one of the reasons being it's
not supported by Internet Explorer 9. However, if your site/web app doesn't need to support this browser
or if you accept having to polyfill the interface (with the cost of having to download an additional JS file
for IE9, probably with conditional comments) it might be a good choice to use this extension performance-wise.

Browser support
--------------------------------------

1. Chrome, Firefox, Opera, Safari: current version - 1
2. Internet Explorer 10+

Internet Explorer 9 doesn't implement the `classList` interface. If you use a polyfill for that feature,
this jQuery extension gets compatible with IE9. An example polyfill is in available under this link:
https://github.com/eligrey/classList.js
