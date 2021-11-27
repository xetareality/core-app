document.addEventListener('alpine:init', () => {
    // Init
    Alpine.store('pool', {})
    Alpine.store('transaction', {})
    Alpine.store('token', {})
    Alpine.store('address', {})
    Alpine.store('allowance', {})
    Alpine.store('claim', {})
    Alpine.store('balances', [])

    // Session store
    Alpine.sstore = function(name, value) {
        if (value != null && value != undefined) {
            sessionStorage.setItem('_xeta:'+name, JSON.stringify(value))
            Alpine.store(name, value)
        } else {
            value = JSON.parse(sessionStorage.getItem('_xeta:'+name))
            if (value != null) Alpine.store(name, value)
        }

        return Alpine.store(name)
    }

    // Local store
    Alpine.lstore = function(name, value) {
        if (value != null) {
            sessionStorage.setItem('_xeta:'+name, JSON.stringify(value))
            Alpine.store(name, value)
        } else {
            value = JSON.parse(sessionStorage.getItem('_xeta:'+name))
            if (value != null) Alpine.store(name, value)
        }

        return Alpine.store(name)
    }

    Alpine.magic('sstore', () => {return (name, value) => Alpine.sstore(name, value)})
    Alpine.magic('lstore', () => {return (name, value) => Alpine.lstore(name, value)})

    if (Alpine.lstore('publicKey')) connectWallet(Alpine.lstore('publicKey'))

    // Load resource
    var resource = window.location.pathname.slice(1, -1)
    if (['pool', 'address', 'transaction', 'token', 'claim', 'allowance'].includes(resource)) {
        var key = resource == 'transaction' ? gup('signature') : gup('address')
        Xeta[resource].get({[resource == 'transaction' ? 'signature' : 'address']: key, extended: true}).then(function(data) {
            Alpine.store(resource, data)
            if (resource == 'pool') Alpine.store(data.program, new Xeta[data.program](data))
            setPageMeta(resource, data)

            var event = document.createEvent('Event')
            event.initEvent('resourceLoaded', false, false)
            document.dispatchEvent(event)
        })
    }
})


function connectWallet() {
    Xeta.wallet.connect({
        publicKey: Alpine.sstore('publicKey'),
        privateKey: Alpine.sstore('privateKey'),
        seed: Alpine.sstore('seed'),
        password: Alpine.sstore('password'),
        networkEndpoint: 'http://127.0.0.1:3000',
        interfaceEndpoint: 'http://127.0.0.1:8787'})
    
    refreshBalances()
}

function disconnectWallet() {
    Alpine.sstore('publicKey', '')
    Alpine.sstore('privateKey', '')
    Alpine.sstore('seed', '')
    Alpine.sstore('password', '')
}

function refreshBalances() {
    Xeta.balance.scanByAddress({address: Alpine.sstore('publicKey')}).then(function(data) {
        Alpine.sstore('balances', data)
    }).catch(function(e) {alert(e)})
}