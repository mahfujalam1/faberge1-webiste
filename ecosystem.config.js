module.exports = {
  apps: [{
    name: 'faberge-client',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 2, // Use 2 instances for load balancing
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_SERVER_URL: 'https://api.inhomebeautyservices.com'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G', // Restart if memory exceeds 1GB
    autorestart: true,
    watch: false,
    // Graceful shutdown
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
}
