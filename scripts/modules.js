/** Iodine Form Validation **/
class e{constructor(){this.locale=void 0,this.messages=this._defaultMessages(),this.defaultFieldName="Value"}_dateCompare(e,t,r,s=!1){return!!this.isDate(e)&&!(!this.isDate(t)&&!this.isInteger(t))&&(t="number"==typeof t?t:t.getTime(),"less"===r&&s?e.getTime()<=t:"less"!==r||s?"more"===r&&s?e.getTime()>=t:"more"!==r||s?void 0:e.getTime()>t:e.getTime()<t)}_defaultMessages(){return{after:"The date must be after: '[PARAM]'",afterOrEqual:"The date must be after or equal to: '[PARAM]'",array:"[FIELD] must be an array",before:"The date must be before: '[PARAM]'",beforeOrEqual:"The date must be before or equal to: '[PARAM]'",boolean:"[FIELD] must be true or false",date:"[FIELD] must be a date",different:"[FIELD] must be different to '[PARAM]'",endingWith:"[FIELD] must end with '[PARAM]'",email:"[FIELD] must be a valid email address",falsy:"[FIELD] must be a falsy value (false, 'false', 0 or '0')",in:"[FIELD] must be one of the following options: [PARAM]",integer:"[FIELD] must be an integer",json:"[FIELD] must be a parsable JSON object string",maximum:"[FIELD] must not be greater than '[PARAM]' in size or character length",minimum:"[FIELD] must not be less than '[PARAM]' in size or character length",max:"[FIELD] must be less than or equal to [PARAM]",min:"[FIELD] must be greater than or equal to [PARAM]",maxLength:"[FIELD] must not be greater than '[PARAM]' in character length",minLength:"[FIELD] must not be less than '[PARAM]' character length",notIn:"[FIELD] must not be one of the following options: [PARAM]",numeric:"[FIELD] must be numeric",optional:"[FIELD] is optional",regexMatch:"[FIELD] must satisify the regular expression: [PARAM]",required:"[FIELD] must be present",same:"[FIELD] must be '[PARAM]'",startingWith:"[FIELD] must start with '[PARAM]'",string:"[FIELD] must be a string",truthy:"[FIELD] must be a truthy value (true, 'true', 1 or '1')",url:"[FIELD] must be a valid url",uuid:"[FIELD] must be a valid UUID"}}addRule(t,r){e.prototype[`is${t[0].toUpperCase()}${t.slice(1)}`]=r}getErrorMessage(e,t){let{param:r,field:s}="object"==typeof t?t:{param:t,field:void 0};const i=e.split(":");let a=i.shift();r=r||i.join(":"),["after","afterOrEqual","before","beforeOrEqual"].includes(a)&&(r=new Date(parseInt(r)).toLocaleTimeString(this.locale,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"numeric",hour12:!1}));let n=[null,void 0,""].includes(r)?this.messages[a]:this.messages[a].replace("[PARAM]",r);return[null,void 0,""].includes(s)?n.replace("[FIELD]",this.defaultFieldName):n.replace("[FIELD]",s)}isAfter(e,t){return this._dateCompare(e,t,"more",!1)}isAfterOrEqual(e,t){return this._dateCompare(e,t,"more",!0)}isArray(e){return Array.isArray(e)}isBefore(e,t){return this._dateCompare(e,t,"less",!1)}isBeforeOrEqual(e,t){return this._dateCompare(e,t,"less",!0)}isBoolean(e){return[!0,!1].includes(e)}isDate(e){return e&&"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e)}isDifferent(e,t){return e!=t}isEndingWith(e,t){return this.isString(e)&&e.endsWith(t)}isEmail(e){return new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$").test(String(e).toLowerCase())}isFalsy(e){return[0,"0",!1,"false"].includes(e)}isIn(e,t){return(t="string"==typeof t?t.split(","):t).includes(e)}isInteger(e){return Number.isInteger(e)&&parseInt(e).toString()===e.toString()}isJson(e){try{return"object"==typeof JSON.parse(e)}catch(e){return!1}}isMaximum(e,t){return console.warn("isMaximum (maximum) is deprecated. Use isMax (max) for validating the maximum value of a number or isMaxLength (maxLength) for validating the length of a string"),e="string"==typeof e?e.length:e,parseFloat(e)<=t}isMinimum(e,t){return console.warn("isMinimum (minimum) is deprecated. Use isMin (min) for validating the minimum value of a number or isMinLength (minLength) for validating the length of a string"),e="string"==typeof e?e.length:e,parseFloat(e)>=t}isMax(e,t){return parseFloat(e)<=t}isMin(e,t){return parseFloat(e)>=t}isMaxLength(e,t){return"string"==typeof e&&e.length<=t}isMinLength(e,t){return"string"==typeof e&&e.length>=t}isNotIn(e,t){return!this.isIn(e,t)}isNumeric(e){return!isNaN(parseFloat(e))&&isFinite(e)}isOptional(e){return[null,void 0,""].includes(e)}isRegexMatch(e,t){return new RegExp(t).test(String(e))}isRequired(e){return!this.isOptional(e)}isSame(e,t){return e==t}isStartingWith(e,t){return this.isString(e)&&e.startsWith(t)}isString(e){return"string"==typeof e}isTruthy(e){return[1,"1",!0,"true"].includes(e)}isUrl(e){return new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$").test(String(e).toLowerCase())}isUuid(e){return new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$").test(String(e).toLowerCase())}is(e,t=[]){if(!t.length)return!0;if("optional"===t[0]&&this.isOptional(e))return!0;for(let r in t){if("optional"===t[r])continue;const s=t[r].split(":"),i=s.shift();if(!this["is"+(i[0].toUpperCase()+i.slice(1))].apply(this,[e,s.join(":")]))return t[r]}return!0}isValid(e,t=[]){return!0===this.is(e,t)}setErrorMessages(e){this.messages=e}setErrorMessage(e,t){this.messages[e]=t}setLocale(e){this.locale=e}setDefaultFieldName(e){this.defaultFieldName=e}}window.Iodine=new e,Iodine=new e();

// Big.js
!function(r){"use strict";var e,t=1e6,n=1e6,i="[big.js] ",o=i+"Invalid ",s=o+"decimal places",c=i+"Division by zero",f={},u=void 0,h=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function l(r,e,t,n){var i=r.c;if(t===u&&(t=r.constructor.RM),0!==t&&1!==t&&2!==t&&3!==t)throw Error("[big.js] Invalid rounding mode");if(e<1)n=3===t&&(n||!!i[0])||0===e&&(1===t&&i[0]>=5||2===t&&(i[0]>5||5===i[0]&&(n||i[1]!==u))),i.length=1,n?(r.e=r.e-e+1,i[0]=1):i[0]=r.e=0;else if(e<i.length){if(n=1===t&&i[e]>=5||2===t&&(i[e]>5||5===i[e]&&(n||i[e+1]!==u||1&i[e-1]))||3===t&&(n||!!i[0]),i.length=e--,n)for(;++i[e]>9;)i[e]=0,e--||(++r.e,i.unshift(1));for(e=i.length;!i[--e];)i.pop()}return r}function a(r,e,t){var n=r.e,i=r.c.join(""),o=i.length;if(e)i=i.charAt(0)+(o>1?"."+i.slice(1):"")+(n<0?"e":"e+")+n;else if(n<0){for(;++n;)i="0"+i;i="0."+i}else if(n>0)if(++n>o)for(n-=o;n--;)i+="0";else n<o&&(i=i.slice(0,n)+"."+i.slice(n));else o>1&&(i=i.charAt(0)+"."+i.slice(1));return r.s<0&&t?"-"+i:i}f.abs=function(){var r=new this.constructor(this);return r.s=1,r},f.cmp=function(r){var e,t=this,n=t.c,i=(r=new t.constructor(r)).c,o=t.s,s=r.s,c=t.e,f=r.e;if(!n[0]||!i[0])return n[0]?o:i[0]?-s:0;if(o!=s)return o;if(e=o<0,c!=f)return c>f^e?1:-1;for(s=(c=n.length)<(f=i.length)?c:f,o=-1;++o<s;)if(n[o]!=i[o])return n[o]>i[o]^e?1:-1;return c==f?0:c>f^e?1:-1},f.div=function(r){var e=this,n=e.constructor,i=e.c,o=(r=new n(r)).c,f=e.s==r.s?1:-1,h=n.DP;if(h!==~~h||h<0||h>t)throw Error(s);if(!o[0])throw Error(c);if(!i[0])return r.s=f,r.c=[r.e=0],r;var a,p,w,g,d,v=o.slice(),m=a=o.length,E=i.length,b=i.slice(0,a),P=b.length,D=r,M=D.c=[],x=0,N=h+(D.e=e.e-r.e)+1;for(D.s=f,f=N<0?0:N,v.unshift(0);P++<a;)b.push(0);do{for(w=0;w<10;w++){if(a!=(P=b.length))g=a>P?1:-1;else for(d=-1,g=0;++d<a;)if(o[d]!=b[d]){g=o[d]>b[d]?1:-1;break}if(!(g<0))break;for(p=P==a?o:v;P;){if(b[--P]<p[P]){for(d=P;d&&!b[--d];)b[d]=9;--b[d],b[P]+=10}b[P]-=p[P]}for(;!b[0];)b.shift()}M[x++]=g?w:++w,b[0]&&g?b[P]=i[m]||0:b=[i[m]]}while((m++<E||b[0]!==u)&&f--);return M[0]||1==x||(M.shift(),D.e--,N--),x>N&&l(D,N,n.RM,b[0]!==u),D},f.eq=function(r){return 0===this.cmp(r)},f.gt=function(r){return this.cmp(r)>0},f.gte=function(r){return this.cmp(r)>-1},f.lt=function(r){return this.cmp(r)<0},f.lte=function(r){return this.cmp(r)<1},f.minus=f.sub=function(r){var e,t,n,i,o=this,s=o.constructor,c=o.s,f=(r=new s(r)).s;if(c!=f)return r.s=-f,o.plus(r);var u=o.c.slice(),h=o.e,l=r.c,a=r.e;if(!u[0]||!l[0])return l[0]?r.s=-f:u[0]?r=new s(o):r.s=1,r;if(c=h-a){for((i=c<0)?(c=-c,n=u):(a=h,n=l),n.reverse(),f=c;f--;)n.push(0);n.reverse()}else for(t=((i=u.length<l.length)?u:l).length,c=f=0;f<t;f++)if(u[f]!=l[f]){i=u[f]<l[f];break}if(i&&(n=u,u=l,l=n,r.s=-r.s),(f=(t=l.length)-(e=u.length))>0)for(;f--;)u[e++]=0;for(f=e;t>c;){if(u[--t]<l[t]){for(e=t;e&&!u[--e];)u[e]=9;--u[e],u[t]+=10}u[t]-=l[t]}for(;0===u[--f];)u.pop();for(;0===u[0];)u.shift(),--a;return u[0]||(r.s=1,u=[a=0]),r.c=u,r.e=a,r},f.mod=function(r){var e,t=this,n=t.constructor,i=t.s,o=(r=new n(r)).s;if(!r.c[0])throw Error(c);return t.s=r.s=1,e=1==r.cmp(t),t.s=i,r.s=o,e?new n(t):(i=n.DP,o=n.RM,n.DP=n.RM=0,t=t.div(r),n.DP=i,n.RM=o,this.minus(t.times(r)))},f.plus=f.add=function(r){var e,t,n,i=this,o=i.constructor;if(r=new o(r),i.s!=r.s)return r.s=-r.s,i.minus(r);var s=i.e,c=i.c,f=r.e,u=r.c;if(!c[0]||!u[0])return u[0]||(c[0]?r=new o(i):r.s=i.s),r;if(c=c.slice(),e=s-f){for(e>0?(f=s,n=u):(e=-e,n=c),n.reverse();e--;)n.push(0);n.reverse()}for(c.length-u.length<0&&(n=u,u=c,c=n),e=u.length,t=0;e;c[e]%=10)t=(c[--e]=c[e]+u[e]+t)/10|0;for(t&&(c.unshift(t),++f),e=c.length;0===c[--e];)c.pop();return r.c=c,r.e=f,r},f.pow=function(r){var e=this,t=new e.constructor("1"),i=t,s=r<0;if(r!==~~r||r<-1e6||r>n)throw Error(o+"exponent");for(s&&(r=-r);1&r&&(i=i.times(e)),r>>=1;)e=e.times(e);return s?t.div(i):i},f.prec=function(r,e){if(r!==~~r||r<1||r>t)throw Error(o+"precision");return l(new this.constructor(this),r,e)},f.round=function(r,e){if(r===u)r=0;else if(r!==~~r||r<-t||r>t)throw Error(s);return l(new this.constructor(this),r+this.e+1,e)},f.sqrt=function(){var r,e,t,n=this,o=n.constructor,s=n.s,c=n.e,f=new o("0.5");if(!n.c[0])return new o(n);if(s<0)throw Error(i+"No square root");0===(s=Math.sqrt(n+""))||s===1/0?((e=n.c.join("")).length+c&1||(e+="0"),c=((c+1)/2|0)-(c<0||1&c),r=new o(((s=Math.sqrt(e))==1/0?"5e":(s=s.toExponential()).slice(0,s.indexOf("e")+1))+c)):r=new o(s+""),c=r.e+(o.DP+=4);do{t=r,r=f.times(t.plus(n.div(t)))}while(t.c.slice(0,c).join("")!==r.c.slice(0,c).join(""));return l(r,(o.DP-=4)+r.e+1,o.RM)},f.times=f.mul=function(r){var e,t=this,n=t.constructor,i=t.c,o=(r=new n(r)).c,s=i.length,c=o.length,f=t.e,u=r.e;if(r.s=t.s==r.s?1:-1,!i[0]||!o[0])return r.c=[r.e=0],r;for(r.e=f+u,s<c&&(e=i,i=o,o=e,u=s,s=c,c=u),e=new Array(u=s+c);u--;)e[u]=0;for(f=c;f--;){for(c=0,u=s+f;u>f;)c=e[u]+o[f]*i[u-f-1]+c,e[u--]=c%10,c=c/10|0;e[u]=c}for(c?++r.e:e.shift(),f=e.length;!e[--f];)e.pop();return r.c=e,r},f.toExponential=function(r,e){var n=this,i=n.c[0];if(r!==u){if(r!==~~r||r<0||r>t)throw Error(s);for(n=l(new n.constructor(n),++r,e);n.c.length<r;)n.c.push(0)}return a(n,!0,!!i)},f.toFixed=function(r,e){var n=this,i=n.c[0];if(r!==u){if(r!==~~r||r<0||r>t)throw Error(s);for(r=r+(n=l(new n.constructor(n),r+n.e+1,e)).e+1;n.c.length<r;)n.c.push(0)}return a(n,!1,!!i)},f.toJSON=f.toString=function(){var r=this,e=r.constructor;return a(r,r.e<=e.NE||r.e>=e.PE,!!r.c[0])},f.toNumber=function(){var r=Number(a(this,!0,!0));if(!0===this.constructor.strict&&!this.eq(r.toString()))throw Error(i+"Imprecise conversion");return r},f.toPrecision=function(r,e){var n=this,i=n.constructor,s=n.c[0];if(r!==u){if(r!==~~r||r<1||r>t)throw Error(o+"precision");for(n=l(new i(n),r,e);n.c.length<r;)n.c.push(0)}return a(n,r<=n.e||n.e<=i.NE||n.e>=i.PE,!!s)},f.valueOf=function(){var r=this,e=r.constructor;if(!0===e.strict)throw Error(i+"valueOf disallowed");return a(r,r.e<=e.NE||r.e>=e.PE,!0)},(e=function r(){function e(t){var n=this;if(!(n instanceof e))return t===u?r():new e(t);if(t instanceof e)n.s=t.s,n.e=t.e,n.c=t.c.slice();else{if("string"!=typeof t){if(!0===e.strict)throw TypeError(o+"number");t=0===t&&1/t<0?"-0":String(t)}!function(r,e){var t,n,i;if(!h.test(e))throw Error(o+"number");r.s="-"==e.charAt(0)?(e=e.slice(1),-1):1,(t=e.indexOf("."))>-1&&(e=e.replace(".",""));(n=e.search(/e/i))>0?(t<0&&(t=n),t+=+e.slice(n+1),e=e.substring(0,n)):t<0&&(t=e.length);for(i=e.length,n=0;n<i&&"0"==e.charAt(n);)++n;if(n==i)r.c=[r.e=0];else{for(;i>0&&"0"==e.charAt(--i););for(r.e=t-n-1,r.c=[],t=0;n<=i;)r.c[t++]=+e.charAt(n++)}}(n,t)}n.constructor=e}return e.prototype=f,e.DP=20,e.RM=1,e.NE=-7,e.PE=21,e.strict=false,e.roundDown=0,e.roundHalfUp=1,e.roundHalfEven=2,e.roundUp=3,e}()).default=e.Big=e,"function"==typeof define&&define.amd?define((function(){return e})):"undefined"!=typeof module&&module.exports?module.exports=e:r.Big=e}(this);

var Media = {
    component(media) {
        return {
            urlUpload: false,
            media: media,
            init() {
                var self = this

                var onMedia = function(file, obj) {
                    media.blob = obj.src
                    media.mime = file.type
                    media.type = file.type.split('/')[0]
                    media.loaded = true

                    // media.uploading = true
                    // if (['image', 'video'].includes(media.type)) {
                    //     ajax('https://api.com/media', {raw: obj.src}, function(data) {
                    //         data = JSON.parse(data)
                    //         media.id = data.id
                    //         media.uploading = false
                    //     }, function(status) {
                    //         return
                    //     })
                    // }
                }

                var onUrl = function(url, obj) {
                    media.blob = object
                    media.mime = obj.split(';base64,')[0].replace('data:', '')
                    media.type = obj.split(';base64,')[0].replace('data:', '').split('/')[0]
                    media.loaded = true

                    // media.uploading = true
                    // if (['image', 'video'].includes(media.type)) {
                    //     ajax('https://api.com/media', {raw: obj}, function(data) {
                    //         data = JSON.parse(data)
                    //         media.id = data.id
                    //         media.uploading = false
                    //     }, function(status) {
                    //         return
                    //     })
                    // }
                }

                Media.init(this.$el, onMedia, onUrl);
            },
        }
    },
    init: function(element, onMedia, onUrl, params) {
        ["dragenter", "dragover", "dragleave", "drop"].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
        ["dragenter", "dragover"].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                element.querySelector('.gallery').classList.remove('bg-gray-100');
                element.querySelector('.gallery').classList.add('bg-gray-300');
            }, false);
        });
        ["dragleave", "drop"].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                element.querySelector('.gallery').classList.remove('bg-gray-300');
                element.querySelector('.gallery').classList.add('bg-gray-100');
            }, false);
        });

        element.addEventListener("drop", function(e) {
            var dt = e.dataTransfer;
            Media.processFiles(e.target, dt.files, onMedia, params)
        }, false);

        element.querySelector('input[name="media"]').addEventListener('change', function(e) {
            Media.processFiles(e.target, e.target.files, onMedia, params)
        }, false)

        if (element.querySelector('input[name="url"]')) element.querySelector('input[name="url"]').addEventListener('input', function(e) {
            Media.mediaFromURL(e.target, e.target.value, onUrl, params)
        }, false)
    },

    processFiles: function(target, files, onMedia, params) {
        var filesArray = Array.from(files)
        filesArray.forEach(function(file) {
            Media.addMedia(file, onMedia, params)
        });
    },

    addMedia: function(file, onMedia, params) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            var obj = document.createElement('object')
            obj.src = reader.result
            onMedia && onMedia(file, obj, params)
        };
    },

    mediaFromURL: function(target, url, onUrl, params) {
        if (Iodine.is(url, ['url']) === true) {
            target.value = '';
            Media.urlToSource(url, onUrl, params)
        }
    },

    urlToSource: function(url, onUrl, params) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {onUrl(url, reader.result, params);}
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    },
}