const Group = require("../../models/Group")

class GroupCreate {
    execute(groupProps) {
        const { session, serialized, name, participants } = groupProps

        var newGroup = new Group(session, serialized, name, participants)
        newGroup.amountParticipants = newGroup.getNumberOfParticipants(participants)

        return {
            success: true,
            data: newGroup
        }
    }
}

module.exports = { GroupCreate }
