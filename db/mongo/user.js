var mongoose = require( 'mongoose' );

var userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [ true, 'name required'],
      minlength: [3, 'name with min 3 characters'],
      maxlength: [15, 'name with max 18 characters'],
      default: ''
   },
   fullname: {
      type: String,
      required: [true, 'fullname required'],
      maxlength: [40, 'fullname with max 40 characters'],
      default: ''
   },
   email: {
      type: String,
      required: [true, 'email required'],
      maxlength: [128, 'email with max 128 characters'],
      unique: true,
      default: ''
   },
   pass: {
      type: String,
      required: [true, 'pass required'],
      minlength: [6, 'pass with min 6 characters'],
      maxlength: [30, 'pass with max 30 characters'],
      default: ''
   },
   std: {
      type: String,
      required: [true, 'std required'],
      enum: ['super', 'admin', 'user', 'guest'],
      default: 'user'
   },
   active: {
      type: Boolean,
      default: true
   },
   create_date: {
      type: Date,
      default: Date.now
   }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.login = function(email, pass, callback) {
   var query = { email: email, pass: pass };
   User.
      findOne(query, callback);
}