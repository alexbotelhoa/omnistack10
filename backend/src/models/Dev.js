const { Schema, model } = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new Schema({
    github_username: String,
    name: String,
    avatar_url: String,
    bio: String,
    techs: [String],
    location:  {
        type: PointSchema,
        index: '2dsphere',
    },
}, {
    timestamps: true,
 })

module.exports = model('Dev', DevSchema)