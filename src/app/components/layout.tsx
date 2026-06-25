import { NavLink, Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className='min-h-screen bg-muted/30 md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr]'>
      <header className='border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:col-span-2'>
        <div className='flex h-16 w-full items-center px-4 md:px-6'>
          <div className='flex items-center gap-3'>
            <img
              src='/assets/award-icon.png'
              alt='Golden film award icon'
              className='h-10 w-10 rounded-md object-contain'
            />
            <div className='flex flex-col items-start'>
              <span className='text-sm font-medium text-muted-foreground'>
                Outsera
              </span>
              <span className='text-base font-semibold'>
                Golden Raspberry Awards
              </span>
            </div>
          </div>
        </div>
      </header>

      <aside className='border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:row-start-2 md:border-b-0 md:border-r'>
        <div className='flex h-full flex-col px-4 py-4 md:px-5 md:py-6'>
          <nav className='grid gap-2'>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border border-blue-600 bg-blue-600 text-white'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border border-blue-600 bg-blue-600 text-white'
                    : 'border border-border bg-background text-foreground hover:bg-muted'
                }`
              }
            >
              List
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className='w-full p-4 md:row-start-2 md:p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
