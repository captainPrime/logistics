import * as fs from 'fs';
import * as path from 'path';

import { Logger } from '@nestjs/common';

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.model.ts'],
  migrations: ['db/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  
};

const filePath = path.join(process.cwd(), 'ormconfig.json');

if (fs.existsSync(filePath)) {
  Logger.verbose('Migration file already exists. Exiting script now...');
  process.exit(0);
}

fs.writeFile(filePath, JSON.stringify(config), (err) => {
  if (err) Logger.error(err);

  Logger.log('Migration config file has been successfully generated 🤩.');
});
