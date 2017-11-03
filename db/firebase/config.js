const firebase = require('firebase');
var ref = firebase.database().ref();

exports.get = () => {
  
  return ref
    .child('configs')
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val()
      return data
    })
  
}

exports.reset = () => {
  throw 'not available' 
}