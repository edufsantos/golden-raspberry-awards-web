import React, { type ComponentType } from "react";
import { Helmet } from "react-helmet-async"; // Certifique-se de ter o react-helmet-async instalado

/**
 * Componente HOC para envolver outros componentes e definir o título da página
 * @param WrappedComponent Componente a ser envolvido pelo HOC
 * @param title Título da página
 * @returns Componente com título definido
 */
const withHelmet = <P extends object>(
  WrappedComponent: ComponentType<P>,
  title: string
) => {
  const WithHelmet: React.FC<P> = (props) => {
    const { ...rest } = props;

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <WrappedComponent {...rest} />{" "}
      </>
    );
  };

  WithHelmet.displayName = `withHelmet(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithHelmet;
};

export { withHelmet };
