#!/usr/bin/env node

var path = require('path');
var parseArgs = require('minimist');
var puglatizer = require('../puglatizer');

var argv = parseArgs(process.argv.slice(2), {
    alias: {
        d: 'directory',
        o: 'outfile'
    }
});

var usage = [
    '  ',
    '  Puglatizer: convert directory of pug templates, to a precompile file of template functions',
    '  ',
    '    Usage examples:',
    '  ',
    '      puglatizer -d /path/to/templates -o templates.js',
    '       # compile directory of templates to templates.js',
    '  ',
    '      puglatizer --directory /path/to/templates --outfile templates.js',
    '       # as above with longer form of options',
    '  ',
    '      # if `outfile` is not supplied, output will be written to stdout'
].join('\n');

var version = argv.v || argv.version;
var directory = argv.d;
var outfile = argv.o;

if (version) {
    console.log(require('../package.json').version);
    process.exit(1);
}

if (!directory) {
    console.log(usage);
    process.exit(1);
}

directory = path.join(process.cwd(), directory);

if (outfile) {
    outfile = path.join(process.cwd(), outfile);
    puglatizer(directory, outfile, function (err) {
        if (err) throw err;
    });
} else {
    puglatizer(directory, function (err, templates) {
        if (err) throw err;
        process.stdout.write(templates);
    });
}
