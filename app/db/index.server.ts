import type { Db } from "mongodb";
import { getMongoClient } from "./mongo.server";

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "pet_clinic";
  return client.db(dbName);
}

export async function getPatientsCollection() {
  const db = await getDb();
  return db.collection("patients");
}