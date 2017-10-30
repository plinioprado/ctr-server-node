var mongoose = require( 'mongoose' );

var configSchema = mongoose.Schema({
   entity: {
      cod: {
         type: String,
         required: true,
         maxlength: [15, 'name with max 15 characters'],
      },
      name: {
         type: String,
         required: [true, 'name required'],
         maxlength: [40, 'name with max 40 characters'],
         default: ''
         },
      shortname: {
         type: String,
         maxlength: [15, 'short name with max 40 characters'],
         required: true,
      }
   },
   active: {
      type: Boolean,
      default: true
   }
});

var Config = mongoose.model('Configs', configSchema);

Config.get = function() {
  return Config
    .findOne()
    .exec();
}

Config.reset = function() {

  var promise = new Promise((resolve, reject) => {
    try {
      resolve(Config.remove({}));
    } catch(err) {
      reject('error removing ' + err)
    }
  });

  return promise
    .then(data => {
      console.log('will create');
      var json = require('../json/config');
      Config.create(json.config);
      console.log('created')
      return 'ok';      
    })
    .catch(error => { return error });
}

module.exports = Config;