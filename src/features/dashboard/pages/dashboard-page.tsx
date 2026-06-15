import { withHelmet } from "@/shared/utils/with-helmet";

import { DashboardPanels } from "../components/dashboard-panels";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumo dos vencedores do Golden Raspberry Awards
        </p>
      </div>
      <DashboardPanels />
    </div>
  );
};

const DashboardPage = withHelmet(Dashboard, "Outsera | Dashboard");

export { DashboardPage };
