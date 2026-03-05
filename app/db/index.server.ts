import type { Db } from "mongodb";
import { getMongoClient } from "./mongo.server";

export const getDb = async (): Promise<Db> => {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "pet_clinic";
  return client.db(dbName);
};

export const getPatientsCollection = async () => {
  const db = await getDb();
  return db.collection("patients");
};