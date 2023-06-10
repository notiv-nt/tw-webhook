module.exports = {
  apps: [
    {
      name: 'tw-webhook',
      script: './src/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
