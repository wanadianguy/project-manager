import './preload-env';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
    migrations: { path: './migrations' },
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    extensions: [Migrator],
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    driver: PostgreSqlDriver,
    driverOptions: {
        connection: {
            reconnect: true,
            connectTimeoutMillis: 5000,
        },
    },
});
