module.exports = {
  apps: [{
    name: 'API',
    script: 'bin/www',
    args: '',
    exec_mode: 'cluster',
    instances: 0,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }],
  deploy: {
    production: {
      'user': 'root',
      'host': '47.104.216.30',
      'ref': 'origin/master',
      'repo': 'https://github.com/NextZeus/jwt.git',
      'path': '/var/www/production',
      'pre-setup': "yum install git -y;",
      'post-setup': "ls -la",
      'pre-deploy-local': 'git pull origin master;',
      'pre-deploy': 'ls -la',
      'post-deploy': 'npm run start_production; pm2 ls'
    }
  }
};
