const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        const devs = await Dev.find().sort('-createdAt')

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const resApiGithub = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = resApiGithub.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [latitude, longitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // const sendSocketMessageTo = findConnections(
            //     { longitude, latitude },
            //     techsArray,
            // )
        
            // sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev)
    },

    async update(req, res) {
        return res.json({ "update": "update" })
    },

    async destroy(req, res) {
        return res.json({ "destroy": "destroy" })
    }
}