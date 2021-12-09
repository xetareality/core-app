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

    Alpine.store('resource', window.location.pathname.slice(1, -1))
    if (Alpine.sstore('publicKey') && Alpine.sstore('privateKey')) connectWallet(Alpine.sstore('publicKey'), Alpine.sstore('privateKey'))

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
            setPageMeta(resource, data)

            var event = document.createEvent('Event')
            event.initEvent('resourceLoaded', false, false)
            document.dispatchEvent(event)
        })
    }
})

function action(name, values={}) {
    var act = Actions[name]
    var inputs = act.inputs

    // Set existing values for update actions
    if (['address.update', 'claim.update', 'token.update', 'allowance.update'].includes(name)) {
        var resource = Alpine.store(name.split('.')[0].replace('address', 'token'))
        if (!resource) return
        inputs.forEach(function(i) {
            if (resource[i.name] != undefined) {
                if (['strings', 'hashes', 'numbers'].includes(i.type)) i.value = resource[i.name].join(String.fromCharCode(10))
                else if (i.type == 'object') i.value = JSON.stringify(resource[i.name])
                else i.value = resource[i.name]
            }
        })
    }

    setData('input-modal', {inputs: inputs, values: values, title: act.title, description: act.description, function: name})
    showModal('inputModal')
}

function connectWallet(publicKey, privateKey) {
    Alpine.sstore('publicKey', publicKey)
    Alpine.sstore('privateKey', privateKey)
    Xeta.wallet.init({publicKey: publicKey, privateKey: privateKey})
    refreshBalances()
}

function disconnectWallet() {
    Alpine.sstore('publicKey', '')
    Alpine.sstore('privateKey', '')
    Alpine.sstore('account', '')
    Alpine.sstore('secret', '')
    Xeta.wallet.init({publicKey: null, privateKey: null})
}

function refreshBalances() {
    Xeta.balance.readAddressToken({address: Alpine.sstore('publicKey'), token: Xeta.config.xetaAddress}).then(function(data) {
        Alpine.sstore('xetaBalance', data.amount)
    }).catch(function(e) {throw e})
}

var Constants = {
    pixel: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    xetaPrice: 0.01,
    bscAbi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minTokensBeforeSwap","type":"uint256"}],"name":"MinTokensBeforeSwapUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"SwapAndLiquifyEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_baseAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_burnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquifyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setBaseAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setBurnFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setLiquifyAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxTxAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAndLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"target","type":"string"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"unwhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"whitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
    ethAbi: [],
    bscXeta: '0x179960442Ece8dE9f390011b7f7c9b56C74e4D0a',
    ethXeta: '',
    ethBridge: '0x8a3D6e254FD923459F9dC41D3AE32723c6bE5EFB',
    xetaBridge: '1BsR3DGCn95JgR2aB7ZTrvdQ52pjE4i4FRQt2YfGxqq',
}