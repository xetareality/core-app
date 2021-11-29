var Actions = {
    'address.update': {
        title: 'Update address',
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
    }
}