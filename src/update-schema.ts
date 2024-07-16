import { writeFileSync } from 'node:fs';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { printSchema } from 'graphql';
import { schema } from './app.js';

const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const schemaPath = resolve(__dirname, './s-2-c/schema.graphql');

writeFileSync(schemaPath, printSchema(schema));

console.log(`Finished updating schema ${schemaPath}`);
