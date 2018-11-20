module.exports = {
  apps: [{
    name: 'API',
    script: 'bin/www',
    args: '',
    mode: 'cluster',
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
      user: 'root',
      host: '47.104.216.30',
      ref: 'origin/master',
      repo: 'https://github.com/NextZeus/jwt.git',
      'pre-setup': "yum install git -y; ls -la",
      'post-setup': "ls -la",
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
