import { withHelmet } from "@/shared/utils/with-helmet";

import { DashboardPanels } from "../components/dashboard-panels";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-left text-2xl font-semibold text-slate-900">Dashboard</h1>
      <DashboardPanels />
    </div>
  );
};

const DashboardPage = withHelmet(Dashboard, "Outsera | Dashboard");

export { DashboardPage };
