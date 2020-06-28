const path = require('path');
const fs = require('fs-extra');
const ngPackage = require('ng-packagr');

const root = path.resolve(__dirname, `..`);
const libPackagePath = path.resolve(root, `./lib/package.json`);

// Update version
const rootPackageJson = require(path.resolve(root, `./package.json`));
const libPackageJson = require(libPackagePath);
[
  'version',
  'description',
  'keywords',
  'author',
  'license',
  'repository',
  'bugs',
  'homepage',
].forEach((key) => (libPackageJson[key] = rootPackageJson[key]));
fs.writeJsonSync(libPackagePath, libPackageJson, { spaces: 2 });

ngPackage
  .ngPackagr()
  .forProject(path.resolve(root, `./lib/ng-package.json`))
  .withTsConfig(path.resolve(root, './lib/tsconfig.lib.json'))
  .build()
  .then(() =>
    fs.copyFileSync(
      path.resolve(root, `./README.md`),
      path.resolve(root, `./publish/README.md`),
    ),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
