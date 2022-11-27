import dotenv from "dotenv";

dotenv.config();

export const puerto = process.env.PORT;
export const secret = process.env.ACCESS_TOKEN_SECRET;
export const connectionString = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
};
export const maxRows = 50000;
export const batchSize = 1000;
