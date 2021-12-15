var Media = {
    onMedia: function (media, file, obj) {
        media.blob = obj.src
        media.mime = file.type
        media.type = file.type.split('/')[0]
        media.loaded = true

        media.uploading = true
        if (['image', 'video'].includes(media.type)) {
            ajax('https://interface.xetareality.com/media', {data: obj.src}, function(data) {
                data = JSON.parse(data)
                media.id = data.id
                media.uploading = false
            }, function(status) {
                return
            })
        }
    },
    onUrl: function (media, url, obj) {
        media.blob = object
        media.mime = obj.split(';base64,')[0].replace('data:', '')
        media.type = obj.split(';base64,')[0].replace('data:', '').split('/')[0]
        media.loaded = true

        media.uploading = true
        if (['image', 'video'].includes(media.type)) {
            ajax('https://api.com/media', {raw: obj}, function(data) {
                data = JSON.parse(data)
                media.id = data.id
                media.uploading = false
            }, function(status) {
                return
            })
        }
    },
    /**
     * Init dropzone component
     * Can handle media upload via input, via url
     */
    dropzone: function (element, onMedia, onUrl, params) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });
        ['dragenter', 'dragover'].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                element.querySelector('.gallery').classList.remove('bg-gray-100');
                element.querySelector('.gallery').classList.add('bg-gray-300');
            }, false);
        });
        ['dragleave', 'drop'].forEach(function(eventName) {
            element.addEventListener(eventName, function(e) {
                element.querySelector('.gallery').classList.remove('bg-gray-300');
                element.querySelector('.gallery').classList.add('bg-gray-100');
            }, false);
        });

        element.addEventListener('drop', function(e) {
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
    processFiles: function (files, onMedia, params) {
        var filesArray = Array.from(files)
        filesArray.forEach(function(file) {
            Media.addMedia(file, onMedia, params)
        });
    },
    addMedia: function (file, onMedia, params) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            var obj = document.createElement('object')
            obj.src = reader.result
            onMedia && onMedia(file, obj, params)
        };
    },
    mediaFromURL: function (target, url, onUrl, params) {
        if (Iodine.is(url, ['url']) === true) {
            target.value = '';
            Media.urlToSource(url, onUrl, params)
        }
    },
    urlToSource: function (url, onUrl, params) {
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