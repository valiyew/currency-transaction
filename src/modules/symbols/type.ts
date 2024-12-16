export namespace IType {
  export interface Symbols {
    [currencyCode: string]: string;
  }

  export interface Data {
    success: boolean;
    symbols: Symbols;
  }
}
