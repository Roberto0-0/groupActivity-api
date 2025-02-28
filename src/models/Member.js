class Member {
    constructor(serialized, name) {
        tihs.serialized = serialized
        this.name = name
        this.amountMessage = 1
        this.lastMessage = Date.now()
    }
}

module.exports = Member
