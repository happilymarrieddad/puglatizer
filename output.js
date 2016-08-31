;(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var pug=function(){}

    var puglatizer = {}
    puglatizer[""]["tester"] = {}
    puglatizer[""]["tester"]["tester2"] = {}
    puglatizer[""]["t2.pug"] = function template(t){var r,e,a="";try{}catch(c){pug.rethrow(c,r,e)}return a};

    puglatizer[""]["tester"]["tesaf.pug"] = function template(e){var t,i,n,a="";try{var o=e||{};(function(e,i){n=1,a+="<!DOCTYPE html>",n=2,a+='<html lang="en">',n=3,a+="<head>",n=4,a+="<title>",n=4,a=a+pug.escape(null==(t=e)?"":t)+"</title>",n=5,a+='<script type="text/javascript">',n=6,a+="if (foo) bar(1 + 5)</script></head>",n=7,a+="<body>",n=8,a+="<h1>",n=8,a+="Pug - node template engine</h1>",n=9,a+='<div class="col" id="container">',n=10,i?(n=11,a+="<p>",n=11,a+="You are amazing</p>"):(n=13,a+="<p>",n=13,a+="Get on it!</p>"),n=14,a+="<p>",n=15,a+="Pug is a terse and simple templating language with a",n=16,a+="\n",n=16,a+="strong focus on performance and powerful features.</p></div></body></html>"}).call(this,"pageTitle"in o?o.pageTitle:"undefined"!=typeof pageTitle?pageTitle:void 0,"youAreUsingPug"in o?o.youAreUsingPug:"undefined"!=typeof youAreUsingPug?youAreUsingPug:void 0)}catch(p){pug.rethrow(p,i,n)}return a};

    puglatizer[""]["tester"]["tester2"]["test3.pug"] = function template(e){var t,i,n,a="";try{var o=e||{};(function(e,i){n=1,a+="<!DOCTYPE html>",n=2,a+='<html lang="en">',n=3,a+="<head>",n=4,a+="<title>",n=4,a=a+pug.escape(null==(t=e)?"":t)+"</title>",n=5,a+='<script type="text/javascript">',n=6,a+="if (foo) bar(1 + 5)</script></head>",n=7,a+="<body>",n=8,a+="<h1>",n=8,a+="Pug - node template engine</h1>",n=9,a+='<div class="col" id="container">',n=10,i?(n=11,a+="<p>",n=11,a+="You are amazing</p>"):(n=13,a+="<p>",n=13,a+="Get on it!</p>"),n=14,a+="<p>",n=15,a+="Pug is a terse and simple templating language with a",n=16,a+="\n",n=16,a+="strong focus on performance and powerful features.</p></div></body></html>"}).call(this,"pageTitle"in o?o.pageTitle:"undefined"!=typeof pageTitle?pageTitle:void 0,"youAreUsingPug"in o?o.youAreUsingPug:"undefined"!=typeof youAreUsingPug?youAreUsingPug:void 0)}catch(p){pug.rethrow(p,i,n)}return a};


    return puglatizer;
}));
