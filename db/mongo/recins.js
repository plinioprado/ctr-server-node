var mongoose = require( 'mongoose' );

var recinsSchema = mongoose.Schema({
   cod: {
      type: String,
      required: [ true, 'cod required'],
      minlength: [1, 'name with min 1 character'],
      maxlength: [15, 'name with max 15 characters'],
      default: '',
      unique : true
   },
   dt: {
      type: Date,
      required: [ true, 'date required'],
      default: Date.now
   },
   val: {
      type: String,
      required: [ true, 'val required'],
      min: [0, 'val >= 0'],
      max: [99999999999.99, 'val <= 99999999999,99'],
      default: 0
   },
   cp: {
      cod: {
         type: String,
         required: [ true, 'cod required'],
         minlength: [3, 'cod with min 3 characters'],
         maxlength: [15, 'cod with max 15 characters'],
         default: ''
      },
      name: {
         type: String,
         required: [ true, 'name required'],
         maxlength: [30, 'name with max 30 characters'], // some banks accept 40
         default: ''
      },
      address: {
         addr: {
            type: String,
            required: [ true, 'address required'],
            maxlength: [40, 'address with max 40 characters'], // Some banks require 45 or 52
            default: ''
         },
         neigh: {
            type: String,
            required: [ false, ''], // Some banks require 12 or none
            maxlength: [15, 'neighborhood with max 15 characters'],
            default: ''
         },
         city: {
            type: String,
            required: [ true, 'city required'],
            maxlength: [15, 'city with max 15 characters'], // Sometimes need to abbreviate
            default: ''
         },
         state: {
            type: String,
            required: [ true, 'state required'],
            minlength: [2, 'state with min 2 characters'],
            maxlength: [2, 'state with max 2 characters'],
            default: ''
         },
         zip: {
            type: String,
            required: [ true, 'zip required'],
            maxlength: [8, 'zip with max 8 characters'],
            default: ''
         }
      }
   },
   std: {
      type: String,
      required: [true, 'std required'],
      enum: ['nfs', 'nfm', 'nd', 'rc'],
      default: 'nfs'
   },
   txt: {
      type: String,
      maxlength: [1024, 'name with max 1024 characters'],
      default: ''
   },
   recList: [{
      dtDue: {
         type: Date,
         required: [ true, 'rec.dtdue required'],
         default: Date.now
      },
      val: {
         type: String,
         required: [ true, 'rec.val required'],
         min: [0, 'rec.val >= 0'],
         max: [999999999, 'rec.val <= 999999999'],
         default: 0
      }
   }]
});

var Recins = module.exports = mongoose.model('Recins', recinsSchema);