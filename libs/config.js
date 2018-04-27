var config = {
    redis: {
        port: process.env.redisPort || '6379',
        ip: process.env.redisId || '10.50.1.211',
        password: process.env.redisPassword || '',
        timeOut: process.env.redisTimeOut || '3000' //单位秒
    },
    mySql: {
        host: process.env.host || 'http://localhost:3306',
        ip: process.env.redisId || '10.50.1.211',
        username: process.env.redisId || 'root',
        password: process.env.redisPassword || 'Root4510@',
        database: process.env.redisPassword || 'db_test',
        timeOut: process.env.redisTimeOut || '3000' //单位秒
    },
    mongodb: {
        port: process.env.redisPort || 27017,
        ip: process.env.redisId || '10.50.1.211',
        password: process.env.redisPassword || '',
        timeOut: process.env.redisTimeOut || '3000' //单位秒
    }
};
module.exports = config;