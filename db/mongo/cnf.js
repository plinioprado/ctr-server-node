var mongoose = require( 'mongoose' );

var cnfSchema = mongoose.Schema({
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

var Cnf = module.exports = mongoose.model('Configs', cnfSchema);