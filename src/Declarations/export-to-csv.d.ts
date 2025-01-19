declare module "export-to-csv" {
  export const download: (config: any) => (csvOutput: any) => void;
  export const generateCsv: (
    config: any,
  ) => <T extends Record<string, any>>(data: T[]) => string;
  export const mkConfig: (options: any) => any;

  export class ExportToCsv {
    constructor(options: any);
    generateCsv(data: any[]): void;
  }
}
