import type { PropsWithChildren } from 'react';

type PanelCardProps = PropsWithChildren<{
  title: string;
}>;

const PanelCard = ({ title, children }: PanelCardProps) => {
  return (
    <section className='rounded-xl border bg-card p-4 text-card-foreground shadow-sm'>
      <h2 className='mb-3 text-md font-semibold text-muted-foreground'>
        {title}
      </h2>
      {children}
    </section>
  );
};

export { PanelCard };
