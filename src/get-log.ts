/**
 * A logger backed by [pino](https://getpino.io/)
 *
 * The default log level is `info`, but you can change it by setting the
 * `LOG_LEVEL` environment variable to `trace`, `debug`, `info`, `warn`,
 * `error`, or `fatal`.
 *
 * By default, logs are formatted for readability in development. If you intend
 * to drain logs to a logging service, set the `NODE_ENV` variable, e.g. `NODE_ENV=production probot run index.js`.
 *
 * ```js
 * app.log.debug("…so is this");
 * app.log.trace("Now we're talking");
 * app.log.info("I thought you should know…");
 * app.log.warn("Woah there");
 * app.log.error("ETOOMANYLOGS");
 * app.log.fatal("Goodbye, cruel world!");
 * ```
 */

import pino from "pino";
import type { LoggerOptions } from "pino";

export function getLog() {
  const isDevelopmentEnvironment =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  const pinoOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL || "info",
    name: "probot",
  };

  if (isDevelopmentEnvironment) {
    pinoOptions.prettyPrint = {
      ignore: [
        // default pino keys
        "time",
        "pid",
        "hostname",
        // remove keys from pino-http
        "req",
        "res",
        "responseTime",
      ].join(),
    };
    // TODO: single-line extras: https://github.com/pinojs/pino-pretty/issues/97
  }

  const log = pino(pinoOptions);

  return log;
}
