// @ts-ignore
const fs = require('fs');
const OUTPUT_PATH = './src/shared/api-apollo/models/possibleTypes.json';
const schema = require('./schema.json');
const possibleTypes = {};

(
  schema.__schema.types as {
    kind: string;
    name: string;
    possibleTypes: {
      name: string;
    }[];
  }[]
).forEach((supertype) => {
  if (supertype.possibleTypes) {
    possibleTypes[supertype.name] = supertype.possibleTypes.map(
      (subtype) => subtype.name,
    );
  }
});

fs.writeFile(OUTPUT_PATH, JSON.stringify(possibleTypes), (error: any) => {
  if (error) {
    console.error('❌ Error writing possibleTypes.json', error);
  } else {
    console.log('✔️ Fragment types successfully extracted!');
  }
});
