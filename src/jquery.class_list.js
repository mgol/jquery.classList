/**
 * jQuery classList extension
 * Author & copyright: Michał Gołębiowski <m.goleb@gmail.com>
 *
 * Source: https://github.com/mzgol/jquery.classList
 * Released under the MIT license (see the LICENSE.txt file)
 */
(function ($) {
    'use strict';

    var rnotwhite = /\S+/g,
        svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    if (!svgNode.classList) {
        // Don't break non-classList-compatible browsers. Some browsers support classList
        // on regular elements but not on SVGs so this check is safer.
        return;
    }

    svgNode.classList.add('a', 'b');
    svgNode.classList.toggle('c', false);

    if (!svgNode.classList.contains('a') || !svgNode.classList.contains('b') ||
        svgNode.classList.contains('c')) {
        // No support for multiple arguments to classList.add and/or the toggle flag;
        // don't use this plugin.
        return;
    }

    $.fn.extend({
        addClass: function (value) {
            var classes, elem,
                i = 0,
                len = this.length,
                proceed = typeof value === 'string' && value;

            if ($.isFunction(value)) {
                return this.each(function (j) {
                    $(this).addClass(value.call(this, j, this.className));
                });
            }

            if (proceed) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = (value || '').match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];

                    if (elem.nodeType === 1) {
                        elem.classList.add.apply(elem.classList, classes);
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === 'string' && value;

            if ($.isFunction(value)) {
                return this.each(function (j) {
                    $(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || '').match(rnotwhite) || [];

                for (; i < len; i++) {
                    elem = this[i];

                    if (elem.nodeType === 1 && elem.className) {
                        if (!value) {
                            elem.className = '';
                        }
                        elem.classList.remove.apply(elem.classList, classes);
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === 'boolean';

            if ($.isFunction(value)) {
                return this.each(function (i) {
                    $(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }

            return this.each(function () {
                if (this.nodeType === 1) {
                    if (type === 'string') {
                        // Toggle individual class names
                        var clazz,
                            i = 0,
                            classes = value.match(rnotwhite) || [];

                        // Check each class given, space separated list
                        while ((clazz = classes[i++])) {
                            // Support: Chrome 44+, Safari 8+, Edge 10240+
                            // The branching is needed as most browsers cast an `undefined`
                            // `stateVal` to `false` instead of ignoring it.
                            // https://github.com/whatwg/dom/issues/64
                            // https://code.google.com/p/chromium/issues/detail?id=489665
                            // https://bugs.webkit.org/show_bug.cgi?id=148582
                            // https://connect.microsoft.com/IE/feedbackdetail/view/1725606/
                            if (isBool) {
                                this.classList.toggle(clazz, stateVal);
                            } else {
                                this.classList.toggle(clazz);
                            }
                        }

                    } else if (type === 'undefined' || type === 'boolean') {
                        // Toggle whole class name

                        // Support: Chrome 44+
                        // className can be set to a string consisting only of whitespaces;
                        // we don't want to store such a value; especially that only Chrome
                        // collapses `className` set to a whitespace-only string.
                        // https://code.google.com/p/chromium/issues/detail?id=526289
                        if (this.className.trim()) {
                            // store className if set
                            $._data(this, '__className__', this.className);
                        }

                        // If the element has a class name or if we're passed 'false',
                        // then remove the whole className (if there was one, the above saved it).
                        // Otherwise bring back whatever was previously saved (if anything),
                        // falling back to the empty string if nothing was stored.
                        this.className = this.className ||
                            value === false ? '' : $._data(this, '__className__') || '';
                    }
                }
            });
        },

        hasClass: function (value) {
            var i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1) {
                    if (this[i].classList.contains(value)) {
                        return true;
                    }
                }
            }

            return false;
        },
    });
})(jQuery);
