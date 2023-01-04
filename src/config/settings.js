import dotenv from "dotenv";

dotenv.config();

export const puerto = process.env.PORT;
export const secreto = process.env.SECRETO;
export const publicKey = process.env.PUBLIC_KEY
export const newPublicKey = process.env.NEW_PUBLIC_KEY
export const maxRows = 50000;
export const batchSize = 1000;