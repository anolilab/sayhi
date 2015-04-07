(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the SayHi API and when
    // executed as a simple <script>, it creates a SayHi global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap('SayHiConfig', definition(options));

    // CommonJS
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition(options);

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['options'], definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeSayHiConfig = definition(options);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.SayHiConfig = definition(options);

    } else {
        throw new Error('This environment was not anticipated by SayHi. Please file a bug.');
    }

})(function (options) {
    var topOffset   = 3,
    leftOffset      = 17,
    defaultGreeting = 'dd',
    config          = {};

    if (options.topOffset) {
        topOffset = options.topOffset;
    }

    if (options.leftOffset) {
        leftOffset = options.leftOffset;
    }

    if (options.defaultGreeting) {
        defaultGreeting = options.defaultGreeting;
    }

    config.topOffset       = topOffset;
    config.leftOffset      = leftOffset;
    config.defaultGreeting = defaultGreeting;

    /*!*/
    return config;
});
