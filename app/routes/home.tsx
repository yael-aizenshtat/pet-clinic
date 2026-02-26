import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { listPatients } from "~/models/patient.server";
import { usePatients } from "~/hooks/usePatients";

export async function loader({ request }: LoaderFunctionArgs) {
  const patients = await listPatients();
  return { patients };
}

export default function Home() {
  const { patients } = useLoaderData<typeof loader>();

  const { data, isLoading, error } = usePatients({
    initialData: patients,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load</div>;

  return (
    <div className="p-4">
      <div className="mb-4 text-xl font-semibold">Patients</div>

      <div className="space-y-2">
        {data?.map((p) => (
          <div key={p.id} className="rounded border p-3">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-80">{p.phone}</div>
            <div className="text-sm">
              {p.petName} • {p.petType} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}