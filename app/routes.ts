import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("api/patients", "routes/api.patients.ts"),
  route("api/patients/:patientId", "routes/api.patients.$patientId.ts"),
  route(".well-known/appspecific/com.chrome.devtools.json", "routes/.well-known.appspecific.com.chrome.devtools.json.ts"),
] satisfies RouteConfig;