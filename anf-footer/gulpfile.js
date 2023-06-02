// gulpfile.js
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
build.addSuppression(
  /Warning - \[sass\] The local CSS class .* is not camelCase and will not be type-safe./gi
);

// force use of projects specified typescript version
const typeScriptConfig = require('@microsoft/gulp-core-build-typescript/lib/TypeScriptConfiguration');
typeScriptConfig.TypeScriptConfiguration.setTypescriptCompiler(
  require('typescript')
);

// force use of projects specified react version
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.externals = generatedConfiguration.externals.filter(
      (name) => !['react', 'react-dom'].includes(name)
    );

    generatedConfiguration.module.rules.map((rule) => {
      if (rule.use.indexOf('source-map-loader') != -1) {
        rule.exclude = path.resolve(__dirname, 'node_modules');
      }
    });
    return generatedConfiguration;
  }
});

build.initialize(gulp);
