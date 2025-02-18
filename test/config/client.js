const storage = [
    {
        id: {
            server: 'c.us',
            user: '929393992',
            _serialized: '929393992@c.us'
        },
        number: '929393992',
        name: 'User01',
        pushname: 'User01',
    },
    {
        id: {
            server: 'c.us',
            user: '928392030',
            _serialized: '928392030@c.us'
        },
        number: '928392030',
        name: 'User02',
        pushname: 'User02',
    }
]

class Client {
    async getContactById(serialized) {
        const user = storage.find(x => x.id._serialized === serialized)
        if (!user) return
        return user
    }
}

module.exports = Client
