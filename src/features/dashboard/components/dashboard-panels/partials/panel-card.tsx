import type { PropsWithChildren } from "react";

type PanelCardProps = PropsWithChildren<{
  title: string;
}>;

const PanelCard = ({ title, children }: PanelCardProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-left text-lg font-semibold text-slate-800">{title}</h2>
      {children}
    </section>
  );
};

export { PanelCard };
