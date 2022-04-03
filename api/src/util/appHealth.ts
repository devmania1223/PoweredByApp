/**
 * The purpose of this class is to collect the 'liveness' info from
 * various critical parts of the application so that they can be
 * reported by the /healthz api endpoint
 */
export class AppHealth {
  configurationSuccess: boolean;
  dbConnectionSuccess: boolean;
  liiingoConnectionSuccess: boolean;
  servingTraffic: boolean;
  errors: { phase: Phase; message: string }[];

  constructor() {
    this.configurationSuccess = false;
    this.dbConnectionSuccess = false;
    this.liiingoConnectionSuccess = false;
    this.servingTraffic = false;
    this.errors = [];
  }

  recordError(message: string, phase: Phase = 'unknownPhase') {
    this.errors.push({
      phase,
      message,
    });
  }
}

type Phase = 'config' | 'db' | 'webserver' | 'liiingo' | 'unknownPhase';

// Provide a singleton instance to accumulate health info from throughout the app
export let appHealth = new AppHealth();
