import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI in .env");

const mongoUri: string = uri;

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient(): Promise<MongoClient> {
  if (!global.__mongoClientPromise) {
    const client = new MongoClient(mongoUri);
    global.__mongoClientPromise = client.connect();
  }
  return global.__mongoClientPromise;
}