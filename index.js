const { GroupController } = require("./src/controllers/groupController")
const { MemberController } = require("./src/controllers/memberController")

class GroupActivity {
    constructor(storagePath) {
        this.storage = storagePath
        this.group = new GroupController(this.storage)
        this.member = new MemberController(this.storage)
    }

    async on(chat) {
        const session = chat.id._serialized.substring(0, 10)
        var group

        group = await this.group.getBySession(session)

        if (!group.success) {
            const groupProps = {
                session,
                serialized: chat.id._serialized,
                name: chat.name,
                amountParticipants: chat.participants.length
            }

            group = this.group.create(groupProps)
        }

        const { data } = group

        if (chat.participants.length != data.amountParticipants) {
            if (chat.participants.length < data.amountParticipants) {
                for (var participant of data.activities) {
                    const participantExist = chat.participants.find(x => x.id._serialized === participant.serialized)
                    if (!participantExist) {
                        data.messageAmount -= participant.amountMessage
                        data.activities = this.group.removeParticipants(data.activities, "serialized", participant.serialized)
                    }
                }
                data.amountParticipants = chat.participants.length
            }
            data.amountParticipants = chat.participants.length
        }

        if (chat.lastMessage) {
            const memberExist = data.activities.find(x => x.serialized == chat.lastMessage.author)
            if (!memberExist) {
                data.activities.push({
                    serialized: chat.lastMessage.author,
                    name: chat.lastMessage._data.notifyName,
                    amountMessage: 1,
                    lastMessage: Date.now()
                })

                data.messageAmount += 1
                await this.group.saveChanages(session, data)
                return
            }

            if (memberExist.name !== chat.lastMessage._data.notifyName) memberExist.name = chat.lastMessage._data.notifyName

            memberExist.amountMessage += 1
            memberExist.lastMessage = Date.now()
            data.messageAmount += 1

            await this.group.saveChanages(session, data)
            return
        }
    }
}

module.exports = GroupActivity
