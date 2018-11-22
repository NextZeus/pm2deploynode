const pm2 = require('pm2');

const apps = require('./ecosystem.prod.config').apps;
const appName = apps[0].name;

(async function run() {
    let connect = await Connect();
    console.log('isConnected ? ', connect);

    let runningApps = await List();

    console.log('runningApps ', runningApps);

    if (runningApps.length) {
        let isDeleted = await Delete();
        console.log('isDeleted ', isDeleted);
    }

    let started = await Start();
    console.log('started ? ', started);
})();

async function Connect() {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

async function List() {
    return new Promise((resolve, reject) => {
        pm2.list((err, processDescriptionList) => {
            if (err) reject(err);
            resolve(processDescriptionList);
        });
    });
}

async function Delete() {
    return new Promise((resolve, reject) => {
        pm2.delete(appName, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

async function Start() {
    return new Promise((resolve, reject) => {
        pm2.start(apps[0], (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}