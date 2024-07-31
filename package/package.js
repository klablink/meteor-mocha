Package.describe({
  name: 'meteortesting:mocha',
  summary: 'Run Meteor package or app tests with Mocha',
  git: 'https://github.com/meteortesting/meteor-mocha.git',
  documentation: '../README.md',
  version: '3.0.0',
  testOnly: true,
});

Package.onUse(function onUse(api) {
  api.versionsFrom(['2.8.0', '3.0'])
  api.use([
    'meteortesting:mocha-core',
    'ecmascript',
  ]);

  api.use([
    'meteortesting:browser-tests',
    'http@1.0.0 || 2.0.0'
  ], 'server');
  api.use('browser-policy', 'server', { weak: true });
  //api.use('lmieulet:meteor-coverage@1.1.4 || 2.0.1 || 3.0.0 || 4.1.0', 'client', { weak: true });

  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});
