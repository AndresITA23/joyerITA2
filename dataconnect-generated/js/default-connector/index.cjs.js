const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'joyerITA2',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

