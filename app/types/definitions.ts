export interface Country {
  cca3: string;
  flags: Flags;
  name: Name;
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  borders?: string[];
}

export interface Flags {
  svg?: string;
  png?: string;
  alt?: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: Record<string, NativeName>;
}

export interface NativeName {
  official: string;
  common: string;
}

export interface Currency {
  name: string;
  symbol: string;
}
