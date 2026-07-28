import { Provider } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

import config from '../common/config/config';
import { DATABASE_CONNECTION } from './database.constant';

const configuration = config();

export const databaseProvider: Provider = {
  provide: DATABASE_CONNECTION,

  useFactory: async (): Promise<Pool> => {
    const db = createPool({
      host: configuration.db.host,
      port: configuration.db.port,

      user: configuration.db.user,
      password: configuration.db.password,

      database: configuration.db.name,

      ssl: configuration.db.cert
        ? {
            ca: configuration.db.cert.replace(/\\n/g, '\n'),
          }
        : undefined,

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 30000,
    });

    const connection = await db.getConnection();

    console.log('Database Connected Successfully');

    connection.release();

    return db;
  },
};
