const path = require('path');
const ngPackage = require('ng-packagr');

const root = path.resolve(__dirname, `..`);

ngPackage
  .ngPackagr()
  .forProject(path.resolve(root, `./package.json`))
  .withTsConfig(path.resolve(root, './lib/tsconfig.lib.json'))
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
