var mongoose = require( 'mongoose' );

var userSchema = {
  num: {
    type: Number,
    default: 0,
    validate: v => v >= 0
 },
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
};

var User = module.exports = mongoose.model('User', mongoose.Schema(userSchema));

User.getByLogin = function(email, pass) {
  return  User.findOne({ email: email, pass: pass })
    .exec();
}

User.getList = function() {
  return  User.find()
    .sort({'email': 1})
    .exec();
}

User.getById = function(id) {

  if (id == 0) {

    const promise = new Promise(function(resolve, reject) {
      try {
        const data = {
          id: '0',
          num: userSchema.num.default,
          name: userSchema.name.default,
          fullname: userSchema.fullname.default,
          email: userSchema.email.default,
          pass:userSchema.pass.default,
          active:userSchema.active.default,
          std:userSchema.std.default
        }
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })

    return promise
      .then(value => value)
      .catch(error => error)

  } else {

    return this
      .findById(id, 'name fullname email pass active std')
      .exec(); 
  }
};

User.post = function(data) {

  return User.create(data);

};

User.reset = function() {
  return 'under construction'
};

module.exports = User;
  