import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { VehicleSelectionPage } from "./pages/vehicle-selection-page";
import { AdminDashboard } from "./pages/admin-dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/vehicles",
    Component: VehicleSelectionPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
