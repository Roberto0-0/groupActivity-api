class Group {
    constructor(session, serialized, name, participants) {
        this.session = session
        this.serialized = serialized
        this.name = name 
        this.participants = participants
        this.activities = [] 
        this.amountParticipants = 0
    }

    getNumberOfParticipants(participants) {
        return participants.length
    }
}

module.exports = Group
