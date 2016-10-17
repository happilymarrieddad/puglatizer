'use strict'

var pug = require('pug'),
	wrap = require('pug-runtime/wrap'),
	async = require('async'),
	escape = require('escape-regexp'),
	_ = require('lodash'),
	path = require('path'),
	fs = require('fs'),
	minify = require('harp-minify'),
	filePaths = []

var buildTemplateFromFile = function(filepath,respond) {
	fs.stat(filepath,function(err,stat) {
		if (err) { return respond(err) }
		fs.readFile(filepath,function(err,fileData) {
			if (err) { return respond(err) }
			try {
				var compiledPug = pug.compile(fileData)
				var template = wrap(compiledPug)
				return respond(null,template)
			} catch(err) {
				console.log('Error at',filepath)
				console.log(err)
			}
		})
	})
}

module.exports = function(templateDirectories,outputFile,opts,done) {

	if (typeof templateDirectories != 'string') { throw new Error('Template directory path must be string.') }
	if (typeof outputFile != 'string') { throw new Error('Output path must be string.') }
	if (!done) { done = function(){} }

	var options =  opts && typeof opts == 'object' ? opts : {},
		results = {}

	async.waterfall([
		// Unbuild old template file if exists
		function(callback) {
			fs.stat(outputFile,function(err,stat) {
				if (err) { return callback(null) }
				console.log('Found old ' + outputFile + ' so now removing')
				fs.unlink(outputFile)
				return callback(null)
			})
		},
		// Create the initial file
		function(callback) {
			fs.appendFileSync(outputFile,";(function(root,factory){\r\n")
			fs.appendFileSync(outputFile,"    if (typeof define === 'function' && define.amd) {\r\n")
			fs.appendFileSync(outputFile,"        define([], factory);\r\n")
			fs.appendFileSync(outputFile,"    } else if (typeof exports === 'object') {\r\n")
			fs.appendFileSync(outputFile,"        module.exports = factory();\r\n")
			fs.appendFileSync(outputFile,"    } else {\r\n")
			fs.appendFileSync(outputFile,"        if (typeof root === 'undefined' || root !== Object(root)) {\r\n")
			fs.appendFileSync(outputFile,"            throw new Error('puglatizer: window does not exist or is not an object');\r\n")
			fs.appendFileSync(outputFile,"        }\r\n")
			fs.appendFileSync(outputFile,"        root.puglatizer = factory();\r\n")
			fs.appendFileSync(outputFile,"    }\r\n")
			fs.appendFileSync(outputFile,"}(this, function () {\r\n")
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.merge.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.classes.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.style.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.attr.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.attrs.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.escape.toString()).replace('pug_match_html','(/[\"&<>]/)') + '\r\n')
			fs.appendFileSync(outputFile,"    " + minify.js(pug.runtime.rethrow.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    var pug = {\r\n")
			fs.appendFileSync(outputFile,"    	merge:" + minify.js(pug.runtime.merge.toString()) + ',\r\n')
			fs.appendFileSync(outputFile,"    	classes:" + minify.js(pug.runtime.classes.toString()) + ',\r\n')
			fs.appendFileSync(outputFile,"    	style:" + minify.js(pug.runtime.style.toString()) + ',\r\n')
			fs.appendFileSync(outputFile,"    	attr:" + minify.js(pug.runtime.attr.toString()) + ',\r\n')
			fs.appendFileSync(outputFile,"    	attrs:" + minify.js(pug.runtime.attrs.toString()) + ',\r\n')
			fs.appendFileSync(outputFile,"    	escape:" + minify.js(pug.runtime.escape.toString()).replace('pug_match_html','(/[\"&<>]/)') + ',\r\n')
			fs.appendFileSync(outputFile,"    	rethrow:" + minify.js(pug.runtime.rethrow.toString()) + '\r\n')
			fs.appendFileSync(outputFile,"    }\r\n")
			fs.appendFileSync(outputFile,"\r\n")
			fs.appendFileSync(outputFile,'    var puglatizer = {}')
			fs.appendFileSync(outputFile,"\r\n")
			return callback()
		},
		// Here we build all the pug functions
		function(callback) {

			var fileLoop = function(currentDir,templateDirectories,cb) {
				var callback_has_been_called = false
				fs.readdir(currentDir,function(err,files) {
					if (err) {
						return console.log('Unable to find files in path',currentDir)
					}
					var num = files.length

					var finishFile = function(i) {
						if (!(--num)) {
							if (!callback_has_been_called) {
								callback_has_been_called = true
								return cb()
							}
						} else {
							buildFileData(i+1)
						}
					}

					var buildFileData = function(i) {
						var file = files[i]
						var filepath = currentDir + '/' + file

						fs.stat(filepath,function(err2,stats) {
							if (err2) {
								return console.log('Unable to find file',filepath)
							}

							if (stats && stats.isDirectory()) {
								var pugatizerPath = '    puglatizer' + currentDir.replace(templateDirectories,'').replace(/\//g,'"]["') + '"]["' + file.replace('.pug','') + '"] = {}\r\n'
								pugatizerPath = pugatizerPath.replace('puglatizer"]','puglatizer')
								fs.appendFileSync(outputFile,pugatizerPath)
								fileLoop(filepath,templateDirectories,function() {
									finishFile(i)
								})
							} else if (stats && stats.isFile()) {
								var ext = path.extname(filepath)
								if (ext == '.pug') {
									var pugatizerPath = '    puglatizer' + currentDir.replace(templateDirectories,'').replace(/\//g,'"]["') + '"]["' + file.replace('.pug','') + '"] = '
									pugatizerPath = pugatizerPath.replace('puglatizer"]','puglatizer')
									buildTemplateFromFile(filepath,function(err,template) {
										pugatizerPath += minify.js(template.toString()) + ';\r\n\r\n'
										fs.appendFileSync(outputFile,pugatizerPath)
										finishFile(i)
									})
								} else {
									finishFile(i)
								}
							} else {
								finishFile(i)
							}
						})
					}

					if (!num) {
						return console.log('Unable to find files in path',currentDir)
					} else {
						buildFileData(0)
					}

				})

			}
			
			fileLoop(templateDirectories,templateDirectories,function() {
				return callback()
			})
		},
		// Finalize the file
		function(callback) {

			fs.appendFileSync(outputFile,"\r\n")
			fs.appendFileSync(outputFile,"    return puglatizer;\r\n")
			fs.appendFileSync(outputFile,"}));\r\n")
			return callback()
		}
	],function(err,result) {
		if (err) { return done(err) }
		return done(null)
	})

}