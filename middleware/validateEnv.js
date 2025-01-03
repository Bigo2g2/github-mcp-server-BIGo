const validateEnv = () => {
  const requiredEnvVars = [
    'JWT_SECRET',
    'STACKHERO_POSTGRESQL_ADMIN_PASSWORD',
    'STACKHERO_POSTGRESQL_HOST',
    'STACKHERO_POSTGRESQL_PORT',
    'NODE_ENV'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
};

module.exports = validateEnv;