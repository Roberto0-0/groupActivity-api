const GroupActivity = require("../index")

const storagePath = ("test/storage")

test("should get all groups", async () => {
    const { group } = new GroupActivity(storagePath)

    const groupGetAllService = await group.getAll()
    console.log(groupGetAllService)

    expect(groupGetAllService.success).toBe(true)
})
