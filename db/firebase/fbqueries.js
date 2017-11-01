const firebase = require('firebase')
var config = require('./firebase.json')

firebase.initializeApp(config);
var ref = firebase.database().ref()

exports.getConfig = () => {
  
  return ref
    .child('configs')
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val()
      return data
    })
  
}

exports.getUsers = () => {

  let data = []
  return ref
    .child('users')
    .once("value", (snapshot) => {
      snapshot.forEach((child) => {
        let item = child.val()
        item.id = child.key
        data.push(item)
      })
      console.log('data', data)
    })
    .then((res) => data)

}

exports.getUser = (id) => {
  
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
exports.getUsers = () => {
  
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
  
  exports.getUser = (id) => {
    
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
exports.getInvoices = () => {

  let data = []
  return ref
    .child('recins')
    .once("value", (snapshot) => {
      snapshot.forEach((child) => {
        let item = child.val()
        item.id = child.key
        data.push(item)
      })
    })
    .then((res) => data)

}

exports.getInvoice = (num) => {
  
  let data = []
  return ref
    .child('recins')
    .child(num)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val()
      data.id = snapshot.key
      return data
    })

}
  