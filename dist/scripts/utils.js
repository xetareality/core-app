function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function strip(obj) {
    var out = {}
    for (var k in obj) {
        if (obj[k] != null && obj[k] != undefined) out[k] = obj[k]
    }
    return out
}

function showModal(name) {
    document.body.classList.add('overflow-hidden')
    Alpine.store('modal', name)
}

function hideModal() {
    document.body.classList.remove('overflow-hidden')
    Alpine.store('modal', null)
}

function refreshAll() {
    Array.prototype.slice.call(document.querySelectorAll('*[x-data]')).filter(function (el) {return !!el.__x})
    .forEach(function (el) {el.__x.updateElements(el)});
}

function refreshElement(el) {
    el.__x.updateElements(el);
}

function ajax(url, data, success, error) {try {x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');x.open(data ? 'POST' : 'GET', url, 1);x.onload = function (e) {success && success(this.responseText, this.status)};x.onerror = function (e) {error && error(this.responseText, this.status)};x.send(JSON.stringify(data))} catch (e) {window.console && console.log(e)}};
function gup(e,l){l||(l=location.href),e=e.replace(/[\\[]/,"\\\\[").replace(/[\\]]/,"\\\\]");var n=new RegExp("[\\\\?&]"+e+"=([^&#]*)").exec(l);return null==n?null:n[1]};


/**
 * Validation
 */

function validate(e) {
    if (!e.dataset.rules) return true
    var rules = JSON.parse(e.dataset.rules)
    var valid = Iodine.is(e.value, rules)

    if (valid === true) {
        e.removeAttribute('data-error')
        e.nextElementSibling.classList.remove('block')
        e.nextElementSibling.classList.add('hidden')
        return true
    } else {
        e.setAttribute('data-error', '1')
        e.nextElementSibling.classList.remove('hidden')
        e.nextElementSibling.classList.add('block')
    }

    var message = Iodine.getErrorMessage(valid)
    e.nextElementSibling.innerHTML = message;
    return false
}

function validForm(form) {
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if (item.name) {
            var v = validate(item)
            if (!v) return;
        }
    }
    return true
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    var i = null

    if (interval > 1) {
        i = Math.floor(interval)
        return i + ' year'+(i > 1 ? 's' : '');
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        i = Math.floor(interval)
        return i + ' month'+(i > 1 ? 's' : '');
    }
    interval = seconds / 86400;
    if (interval > 1) {
        i = Math.floor(interval)
        return i + ' day'+(i > 1 ? 's' : '');
    }
    interval = seconds / 3600;
    if (interval > 1) {
        i = Math.floor(interval)
        return i + ' hour'+(i > 1 ? 's' : '');
    }
    interval = seconds / 60;
    if (interval > 1) {
        i = Math.floor(interval)
        return i + ' minute'+(i > 1 ? 's' : '');
    }
    i = Math.floor(seconds)
    return i + ' second'+(i != 1 ? 's' : '');
}

function currentPeriod() {
    var now = new Date()
    return now.getUTCFullYear().toString().slice(-2)+('0'+(now.getUTCMonth()+1)).slice(-2)+('0'+now.getUTCDate()).slice(-2)+('0'+now.getUTCHours()).slice(-2)
}