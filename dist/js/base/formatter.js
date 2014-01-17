define([],function(){require(["base/app"],function(e){function t(e,t){try{for(var n in t)Object.defineProperty(e.prototype,n,{value:t[n],enumerable:!1})}catch(r){e.prototype=t}}function i(e){return e}function s(){}function c(e,t){var n=Math.pow(10,Math.abs(8-t)*3);return{scale:t>8?function(e){return e/n}:function(e){return e*n},symbol:e}}function d(e,t){return t-(e?Math.ceil(Math.log(e)/Math.LN10):1)}function v(e){return e+""}var n="\0",r=n.charCodeAt(0);e.map=function(e){var t=new s;if(e instanceof s)e.forEach(function(e,n){t.set(e,n)});else for(var n in e)t.set(n,e[n]);return t},t(s,{has:function(e){return n+e in this},get:function(e){return this[n+e]},set:function(e,t){return this[n+e]=t},remove:function(e){return e=n+e,e in this&&delete this[e]},keys:function(){var e=[];return this.forEach(function(t){e.push(t)}),e},values:function(){var e=[];return this.forEach(function(t,n){e.push(n)}),e},entries:function(){var e=[];return this.forEach(function(t,n){e.push({key:t,value:n})}),e},forEach:function(e){for(var t in this)t.charCodeAt(0)===r&&e.call(this,t.substring(1),this[t])}});var o=".",u=",",a=[3,3],f="$",l=_.map(["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"],c);e.formatPrefix=function(t,n){var r=0;return t&&(t<0&&(t*=-1),n&&(t=e.round(t,d(t,n))),r=1+Math.floor(1e-12+Math.log(t)/Math.LN10),r=Math.max(-24,Math.min(24,Math.floor((r<=0?r+1:r-1)/3)*3))),l[8+r/3]},e.round=function(e,t){return t?Math.round(e*(t=Math.pow(10,t)))/t:Math.round(e)},e.format=function(t){var n=h.exec(t),r=n[1]||" ",i=n[2]||">",s=n[3]||"",u=n[4]||"",a=n[5],l=+n[6],c=n[7],d=n[8],g=n[9],y=1,b="",w=!1;d&&(d=+d.substring(1));if(a||r==="0"&&i==="=")a=r="0",i="=",c&&(l-=Math.floor((l-1)/4));switch(g){case"n":c=!0,g="g";break;case"%":y=100,b="%",g="f";break;case"p":y=100,b="%",g="r";break;case"b":case"o":case"x":case"X":u==="#"&&(u="0"+g.toLowerCase());case"c":case"d":w=!0,d=0;break;case"s":y=-1,g="r"}u==="#"?u="":u==="$"&&(u=f),g=="r"&&!d&&(g="g");if(d!=null)if(g=="g")d=Math.max(1,Math.min(21,d));else if(g=="e"||g=="f")d=Math.max(0,Math.min(20,d));g=p.get(g)||v;var E=a&&c;return function(t){if(w&&t%1)return"";var n=t<0||t===0&&1/t<0?(t=-t,"-"):s;if(y<0){var f=e.formatPrefix(t,d);t=f.scale(t),b=f.symbol}else t*=y;t=g(t,d);var h=t.lastIndexOf("."),p=h<0?t:t.substring(0,h),v=h<0?"":o+t.substring(h+1);!a&&c&&(p=m(p));var S=u.length+p.length+v.length+(E?0:n.length),x=S<l?(new Array(S=l-S+1)).join(r):"";return E&&(p=m(x+p)),n+=u,t=p+v,(i==="<"?n+t+x:i===">"?x+n+t:i==="^"?x.substring(0,S>>=1)+n+t+x.substring(S):n+(E?t:x+t))+b}};var h=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,p=e.map({b:function(e){return e.toString(2)},c:function(e){return String.fromCharCode(e)},o:function(e){return e.toString(8)},x:function(e){return e.toString(16)},X:function(e){return e.toString(16).toUpperCase()},g:function(e,t){return e.toPrecision(t)},e:function(e,t){return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},r:function(t,n){return(t=e.round(t,d(t,n))).toFixed(Math.max(0,Math.min(20,d(t*(1+1e-15),n))))}}),m=i;if(a){var g=a.length;m=function(e){var t=e.length,n=[],r=0,i=a[0];while(t>0&&i>0)n.push(e.substring(t-=i,t+i)),i=a[r=(r+1)%g];return n.reverse().join(u)}}e.addFormatter("currency",e.format("$0,000")),e.addFormatter("integer",e.format("0,000"))})});