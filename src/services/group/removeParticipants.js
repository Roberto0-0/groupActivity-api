class GroupRemoveParticipants {
    execute(data, key, value) {
        function removeParticipants(data, key, value) {
            data = data.filter((jsonObject) => {
                return jsonObject[key] != value
            })
            return data
        }

        return removeParticipants(data, key, value)
    }
}

module.exports = { GroupRemoveParticipants }
