import { ObjectId, type Collection, type WithId } from "mongodb";
import { getDb } from "~/db/index.server";
import type {
  Patient,
  PatientCreateInput,
  PatientUpdateInput,
} from "~/types/patient";

export type PatientDocument = {
  name: string;
  phone: string;
  petName: string;
  petBirthDate: string; 
  petType: string; 
  createdAt: string;
  updatedAt: string;
};

const COLLECTION_NAME = "patients";

const getPatientsCollection = async (): Promise<Collection<PatientDocument>> => {
  const db = await getDb();
  return db.collection<PatientDocument>(COLLECTION_NAME);
};

const toPatient = (doc: WithId<PatientDocument>): Patient => ({
  id: doc._id.toString(),
  name: doc.name,
  phone: doc.phone,
  petName: doc.petName,
  petBirthDate: doc.petBirthDate,
  petType: doc.petType as Patient["petType"],
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const nowIso = (): string => new Date().toISOString();

const toObjectId = (id: string): ObjectId | null =>
  ObjectId.isValid(id) ? new ObjectId(id) : null;

export const listPatients = async (): Promise<Patient[]> => {
  const col = await getPatientsCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toPatient);
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const _id = toObjectId(id);
  if (!_id) return null;

  const col = await getPatientsCollection();
  const doc = await col.findOne({ _id });
  return doc ? toPatient(doc) : null;
};

export const createPatient = async (
  input: PatientCreateInput,
): Promise<Patient> => {
  const col = await getPatientsCollection();
  const now = nowIso();

  const doc: PatientDocument = {
    name: input.name,
    phone: input.phone,
    petName: input.petName,
    petBirthDate: input.petBirthDate,
    petType: input.petType,
    createdAt: now,
    updatedAt: now,
  };

  const res = await col.insertOne(doc);
  return toPatient({ ...doc, _id: res.insertedId });
};

export const updatePatient = async (
  id: string,
  patch: PatientUpdateInput
): Promise<Patient | null> => {
  const _id = toObjectId(id);
  if (!_id) return null;

  const col = await getPatientsCollection();
  const now = nowIso();

  const $set: Partial<PatientDocument> = {
    updatedAt: now,
  };

  if (patch.name !== undefined) $set.name = patch.name;
  if (patch.phone !== undefined) $set.phone = patch.phone;
  if (patch.petName !== undefined) $set.petName = patch.petName;
  if (patch.petBirthDate !== undefined) $set.petBirthDate = patch.petBirthDate;
  if (patch.petType !== undefined) $set.petType = patch.petType;

  const res = await col.findOneAndUpdate(
    { _id },
    { $set },
    { returnDocument: "after" }
  );

  return res ? toPatient(res) : null;
};

export const deletePatient = async (id: string): Promise<boolean> => {
  const _id = toObjectId(id);
  if (!_id) return false;

  const col = await getPatientsCollection();
  const res = await col.deleteOne({ _id });
  return res.deletedCount === 1;
};