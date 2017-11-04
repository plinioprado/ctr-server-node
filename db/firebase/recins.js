const firebase = require('firebase');
var ref = firebase.database().ref();

exports.getList = () => {

  let data = []
  return ref
    .child('recins')
    .once("value", (snapshot) => {
      snapshot.forEach((child) => {
        let item = child.val()
        item.cod = child.key
        data.push(item)
      })
    })
    .then((res) => data)

}

exports.get = (num) => {
  
  let data = []
  return ref
    .child('recins')
    .child(num)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val()
      data.cod = snapshot.key
      return data
    })

}

exports.reset = () => {
  throw 'not available' 
}