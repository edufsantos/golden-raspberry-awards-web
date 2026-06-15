/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect } from "react";

import { ConsoleLogger, type LoggerInterface } from "../utils/logger";
import { useConfig } from "./config-context";

const LoggerContext = createContext<LoggerInterface | null>(null);

const LoggerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logLevel = useConfig().getLogLevel();
  const logger: LoggerInterface = new ConsoleLogger();

  useEffect(() => {
    logger.setLevel(logLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
};

const useLogger = (): LoggerInterface => {
  const context = useContext(LoggerContext);
  if (context === null) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return context;
};

export { LoggerProvider, useLogger };
