export default () => ({
  database: {
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    entities: ['dist/**/entities/*.entity.js'],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
  },
});
