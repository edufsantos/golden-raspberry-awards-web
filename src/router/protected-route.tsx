import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: React.PropsWithChildren<{
  isAllowed: boolean;
  redirectPath?: string;
}>) => {
  const location = useLocation();

  if (!isAllowed) {
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname }} />
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
