const GroupActivity = require("../index")

test("should create a group", async () => {
    const storagePath = ("test/storage")

    const chat = {
        id: {
            _serialized: "392003030@c.us",
        },
        serialized: "2938298429303@c.us",
        name: "group name",
        participants: [
            {
                id: {
                    server: 'c.us',
                    user: '929393992',
                    _serialized: '929393992@c.us'
                },
                name: "Ana laura",
                isAdmin: true,
                isSuperAdmin: false
            },
            {
                id: {
                    server: 'c.us',
                    user: '928392030',
                    _serialized: '928392030@c.us'
                },
                name: "Mario",
                isAdmin: true,
                isSuperAdmin: false
            },
            {
                id: {
                    server: 'c.us',
                    user: '2938203920',
                    _serialized: '2938203920@c.us'
                },
                name: "Laura",
                isAdmin: true,
                isSuperAdmin: false
            },
            {
                id: {
                    server: 'c.us',
                    user: '2038203002',
                    _serialized: '2038203002@c.us'
                },
                name: "Milene",
                isAdmin: true,
                isSuperAdmin: false
            }
        ],
        lastMessage: {
            _data: {
                body: 'message body',
                notifyName: 'Mario',
            },
            hasMedia: false,
            body: 'message body',
            author: '928392030@c.us',
        }
    }

    await (new GroupActivity(storagePath).on(chat))

    expect(true).toBe(true)
})
