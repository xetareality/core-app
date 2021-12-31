var Infos = {
    address: {
        address: 'Associated address',
        name: 'Profile name or title',
        description: 'Profile description text',
        links: 'A list of profile links',
        meta: 'Metadata as JSON object',
        preview: 'Profile preview image URL',
        category: 'Profile category or tag',
    },
    allowance: {
        allowance: 'Associated allowance hash',
        spender: 'Spender address who can spend tokens on your behalf, up to the specified amount',
        token: 'Spendable token by the spender address',
        amount: 'Spendable amount by the spender address',
    },
    claim: {
        claim: 'Associated claim hash',
        owner: 'Assigned recipient of the claim',
        token: 'Token associated with the claim',
        tokenAmount: 'Claimable token amount',
        xetaAmount: 'Claimable XETA amount',
        expires: 'Datetime after which the claim becomes invalid',
        unlocks: 'Datetime after which the claim can be redeemed',
        frozen: 'Freeze a claim to prevent transfers',
        category: 'Claim category or tag',
        meta: 'Metadata as JSON object',
        answer: 'Claimed answer',
        number: 'Claimed number',
    },
    pool: {
        pool: 'Associated pool address',
        token: 'Primary token used by the pool',
        program: 'Pool program identifier',
        name: 'Pool name or title',
        description: 'Pool description text',
        mechanism: 'Custom program mechanism',
        candidates: 'List of claimable candidates',
        rate: 'Program rate, e.g. for interest',
        percentage: 'Program percentage (1 = 100%)',
        number: 'Custom program number',
        answers: 'List of correctly claimed answers',
        meta: 'Metadata as JSON object',
        expires: 'Datetime after which the pool expires',
        minAmount: 'Minimum amount for transfers to the pool',
        maxAmount: 'Maximum amount for transfers to the pool',
        minTime: 'Minimum time for locked claims',
        maxTime: 'Maximum time for locked claims',
        transfersLimit: 'Maximum number of transfers to the pool',
        claimsLimit: 'Maximum number of claims from the pool',
        tokenTarget: 'Minimum amount of tokens to consider the pool successful',
        xetaTarget: 'Minimum amount of XETA to consider the pool successful',
        tokenLimit: 'Maximum amount of tokens to consider the pool successful',
        xetaLimit: 'Maximum amount of XETA to consider the pool successful',
    },
    token: {
        token: 'Associated token address',
        name: 'Token name',
        description: 'Token description text',
        links: 'A list of token links',
        meta: 'Metadata as JSON object',
        preview: 'Token icon or NFT image URL',
        symbol: 'Fungible token symbol',
        supply: 'Fungible token supply',
        reserve: 'Fungible token reserve supply',
        owner: 'Assigned NFT recipient',
        object: 'Associated NFT object',
        mime: 'Associated NFT object mime type',
        content: 'Associated NFT content hash',
        frozen: 'Freeze a token to prevent transfers',
        category: 'Token category or tag',
    },
    transfer: {
        transfer: 'Associated transfer hash',
        to: 'Transfer recipient address',
        token: 'Token to be transferred',
        amount: 'Amount for fungible token transfers',
        from: 'From address in case of allowance',
        message: 'Text message for the transfer',
    },
    custom: {
        pool: 'Associated pool address',
        token: 'Associated token address',
        claim: 'Associated claim hash',
        amount: 'Amount to be transferred',
        unlocks: 'Datetime after which the claim can be redeemed',
        expires: 'Datetime after which the claim becomes invalid',
        collateralization: 'Collateralization rate (e.g. 2.5 = 250%)',
        percentage: 'Percentage to withdraw (empty or 1 = 100%)',
        tokenAmount: 'Token amount to deposit',
        xetaAmount: 'XETA amount to deposit',
        answer: 'Claimed answer',
        number: 'Claimed number',
        to: 'New owner address',
    },
}

var Actions = {
    /**
     * Address
     */
    'address.update': {
        title: 'Update Address',
        description: `
        Update address values such as name, description or links.
        These will be shown on top of your address page.
        Leave values empty, if you don't want them to be updated.`,
        confirmation: `You will update the connected wallet address info.`,
        inputs: [
            {name: 'name', type: 'string', required: false},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'preview', type: 'string', required: false},
            {name: 'category', type: 'string', required: false},
        ],
    },
    /**
     * Allowance
     */
    'allowance.update': {
        title: 'Update Allowance',
        description: `
        Create an allowance for an address.
        This will allow this address to spend your funds.
        If there is a previous allowance for the same token and spender, it will overwrite it.`,
        confirmation: `You will allow someone to spend your tokens.`,
        inputs: [
            {name: 'spender', type: 'hash', required: true, suggest: 'addresses'},
            {name: 'token', type: 'hash', required: true, suggest: 'fts'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    /**
     * Claim
     */
    'claim.transfer': {
        title: 'Transfer Claim',
        description: `
        Transfer a claim to another address.`,
        confirmation: `You will transfer a claim to the specified address.`,
        inputs: [
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
            {name: 'to', type: 'hash', required: true, suggest: 'addresses'},
        ],
    },
    'claim.create': {
        title: 'Create Claim',
        description: `
        Issue a new claim to someone for a certain amount.`,
        confirmation: `You will create a new claim.`,
        inputs: [
            {name: 'owner', type: 'hash', required: true, suggest: 'addresses'},
            {name: 'token', type: 'hash', required: true, suggest: 'tokens'},
            {name: 'tokenAmount', type: 'amount', required: true},
            {name: 'xetaAmount', type: 'amount', required: false},
            {name: 'expires', type: 'timestamp', required: false},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'frozen', type: 'boolean', required: false},
            {name: 'category', type: 'string', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'answer', type: 'string', required: false},
            {name: 'number', type: 'number', required: false},
        ]
    },
    'claim.update': {
        title: 'Update Claim',
        description: `
        Update an existing claim that you've created previously.
        Leave values empty, if you don't want them to be updated.`,
        confirmation: `You will update the specified claim.`,
        inputs: [
            {name: 'claim', type: 'hash', required: true},
            {name: 'tokenAmount', type: 'amount', required: false},
            {name: 'xetaAmount', type: 'amount', required: false},
            {name: 'expires', type: 'timestamp', required: false},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'frozen', type: 'boolean', required: false},
            {name: 'category', type: 'string', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'answer', type: 'string', required: false},
            {name: 'number', type: 'number', required: false},
        ],
    },
    'claim.resolve': {
        title: 'Resolve Claim',
        description: `
        Mark a claim that you've created as resolved.
        A claim cannot be transferred or changed, once it is resolved.`,
        confirmation: `You will resolve the specified claim.`,
        inputs: [
            {name: 'claim', type: 'hash', required: true}
        ],
    },
    /**
     * Pool
     */
    'pool.create': {
        title: 'Create Pool',
        description: `
        Create a new pool for a token.
        The configuration is final and once launched, cannot be changed. Documentation for individual pool programs can be accessed under https://docs.xetareality.com/programs/`,
        confirmation: `You will create a new pool.`,
        inputs: [
            {name: 'token', type: 'string', required: true, suggest: 'tokens'},
            {name: 'program', type: 'string', required: true, suggest: 'programs'},
            {name: 'name', type: 'string', required: false},
            {name: 'description', type: 'string', required: false},
            {name: 'mechanism', type: 'string', required: false},
            {name: 'candidates', type: 'strings', required: false},
            {name: 'rate', type: 'number', required: false},
            {name: 'percentage', type: 'number', required: false},
            {name: 'number', type: 'number', required: false},
            {name: 'answers', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'expires', type: 'timestamp', required: false},
            {name: 'minAmount', type: 'amount', required: false},
            {name: 'maxAmount', type: 'amount', required: false},
            {name: 'minTime', type: 'integer', required: false},
            {name: 'maxTime', type: 'integer', required: false},
            {name: 'transfersLimit', type: 'integer', required: false},
            {name: 'claimsLimit', type: 'integer', required: false},
            {name: 'tokenTarget', type: 'amount', required: false},
            {name: 'xetaTarget', type: 'amount', required: false},
            {name: 'tokenLimit', type: 'amount', required: false},
            {name: 'xetaLimit', type: 'amount', required: false},
        ]
    },
    /**
     * Token
     */
    'token.create': {
        title: 'Create Token',
        description: `
        Create a new token.
        A non-fungible token is created if supply is left empty.`,
        confirmation: `You will create a new token.`,
        inputs: [
            {name: 'name', type: 'string', required: true},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'preview', type: 'string', required: false},

            // FT
            {name: 'symbol', type: 'string', required: false},
            {name: 'supply', type: 'amount', required: false},
            {name: 'reserve', type: 'amount', required: false},

            // NFT
            {name: 'owner', type: 'string', required: false},
            {name: 'object', type: 'string', required: false},
            {name: 'mime', type: 'string', required: false},
            {name: 'content', type: 'string', required: false},
            {name: 'frozen', type: 'boolean', required: false},
            {name: 'category', type: 'string', required: false},
        ]
    },
    'token.update': {
        title: 'Update Token',
        description: `
        Update a token that you have created.
        Leave values empty, if you don't want them to be updated.`,
        confirmation: `You will update your existing token.`,
        inputs: [
            {name: 'token', type: 'hash', required: true, suggest: 'tokens'},
            {name: 'name', type: 'string', required: false},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'preview', type: 'string', required: false},
            {name: 'frozen', type: 'boolean', required: false},
            {name: 'category', type: 'string', required: false},
            {name: 'mime', type: 'string', required: false},
        ],
    },
    'token.mint': {
        title: 'Mint Reserve',
        description: `
        Mint additional tokens for a fungible token that you've created.
        This is only possible, if your token has a positive reserve amount (specified upon creation).`,
        confirmation: `You will mint additional tokens from your token reserve.`,
        inputs: [
            {name: 'token', type: 'hash', required: true, suggest: 'fts'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    /**
     * Transfer
     */
    'transfer.create': {
        title: 'Create Transfer',
        description: `
        Create a new transfer.
        Transfer an NFT by leaving the amount empty.`,
        confirmation: `You will send a token transfer to the specified address.`,
        inputs: [
            {name: 'to', type: 'hash', required: true, suggest: 'addresses'},
            {name: 'token', type: 'hash', required: true, suggest: 'tokens'},
            {name: 'amount', type: 'amount', required: false},
            {name: 'from', type: 'hash', required: false},
            {name: 'message', type: 'string', required: false},
        ]
    },
    /**
     * Auction
     */
    'auction.transfer': {
        title: 'Submit Bid',
        description: `
        Transfer a XETA bid to an auction pool.
        The amount must be higher than the existing highest bid.`,
        confirmation: `You will submit a bid to the pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'auction.resolve': {
        title: 'Resolve Auction',
        description: `
        Resolve an auction once it is completed or expired.`,
        confirmation: `You will resolve the auction and distribute its tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'auction.cancel': {
        title: 'Cancel Auction',
        description: `
        Cancel auction (everyone will be able to claim back bids and deposited tokens).`,
        confirmation: `You will cancel the auction and distribute its tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'auction.deposit': {
        title: 'Deposit to Auction',
        description: `
        Deposit an NFT for auction, as specified by the auction pool.`,
        confirmation: `You will deposit a token to the auction.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'auction.close': {
        title: 'Close Auction',
        description: `
        Close the auction pool permanently.`,
        confirmation: `You will close your auction permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    /**
     * Launch
     */
    'launch.transfer': {
        title: 'Join a Launch',
        description: `
        Participate by sending XETA to the launch pool.`,
        confirmation: `You will transfer the specified XETA amount to the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'launch.resolve': {
        title: 'Resolve Launch',
        description: `
        Resolve launch pool after it is concluded or expired.`,
        confirmation: `You will resolve the launch pool and distribute its tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
        ],
    },
    'launch.claim': {
        title: 'Claim Tokens',
        description: `
        Claim your tokens (pool-tokens if the launch was successful, XETA if the launch was unsuccessful).`,
        confirmation: `You will claim your XETA contribution or token-equivalent from the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'launch.deposit': {
        title: 'Deposit Launch Tokens',
        description: `
        Deposit pool-tokens to the launch pool.`,
        confirmation: `You will deposit the spcecified pool tokens to the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'launch.withdraw': {
        title: 'Withdraw Launch Tokens',
        description: `
        Withdraw the claimable remainder of pool-tokens that were previously deposited to the launch pool.`,
        confirmation: `You will withdraw your previously deposited tokens from the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'launch.close': {
        title: 'Close Launch',
        description: `
        Close the launch pool permanently.`,
        confirmation: `You will close the launch pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    /**
     * Lending
     */
    'lending.transfer': {
        title: 'Borrow Tokens',
        description: `
        Borrow tokens from a lending-pool.
        The minimum collateralization rate is specified by the pool.`,
        confirmation: `You will borrow tokens from the pool, in exchange for the XETA amount you've specified.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'collateralization', type: 'number', required: true},
        ],
    },
    'lending.settle': {
        title: 'Settle Borrowed Tokens',
        description: `
        Return borrowed tokens and settle your claim.`,
        confirmation: `You will return your borrowed tokens and get back your XETA tokens minus interest rate.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'lending.liquidate': {
        title: 'Liquidate Lending Claim',
        description: `
        Liquidiate an under-collateralized lending claim.
        You will receive a small share of the liquidation proceeds.`,
        confirmation: `You will liquidate the claim if the claims' collateralization fell under the pools minimum requirement.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'lending.deposit': {
        title: 'Deposit Lending Tokens',
        description: `
        Deposit tokens for others to borrow.
        You will earn a continuous interest rate.`,
        confirmation: `You will deposit tokens to the lending pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'lending.withdraw': {
        title: 'Withdraw Lending Tokens',
        description: `
        Withdraw previously deposited lending tokens, including your interest rewards.`,
        confirmation: `You will withdraw tokens from the lending pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
            {name: 'percentage', type: 'number', required: false},
        ],
    },
    /**
     * Lock
     */
    'lock.transfer': {
        title: 'Lock Tokens',
        description: `
        Lock tokens for you or for someone else.
        If you lock for someone else, they will be able to withdraw once the lock-period expires.`,
        confirmation: `You will lock tokens until the specified period expires.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'address', type: 'hash', required: false, suggest: 'addresses'},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'lock.claim': {
        title: 'Claim Tokens',
        description: `
        Claim locked tokens after the lock-period expires.`,
        confirmation: `You will receive your locked tokens as long as the claim is unlocked.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    /**
     * Loot
     */
    'loot.transfer': {
        title: 'Participate in Loot',
        description: `
        Participate by sending the minimum entry amount to the pool.
        You will receiving an NFT if you win (based on a probability as specified by the pool).`,
        confirmation: `You will send the minimum participation amount of pool tokens to the pool. Receiving an NFT is dependent on the probability as specified by the pool and not guaranteed.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'loot.deposit': {
        title: 'Deposit Loot Token',
        description: `
        Deposit an NFT to the loot pool.`,
        confirmation: `You will deposit the specified NFT to the loot pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true, suggest: 'nfts'},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'loot.withdraw': {
        title: 'Withdraw Loot Token',
        description: `
        Withdraw a previously deposited NFT from the loot pool.
        This is only possible, if the NFT was not sent as reward to a winning transfer.`,
        confirmation: `You will withdraw your previously deposited NFT from the loot pool, as long as it belongs to the pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'loot.clear': {
        title: 'Clear Loot Proceeds',
        description: `
        Clear all XETA earnings from loot pool.`,
        confirmation: `You will receive all pool token earnings.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    /**
     * Lottery
     */
    'lottery.transfer': {
        title: 'Join Lottery',
        description: `
        Participate in the lottery pool by sending the minimum required amount to enter.`,
        confirmation: `You will send the minimum XETA participation amount as specified by the pool to participate.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'lottery.claim': {
        title: 'Claim Lottery Ticket',
        description: `
        Claim and find out if you hold a winning ticket.`,
        confirmation: `You will redeem your claim and receive tokens with a probability as determined by the pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'lottery.resolve': {
        title: 'Resolve Lottery',
        description: `
        Resolve the lottery pool once it is expired or the maximum amount of transfers has been reached.`,
        confirmation: `You will resolve the lottery and distribute its NFT to a random participant.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'lottery.deposit': {
        title: 'Deposit to Lottery',
        description: `
        Deposit token(s) to the lottery pool.
        This can be either a fungible token, or a non-fungible token.`,
        confirmation: `You will deposit pool tokens to the lottery pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: false},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'lottery.withdraw': {
        title: 'Withdraw from Lottery',
        description: `
        Withdraw previously deposited token(s) from the lottery pool.
        The withdrawable amount depends on existing entries to the pool.`,
        confirmation: `You will withdraw previously deposited tokens from the lottery pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'lottery.close': {
        title: 'Close Lottery',
        description: `
        Close lottery pool permanently.`,
        confirmation: `You will close the lottery pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    'lottery.clear': {
        title: 'Clear Lottery Proceeds',
        description: `
        Clear collected XETA earnings from the lottery pool.`,
        confirmation: `You will receive all collected earnings from the lottery pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    /**
     * Royalty
     */
    'royalty.claim': {
        title: 'Claim Royalty',
        description: `
        Claim royalties for an NFT that you own.
        The NFT must be included in the pool candidates.`,
        confirmation: `You will claim royalties for an NFT or collection as specified by the pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true, suggest: 'nfts'},
        ],
    },
    'royalty.deposit': {
        title: 'Deposit Royalty Tokens',
        description: `
        Deposit reward tokens to the royalty pool.
        Addresses holding NFTs created by you will be able to claim royalties.`,
        confirmation: `You will deposit pool tokens as royalties which owners of your NFTs can claim.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'royalty.withdraw': {
        title: 'Withdraw Royalty Tokens',
        description: `
        Withdraw previously deposited royalty tokens.`,
        confirmation: `You will withdraw previously deposited tokens from the royalty pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'royalty.close': {
        title: 'Close Royalty Pool',
        description: `
        Close royalty pool permanently.`,
        confirmation: `You will close the royalty pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
    /**
     * Staking
     */
    'staking.transfer': {
        title: 'Stake Tokens',
        description: `
        Stake pool-tokens for a certain period and earn staking rewards depending on the duration.`,
        confirmation: `You will stake the specified amount of your pool tokens until the lock period expires.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: true},
        ],
    },
    'staking.claim': {
        title: 'Claim Stake',
        description: `
        Claim your staked tokens including rewards, once the staking period expires.`,
        confirmation: `You will claim back your staked tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'staking.deposit': {
        title: 'Deposit Staking Rewards',
        description: `
        Deposit reward tokens to the staking pool.`,
        confirmation: `You will deposit pool tokens to be used as staking rewards for others.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'staking.withdraw': {
        title: 'Withdraw Staking Rewards',
        description: `
        If you want to claim your staking rewards, use the claim method instead.
        Withdraw deposited reward tokens from the staking pool.
        The amount will be reduced, if staking rewards were already distributed.`,
        confirmation: `You will withdraw previously deposited or staked tokens, although without rewards.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
            {name: 'percentage', type: 'number', required: false},
        ],
    },
    /**
     * Swap
     */
    'swap.transfer': {
        title: 'Swap Tokens',
        description: `
        Swap tokens instantly.`,
        confirmation: `You will send the specified amount of tokens to the pool and receive XETA or pool tokens in exchange.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'swap.deposit': {
        title: 'Deposit Swap Liquidity',
        description: `
        Deposit XETA and pool-tokens to add liquidity.`,
        confirmation: `You will deposit liquidity to the swap pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'tokenAmount', type: 'amount', required: true},
            {name: 'xetaAmount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
        ],
    },
    'swap.withdraw': {
        title: 'Withdraw Swap Liquidity',
        description: `
        Withdraw your share from liquidity.`,
        confirmation: `You will withdraw liquidity from the swap pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
            {name: 'percentage', type: 'number', required: false},
        ],
    },
    /**
     * Vote
     */
    'vote.transfer': {
        title: 'Cast a Vote',
        description: `
        Submit a vote by providing an answer or number and the minimum required pool token amount.
        The amount adds weight to your vote.`,
        confirmation: `You will vote for a specific answer or number while transfering the specified amount of pool tokens to the pool to weight your answer.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'answer', type: 'string', required: false},
            {name: 'number', type: 'number', required: false},
        ],
    },
    'vote.claim': {
        title: 'Claim a Winning Vote',
        description: `
        Claim vote rewards if your answer is included in the winning answers.`,
        confirmation: `You will receive reward tokens based on your winning vote claim.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'claim', type: 'hash', required: true, suggest: 'claims'},
        ],
    },
    'vote.oracle': {
        title: 'Submit an Answer',
        description: `
        Set an answer after the vote has concluded.`,
        confirmation: `You will set a correct answer. Claims that specify this answer will be able to claim payouts.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
            {name: 'answer', type: 'string', required: true},
        ],
    },
    'vote.resolve': {
        title: 'Resolve a Vote',
        description: `
        Resolve the vote and make rewards claimable.`,
        confirmation: `You will resolve the vote and trigger the distribution of collected pool tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true},
        ],
    },
}