export namespace IType {
  export interface Rates {
    [currencyCode: string]: number;
  }

  export interface Data {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Rates;
  }
}
