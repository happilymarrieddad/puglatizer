# puglatizer.js

Simple solution for compiling pug templates into vanilla JS functions for blazin' fast client-side use.

** NOTE! This is mostly taken from https://github.com/HenrikJoreteg/templatizer but converted to use pug **

## What is this?

Client-side templating is overly complicated, ultimately what you *actually* want is a function you can call from your JS that puts your data in a template. Why should I have to send a bunch of strings with Mustaches `{{}}` or other silly stuff for the client to parse? Ultimately, all I want is a function that I can call with some variable to render the string I want.

So, the question is, what's a sane way to get to that point? Enter [jade](http://jade-lang.com). Simple, intuitive templating, and happens to be what I use on the server anyway. So... Jade has some awesome stuff for compiling templates into functions. I just built templatizer to make it easy to turn a folder full of jade templates into a CommonJS module that exports all the template functions by whatever their file name.