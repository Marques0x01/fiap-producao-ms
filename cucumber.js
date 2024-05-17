const config = {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' },
  };

module.exports = {
    default: config
}