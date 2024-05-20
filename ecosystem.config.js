module.exports = {
  apps: [
    {
      name: 'tw-webhook',
      script: './src/main.mjs',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
