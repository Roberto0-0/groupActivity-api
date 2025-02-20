const { GroupController } = require("./src/controllers/groupController")
const { MemberController } = require("./src/controllers/memberController")

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
            const groupProps = {
                session,
                serialized: chat.id._serialized,
                name: chat.name,
                amountParticipants: chat.participants.length
            }

            group = this.group.create(groupProps)
        }

        const { data } = group

        if (chat.participants.length != data.amountParticipants && chat.participants.length < data.amountParticipants) {
            for (var participant of data.activities) {
                const participantExist = chat.participants.find(x => x.id._serialized === participant.serialized)
                if (!participantExist) {
                    data.activities = this.group.removeParticipants(data.activities, "serialized", participant.serialized)
                }
            }

            data.amountParticipants = chat.participants.length
        } else { data.amountParticipants = chat.participants.length }

        for (let memberActivity of data.activities) {
            const nickChanged = await client.getContactById(memberActivity.serialized)
            if (nickChanged) {
                if (memberActivity.name !== nickChanged.pushname) { memberActivity.name = nickChanged.pushname }
            }
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
