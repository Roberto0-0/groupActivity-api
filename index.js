const { GroupController } = require("./src/controllers/groupController")
const { MemberController } = require("./src/controllers/memberController")
const Group = require("./src/models/Group")

class GroupActivity {
    constructor(storagePath) {
        this.storage = storagePath
        this.group = new GroupController(this.storage)
        this.member = new MemberController(this.storage)
    }

    async on(client, chat) {
        const session = chat.id._serialized.substring(0, 10)
        var group

        group = await this.group.getBySession(session)

        if (!group.success) {
            var participants = []

            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized)

                participants.push({
                    serialized: contact.id._serialized,
                    name: (contact.pushname) ? contact.pushname : "sem nome",
                    isAdmin: participant.isAdmin,
                    isSuperAdmin: participant.isSuperAdmin
                })
            }

            const groupProps = {
                session,
                serialized: chat.id._serialized,
                name: chat.name,
                participants,
                createdAt: chat.creation
            }

            group = this.group.create(groupProps)
        }

        const { data } = group

        if (chat.participants.length != data.amountParticipants && chat.participants.length < data.amountParticipants) {
            for (var participant of data.participants) {
                const participantExist = chat.participants.find(x => x.id._serialized === participant.serialized)
                if (!participantExist) {
                    data.participants = this.group.removeParticipants(data.participants, "serialized", participant.serialized)
                    data.activities = this.group.removeParticipants(data.activities, "serialized", participant.serialized)
                }
            }

            data.amountParticipants = new Group().getNumberOfParticipants(data.participants)
        } else {
            for (let participant of chat.participants) {
                const participantExist = data.participants.find(x => x.serialized == participant.id._serialized)
                if (!participantExist) {
                    const contact = await client.getContactById(participant.id._serialized)

                    data.participants.push({
                        serialized: contact.id._serialized,
                        name: (contact.pushname) ? contact.pushname : "sem nome",
                        isAdmin: participant.isAdmin,
                        isSuperAdmin: participant.isSuperAdmin
                    })
                }
            }

            data.amountParticipants = new Group().getNumberOfParticipants(data.participants)
        }

        if (chat.lastMessage) {
            const memberExist = data.activities.find(x => x.serialized == chat.lastMessage.author)
            if (!memberExist) {
                data.activities.push({
                    serialized: chat.lastMessage.author,
                    name: chat.lastMessage._data.notifyName,
                    amountMessage: 1,
                    lastMessage: new Date().getTime()
                })

                await this.group.saveChanages(session, data)
                return
            }

            memberExist.amountMessage += 1
            memberExist.lastMessage = new Date().getTime()

            await this.group.saveChanages(session, data)
            return
        }
    }
}

module.exports = GroupActivity
