(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the SayHi API and when
    // executed as a simple <script>, it creates a SayHi global instead.

    var chalk        = require('chalk'),
        pad          = require('pad-component'),
        wrap         = require('word-wrap'),
        stringLength = require('string-length'),
        stripAnsi    = require('strip-ansi'),
        ansiStyles   = require('ansi-styles'),
        ansiRegex    = require('ansi-regex'),
        config       = 'todo';

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap('sayhi', definition(chalk, pad, wrap, stringLength, stripAnsi, ansiStyles, ansiRegex, config));

    // CommonJS
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition(chalk, pad, wrap, stringLength, stripAnsi, ansiStyles, ansiRegex, config);

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['chalk', 'pad-component', 'word-wrap', 'string-length', 'strip-ansi', 'ansi-styles', 'ansi-regex', 'todo'], definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makesayhi = definition(chalk, pad, wrap, stringLength, stripAnsi, ansiStyles, ansiRegex, config);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.sayhi = definition(chalk, pad, wrap, stringLength, stripAnsi, ansiStyles, ansiRegex, config);

    } else {
        throw new Error('This environment was not anticipated by SayHi. Please file a bug.');
    }

})(function (chalk, pad, wrap, stringLength, stripAnsi, ansiStyles, ansiRegex, config) {
    "use strict";

    var topOffset   = 3,
    leftOffset      = 17,
    defaultGreeting = 'dd';

    return function(message, options) {
        message = (message || 'dd').trim();
        options = options || {};

        /**
         * What you're about to see may confuse you. And rightfully so. Here's an
         * explanation.
         *
         * When yosay is given a string, we create a duplicate with the ansi styling
         * sucked out. This way, the true length of the string is read by `pad` and
         * `wrap`, so they can correctly do their job without getting tripped up by
         * the "invisible" ansi. Along with the duplicated, non-ansi string, we store
         * the character position of where the ansi was, so that when we go back over
         * each line that will be printed out in the message box, we check the
         * character position to see if it needs any styling, then re-insert it if
         * necessary.
         *
         * Better implementations welcome :)
         */

        var maxLength   = 24,
        frame,
        styledIndexes   = {},
        completedString = '',
        regExNewLine;

        if (options.maxLength) {
            maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length;

            if (maxLength < options.maxLength) {
                maxLength = options.maxLength;
            }
        }

        regExNewLine = new RegExp('\\s{' + maxLength + '}');

        frame = {
            top: '.' + pad('', maxLength + 2, '-') + '.',
            side: ansiStyles.reset.open + '|' + ansiStyles.reset.open,
            bottom: ansiStyles.reset.open + '\'' + pad('', maxLength + 2, '-') + '\''
        };

        message.replace(ansiRegex, function(match, offset) {
            Object.keys(styledIndexes).forEach(function(key) {
                offset -= styledIndexes[key].length;
            });

            styledIndexes[offset] = styledIndexes[offset] ? styledIndexes[offset] + match : match;
        });

        return wrap(stripAnsi(message), {
                width: maxLength
            })
            .split(/\n/)
            .reduce(function(greeting, str, index, array) {
                var paddedString;

                if (!regExNewLine.test(str)) {
                    str = str.trim();
                }

                completedString += str;

                str = completedString
                    .substr(completedString.length - str.length)
                    .replace(/./g, function(char, charIndex) {
                        if (index > 0) {
                            charIndex += completedString.length - str.length + index;
                        }

                        var hasContinuedStyle = 0,
                        continuedStyle;

                        Object.keys(styledIndexes).forEach(function(offset) {
                            if (charIndex > offset) {
                                hasContinuedStyle++;
                                continuedStyle = styledIndexes[offset];
                            }

                            if (hasContinuedStyle === 1 && charIndex < offset) {
                                hasContinuedStyle++;
                            }
                        });

                        if (styledIndexes[charIndex]) {
                            return styledIndexes[charIndex] + char;
                        } else if (hasContinuedStyle >= 2) {
                            return continuedStyle + char;
                        } else {
                            return char;
                        }
                    })
                    .trim();

                paddedString = pad({
                    length: stringLength(str),
                    valueOf: function() {
                        return ansiStyles.reset.open + str + ansiStyles.reset.open;
                    }
                }, maxLength);

                if (index === 0) {
                    greeting[topOffset - 1] += frame.top;
                }

                greeting[index + topOffset] =
                    (greeting[index + topOffset] || pad.left('', leftOffset)) +
                    frame.side + ' ' + paddedString + ' ' + frame.side;

                if (array[index + 1] === undefined) {
                    greeting[index + topOffset + 1] =
                        (greeting[index + topOffset + 1] || pad.left('', leftOffset)) +
                        frame.bottom;
                }

                return greeting;
            }, defaultGreeting.split(/\n/))
            .join('\n') + '\n';
    };
});