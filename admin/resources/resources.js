const { resource, build } = require('adminjs');
const mongoose = require('mongoose');

const YourModel = mongoose.model('YourModel', {
  // Define your model schema here
});

const yourModelResource = resource({
  model: YourModel,
  options: {
    properties: {
      // Customize displayed properties here
    },
  },
});

module.exports = {
  yourModelResource,
};