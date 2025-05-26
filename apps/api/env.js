const fs = require('fs');
const path = require('path');

const jsonString = fs.readFileSync(
  path.resolve(process.cwd(), `./config/${process.env.config}.json`),
  {
    encoding: 'utf8',
  }
);

try {
  const envConfig = JSON.parse(jsonString);

  for (const key in envConfig) {
    process.env[key] = process.env[key] || envConfig[key];
  }
} catch (err) {
  console.error(err.message);
}
