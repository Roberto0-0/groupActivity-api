class Group {
    constructor(session, serialized, name, amountParticipants) {
        this.session = session
        this.serialized = serialized
        this.name = name 
        this.activities = [] 
        this.amountParticipants = amountParticipants
        this.createdAt = new Date().getTime()
    }
}

module.exports = Group
