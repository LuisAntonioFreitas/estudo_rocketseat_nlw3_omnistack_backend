// Define variáveis de ambiente
const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase();

if (NODE_ENV === 'development') {
  // development
  process.env.NODE_SERVER_PORT = process.env.NODE_DEV_SERVER_PORT;

  process.env.NODE_DB_NAME = process.env.NODE_DEV_DB_NAME;
  process.env.NODE_DB_PASS = process.env.NODE_DEV_DB_PASS;
  process.env.NODE_DB_HOST = process.env.NODE_DEV_DB_HOST;

  process.env.NODE_URL_UPDATES = process.env.NODE_DEV_URL_UPDATES?.replace(/{NODE_DEV_SERVER_PORT}/, `${process.env.NODE_DEV_SERVER_PORT}`);
} else {
  // production
  process.env.NODE_URL_UPDATES = process.env.NODE_URL_UPDATES?.replace(/{NODE_SERVER_PORT}/, `${process.env.NODE_SERVER_PORT}`);
}

export default NODE_ENV;