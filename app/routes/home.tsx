import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { listPatients } from "~/models/patient.server";
import { usePatients } from "~/hooks/usePatients";
import PatientsSection from "~/components/patients/PatientsSection";
import { Stethoscope } from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const patients = await listPatients();
  return { patients };
}

export default function Home() {
  const { patients } = useLoaderData<typeof loader>();
  usePatients({initialData: patients});

  return (
    <div className="p-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Pet Clinic
              </h1>
            </div>
            <p className="text-gray-500">
              Manage your patients and their furry companions
            </p>
          </div>
      <div className="space-y-2">
      <PatientsSection onOpenAdd={()=>{}} onOpenEdit={()=>{}}/>
      </div>
    </div>
  );
}