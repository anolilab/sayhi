#!/usr/bin/env node
(function (definition) {
    'use strict';

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the sayhi API and when
    // executed as a simple <script>, it creates a sayhi global instead.

    var pkg      = require('./package.json'),
        sayhi    = require('./manager.js'),
        taketalk = require('taketalk');

    // Montage Require
    if (typeof bootstrap === 'function') {
        bootstrap('sayhi', definition(pkg, sayhi, taketalk));

    // CommonJS
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition(pkg, sayhi, taketalk);

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['pkg', 'sayhi', 'taketalk'], definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makesayhi = definition(pkg, sayhi, taketalk);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.sayhi = definition(pkg, sayhi, taketalk);

    } else {
        throw new Error('This environment was not anticipated by sayhi. Please file a bug.');
    }

})(function (pkg, sayhi, taketalk) {
    taketalk({
        init: function (input, options) {
          console.log(sayhi(input, options));
        },
        help: function () {
          console.log([
            '',
            '  ' + pkg.description,
            '',
            '  Usage',
            '    sayhi <string>',
            '    sayhi <string> --maxLength 8',
            '    echo <string> | sayhi',
            '',
            '  Example',
            '    sayhi "Have you ever seen a rabbit with glasses?"',
            sayhi('Have you ever seen a rabbit with glasses?')
          ].join('\n'));
        },
        version: pkg.version
    });
});
