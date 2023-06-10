module.exports = {
  apps: [
    {
      name: 'tw-webhook',
      script: './src/main.js',
      env_production: {
        PORT: '80',
        NODE_ENV: 'production',
      },
    },
  ],
};
