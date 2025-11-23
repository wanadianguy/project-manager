import { config } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
    case 'local':
        config({ path: resolve('.env.local') });
        break;
    case 'docker':
        config({ path: resolve('.env.docker') });
        break;
    default:
        throw new Error('Environment file not found');
}
