/**
 * jQuery classList extension
 * Author & copyright: Michał Gołębiowski <m.goleb@gmail.com>
 *
 * Source: https://github.com/mzgol/jquery.classList
 * Released under the MIT license (see the LICENSE.txt file)
 */
(function ($) {
    'use strict';

    var supportsMultipleArgs,
        notWhitespaceRegExp = /\S+/g,
        div = $('<div>')[0];

    if (!div.classList) {
        // Don't break non-classList-compatible browsers.
        return;
    }

    div.classList.add('a', 'b');
    supportsMultipleArgs = /(^| )a( |$)/.test(div.className) && /(^| )b( |$)/.test(div.className);

    $.fn.extend({
        addClass: function (value) {
            var classes, elem, clazz, j,
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
                classes = (value || '').match(notWhitespaceRegExp) || [];

                for (; i < len; i++) {
                    elem = this[i];

                    if (elem.nodeType === 1) {
                        if (supportsMultipleArgs) {
                            elem.classList.add.apply(elem.classList, classes);
                        } else {
                            j = 0;
                            while (clazz = classes[j++]) {
                                elem.classList.add(clazz);
                            }
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function (value) {
            var classes, elem, clazz, j,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === 'string' && value;

            if ($.isFunction(value)) {
                return this.each(function (j) {
                    $(this).removeClass(value.call(this, j, this.className));
                });
            }
            if (proceed) {
                classes = (value || '').match(notWhitespaceRegExp) || [];

                for (; i < len; i++) {
                    elem = this[i];

                    if (elem.nodeType === 1 && elem.className) {
                        if (!value) {
                            elem.className = '';
                        }
                        if (supportsMultipleArgs) {
                            elem.classList.remove.apply(elem.classList, classes);
                        } else {
                            j = 0;
                            while (clazz = classes[j++]) {
                                elem.classList.remove(clazz);
                            }
                        }
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
                        var className,
                            i = 0,
                            classNames = value.match(notWhitespaceRegExp) || [];

                        // Check each className given, space separated list
                        while (className = classNames[i++]) {
                            if (isBool) {
                                // IE10+ doesn't support the toggle boolean flag.
                                if (stateVal) {
                                    this.classList.add(className);
                                } else {
                                    this.classList.remove(className);
                                }
                            } else {
                                this.classList.toggle(className);
                            }
                        }

                    } else if (type === 'undefined' || type === 'boolean') { // toggle whole class name
                        if (this.className) {
                            // store className if set
                            $._data(this, '__className__', this.className);
                        }

                        // If the element has a class name or if we're passed 'false',
                        // then remove the whole classname (if there was one, the above saved it).
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
