import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: [
    {
      [process.env.CLIENT_GRAPHQL_SCHEMA_LINK]: {
        headers: {
          "codegen-request": "true",
        },
      },
    },
  ],
  documents: ["src/Schema/**/*.queries.ts", "src/Schema/**/*.mutations.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/Schema/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
