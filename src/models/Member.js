class Member {
    constructor(serialized, name) {
        tihs.serialized = serialized
        this.name = name
        this.amountMessage = 1
        this.lastMessage = new Date().getTime()
    }
}

module.exports = Member
