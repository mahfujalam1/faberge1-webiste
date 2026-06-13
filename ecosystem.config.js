module.exports = {
  apps: [{
    name: 'faberge-client',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SERVER_URL: 'https://api.inhomebeautyservices.com'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    time: true,
    max_memory_restart: '1G',
    autorestart: true,
    watch: false
  }]
}
