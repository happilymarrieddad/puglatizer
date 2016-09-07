# puglatizer.js

Simple solution for compiling pug templates into vanilla JS functions for blazin' fast client-side use.

** NOTE! This is mostly taken from https://github.com/HenrikJoreteg/templatizer but converted to use pug **

## What is this?

Client-side templating is overly complicated, ultimately what you *actually* want is a function you can call from your JS that puts your data in a template. Why should I have to send a bunch of strings with Mustaches `{{}}` or other silly stuff for the client to parse? Ultimately, all I want is a function that I can call with some variable to render the string I want.

So, the question is, what's a sane way to get to that point? Enter [pug](https://pugjs.org). Simple, intuitive templating, and happens to be what I use on the server anyway. So... pug has some awesome stuff for compiling templates into functions. I just built puglatizer to make it easy to turn a folder full of pug templates into a CommonJS module that exports all the template functions by whatever their file name.

## Is it faster?

I have no idea... I know the client side javascript is REALLY fast and templatizer was 6-10 times faster than mustache.js with ICanHaz and this is mostly based off of templatizer.

## How do I use it?

1. 'npm install puglatizer'
1. Write all your templates as individual pug files in a folder in your project.
1. Somewhere in your build process do this:

```
var puglatizer = require('puglatizer')

// Pass in the template directory and what you want to save the output file as
puglatizer(
	__dirname + '/templates',
	__dirname + '/public/js/lib/output.js',
	options, // optional
	function(err,templates) { console.log(err || 'Successfully built using Nick\'s amazing template building module... mostly stolen from templatizer... just changed to pug...!') }
)
```

So a folder like this

```
/templates
	user.pug
	app.pug
	/myfolder
		nestedTemplate.pug
```

Compiles down to a JS file that looks something like this:

```js
var pug = require('pug-runtime') // This is a peerDependency

var templates = {};

// a function built from the `user.pug` file
// that takes your data and returns a string.
templates.user = function () {}

// built from the `app.pug` file
templates.app = function () {} // the function

// folders become nested objects so
// myfolder/nestedTemplate.pug becomes
templates.myFolder = {};
templates.myfolder.nestedTemplate = function () {} // the template function

module.exports = templates;
```

The awesome thing is... they're just functions at this point. Crazy fast, SO MUCH WIN!!!!

## API

```js
puglatizer(
  templatesDirectory,
  outputFile?,
  options?,
  function (err, templates) {}
)
```

### templatesDirectory (string or array, required)

A string or an array of paths to look for templates.

The path can also be a [glob](https://github.com/isaacs/node-glob) instead that can be used to match `*.pug` files across multiple directories. For example:

```js
puglatizer(__dirname + '/app/**/*.pug', ...);
```

### outputFile (string)

Optionally build the compiled templates to a file. The output will be a CommonJS module. If you don't build to a file, you'll want to supply a callback to do something else with the compiled templates.

### Options (object)

##### `pug` (object, default `{}`)

`pug` is an object which will be passed directly to `pug.compile()`. See the [pug API documentation](http://pug-lang.com/api/) for what options are available.

Here's an example where we set the pug `compileDebug` option to `true`.

```js
puglatizer(templatesDir, outputFile, {
    // Options
    pug: {
        compileDebug: true
    }
});
```

### Callback (function)

If the last parameter is a function, it will be treated as a callback. The callback will always have the signature `function (err, templates) {}`. Use this to respond to errors or to do something else with the source of the compiled templates file.

This can be helpful if you don't want to write the compiled templates directly to a file, and you want to make modifications first. 

### Argument order

Both the `outputFile` string and `options` object are optional.

```js
// Use just the callback to do something else with your templates
// besides write them to a file
puglatizer(templatesDir, function (err, templates) { });

// Build to a file and do something in the callback
puglatizer(templatesDir, outputFile, function (err, templates) { });

// Use only with options
puglatizer(templatesDir, { /* options */ }, function (err, templates) { });

// Use with options and outputFile
puglatizer(templatesDir, outputFile, { /* options */ }, function (err, templates) { });
```

## Passing client side data to templates

Simply pass in data objects to make those variables available within the template:
```js
puglatizer.Template({ title: ..., description: ...});
```

Using jade's [`&attributes(attributes)`](http://jade-lang.com/reference/attributes/#and-attributes) syntax:
```js
puglatizer.Template.call({ attributes:{ class: ..., value: ...}} , data);
puglatizer.Template.apply({ attributes:{ class: ..., value: ...}} , [data]);
```

## CLI

Puglatizer comes with a bin script to use from makefiles/package.json scripts/etc, it works like this:

```
$ puglatizer -d path/to/templates -o /path/to/output/templates.js
```

## Changelog

- 1.0.4
  - Finished intial build. Let me know what you think!

## License

MIT

## Contributors

- Nick Kotenberg [github profile](https://github.com/happilymarrieddad)
- Aaron McCall [github profile](https://github.com/aaronmccall)
- Luke Karrys [github profile](https://github.com/lukekarrys)