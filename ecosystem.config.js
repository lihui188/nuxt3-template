module.exports = {
    apps: [
      {
        name: 'flygw',
        port: '3001',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        autorestart: true // 程序崩溃后自动重启
      }
    ]
  }