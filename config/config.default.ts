import { join } from 'path';
import { tmpdir } from 'os';
import { EggAppConfig, PowerPartial } from 'egg';

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.cnpmcore = {
    sourceRegistry: 'https://registry.npmjs.com',
    registry: 'http://localhost:7001',
  };

  // override config from framework / plugin
  config.keys = appInfo.name + '123456';
  config.dataDir = join(process.env.HOME || tmpdir(), '.cnpmcore');

  config.orm = {
    client: 'mysql',
    database: 'cnpmcore',
    host: 'localhost',
    port: 3306,
    user: 'root',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.nfs = {
    client: null,
    dir: join(config.dataDir, 'nfs'),
  };

  return config;
};