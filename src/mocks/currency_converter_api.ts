export class CurrencyConverterAPI {
  constructor(private apiKey: string) {
    this.apiKey = apiKey;
  }

  async convertirDolarA(codigoMoneda: string): Promise<number> {
    switch (codigoMoneda) {
      case "ARS":
        return 100.79;
      case "MXN":
        return 21.91;
      case "CLP":
        return 832.05;
      case "EUR":
        return 0.88;
      case "UYU":
        return 44.12;
      case "BRL":
        return 5.61;
      case "COP":
        return 4007;
      case "BOB":
        return 6.91;
      case "BZD":
        return 2.01;
      case "GTQ":
        return 7.01;
      case "GYD":
        return 200.01;
      case "PYG":
        return 6500;
      case "PEN":
        return 3.01;
      case "SRD":
        return 7.01;
      case "VEF":
        return 6.01;
      case "PAB":
        return 1.01;
      case "HNL":
        return 7.01;
      default:
        return 0;
    }
  }
}
