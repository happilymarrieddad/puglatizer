# puglatizer.js

Simple solution for compiling pug templates into vanilla JS functions for blazin' fast client-side use.

** NOTE! This is mostly taken from https://github.com/HenrikJoreteg/templatizer but converted to use pug **

## What is this?

Client-side templating is overly complicated, ultimately what you *actually* want is a function you can call from your JS that puts your data in a template. Why should I have to send a bunch of strings with Mustaches `{{}}` or other silly stuff for the client to parse? Ultimately, all I want is a function that I can call with some variable to render the string I want.

So, the question is, what's a sane way to get to that point? Enter [pug](https://pugjs.org). Simple, intuitive templating, and happens to be what I use on the server anyway. So... pug has some awesome stuff for compiling templates into functions. I just built templatizer to make it easy to turn a folder full of pug templates into a CommonJS module that exports all the template functions by whatever their file name.

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
	user.jade
	app.jade
	/myfolder
		nestedTemplate.jade
```