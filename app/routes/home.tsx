import { useLoaderData } from "react-router";
import { listPatients } from "~/models/patient.server";

export async function loader() {
  const patients = await listPatients();
  return { count: patients.length };
}

export default function Home() {
  const { count } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 24 }}>
      <h1>Mongo test</h1>
      <p>Patients in DB: {count}</p>
    </div>
  );
}