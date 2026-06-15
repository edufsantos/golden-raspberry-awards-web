import { beforeEach, describe, expect, it, vi } from "vitest";

import { ConsoleLogger, type LogLevel } from "./logger";

describe("ConsoleLogger", () => {
  let logger: ConsoleLogger;

  beforeEach(() => {
    logger = new ConsoleLogger();
    vi.spyOn(console, "debug");
    vi.spyOn(console, "info");
    vi.spyOn(console, "warn");
    vi.spyOn(console, "error");
    vi.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  it("should log debug messages when level is debug", () => {
    logger.debug("Test debug message");
    expect(console.debug).toHaveBeenCalled();
  });

  it("should log info messages when level is info or lower", () => {
    logger.setLevel("info");
    logger.info("Test info message");
    expect(console.info).toHaveBeenCalled();
    logger.debug("Test debug message"); // Não deve ser logado
    expect(console.debug).not.toHaveBeenCalled();
  });

  it("should log warn messages when level is warn or lower", () => {
    logger.setLevel("warn");
    logger.warn("Test warn message");
    expect(console.warn).toHaveBeenCalled();
    logger.info("Test info message"); // Não deve ser logado
    expect(console.info).not.toHaveBeenCalled();
    logger.debug("Test debug message"); // Não deve ser logado
    expect(console.debug).not.toHaveBeenCalled();
  });

  it("should log error messages when level is error or lower", () => {
    logger.setLevel("error");
    logger.error("Test error message");
    expect(console.error).toHaveBeenCalled();
    logger.warn("Test warn message"); // Não deve ser logado
    expect(console.warn).not.toHaveBeenCalled();
    logger.info("Test info message"); // Não deve ser logado
    expect(console.info).not.toHaveBeenCalled();
    logger.debug("Test debug message"); // Não deve ser logado
    expect(console.debug).not.toHaveBeenCalled();
  });

  it("should set the log level correctly", () => {
    logger.setLevel("warn");
    expect(logger.currentLevel).toBe("warn");

    logger.setLevel("error");
    expect(logger.currentLevel).toBe("error");

    logger.setLevel("info");
    expect(logger.currentLevel).toBe("info");

    logger.setLevel("debug");
    expect(logger.currentLevel).toBe("debug");
  });

  it("should not set an invalid log level and log an error", () => {
    logger.setLevel("invalid" as LogLevel); // Força um tipo inválido
    expect(console.error).toHaveBeenCalledWith("Invalid log level: invalid");
    expect(logger.currentLevel).not.toBe("invalid"); // Nível não deve mudar
  });
});
