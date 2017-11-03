const firebase = require('firebase');
var ref = firebase.database().ref();

exports.getList = () => {
  
  let data = []
  return ref
    .child('users')
    .once("value", (snapshot) => {
      snapshot.forEach((child) => {
        let item = child.val()
        item.id = child.key
        data.push(item)
      })
    })
    .then((res) => data)

}

exports.get = (id) => {
  
  let data = []
  return ref
    .child('users')
    .child(id)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val()
      data.id = snapshot.key
      return data
    })

}

exports.reset = () => {
  throw 'not available' 
}