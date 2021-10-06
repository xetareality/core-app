document.addEventListener('alpine:init', () => {
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
})

const API = 'http://127.0.0.1:8787'
const Constants = {
    xetaAddress: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
}

function connectWallet(publicKey) {
    Alpine.lstore('publicKey', publicKey)
    refreshBalances(publicKey)
}

function disconnectWallet() {
    Alpine.lstore('publicKey', '')
}

function refreshBalances(publicKey) {
    ajax(API+'/balances?address='+publicKey, null, function(data) {
        Alpine.lstore('balances', JSON.parse(data))
    })
}

const MAPPING = {
    transaction: {
        signature: ['transaction', 1],
        from: ['address', 1],
        to: ['address', 1],
        sender: ['address', 1],
        asset: ['asset', 1],
        amount: ['number', 1],
        fee: ['number', 1],
        nonce: ['number', 1],
        created: ['timestamp', 1],
        message: ['text', 1],
        function: ['string', 1],
        delegate: ['boolean', 1],
        error: ['string', 1],
        confirmed: ['timestamp', 1],
        input: ['transaction', 1],
        outputs: ['transactions', 1],
    },
    asset: {
        address: ['string', 1],
        creator: ['address', 1],
        name: ['string', 1],
        ticker: ['string', 1],
        supply: ['number', 1],
        created: ['timestamp', 1],

        description: ['string', 1],
        links: ['links', 1],
        icon: ['string', 0],
        object: ['string', 0],

        mime: ['string', 0],
        meta: ['string', 0],
        hash: ['string', 0],
        fingerprint: ['string', 0],
        cluster: ['string', 0],
    },
    pool: {
        address: ['pool', 1],
        creator: ['address', 1],
        asset: ['asset', 1],
        program: ['string', 1],
        created: ['timestamp', 1],

        name: ['string', 1],
        mechanism: ['string', 1],
        choices: ['strings', 0],
        rate: ['number', 1],
        percentage: ['number', 1],
        probability: ['number', 1],

        expires: ['timestamp', 1],
        minAmount: ['number', 1],
        maxAmount: ['number', 1],
        minTime: ['timedelta', 1],
        maxTime: ['timedelta', 1],
        transfersLimit: ['number', 1],
        claimsLimit: ['number', 1],
        assetLimit: ['number', 1],
        xetaLimit: ['number', 1],
        assetTarget: ['number', 1],
        xetaTarget: ['number', 1],

        xetaBalance: ['number', 1],
        assetBalance: ['number', 1],
        xetaTurnover: ['number', 1],
        assetTurnover: ['number', 1],
        transfersCount: ['number', 1],
        claimsCount: ['number', 1],
        closed: ['boolean', 1],
        leader: ['address', 1],
        answers: ['strings', 0],
    }
}