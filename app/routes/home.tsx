import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { listPatients } from "~/models/patient.server";
import { usePatients } from "~/hooks/usePatients";
import { PatientsSection } from "~/components/patients/PatientsSection";

export async function loader({ request }: LoaderFunctionArgs) {
  const patients = await listPatients();
  return { patients };
}

export default function Home() {
  const { patients } = useLoaderData<typeof loader>();
  usePatients({initialData: patients});

  return (
    <div className="p-4">
      <PatientsSection />
    </div>
  );
}