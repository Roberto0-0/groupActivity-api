const storage = [
    {
        id: {
            server: 'c.us',
            user: '929393992',
            _serialized: '929393992@c.us'
        },
        number: '929393992',
        name: 'Gustavo da silva',
        pushname: 'Gustavo da silva',
    },
    {
        id: {
            server: 'c.us',
            user: '928392030',
            _serialized: '928392030@c.us'
        },
        number: '928392030',
        name: 'Mario',
        pushname: 'Mario',
    },
    {
        id: {
            server: 'c.us',
            user: '2938203920',
            _serialized: '2938203920@c.us'
        },
        name: "Laura",
        pushname: 'Laura',
    },
    {
        id: {
            server: 'c.us',
            user: '2038203002',
            _serialized: '2038203002@c.us'
        },
        name: "Milene",
        pushname: 'Milene',
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
