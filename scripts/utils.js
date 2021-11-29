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
var Wrap = {
    transaction: function(hash) {
        return '<a href="/transaction/?hash='+hash+'" class="hover:text-pink-400">'+hash+'</a>'
    },
    transfer: function(hash) {
        return '<a href="/transfer/?hash='+hash+'" class="hover:text-pink-400">'+hash+'</a>'
    },
    tokenPreview: function(tp, address) {
        return '<span class="ml-1">'+(tp ? (tp.symbol ? tp.symbol : tp.name)+(tp.icon ? '<img class="h-4 w-4 ml-1 -mt-0.5 inline" src="'+tp.icon+'" />' : '') : address)+'</span>'
    },
    xetaPreview: function() {
        return Wrap.tokenPreview({symbol: 'XETA', name: 'Xeta', icon: '/media/favicon.png'})
    },
    token: function(address, tokenPreview) {
        return '<a href="/token/?address='+address+'" class="hover:text-pink-400">'+Wrap.tokenPreview(tokenPreview, address)+'</a>'
    },
    amount: function(amount, token, tokenPreview) {
        return '<a href="/token/?address='+token+'" class="hover:text-pink-400">'+(amount ? amount : 0)+'<span>'+Wrap.tokenPreview(tokenPreview, token)+'</span></a>'
    },
    xeta: function(amount) {
        return '<a href="/token/?address='+Xeta.config.xetaAddress+'" class="hover:text-pink-400">'+(amount ? amount : 0)+'<span>'+Wrap.xetaPreview()+'</span></a>'
    },
    pool: function(address) {
        return '<a href="/pool/?address='+address+'" class="hover:text-pink-400">'+address+'</a>'
    },
    address: function(address) {
        return '<a href="/address/?address='+address+'" class="hover:text-pink-400">'+address+'</a>'
    },
    claim: function(hash) {
        return '<a href="/claim/?hash='+hash+'" class="hover:text-pink-400">'+hash+'</a>'
    },
    allowance: function(hash) {
        return '<a href="/allowance/?hash='+hash+'" class="hover:text-pink-400">'+hash+'</a>'
    },
    link: function(link) {
        return '<a rel="nofollow noopener" href="'+link+'" class="underline hover:text-pink-400 w-full block truncate pb-1">'+link.split('?')[0].slice(0, 50)+(link.split('?')[0].length > 50 ? '...' : '')+'</a>'
    },
    label: function(text, color) {
        return '<span class="bg-'+color+'-500 bg-opacity-75 rounded-2xl px-3 py-1 ml-2 text-xs font-normal uppercase">'+text+'</span>'
    },
}


function showModal(name) {
    document.body.classList.add('overflow-hidden')
    Alpine.store('modal', name)
}

function hideModal() {
    document.body.classList.remove('overflow-hidden')
    Alpine.store('modal', '')
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
        document.title = [document.title, data.hash].join(' ')
        desc = 'Xeta transaction '+data.hash+' was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'transfer') {
        document.title = [document.title, data.hash].join(' ')
        desc = 'Xeta transfer '+data.hash+' was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'token') {
        document.title = [document.title, data.name].join(' ')
        desc = 'Xeta token '+data.address+' ('+data.name+') was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'pool') {
        document.title = [document.title, data.name, data.program[0].toUpperCase()+data.program.slice(1)+' Pool'].join(' ')
        desc = 'Xeta pool '+data.address+' ('+data.name+') was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'allowance') {
        document.title = [document.title, data.hash].join(' ')
        desc = 'Xeta allowance '+data.hash+' was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'claim') {
        document.title = [document.title, data.hash].join(' ')
        desc = 'Xeta claim '+data.hash+' was created on '+new Date(parseInt(data.created)).toLocaleString()
    } else if (resource == 'address') {
        document.title = [document.title, data.address].join(' ')
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

var Grid = {
    add: function(grid, node) {
        Grid.next(grid).appendChild(node)
    },
    next: function(grid) {
        var columns = grid.querySelectorAll('.column')
        var candidates = []
        var lengths = []
        var width = document.documentElement.clientWidth

        for (var i = 0; i < columns.length; i++) {
            var small = i < 2
            var large = i < 3
            if ((width < 768 && small) || (width >= 768 && width < 1024 && large) || (width >= 1024)) {
                candidates.push(columns[i])
                lengths.push(columns[i].children.length)
            }
        }

        return candidates[lengths.indexOf(Math.min.apply(null, lengths))]
    },
    clear: function(grid) {
        Array.from(grid.querySelectorAll('.column')).forEach(function(c) {
            Array.from(c.children).forEach(function(node) {node.remove()})
        })
    },
    layout: function(grid, source, clear=false) {
        setTimeout(function() {
            if (clear) Grid.clear(grid)
            var items = Array.from(source.querySelectorAll('.token'))
            items.forEach(function(i) {Grid.add(grid, i)})
        }, 0)
    },
}