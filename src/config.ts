import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mysql: {
      dbName: process.env.MYSQL_DB,
      host: process.env.MYSQL_HOST.toString(),
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_ROOT_USERNAME,
      password: process.env.MYSQL_ROOT_PASSWORD,
    },
    jwt_secret: process.env.JWT_SECRET,
  };
});
