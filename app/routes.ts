import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("api/patients", "routes/api/api.patients.ts"),
  route("api/patients/:patientId", "routes/api/api.patients.$patientId.ts"),
] satisfies RouteConfig;