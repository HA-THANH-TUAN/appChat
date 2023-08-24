require('dotenv').config()
const dev = {
    password: process.env.DEV_REDIS_PASSWORD || 'CexfvSFuIQ3Fkaw6ncpnkxjRMk0iQid3',
    socket: {
        host: process.env.DEV_REDIS_HOST || 'redis-14868.c276.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.DEV_REDIS_PORT || 14868
    }
}
const pro = {
    password: process.env.PRO_REDIS_PASSWORD || 'CexfvSFuIQ3Fkaw6ncpnkxjRMk0iQid3',
    socket: {
        host: process.env.PRO_REDIS_HOST || 'redis-14868.c276.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.PRO_REDIS_PORT || 14868
    }
}

const config={dev, pro}
const env=process.env.NODE_ENV || "dev"

module.exports =config[env]

