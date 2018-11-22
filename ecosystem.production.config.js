module.exports = {
  apps: [{
    name: 'API',
    script: 'bin/www',
    args: '',
    exec_mode: 'cluster',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }],
  deploy: {
    production: {
      'user': 'root',
      'host': '47.104.216.30',
      'ref': 'origin/master',
      'repo': 'https://github.com/NextZeus/pm2deploynode.git',
      'path': '/var/www/production',
      'pre-setup': "yum install git -y;",
      'post-setup': "ls -la",
      'pre-deploy-local': "pwd; echo 'this is a local command' ",
      'pre-deploy': 'ls -la;',
      'post-deploy': 'git pull origin master;git log -n 2; node pm2_start_production_server.js;',
      'test': 'pm2 ls;'
    }
  }
};
