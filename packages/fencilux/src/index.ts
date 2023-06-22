/* eslint-disable no-console */

import { bootstrapWorker, bootstrap, runMigrations } from '@vendure/core';
import { Worker, isMainThread } from 'node:worker_threads';

import { config } from './config';

if (isMainThread) {
    (async () => {
        await runMigrations(config);
        await bootstrap(config);
        new Worker(__filename);
    })().catch(console.error);
} else {
    bootstrapWorker(config)
        .then(worker => worker.startJobQueue())
        // eslint-disable-next-line no-console
        .catch(console.log);
}
