exports.id = 147;
exports.ids = [147];
exports.modules = {

/***/ 3147:
/***/ (() => {

self.fetch||(self.fetch=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u={},a=function e(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:e,headers:{keys:function(){return o},entries:function(){return o.map(function(e){return[e,s.getResponseHeader(e)]})},get:function(e){return s.getResponseHeader(e)},has:function(e){return null!=s.getResponseHeader(e)}}}};for(var i in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().toLowerCase().replace(/^(.+?):/gm,function(e,n){u[n]||o.push(u[n]=n)}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(i,n.headers[i]);s.send(n.body||null)})});


/***/ })

};
;
//# sourceMappingURL=147.index.js.map