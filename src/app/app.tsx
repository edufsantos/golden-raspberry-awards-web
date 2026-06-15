import { HelmetProvider } from "react-helmet-async";

import { LoggerProvider } from "../shared/context/logger-context";
import withToaster from "../shared/utils/with-toaster";

import { AppRouter } from "../router/app-router";
import { ConfigProvider, useConfig } from "../shared/context/config-context";
import { HttpClientProvider } from "./context/http-client-context";
import { ServicesProvider } from "./context/services-context";
import { ThemeProvider } from "./context/theme-context";

const AppRouterWithToaster = withToaster(AppRouter);

const InnerProviders = () => {
  const configProvider = useConfig();

  const httpClientConfig = {
    baseURL: configProvider.getBaseUrl(),
    timeout: configProvider.getApiTimeout(),
  };

  return (
    <HttpClientProvider config={httpClientConfig}>
      <LoggerProvider>
        <ServicesProvider>
          <ThemeProvider>
            <AppRouterWithToaster />
          </ThemeProvider>
        </ServicesProvider>
      </LoggerProvider>
    </HttpClientProvider>
  );
};

const App = () => {
  const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;

  return (
    <ConfigProvider env={env}>
      <HelmetProvider>
        <InnerProviders />
      </HelmetProvider>
    </ConfigProvider>
  );
};

export { App };
