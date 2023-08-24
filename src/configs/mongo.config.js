require('dotenv').config()
const pro= {
    url:process.env.PRO_MONGO_URL || "mongodb+srv://s2hathanhtuan2s:s123456789s@cluster0.wmpigvy.mongodb.net/",
    option: {
        dbName: process.env.PRO_MONGO_DATABASE || "app_chat"
    }
}

const dev= {
    url: process.env.ENV_MONGO_URL || "mongodb+srv://s2hathanhtuan2s:s123456789s@cluster0.wmpigvy.mongodb.net/",
    option: {
        dbName: process.env.ENV_MONGO_DATABASE || "app_chat"
    }
} 
const config={dev:[dev.url, dev.option], pro:[pro.url, pro.option]}
const env = process.env.NODE_ENV || "dev"

module.exports = config[env]