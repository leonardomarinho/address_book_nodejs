var jsonfile = require('jsonfile');
var fs = require('fs');
var Util = require('./util');
var Contact = {};
var separator = ',';
var contactsFilename = Util.getDataPath();
var options = {encoding: 'utf-8'};

Contact.checkForFile = function (fileName){
  if(!fs.existsSync(fileName)){
    console.log('Contacts database not found. Creating database...');
    fs.writeFileSync(fileName, '[]', {flag: 'wx'});
    console.log('Contacts database created!');
  }
}

Contact.parseName = function (nameAndNumber) {
  return nameAndNumber.split(separator)[0].trim();
}

Contact.parseNumber = function(nameAndNumber){
  return nameAndNumber.split(separator)[1].trim();
}

Contact.createContact = function(nameAndNumber){
  var contact = {
    name: this.parseName(nameAndNumber),
    number: this.parseNumber(nameAndNumber)
  }
  return contact;
}

Contact.loadContacts = function(callback){
  this.checkForFile(contactsFilename);
  jsonfile.readFile(contactsFilename, options, function(err, data){
    callback(err, data);
  });
}

Contact.saveContacts = function(contacts, callback){
  this.checkForFile(contactsFilename);
  jsonfile.writeFile(contactsFilename, contacts, callback);
}

Contact.saveContact = function(singleContact, callback){
  var _this = this;

  this.loadContacts(function(err, contacts){
    if (err) {return callback(err)}

    contacts.push(singleContact);
    _this.saveContacts(contacts, callback);
  })
}

Contact.findContacts = function(contactName, callback){
  this.loadContacts(function(err, contacts){
    if (err) {return callback(err)}
    
    var foundContacts = contacts.filter(function(contact){return contact.name == contactName});
    callback(null, foundContacts);
  });
}

module.exports = Contact;
