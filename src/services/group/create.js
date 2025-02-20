const Group = require("../../models/Group")

class GroupCreate {
    execute(groupProps) {
        const { session, serialized, name, amountParticipants } = groupProps

        var newGroup = new Group(session, serialized, name, amountParticipants)

        return {
            success: true,
            data: newGroup
        }
    }
}

module.exports = { GroupCreate }
