import * as os from 'os';
import * as path from 'path';
import * as superagent from 'superagent';

const API_ENTRY = 'https://benchmark.lishunyang.com/api.json';

class BenchmarkWebpackPlugin {
  isInitial: boolean;

  constructor() {
    this.isInitial = true;
  }

  getProjectName(compiler: any) {
    const DEFAULT_NAME = 'unknown';
    try {
      return compiler.inputFileSystem.readFileSync(path.join('./', 'package.json')).toString().match(/"name": "(.*)",\n/)[1] || DEFAULT_NAME;
    } catch (e) {
      return DEFAULT_NAME;
    }
  }

  apply = (compiler: any) => {
    compiler.plugin('done', async (stats: any) => {
      if (!this.isInitial) {
        return;
      }

      try {
        let bundleSize = 0;
        for (const asset of stats.toJson().assets) {
          bundleSize += asset.size;
        }

        const body = {
          username: os.userInfo().username,
          platform: os.platform(),
          cpu: os.cpus()[0].model.trim(),
          memory: (os.totalmem() / 1024 / 1024).toFixed(1),
          projectName: this.getProjectName(compiler),
          bundleSize,
          compileTime: stats.endTime - stats.startTime,
        }

        const { body: { upload: uploadApi } } = await superagent.get(API_ENTRY);
        await superagent.post(uploadApi).set('accept', 'json').send(body);
      } catch (e) {
        console.log(e);
      }

      this.isInitial = false;
    });
  }
}

module.exports = BenchmarkWebpackPlugin;

