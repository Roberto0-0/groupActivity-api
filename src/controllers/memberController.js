const { GroupGetBySession } = require("../services/group/getBySession")
const { MemberCreate } = require("../services/member/create")
const { MemberGetBySerialized } = require("../services/member/getBySerialzied")
const path = require("node:path")

class MemberController {
    constructor(storagePath) {
        this.storage = path.join(process.cwd(), `${storagePath}/activity_storage`)
    }

    create(memberProps) {
        return new MemberCreate().execute(memberProps)
    }

    async getBySerialized(session, serialized) {
        const groupGetBySessionService = new GroupGetBySession(this.storage)
        const service = new MemberGetBySerialized(groupGetBySessionService)
        return await service.execute(session, serialized) 
    }
}

module.exports = { MemberController }
