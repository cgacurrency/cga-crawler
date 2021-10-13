module.exports = {
  apps: [
    {
      name: "beta-explorer-api",
      script: "server.api.js",
      // instances: 4,
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      },
      max_memory_restart: '300M',
      namespace: "beta",
    },
    // {
    //   name: "beta-explorer-peers",
    //   script: "server.peers.js",
    //   env: {
    //     NODE_ENV: "production"
    //   },
    //   env_production: {
    //     NODE_ENV: "production"
    //   }
    // },
    {
      name: "beta-explorer-top-accounts",
      script: "server.top-accounts.js",
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      },
      max_memory_restart: '300M',
      namespace: "beta",
    },
    {
      name: "beta-explorer-tps",
      script: "server.tps.js",
      env: {
        NODE_ENV: "production"
      },
      env_production: {
        NODE_ENV: "production"
      },
      max_memory_restart: '300M',
      namespace: "beta"
    }
  ]
};
