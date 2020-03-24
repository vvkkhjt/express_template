const mongoose = require("mongoose");
const debug = require("debug")("connect-db");
const {
    jobSchema,
} = require("./schemas");

const MONGOURL = ISPROD ? process.env.MONGOURL : "mongodb://root:Clo11aQqO2RI8qHF@192.168.220.70:30393/autonlineMeta?authSource=admin"

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
const db = mongoose.connection;

db.on("open", () => {
    debug("数据库连接成功");
});
db.on("error", e => {
    debug(`[error] : 连接失败 ${e}`);
});

const T_JOB = mongoose.model("job", jobSchema)

T_JOB.createIndexes()

module.exports = {
    T_JOB,
}
