;(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('puglatizer: window does not exist or is not an object');
        }
        root.puglatizer = factory();
    }
}(this, function () {
    function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],a=1;a<r.length;a++)t=pug_merge(t,r[a]);return t}for(var g in e)if("class"===g){var n=r[g]||[];r[g]=(Array.isArray(n)?n:[n]).concat(e[g]||[])}else if("style"===g){var n=pug_style(r[g]),s=pug_style(e[g]);r[g]=n+(n&&s&&";")+s}else r[g]=e[g];return r}
    function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
    function pug_style(r){if(!r)return"";if("object"==typeof r){var e="",t="";for(var n in r)pug_has_own_property.call(r,n)&&(e=e+t+n+":"+r[n],t=";");return e}return r=""+r,";"===r[r.length-1]?r.slice(0,-1):r}
    function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
    function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
    function pug_escape(e){var a=""+e,t=(/["&<>]/).exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
    function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
    var pug = {
    	merge:function pug_merge(r,e){if(1===arguments.length){for(var t=r[0],a=1;a<r.length;a++)t=pug_merge(t,r[a]);return t}for(var g in e)if("class"===g){var n=r[g]||[];r[g]=(Array.isArray(n)?n:[n]).concat(e[g]||[])}else if("style"===g){var n=pug_style(r[g]),s=pug_style(e[g]);r[g]=n+(n&&s&&";")+s}else r[g]=e[g];return r},
    	classes:function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""},
    	style:function pug_style(r){if(!r)return"";if("object"==typeof r){var e="",t="";for(var n in r)pug_has_own_property.call(r,n)&&(e=e+t+n+":"+r[n],t=";");return e}return r=""+r,";"===r[r.length-1]?r.slice(0,-1):r},
    	attr:function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""},
    	attrs:function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a},
    	escape:function pug_escape(e){var a=""+e,t=(/["&<>]/).exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s},
    	rethrow:function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}
    }

    var puglatizer = {}
    puglatizer["myTemplate"] = function template(t){var a,r,i="";try{var n=t||{};(function(t){r=1,i=i+'<div class="foo"'+pug.attr("data-attr",t,!0,!1)+"></div>"}).call(this,"bar"in n?n.bar:"undefined"!=typeof bar?bar:void 0)}catch(e){pug.rethrow(e,a,r)}return i};

    puglatizer["t2"] = function template(t){var r,e,a="";try{}catch(c){pug.rethrow(c,r,e)}return a};

    puglatizer["tester"] = {}
    puglatizer["tester"]["tesaf"] = function template(e){var t,i,n,a="";try{var o=e||{};(function(e,i){n=1,a+="<!DOCTYPE html>",n=2,a+='<html lang="en">',n=3,a+="<head>",n=4,a+="<title>",n=4,a=a+pug.escape(null==(t=e)?"":t)+"</title>",n=5,a+='<script type="text/javascript">',n=6,a+="if (foo) bar(1 + 5)</script></head>",n=7,a+="<body>",n=8,a+="<h1>",n=8,a+="Pug - node template engine</h1>",n=9,a+='<div class="col" id="container">',n=10,i?(n=11,a+="<p>",n=11,a+="You are amazing</p>"):(n=13,a+="<p>",n=13,a+="Get on it!</p>"),n=14,a+="<p>",n=15,a+="Pug is a terse and simple templating language with a",n=16,a+="\n",n=16,a+="strong focus on performance and powerful features.</p></div></body></html>"}).call(this,"pageTitle"in o?o.pageTitle:"undefined"!=typeof pageTitle?pageTitle:void 0,"youAreUsingPug"in o?o.youAreUsingPug:"undefined"!=typeof youAreUsingPug?youAreUsingPug:void 0)}catch(p){pug.rethrow(p,i,n)}return a};

    puglatizer["tester"]["tester2"] = {}
    puglatizer["tester"]["tester2"]["test3"] = function template(e){var t,i,n,a="";try{var o=e||{};(function(e,i){n=1,a+="<!DOCTYPE html>",n=2,a+='<html lang="en">',n=3,a+="<head>",n=4,a+="<title>",n=4,a=a+pug.escape(null==(t=e)?"":t)+"</title>",n=5,a+='<script type="text/javascript">',n=6,a+="if (foo) bar(1 + 5)</script></head>",n=7,a+="<body>",n=8,a+="<h1>",n=8,a+="Pug - node template engine</h1>",n=9,a+='<div class="col" id="container">',n=10,i?(n=11,a+="<p>",n=11,a+="You are amazing</p>"):(n=13,a+="<p>",n=13,a+="Get on it!</p>"),n=14,a+="<p>",n=15,a+="Pug is a terse and simple templating language with a",n=16,a+="\n",n=16,a+="strong focus on performance and powerful features.</p></div></body></html>"}).call(this,"pageTitle"in o?o.pageTitle:"undefined"!=typeof pageTitle?pageTitle:void 0,"youAreUsingPug"in o?o.youAreUsingPug:"undefined"!=typeof youAreUsingPug?youAreUsingPug:void 0)}catch(p){pug.rethrow(p,i,n)}return a};


    return puglatizer;
}));
