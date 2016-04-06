# jQuery classList plugin

Re-implementation of jQuery class manipulation methods that utilizes the `classList` interface.

Compatible with jQuery 1.9+.

## Rationale

The DOM spec defines [the `classList` interface](https://dom.spec.whatwg.org/#dom-element-classlist), allowing for adding/removing/toggling classes or checking if an element contains a specified class using built-in methods as opposed to manually parsing the `className` field where classes are separated by spaces.

A couple of test suites comparing both implementations:

1. https://jsperf.com/classlist-v-old-way/18 - small (10) number of classes
2. https://jsperf.com/classlist-v-old-way/19 - large (100) number of classes

jQuery currently doesn't utilize this interface, one of the reasons being it's not supported by Internet Explorer 9 and it doesn't work on SVGs even in IE 11.

## Browser support

Note: in browsers that don't fully support the `classList` interface (e.g. all IE & Android Browser) the plugin falls back to the built-in jQuery implementation so it doesn't break them.

The following browsers can utilize full functionality of this plugin:

1. Chrome (for desktop & Android), Edge, Firefox, Opera: Current -1, Current
2. Safari 7.0+
3. iOS 7.0+

"Current -1, Current" denotes that the current stable version of the browser and the version that preceded it are supported. For example, if the current version of a browser is 24.x, we support the 24.x and 23.x versions.

In fact the code will work in many older versions, too, but they are not actively tested.

## Caveats

Supported browsers with the jQuery classList plugin pass the whole jQuery test suite with a few minor exceptions:
 
1. [A few tests](https://github.com/mgol/jquery/commit/11f440c3c8ce869bd79dd0ec716247b4380170dc) that check for extra whitespaces in the `class` attribute or the presence of the `class` attribute are failing. This is mostly because in Safari up to version 9.x and in current Firefox & Chrome (at the time of writing this section) [`classList` update steps](https://dom.spec.whatwg.org/#concept-DTL-update) are not performed correctly and there is no way to control that behavior via the `classList` interface. Relevant bug reports:
    1. Chrome: https://crbug.com/600964
    2. Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=869788
2. In Safari 7 passing the same class to `classList.add` in multiple parameters results in duplicated class names in the `class` attribute which makes another few tests fail. However, `classList.remove` removes all duplicated classes so this shouldn't be a problem unless you're parsing the `className` attribute directly by yourself. This has been fixed in Safari 8.
