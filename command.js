var Command = {};
var Contact = require('./contact');

Command.getOperation = function(){
  return process.argv[2];
};

Command.getOperationData = function(){
  return process.argv[3];
};

Command.add = function(callback){
  var newContact = Contact.createContact(this.getOperationData());
  Contact.saveContact(newContact, callback);
}

Command.find = function(callback){
  Contact.findContacts(this.getOperationData(), function(err, foundContacts){
    if (err) {return callback(err);}

    foundContacts.forEach(function(contact){
      console.log(contact);
      });

      callback(null, foundContacts);
    });
}

module.exports = Command;
