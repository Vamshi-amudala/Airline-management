require('dotenv').config();

const Eureka = require('eureka-js-client').Eureka;

function registerWithEureka(appName, port) {
    const client = new Eureka({
        instance: {
            app: appName.toUpperCase(),
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            statusPageUrl: `http://localhost:${port}`,
            port: {
                '$': port,
                '@enabled': 'true'
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn'
            }
        },
        eureka: {
            host: process.env.EUREKA_HOST || 'localhost',
            port: process.env.EUREKA_PORT || 8761,
            servicePath: '/eureka/apps/'
        }
    });

    client.start(error => {
        console.log(error || `${appName} registered with Eureka`);
    });

    return client;
}

module.exports = registerWithEureka;
