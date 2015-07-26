var Contact = require('../contact')

var name = "John Smith";

Contact.findContacts(name, function(err, data){
  console.log(data);
});
