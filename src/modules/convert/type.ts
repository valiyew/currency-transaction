export namespace IType {
  export interface Convert {
    [currencyCode: string]: number;
  }

  export interface Data {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: Convert;
  }
}
