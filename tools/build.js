require('shelljs/global');

echo('Building ...');

// clean
rm('-rf', 'lib');

// move over
exec('babel -d lib/ src/index.js');
mv('lib/src/index.js', 'lib/index.js');
rm('-rf', 'lib/src/');
rm('-rf', 'lib/tools/');

echo('Build Complete');
