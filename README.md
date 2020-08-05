benchmark-webpack-plugin
========================

A webpack plugin which is used for benchmark😑

## Usage

1. Install package

```sh
npm i --save-dev @moka-fe/benchmark-webpack-plugin
```

2. Modify webpack config

```js
const BenchmarkWebpackPlugin = require('@moka-fe/benchmark-webpack-plugin');

...

module.exports = {
  plugins: [
    new BenchmarkWebpackPlugin(),
  ],
}
```

3. Build & upload data

Everytime when you start webpack and build project, the plugin will collect data and send them to a benchmark billboard, click [here](https://benchmark.lishunyang.com).
