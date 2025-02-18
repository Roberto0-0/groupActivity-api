const Member = require("../../models/Member")

class MemberCreate {
    execute(memberProps) {
        const { serialized, name } = memberProps

        const newMember = new Member(serialized, name)

        return {
            success: true,
            data: newMember
        }
    }
}

module.exports = { MemberCreate }
