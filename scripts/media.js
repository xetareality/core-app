/** Iodine Form Validation **/
class e{constructor(){this.locale=void 0,this.messages=this._defaultMessages(),this.defaultFieldName="Value"}_dateCompare(e,t,r,s=!1){return!!this.isDate(e)&&!(!this.isDate(t)&&!this.isInteger(t))&&(t="number"==typeof t?t:t.getTime(),"less"===r&&s?e.getTime()<=t:"less"!==r||s?"more"===r&&s?e.getTime()>=t:"more"!==r||s?void 0:e.getTime()>t:e.getTime()<t)}_defaultMessages(){return{after:"The date must be after: '[PARAM]'",afterOrEqual:"The date must be after or equal to: '[PARAM]'",array:"[FIELD] must be an array",before:"The date must be before: '[PARAM]'",beforeOrEqual:"The date must be before or equal to: '[PARAM]'",boolean:"[FIELD] must be true or false",date:"[FIELD] must be a date",different:"[FIELD] must be different to '[PARAM]'",endingWith:"[FIELD] must end with '[PARAM]'",email:"[FIELD] must be a valid email address",falsy:"[FIELD] must be a falsy value (false, 'false', 0 or '0')",in:"[FIELD] must be one of the following options: [PARAM]",integer:"[FIELD] must be an integer",json:"[FIELD] must be a parsable JSON object string",maximum:"[FIELD] must not be greater than '[PARAM]' in size or character length",minimum:"[FIELD] must not be less than '[PARAM]' in size or character length",max:"[FIELD] must be less than or equal to [PARAM]",min:"[FIELD] must be greater than or equal to [PARAM]",maxLength:"[FIELD] must not be greater than '[PARAM]' in character length",minLength:"[FIELD] must not be less than '[PARAM]' character length",notIn:"[FIELD] must not be one of the following options: [PARAM]",numeric:"[FIELD] must be numeric",optional:"[FIELD] is optional",regexMatch:"[FIELD] must satisify the regular expression: [PARAM]",required:"[FIELD] must be present",same:"[FIELD] must be '[PARAM]'",startingWith:"[FIELD] must start with '[PARAM]'",string:"[FIELD] must be a string",truthy:"[FIELD] must be a truthy value (true, 'true', 1 or '1')",url:"[FIELD] must be a valid url",uuid:"[FIELD] must be a valid UUID"}}addRule(t,r){e.prototype[`is${t[0].toUpperCase()}${t.slice(1)}`]=r}getErrorMessage(e,t){let{param:r,field:s}="object"==typeof t?t:{param:t,field:void 0};const i=e.split(":");let a=i.shift();r=r||i.join(":"),["after","afterOrEqual","before","beforeOrEqual"].includes(a)&&(r=new Date(parseInt(r)).toLocaleTimeString(this.locale,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"numeric",hour12:!1}));let n=[null,void 0,""].includes(r)?this.messages[a]:this.messages[a].replace("[PARAM]",r);return[null,void 0,""].includes(s)?n.replace("[FIELD]",this.defaultFieldName):n.replace("[FIELD]",s)}isAfter(e,t){return this._dateCompare(e,t,"more",!1)}isAfterOrEqual(e,t){return this._dateCompare(e,t,"more",!0)}isArray(e){return Array.isArray(e)}isBefore(e,t){return this._dateCompare(e,t,"less",!1)}isBeforeOrEqual(e,t){return this._dateCompare(e,t,"less",!0)}isBoolean(e){return[!0,!1].includes(e)}isDate(e){return e&&"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e)}isDifferent(e,t){return e!=t}isEndingWith(e,t){return this.isString(e)&&e.endsWith(t)}isEmail(e){return new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$").test(String(e).toLowerCase())}isFalsy(e){return[0,"0",!1,"false"].includes(e)}isIn(e,t){return(t="string"==typeof t?t.split(","):t).includes(e)}isInteger(e){return Number.isInteger(e)&&parseInt(e).toString()===e.toString()}isJson(e){try{return"object"==typeof JSON.parse(e)}catch(e){return!1}}isMaximum(e,t){return console.warn("isMaximum (maximum) is deprecated. Use isMax (max) for validating the maximum value of a number or isMaxLength (maxLength) for validating the length of a string"),e="string"==typeof e?e.length:e,parseFloat(e)<=t}isMinimum(e,t){return console.warn("isMinimum (minimum) is deprecated. Use isMin (min) for validating the minimum value of a number or isMinLength (minLength) for validating the length of a string"),e="string"==typeof e?e.length:e,parseFloat(e)>=t}isMax(e,t){return parseFloat(e)<=t}isMin(e,t){return parseFloat(e)>=t}isMaxLength(e,t){return"string"==typeof e&&e.length<=t}isMinLength(e,t){return"string"==typeof e&&e.length>=t}isNotIn(e,t){return!this.isIn(e,t)}isNumeric(e){return!isNaN(parseFloat(e))&&isFinite(e)}isOptional(e){return[null,void 0,""].includes(e)}isRegexMatch(e,t){return new RegExp(t).test(String(e))}isRequired(e){return!this.isOptional(e)}isSame(e,t){return e==t}isStartingWith(e,t){return this.isString(e)&&e.startsWith(t)}isString(e){return"string"==typeof e}isTruthy(e){return[1,"1",!0,"true"].includes(e)}isUrl(e){return new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$").test(String(e).toLowerCase())}isUuid(e){return new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$").test(String(e).toLowerCase())}is(e,t=[]){if(!t.length)return!0;if("optional"===t[0]&&this.isOptional(e))return!0;for(let r in t){if("optional"===t[r])continue;const s=t[r].split(":"),i=s.shift();if(!this["is"+(i[0].toUpperCase()+i.slice(1))].apply(this,[e,s.join(":")]))return t[r]}return!0}isValid(e,t=[]){return!0===this.is(e,t)}setErrorMessages(e){this.messages=e}setErrorMessage(e,t){this.messages[e]=t}setLocale(e){this.locale=e}setDefaultFieldName(e){this.defaultFieldName=e}}window.Iodine=new e,Iodine=new e();

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