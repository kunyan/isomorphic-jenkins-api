import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/isomorphic-jenkins-api.js',
      format: 'umd',
      name: 'isomorphic-jenkins-api.js'
    }
  ],
  external: 'isomorphic-fetch',
  plugins: [
    typescript({
      cacheRoot: '/tmp/.rpt2_cache'
    })
  ]
};
