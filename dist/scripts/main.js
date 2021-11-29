document.addEventListener('alpine:init', () => {
    // Init
    Alpine.store('pool', {})
    Alpine.store('transaction', {})
    Alpine.store('transfer', {})
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

    if (Alpine.sstore('publicKey')) connectWallet(Alpine.sstore('publicKey'))

    // Set environment
    if (gup('dev')) Alpine.sstore('dev', !!gup('dev'))
    Xeta.config.init({dev: Alpine.sstore('dev')}) 

    // Load resource
    var resource = window.location.pathname.slice(1, -1)
    if (['pool', 'address', 'transaction', 'token', 'transfer', 'claim', 'allowance'].includes(resource)) {
        Xeta[resource].read({[Xeta.utils.key(resource)]: gup(Xeta.utils.key(resource))}, {preview: true}).then(function(data) {
            if (!data) return
            Alpine.store(resource, data)
            if (resource == 'address') Alpine.store('token', data.token)
            if (resource == 'pool') Alpine.store(data.program, new Xeta[data.program](data))
            setPageMeta(resource, data)

            var event = document.createEvent('Event')
            event.initEvent('resourceLoaded', false, false)
            document.dispatchEvent(event)
        })
    }
})

function connectWallet() {
    Xeta.wallet.init({
        publicKey: Alpine.sstore('publicKey'),
        privateKey: Alpine.sstore('privateKey'),
        account: Alpine.sstore('account'),
        secret: Alpine.sstore('secret'),
    })
    
    refreshBalances()
}

function disconnectWallet() {
    Alpine.sstore('publicKey', '')
    Alpine.sstore('privateKey', '')
    Alpine.sstore('account', '')
    Alpine.sstore('secret', '')
}

function refreshBalances() {
    Xeta.balance.scanAddressAmount({address: Alpine.sstore('publicKey')}).then(function(data) {
        Alpine.sstore('balances', data)
    }).catch(function(e) {alert(e)})
}