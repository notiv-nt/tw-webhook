module.exports = {
  apps: [
    {
      name: 'tw-webhook',
      script: './src/main.js',
      env_production: {
        PORT: '443',
        NODE_ENV: 'production',
      },
    },
  ],
};
