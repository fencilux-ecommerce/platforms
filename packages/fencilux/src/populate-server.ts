// eslint-disable-next-line @typescript-eslint/triple-slash-reference
import { bootstrap, defaultConfig, JobQueueService, Logger, mergeConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import path from 'path';

import { config } from './config';
import { initialData } from './initial-data';

/* eslint-disable no-console */

/**
 * A CLI script which populates the dev database with deterministic random data.
 */
if (require.main === module) {
    // Running from command line
    const populateConfig = mergeConfig(
        defaultConfig,
        mergeConfig(config, {
            authOptions: {
                tokenMethod: 'bearer',
                requireVerification: false,
            },
            importExportOptions: {
                importAssetsDir: path.join(__dirname, 'seeds/assets'),
            },
            customFields: {},
        }),
    );

    populate(
        () =>
            bootstrap(populateConfig).then(async app => {
                await app.get(JobQueueService).start();
                return app;
            }),
        initialData,
    ).then(app => app.close())
        .then(() => process.exit(0))
        .catch(err => {
            console.log(err);
            process.exit(1);
        })
}
