const {
    Schema
} = require("mongoose");

const jobSchema = new Schema({
    appName: {
        type: String,
        index: true,
        required: true
    },
}, {
    collection: "jobs",
    timestamps: true
})

module.exports = {
    jobSchema,
}
