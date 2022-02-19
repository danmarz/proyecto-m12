export default () => ({
  database: {
    uri: process.env.MONGODB_CONNECTION_STRING,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
  },
});
