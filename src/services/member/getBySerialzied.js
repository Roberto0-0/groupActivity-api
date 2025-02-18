class MemberGetBySerialized {
    constructor(groupGetBySession) {
        this._groupGetBySession = groupGetBySession
    }

    async execute(session, serialized) {
        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: true,
            message: group.message
        }

        const { data } = group

        const memberExist = data.participants.find(x => x.serialized === serialized)
        if (!memberExist) return {
            success: false,
            message: "Membro não encontrado."
        }

        return {
            success: true,
            data: memberExist
        }
    }
}

module.exports = { MemberGetBySerialized }
