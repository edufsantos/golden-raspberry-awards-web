/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, type ReactNode } from "react";

const ConfigContext = createContext<
  | {
      getAppEnvironment: () => "development" | "production" | "test";
      getBaseUrl: () => string;
      getApiTimeout: () => number;
      getLogLevel: () => "debug" | "info" | "warn" | "error";
    }
  | undefined
>(undefined);

interface ConfigProviderProps {
  env: Record<string, string>;
  children: ReactNode;
}

// ConfigProvider inicializa as configurações a partir das variáveis de ambiente e as disponibiliza via contexto, se o quisermos um contexto diferente podemos ajustar aqui 
const ConfigProvider: React.FC<ConfigProviderProps> = ({ env, children }) => {
  const modeRaw = env.MODE;
  const mode =
    modeRaw === "development" || modeRaw === "production" || modeRaw === "test"
      ? modeRaw
      : "development";

  const timeout = Number(env.VITE_API_TIMEOUT);
  const safeTimeout = Number.isFinite(timeout) && timeout > 0 ? timeout : 5000;

  const logLevelRaw = env.VITE_LOG_LEVEL;
  const logLevel =
    logLevelRaw === "debug" ||
    logLevelRaw === "info" ||
    logLevelRaw === "warn" ||
    logLevelRaw === "error"
      ? logLevelRaw
      : "debug";

  const baseUrl = env.VITE_API_BASE_URL || "http://localhost:3000";

  const getAppEnvironment = () => mode;
  const getBaseUrl = () => baseUrl;
  const getApiTimeout = () => safeTimeout;
  const getLogLevel = () => logLevel;

  return (
    <ConfigContext.Provider
      value={{
        getAppEnvironment,
        getBaseUrl,
        getApiTimeout,
        getLogLevel,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return config;
};

export { ConfigProvider, useConfig };
