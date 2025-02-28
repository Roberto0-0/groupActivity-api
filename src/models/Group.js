class Group {
    constructor(session, serialized, name, amountParticipants) {
        this.session = session
        this.serialized = serialized
        this.name = name 
        this.activities = [] 
        this.amountParticipants = amountParticipants
        this.messageAmount = 0
        this.createdAt = Date.now() 
    }
}

module.exports = Group
