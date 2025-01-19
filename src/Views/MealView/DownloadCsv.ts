import { download, generateCsv, mkConfig } from "export-to-csv";

export const downloadCsv = (data: Record<string, any>[]) => {
  // mkConfig merges your options with the defaults
  // and returns WithDefaults<ConfigOptions>
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: `meal-export-${new Date().getTime()}`,
  });

  // Converts your Array<Object> to a CsvOutput string based on the configs
  const csv = generateCsv(csvConfig)(data);

  // Get the button in your HTML

  // Add a click handler that will run the `download` function.
  // `download` takes `csvConfig` and the generated `CsvOutput`
  // from `generateCsv`.
  return download(csvConfig)(csv);
};
