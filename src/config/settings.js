import dotenv from "dotenv";

dotenv.config();

export const puerto = process.env.PORT;
export const secret = process.env.ACCESS_TOKEN_SECRET;
export const publicKey = process.env.PUBLIC_KEY
export const maxRows = 50000;
export const batchSize = 1000;