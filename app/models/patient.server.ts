import { getPatientsCollection } from "~/db/index.server";
import type { ObjectId } from "mongodb";

export type PetType = "Dog" | "Cat" | "Parrot";

export type PatientDoc = {
  _id: ObjectId;
  name: string;
  phone: string;
  petName: string;
  petBirthDate: Date;
  petType: PetType;
  createdAt: Date;
  updatedAt: Date;
};

export async function listPatients() {
  const col = await getPatientsCollection();
  return col.find({}).sort({ createdAt: -1 }).toArray();
}