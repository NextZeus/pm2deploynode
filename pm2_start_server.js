/**
 * created by xiaodong at 22/11/2018
 * pm2 programmatic start up app
 */

const pm2 = require('pm2');
const environments = ['dev', 'prod'];
const environment = process.argv[2];
console.log('environment ? ', environment);
if (!environments.includes(environment)) {
    console.error('非法环境变量， 目前只有 ', environments);
    console.log('EX: node pm2_start_server dev | prod');
    return;
}

const apps = require('./ecosystem.' + environment + '.config').apps;
const appName = apps[0].name;
console.log(appName);

/**
 * connect to pm2
 */
async function Connect() {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

/**
 * list all the running process
 */
async function List() {
    return new Promise((resolve, reject) => {
        pm2.list((err, processDescriptionList) => {
            if (err) reject(err);
            resolve(processDescriptionList);
        });
    });
}

/**
 * delete app with appName
 */
async function Delete() {
    return new Promise((resolve, reject) => {
        pm2.delete(appName, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

/**
 * start up app with app config and env
 */
async function Start() {
    return new Promise((resolve, reject) => {
        pm2.start(apps[0], (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

/**
 * disconnect pm2
 */
async function Disconnect() {
    return new Promise((resolve, reject) => {
        pm2.disconnect((err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

(async () => {
    try {
        // 连接pm2
        let connect = await Connect();
        console.log('isConnected ? ', connect);

        // 获取正在运行的进程列表
        let runningApps = await List();
        // 是否存在appName同名的进程
        let existsRunningProcess = false;

        runningApps.forEach(element => {
            console.log('running app name %s pid %s', element.name, element.pid);
            element.name == appName ? existsRunningProcess = true : existsRunningProcess = false;
        });

        console.log('existsRunningProcess ? ', existsRunningProcess);

        // 存在运行中的进程 则执行删除进程操作
        if (existsRunningProcess) {
            let isDeleted = await Delete();
            console.log('isDeleted ', isDeleted);
        }

        // 启动配置中的进程
        let started = await Start();
        console.log('started ? ', started);

        // 断开pm2连接
        let isDisconnected = await Disconnect();
        console.log('isDisconnected ? ', isDisconnected);

        process.exit(0);
    } catch (error) {
        console.error('start app error ', error);
        process.exit(1);
    }
})();