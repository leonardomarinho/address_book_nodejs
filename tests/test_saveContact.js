var Contact = require('../contact')

var contact = { name: "John Smith", number: "604-123-9090" }

Contact.saveContact(contact, function(err) {
  console.log('success')
  // once the 'success' message is printed
  // the contact above was appended to data.json
  // among the already existing contacts
})
