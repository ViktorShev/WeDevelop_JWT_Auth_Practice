module.exports = () => {
  return {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: console.log,
    dialect: process.env.DB_DIALECT || 'postgres',
    define: {
      freezeTableName: true
    }
  }
}
