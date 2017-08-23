/**
 * jQuery classList extension
 * Author & copyright: Michał Gołębiowski-Owczarek <m.goleb@gmail.com>
 *
 * Source: https://github.com/mzgol/jquery.classList
 * Released under the MIT license (see the LICENSE.txt file)
 */
(function () {
    'use strict';

    var rnotwhite = /\S+/g;
    var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

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

    var getClass = function getClass(elem) {
        return (elem.getAttribute && elem.getAttribute('class')) || '';
    };

    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem;
            var i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            if (typeof value === 'string' && value) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = (value || '').match(rnotwhite) || [];

                while ((elem = this[i++])) {
                    if (elem.nodeType === 1) {
                        elem.classList.add.apply(elem.classList, classes);
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem;
            var i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr('class', '');
            }

            if (typeof value === 'string' && value) {
                classes = (value || '').match(rnotwhite) || [];

                while ((elem = this[i++])) {
                    if (elem.nodeType === 1) {
                        elem.classList.remove.apply(elem.classList, classes);
                    }
                }
            }

            return this;
        },

        toggleClass: function (value, stateVal) {
            var type = typeof value;

            if (typeof stateVal === 'boolean' && type === 'string') {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            return this.each(function () {
                var className;
                var classNames;
                var i;

                if (type === 'string') {

                    // Toggle individual class names.
                    i = 0;
                    classNames = value.match(rnotwhite) || [];

                    // Check each class given, space separated list
                    while ((className = classNames[i++])) {
                        // Support: Safari <=8 - 9 only (fixed in Technical Preview)
                        // The branching is needed as Safari casts an `undefined`
                        // `stateVal` to `false` instead of ignoring it.
                        // https://github.com/whatwg/dom/issues/64
                        // https://bugs.webkit.org/show_bug.cgi?id=148582
                        if (typeof stateVal === 'boolean') {
                            this.classList.toggle(className, stateVal);
                        } else {
                            this.classList.toggle(className);
                        }
                    }

                } else if (value === undefined || type === 'boolean') {

                    // Toggle whole class name (deprecated).
                    className = getClass(this);
                    if (className) {

                        // Store className if set
                        jQuery._data(this, '__className__', className);
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if (this.setAttribute) {
                        this.setAttribute('class',
                            className || value === false ?
                                '' :
                                jQuery._data(this, '__className__') || ''
                        );
                    }
                }
            });
        },

        hasClass: function (value) {
            var i = 0;
            var l = this.length;

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
})();
