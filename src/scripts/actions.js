var Actions = {
    /**
     * Address
     */
    'address.update': {
        title: 'Update Address',
        description: `
        Update address values such as name, description or links.
        These will be shown on top of your default address page.`,
        inputs: [
            {name: 'name', type: 'string', required: true},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'icon', type: 'string', required: false},
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
        This will allow this address to spend your funds.`,
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
        Transfer a claim to someone else.`,
        inputs: [
            {name: 'claim', type: 'hash', required: true},
            {name: 'to', type: 'hash', required: true},
        ],
    },
    'claim.create': {
        title: 'Create Claim',
        description: `
        Issue a new claim.`,
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
        Update an existing claim that you've created.`,
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
        Mark a claim created by you as resolved.
        A claim cannot be transfered or changed, once it is resolved.`,
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
        The configuration is final and once launched, cannot be changed.`,
        inputs: [
            {name: 'program', type: 'string', required: true},
            {name: 'token', type: 'string', required: true},
            {name: 'name', type: 'string', required: false},
            {name: 'mechanism', type: 'string', required: false},
            {name: 'candidates', type: 'strings', required: false},
            {name: 'rate', type: 'number', required: false},
            {name: 'percentage', type: 'number', required: false},
            {name: 'probability', type: 'number', required: false},
            {name: 'answers', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'expires', type: 'timestamp', required: false},
            {name: 'minAmount', type: 'amount', required: false},
            {name: 'maxAmount', type: 'amount', required: false},
            {name: 'minTime', type: 'integer', required: false},
            {name: 'maxTime', type: 'integer', required: false},
            {name: 'transfersLimit', type: 'integer', required: false},
            {name: 'claimsLimit', type: 'integer', required: false},
            {name: 'tokenLimit', type: 'amount', required: false},
            {name: 'xetaLimit', type: 'amount', required: false},
            {name: 'tokenTarget', type: 'amount', required: false},
            {name: 'xetaTarget', type: 'amount', required: false},
        ]
    },
    /**
     * Token
     */
    'token.create': {
        title: 'Create Token',
        description: `
        Create a new token.
        You can create a non-fungible token by leaving supply empty.`,
        inputs: [
            {name: 'name', type: 'string', required: true},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'icon', type: 'string', required: false},

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
        Update a token created by you.`,
        inputs: [
            {name: 'token', type: 'hash', required: true},
            {name: 'name', type: 'string', required: false},
            {name: 'description', type: 'string', required: false},
            {name: 'links', type: 'strings', required: false},
            {name: 'meta', type: 'object', required: false},
            {name: 'icon', type: 'string', required: false},
            {name: 'frozen', type: 'boolean', required: false},
            {name: 'category', type: 'string', required: false},
            {name: 'mime', type: 'string', required: false},
        ],
    },
    'token.mint': {
        title: 'Mint Token',
        description: `
        Mint additional tokens for a fungible token that you've created.
        This is only possible, if your token had a reserve-amount specified upon creation.`,
        inputs: [
            {name: 'token', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
        ],
    },
    'token.transfer': {
        title: 'Transfer Token',
        description: `
        Transfer a non-fungible token to someone else.`,
        inputs: [
            {name: 'token', type: 'hash', required: true},
            {name: 'to', type: 'hash', required: true},
        ],
    },
    /**
     * Transfer
     */
    'transfer.create': {
        title: 'Create Transfer',
        description: `
        Create a new fungible-token transfer.`,
        inputs: [
            {name: 'from', type: 'hash', required: false},
            {name: 'to', type: 'hash', required: true},
            {name: 'token', type: 'hash', required: true},
            {name: 'amount', type: 'amount', required: true},
            {name: 'message', type: 'string', required: false},
        ]
    },
}