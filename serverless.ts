import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import createPost from '@functions/create-post';
import updatePost from '@functions/update-post';
import deletePost from '@functions/delete-post'; 
import listPost from '@functions/list-post';
import listFilms from '@functions/list-films';


const serverlessConfiguration: AWS = {
  service: 'challenge-node',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      POST_TABLE:'posts',
      BASE_URL_SWAPI:'https://swapi.py4e.com/'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, createPost, updatePost, deletePost, listPost, listFilms },
};

module.exports = serverlessConfiguration;
