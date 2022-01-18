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
        return '<span>'+(tp ? (tp.symbol ? tp.symbol : tp.name)+(tp.preview ? '<img class="h-4 w-4 ml-1 -mt-0.5 inline" src="'+tp.preview+'" onerror="this.remove()" />' : '') : address)+'</span>'
    },
    xetaPreview: function() {
        return Wrap.tokenPreview({symbol: 'XETA', name: 'Xeta', preview: '/media/favicon.png'})
    },
    token: function(address) {
        return '<a href="/token/?address='+address+'" class="hover:text-pink-400">'+address+'</a>'
    },
    amount: function(amount, token, tokenPreview, precision=2) {
        return '<a href="/token/?address='+token+'" class="hover:text-pink-400">'+(amount != null ? '<span class="mr-1">'+formatNumber(amount, precision)+'</span>' : '')+'<span>'+(token && tokenPreview ? Wrap.tokenPreview(tokenPreview, token) : 'Tokens')+'</span></a>'
    },
    xeta: function(amount, precision=2) {
        return '<a href="/token/?address='+Xeta.config.xetaAddress+'" class="hover:text-pink-400">'+(amount != null ? '<span class="mr-1">'+formatNumber(amount, precision)+'</span>' : '')+'<span>'+Wrap.xetaPreview()+'</span></a>'
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
        return '<span class="bg-'+color+'-500 bg-opacity-75 rounded-2xl px-3 py-1 ml-2 text-xs font-normal uppercase select-none">'+text+'</span>'
    },
    collection: function(address) {
        return '<a href="/collection/?address='+address+'" class="hover:text-pink-400">'+address+'</a>'
    },
    resource: function(resource) {
        var r = {a: 'allowance', w: 'address', t: 'token', x: 'transfer', c: 'claim', p: 'pool', l: 'link'}[resource.split(':')[0]]
        if (r) return Wrap[r](resource.split(':').slice(1).join(':'))
        else return resource
    }
}


// function showModal(name) {
//     document.body.classList.add('overflow-hidden')
//     Alpine.store('modal', name)
// }

function showModal(name, data) {
    setTimeout(function() {
        if (data) {
            var el = document.getElementsByName(name)[0]
            var changed = false
            for (key of Object.keys(data)) {
                if (JSON.stringify(el._x_dataStack[0][key]) != JSON.stringify(data[key])) changed = true
                el._x_dataStack[0][key] = data[key]
            }

            if (changed) el._x_dataStack[0].init() // Only re-init if settable data has changed, this allows to retain form inputs on accidental closures
        }

        document.body.classList.add('overflow-hidden')
        Alpine.store('modal', name)
    }, 0)
}


function hideModal() {
    document.body.classList.remove('overflow-hidden')
    Alpine.store('modal', '')
}

// function setData(id, data) {
//     setTimeout(function() {
//         var changed = false
//         for (key of Object.keys(data)) {
//             if (JSON.stringify(document.getElementById(id)._x_dataStack[0][key]) != JSON.stringify(data[key])) changed = true
//             document.getElementById(id)._x_dataStack[0][key] = data[key]
//         }

//         // Only re-init if settable data has changed
//         // This allows to retain form inputs on accidental closures
//         if (changed) document.getElementById(id)._x_dataStack[0].init()
//     }, 0)
// }

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
    document.querySelector("meta[property='og:description']").setAttribute('content', desc)
    document.querySelector("meta[name='twitter:description']").setAttribute('content', desc)
    document.querySelector("meta[property='og:title']").setAttribute('content', document.title)
    document.querySelector("meta[name='twitter:title']").setAttribute('content', document.title)
}

function validate(e) {
    if (!e.dataset.rules) return true
    var rules = JSON.parse(e.dataset.rules)
    if (!rules.includes('required') && !e.value) return true
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
    var elements = form.elements
    var valid = true
    
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i]
        if (['INPUT', 'TEXTAREA'].includes(item.tagName)) {
            if (!validate(item)) valid = false
        }
    }
    return valid
}

function formatNumber(val, decimals=0) {
    return (Math.floor(parseFloat(val)*(10**decimals))/(10**decimals)).toLocaleString('en', {maximumFractionDigits: decimals})
}

function formatCurrency(val, decimals=0) {
    return (Math.floor(parseFloat(val)*(10**decimals))/(10**decimals)).toLocaleString('en', {style: 'currency', currency: 'USD', maximumFractionDigits: decimals})
}

function formatTime(date, prep=true) {
    var future = (Date.now() - new Date(date).getTime()) < 0
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

function formatDetails(data, resource) {
    resource = resource || Alpine.store('resource')
    var details = {}
    for (var k in data) {
        if (['amount', 'maxAmount', 'minAmount', 'tokenBalance', 'tokenTurnover', 'supply', 'reserve'].includes(k)) {
            details[k] = Wrap.amount(data[k], data.token, data.tokenPreview, 8)
        } else if (['fee', 'xetaBalance', 'xetaTurnover'].includes(k)) {
            details[k] = Wrap.xeta(data[k], 8)
        } else if (['created', 'confirmed', 'expires', 'unlocks'].includes(k)) {
            if (Date.now()-data[k] > 30*24*60*60*1000) details[k] = new Date(data[k]).toLocaleString()
            else details[k] = formatTime(new Date(data[k]))+' ('+new Date(data[k]).toLocaleString()+')'
        } else if (['minTime', 'maxTime'].includes(k)) {
            details[k] = formatTime(new Date(Date.now()-parseInt(data[k])*1000), false)
        } else if (['origin'].includes(k)) {
            details[k] = Wrap.transaction(data[k])
        } else if (['pool'].includes(k)) {
            details[k] = Wrap.pool(data[k])
        } else if (['token'].includes(k)) {
            details[k] = Wrap.token(data[k])
        } else if (['address'].includes(k)) {
            if (resource == 'token') details[k] = Wrap.token(data[k])
            else if (resource == 'pool') details[k] = Wrap.pool(data[k])
            else if (resource == 'address') details[k] = String(data[k])
        } else if (['hash'].includes(k)) {
            if (resource == 'transaction') details[k] = Wrap.transaction(data[k])
            else if (resource == 'transfer') details[k] = Wrap.transfer(data[k])
            else if (resource == 'claim') details[k] = Wrap.claim(data[k])
            else if (resource == 'allowance') details[k] = Wrap.allowance(data[k])
        } else if (['from', 'to', 'creator', 'sender', 'owner'].includes(k)) {
            details[k] = Wrap.address(data[k])
        } else if (['links'].includes(k)) {
            details[k] = data[k].map(function(l) {return Wrap.link(l)}).join('')
        } else if (['outputs'].includes(k)) {
            details[k] = data[k].map(function(i) {
                return i.map(function(j) {
                    var r = {a: 'allowance', t: 'token', x: 'transfer', c: 'claim', p: 'pool'}[j.split(':')[0]]
                    return r[0].toUpperCase()+r.slice(1)+' '+Wrap[r](j.split(':')[1])
                }).join('<br>')
            }).join('<br>')
        } else if (['instructions', 'meta'].includes(k)) {
            details[k] = JSON.stringify(data[k])
        } else if (['program', 'mechanism', 'whole', 'frozen', 'sponsored'].includes(k)) {
            details[k] = String(data[k]).toUpperCase()
        } else details[k] = String(data[k])

        if (details[k] && details[k].includes('[object Object]')) delete details[k]
    }
    return details
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