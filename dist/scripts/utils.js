function debounce(func, wait, immediate) {
    var timedata;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timedata = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timedata;
        clearTimedata(timedata);
        timedata = setTimedata(later, wait);
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

/**
 * Wrap resource
 */
var wrap = {
    transaction: function(signature) {
        return '<a href="/transaction/?signature='+signature+'" class="underline hover:text-pink-400">'+signature+'</a>'
    },
    token: function(address, tokenPreview) {
        var preview = tokenPreview ? '<span class="ml-2">'+tokenPreview+'</span>' : ''
        return '<a href="/token/?address='+address+'" class="underline hover:text-pink-400">'+address+'</a>'+preview
    },
    pool: function(address, poolPreview) {
        var preview = poolPreview ? '<span class="ml-2">'+poolPreview+'</span>' : ''
        return '<a href="/pool/?address='+address+'" class="underline hover:text-pink-400">'+address+'</a>'+preview
    },
    address: function(address) {
        return '<a href="/address/?address='+address+'" class="underline hover:text-pink-400">'+address+'</a>'
    },
    claim: function(hash) {
        return '<a href="/claim/?hash='+hash+'" class="underline hover:text-pink-400">'+hash+'</a>'
    },
    allowance: function(hash) {
        return '<a href="/allowance/?hash='+hash+'" class="underline hover:text-pink-400">'+hash+'</a>'
    },
    link: function(link) {
        return '<a rel="nofollow" href="'+link+'" class="underline hover:text-pink-400 w-full block truncate pb-1">'+link+'</a>'
    }
}


function showModal(name) {
    document.body.classList.add('overflow-hidden')
    Alpine.store('modal', name)
}

function hideModal() {
    document.body.classList.remove('overflow-hidden')
    Alpine.store('modal', null)
}

function setData(id, data) {
    for (key in data) {
        document.getElementById(id)._x_dataStack[0][key] = data[key]
    }
}

function ajax(url, data, success, error) {try {x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');x.open(data ? 'POST' : 'GET', url, 1);x.onload = function (e) {success && success(this.responseText, this.status)};x.onerror = function (e) {error && error(this.responseText, this.status)};x.send(JSON.stringify(data))} catch (e) {window.console && console.log(e)}};
function gup(e,l){l||(l=location.href),e=e.replace(/[\\[]/,"\\\\[").replace(/[\\]]/,"\\\\]");var n=new RegExp("[\\\\?&]"+e+"=([^&#]*)").exec(l);return null==n?null:n[1]};

/**
 * Set page meta (title, description, etc)
 */
function setPageMeta(resource, data) {
    var desc = ''
    if (resource == 'transaction') {
        document.title = document.title+' '+data.signature
        desc = 'Transaction '+data.signature+' was registered on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'token') {
        document.title = document.title+(data.name ? ' '+data.name : '')+(data.ticker ? ' '+data.ticker : '')
        desc = (data.name ? data.name : data.address)+(data.ticker ? ' '+data.ticker : '')+' was registered on '+new Date(parseInt(data.created)).toLocaleString()+' and has a supply of '+data.supply.replace('-', '')
    } else if (resource == 'pool') {
        document.title = document.title+' '+(data.name ? ' '+data.name : '')+' ('+data.program[0].toUpperCase()+data.program.slice(1)+'-Pool)'
        desc = (data.name ? data.name : data.address)+' is a '+data.program[0].toUpperCase()+data.program.slice(1)+'-Pool registered on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'address') {
        document.title = document.title+' '+data.address
        desc = data.address+' is a public address on the Xeta blockchain'
    }

    document.querySelector('meta[name="description"]').setAttribute('content', desc)
}

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
        if (['INPUT', 'TEXTAREA'].includes(item.tagName)) {
            var v = validate(item)
            if (!v) return;
        }
    }
    return true
}

function formatNumber(val, decimals=0) {
    return parseFloat(val).toLocaleString('en', {maximumFractionDigits: decimals})
}

function formatCurrency(val, decimals=0) {
    return parseFloat(val).toLocaleString('en', {style: 'currency', currency: 'USD', maximumFractionDigits: decimals})
}

function formatTime(date, prep=true) {
    var future = (Date.now() - parseInt(date)) < 0
    var seconds = Math.abs(Math.floor((Date.now() - date) / 1000))
    var interval = seconds / 31536000;
    var i = null
    var format = function(val) {
        if (!prep) return val
        return (future ? 'In ' : '')+val+(!future ? ' ago' : '')
    }

    if (interval > 1) {
        i = Math.floor(interval)
        return format(i + ' year'+(i > 1 ? 's' : ''))
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        i = Math.floor(interval)
        return format(i + ' month'+(i > 1 ? 's' : ''))
    }
    interval = seconds / 86400;
    if (interval > 1) {
        i = Math.floor(interval)
        return format(i + ' day'+(i > 1 ? 's' : ''))
    }
    interval = seconds / 3600;
    if (interval > 1) {
        i = Math.floor(interval)
        return format(i + ' hour'+(i > 1 ? 's' : ''))
    }
    interval = seconds / 60;
    if (interval > 1) {
        i = Math.floor(interval)
        return format(i + ' minute'+(i > 1 ? 's' : ''))
    }
    i = Math.floor(seconds)
    return format(i + ' second'+(i != 1 ? 's' : ''))
}

function timer(expires) {
    var remaining =  parseInt((expires - Date.now()) / 1000)
    if (remaining <= 0) return 'Expired on '+(new Date(parseInt(expires)).toLocaleString())

    var days = parseInt(remaining / 86400)
    var daysRemanining = remaining % 86400
    var hours = parseInt(daysRemanining / 3600)
    var hoursRemaining = daysRemanining % 3600
    var minutes = parseInt(hoursRemaining / 60)
    var minutesRemaining = hoursRemaining % 60
    var seconds = parseInt(minutesRemaining)

    return days+' Days, '+hours+' Hours, '+minutes+' Minutes, '+seconds+' Seconds'
}

function currentPeriod() {
    var now = new Date()
    return now.getUTCFullYear().toString().slice(-2)+('0'+(now.getUTCMonth()+1)).slice(-2)+('0'+now.getUTCDate()).slice(-2)+('0'+now.getUTCHours()).slice(-2)
}