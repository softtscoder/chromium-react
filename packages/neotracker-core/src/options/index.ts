import { NetworkType } from '@neotracker/shared-utils';
import { isPGDBConfig, LiteDBConfig, PGDBConfig, PGDBConfigString } from '../getConfiguration';
import { AssetsConfiguration, common } from './common';

// tslint:disable-next-line: export-name
export { AssetsConfiguration };

export const mainRPCURL = 'https://cron.global/rpc';
export const testRPCURL = 'https://testnet.neotracker.io/rpc';
export const privRPCURL = 'http://localhost:40200/rpc';

interface CreateOptions {
  readonly port: number;
  readonly db: LiteDBConfig | PGDBConfig | PGDBConfigString;
  readonly configuration: AssetsConfiguration;
  readonly rpcURL?: string;
  readonly googleAnalyticsTag: string;
  readonly prod: boolean;
}

const blacklistNEP5Hashes: ReadonlyArray<string> = [
];

export const getOptions = (
  network: NetworkType = 'priv',
  { rpcURL, db: dbIn, configuration, port, googleAnalyticsTag, prod }: CreateOptions,
) => {
  const db = isPGDBConfig(dbIn)
    ? {
        client: dbIn.client,
        connection: {
          ...dbIn.connection,
          database: dbIn.connection.database === undefined ? `neotracker_${network}` : dbIn.connection.database,
        },
      }
    : dbIn;

  switch (network) {
    case 'main':
      return common({
        rpcURL: rpcURL ? rpcURL : mainRPCURL,
        url: 'https://cron.global',
        domain: 'cron.global',
        blacklistNEP5Hashes,
        db,
        configuration,
        googleAnalyticsTag,
        prod,
      });

    case 'staging':
      return common({
        rpcURL: rpcURL ? rpcURL : mainRPCURL,
        url: 'https://staging.neotracker.io',
        domain: 'staging.neotracker.io',
        blacklistNEP5Hashes,
        db,
        configuration,
        googleAnalyticsTag,
        prod,
      });

    case 'priv':
      return common({
        rpcURL: rpcURL ? rpcURL : privRPCURL,
        url: `http://127.0.0.1:${port}`,
        domain: '127.0.0.1',
        blacklistNEP5Hashes: [],
        db,
        configuration,
        googleAnalyticsTag,
        prod,
      });
    default:
      throw new Error('Invalid Network Option');
  }
};
