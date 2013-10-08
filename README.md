jQuery classList plugin
==================================================

Re-implementation of jQuery class manipulation methods that utilizes the classList interface.

Compatible with jQuery 1.9+ and 2.0+.

Rationale
--------------------------------------

HTML5 defines the `classList` interface, allowing for adding/removing/toggling classes or checking if an element
contains a specified class using built-in methods as opposed to manually parsing the `className` field where
classes are separated by spaces.

A couple of test suites comparing both implementations:

1. http://jsperf.com/classlist-v-old-way/8 - large number of classes
2. http://jsperf.com/classlist-v-old-way/10 - small number of classes

jQuery currently doesn't utilize this interface by default, one of the reasons being it's not supported
by Internet Explorer 9. If your site/web app needs to support this browser you need to include this plugin
via conditional comments to not break it:

```html
<script src="jquery.js"></script>
<!--[if IE]>
    <script src="jquery.class_list.js"></script>
<![endif]-->
```

Browser support
--------------------------------------

1. Google Chrome, Firefox: current - 1, current
2. Opera: 12.1x, current - 1, current
4. Safari 5.1+
2. Internet Explorer 10+

"current - 1, current" denotes that the current stable version of the browser and the version that preceded it
are supported. For example, if the current version of a browser is 24.x, we support the 24.x and 23.x versions.

In fact the code will work in many older versions, too, but they were not tested.
