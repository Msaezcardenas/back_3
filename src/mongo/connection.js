import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const { MONGO_STRING, USE_DB, USE_DB_TEST, NODE_ENV } = process.env;

export const connectionDB = async () => {
  try {
    const dbName = NODE_ENV === 'test' ? USE_DB_TEST : USE_DB;
    console.log(dbName);

    await mongoose.connect(MONGO_STRING, { dbName: dbName });
    console.log('BBDD conectada');
  } catch (e) {
    console.log('Error al conectarse a la bbdd');
  }
};
