interface LoggerInterface {
  setLevel(level: LogLevel): void;
  log(level: LogLevel, message: string): void;
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class ConsoleLogger implements LoggerInterface {
  levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  currentLevel: LogLevel;

  constructor(initialLevel: LogLevel = 'debug') {
    this.currentLevel = initialLevel;
  }

  setLevel(level: LogLevel): void {
    if (this.levels.includes(level)) {
      this.currentLevel = level;
    } else {
      console.error(`Invalid log level: ${level}`);
    }
  }

  log(level: LogLevel, message: string): void {
    const levelIndex = this.levels.indexOf(level);
    const currentLevelIndex = this.levels.indexOf(this.currentLevel);

    if (levelIndex >= currentLevelIndex) {
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${level.toUpperCase()}] ${timestamp}: ${message}`;

      switch (level) {
        case 'debug':
          console.debug(formattedMessage);
          break;
        case 'info':
          console.info(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'error':
          console.error(formattedMessage);
          break;
      }
    }
  }

  debug(message: string): void {
    this.log('debug', message);
  }

  info(message: string): void {
    this.log('info', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }
}

export { ConsoleLogger, type LoggerInterface, type LogLevel };
