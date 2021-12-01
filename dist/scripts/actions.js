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
        inputs: [
            {name: 'spender', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
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
        inputs: [
            {name: 'claim', type: 'hash', required: true, value: 'claim.hash'},
            {name: 'to', type: 'hash', required: true},
        ],
    },
    'claim.create': {
        title: 'Create Claim',
        description: `
        Issue a new claim to someone for a certain amount.`,
        inputs: [
            {name: 'owner', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
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
        inputs: [
            {name: 'claim', type: 'hash', required: true, value: 'claim.hash'},
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
        A claim cannot be transfered or changed, once it is resolved.`,
        inputs: [
            {name: 'claim', type: 'hash', required: true, value: 'claim.hash'}
        ],
    },
    /**
     * Pool
     */
    'pool.create': {
        title: 'Create Pool',
        description: `
        Create a new pool for a token.
        The configuration is final and once launched, cannot be changed.`,
        inputs: [
            {name: 'program', type: 'string', required: true},
            {name: 'token', type: 'string', required: true, value: 'token.address'},
            {name: 'name', type: 'string', required: false},
            {name: 'description', type: 'string', required: false},
            {name: 'mechanism', type: 'string', required: false},
            {name: 'candidates', type: 'strings', required: false},
            {name: 'rate', type: 'number', required: false},
            {name: 'percentage', type: 'number', required: false},
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
            {name: 'content', type: 'hash', required: false},
            {name: 'frozen', type: 'string', required: false},
            {name: 'category', type: 'string', required: false},
        ]
    },
    'token.update': {
        title: 'Update Token',
        description: `
        Update a token that you have created.
        Leave values empty, if you don't want them to be updated.`,
        inputs: [
            {name: 'token', type: 'hash', required: true, value: 'token.address'},
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
        inputs: [
            {name: 'token', type: 'hash', required: true, value: 'token.address'},
            {name: 'amount', type: 'amount', required: true, value: 'token.reserve'},
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
        inputs: [
            {name: 'from', type: 'hash', required: false},
            {name: 'to', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true, value: 'token.address'},
            {name: 'amount', type: 'amount', required: false},
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
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'auction.resolve': {
        title: 'Resolve Auction',
        description: `
        Resolve an auction once it is completed or expired.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    'auction.cancel': {
        title: 'Cancel Auction',
        description: `
        Cancel auction (everyone will be able to claim back bids and deposited tokens).`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    'auction.deposit': {
        title: 'Deposit to Auction',
        description: `
        Deposit an NFT for auction, as specified by the auction pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'auction.close': {
        title: 'Close Auction',
        description: `
        Close the auction pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    /**
     * Launch
     */
    'launch.transfer': {
        title: 'Join a Launch',
        description: `
        Participate by sending XETA to the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'launch.swap': {
        title: 'Swap Launch Tokens',
        description: `
        Participate in the launch by swapping at a fixed rate as specified by the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'launch.resolve': {
        title: 'Resolve Launch',
        description: `
        Resolve launch pool after it is concluded or expired.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'pool.token'},
        ],
    },
    'launch.claim': {
        title: 'Claim Tokens',
        description: `
        Claim your tokens (pool-tokens if the launch was successful, XETA if the launch was unsuccessful).`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'launch.deposit': {
        title: 'Deposit Launch Tokens',
        description: `
        Deposit pool-tokens to the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'launch.withdraw': {
        title: 'Withdraw Launch Tokens',
        description: `
        Withdraw the claimable remainder of pool-tokens that were previously deposited to the launch pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'launch.close': {
        title: 'Close Launch',
        description: `
        lose the launch pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
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
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'pool.token'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'collateralization', type: 'number', required: true, value: 'pool.percentage'},
        ],
    },
    'lending.settle': {
        title: 'Settle Borrowed Tokens',
        description: `
        Return borrowed tokens and settle your claim.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'lending.liquidate': {
        title: 'Liquidate Lending Claim',
        description: `
        Liquidiate an under-collateralized lending claim.
        You will receive a small share of the liquidation proceeds.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'pool.token'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'lending.deposit': {
        title: 'Deposit Lending Tokens',
        description: `
        Deposit tokens for others to borrow.
        You will earn a continuous interest rate.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'lending.withdraw': {
        title: 'Withdraw Lending Tokens',
        description: `
        Withdraw previously deposited lending tokens, including your interest rewards.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'pool.token'},
            {name: 'claim', type: 'hash', required: true},
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
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'address', type: 'hash', required: false},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'lock.claim': {
        title: 'Claim Tokens',
        description: `
        Claim locked tokens after the lock-period expires.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
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
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'loot.deposit': {
        title: 'Deposit Loot Token',
        description: `
        Deposit an NFT to the loot pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'loot.withdraw': {
        title: 'Withdraw Loot Token',
        description: `
        Withdraw a previously deposited NFT from the loot pool.
        This is only possible, if the NFT was not sent as reward to a winning transfer.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'loot.clear': {
        title: 'Clear Loot Proceeds',
        description: `
        Clear all XETA earnings from loot pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    /**
     * Lottery
     */
    'lottery.transfer': {
        title: 'Join Lottery',
        description: `
        Participate in the lottery pool by sending the minimum required amount to enter.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'pool.token'},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'lottery.claim': {
        title: 'Claim Lottery Ticket',
        description: `
        Claim and find out if you hold a winning ticket.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'lottery.resolve': {
        title: 'Resolve Lottery',
        description: `
        Resolve the lottery pool once it is expired or the maximum amount of transfers has been reached.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    'lottery.deposit': {
        title: 'Deposit to Lottery',
        description: `
        Deposit token(s) to the lottery pool.
        This can be either a fungible token, or a non-fungible token.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: false},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'lottery.withdraw': {
        title: 'Withdraw from Lottery',
        description: `
        Withdraw previously deposited token(s) from the lottery pool.
        The withdrawable amount depends on existing entries to the pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'lottery.close': {
        title: 'Close Lottery',
        description: `
        Close lottery pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    'lottery.clear': {
        title: 'Clear Lottery Proceeds',
        description: `
        Clear collected XETA earnings from the lottery pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
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
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true, value: 'token.address'},
        ],
    },
    'royalty.deposit': {
        title: 'Deposit Royalty Tokens',
        description: `
        Deposit reward tokens to the royalty pool.
        Addresses holding NFTs created by you will be able to claim royalties.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'royalty.withdraw': {
        title: 'Withdraw Royalty Tokens',
        description: `
        Withdraw previously deposited royalty tokens.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'royalty.close': {
        title: 'Close Royalty Pool',
        description: `
        Close royalty pool permanently.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
    /**
     * Staking
     */
    'staking.transfer': {
        title: 'Stake Tokens',
        description: `
        Stake pool-tokens for a certain period and earn staking rewards depending on the duration.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: true},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'staking.claim': {
        title: 'Claim Stake',
        description: `
        Claim your staked tokens including rewards, once the staking period expires.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'staking.deposit': {
        title: 'Deposit Staking Rewards',
        description: `
        Deposit reward tokens to the staking pool.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'staking.withdraw': {
        title: 'Withdraw Staking Rewards',
        description: `
        Withdraw reward tokens from the staking pool.
        The amount will be reduced, if staking rewards were already distributed.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    /**
     * Swap
     */
    'swap.transfer': {
        title: 'Swap Tokens',
        description: `
        Swap XETA for pool-tokens, or pool-tokens for XETA.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'token', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'swap.deposit': {
        title: 'Deposit Swap Liquidity',
        description: `
        Deposit XETA and pool-tokens to add liquidity.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'tokenAmount', type: 'amount', required: true},
            {name: 'xetaAmount', type: 'amount', required: true},
            {name: 'unlocks', type: 'timestamp', required: false},
            {name: 'expires', type: 'timestamp', required: false},
        ],
    },
    'swap.withdraw': {
        title: 'Withdraw Swap Liquidity',
        description: `
        Withdraw your share from liquidity.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
            {name: 'percentage', type: 'number', required: true},
        ],
    },
    /**
     * Vote
     */
    'vote.transfer': {
        title: 'Cast a Vote',
        description: `
        Submit a vote by providing an answer or number and the minimum required amount.
        The amount adds weight to your vote.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'amount', type: 'amount', required: true},
            {name: 'answer', type: 'string', required: false, value: 'claim.answer'},
            {name: 'number', type: 'number', required: false},
        ],
    },
    'vote.claim': {
        title: 'Claim a Winning Vote',
        description: `
        Claim vote rewards if your answer is included in the winning answers.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'claim', type: 'hash', required: true},
        ],
    },
    'vote.oracle': {
        title: 'Submit an Answer',
        description: `
        Set an answer after the vote has concluded.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
            {name: 'answer', type: 'string', required: true},
        ],
    },
    'vote.resolve': {
        title: 'Resolve a Vote',
        description: `
        Resolve the vote and make rewards claimable.`,
        inputs: [
            {name: 'pool', type: 'hash', required: true, value: 'pool.address'},
        ],
    },
}