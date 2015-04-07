#!/usr/bin/env node
(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the SayHi API and when
    // executed as a simple <script>, it creates a SayHi global instead.

    var pkg      = require('./package.json'),
        SayHi    = require('./manager.js'),
        taketalk = require('taketalk');

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap('SayHi', definition(pkg, SayHi, taketalk));

    // CommonJS
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition(pkg, SayHi, taketalk);

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['pkg', 'SayHi', 'taketalk'], definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeSayHi = definition(pkg, SayHi, taketalk);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.SayHi = definition(pkg, SayHi, taketalk);

    } else {
        throw new Error('This environment was not anticipated by SayHi. Please file a bug.');
    }

})(function (pkg, SayHi, taketalk) {
    taketalk({
        init: function (input, options) {
          console.log(SayHi(input, options));
        },
        help: function () {
          console.log([
            '',
            '  ' + pkg.description,
            '',
            '  Usage',
            '    SayHi <string>',
            '    SayHi <string> --maxLength 8',
            '    echo <string> | SayHi',
            '',
            '  Example',
            '    SayHi "Sindre is a horse"',
            SayHi('Sindre is a horse')
          ].join('\n'));
        },
        version: pkg.version
    });
});