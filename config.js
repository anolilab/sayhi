(function (definition) {
    'use strict';

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the sayhi API and when
    // executed as a simple <script>, it creates a sayhi global instead.

    var options = {};

    // Montage Require
    if (typeof bootstrap === 'function') {
        bootstrap('Config', definition(options));

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
            ses.makeConfig = definition(options);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.Config = definition(options);

    } else {
        throw new Error('This environment was not anticipated by sayhi. Please file a bug.');
    }

})(function (options) {
    var topOffset   = 3,
    leftOffset      = 17,
    defaultGreeting =
    '\n               ,-~~-.____.' + ' ' +
    '\n              / ()=(()    \\'     + '    ' +
    '\n             (   (         0'      + '   ' +
    '\n              \\._\\, ,-----' + "'"  + '    ' +
    '\n       ##XXXxxxxxxx'             + '            ' +
    '\n             /   ---' + "'~;"   + '        ' +
    '\n            /    /~|- '        + '         ' +
    '\n          =(   ~~  |  '        + '         ' +
    '\n    /~~~~~~~~~~~~~~~~~~~~~\\'  + '    ' +
    '\n   /_______________________\\'    + '   ' +
    '\n  /_________________________\\'   + '  ' +
    '\n /___________________________\\' + ' ' +
    '\n    |_____________________|'      + '    ' +
    '\n    |_____________________|'      + '    ' +
    '\n    |_____________________|'      + '    ' +
    '\n    |_____________________|'      + '    ',
    message         = 'I have a new philosophy. \n I´m only going to dread one day at a time. \n\n Charles M. Schulz',
    config          = {};

    if (options.topOffset) {
        topOffset          = options.topOffset;
    }

    if (options.leftOffset) {
        leftOffset         = options.leftOffset;
    }

    if (options.defaultGreeting) {
        defaultGreeting    = options.defaultGreeting;
    }

    if (options.message) {
        message            = options.message;
    }

    config.topOffset       = topOffset;
    config.leftOffset      = leftOffset;
    config.defaultGreeting = defaultGreeting;
    config.message         = message;

    /*!*/
    return config;
});
