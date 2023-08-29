import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  documents: "src/**/*.tsx",
  generates: {
    "src/Schema/types.ts": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
