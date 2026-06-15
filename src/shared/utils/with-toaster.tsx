import React, { type ComponentType } from "react";

import { Toaster } from "../components/ui/sonner";

// Componente para envolver outros componentes e adicionar o Toaster globalmente
const withToaster = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithToaster: React.FC<P> = (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <Toaster className="toaster group" />
      </>
    );
  };

  WithToaster.displayName = `withToaster(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithToaster;
};

export default withToaster;
