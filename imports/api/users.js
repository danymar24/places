import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find({}, { fields: {emails: 1, profile: 1}});
    });
}

Meteor.methods({
 'users.insert'(email, profile) {
     console.log('email', email);
     console.log('profile', profile);
     return Accounts.createUser({
         email,
         profile
     });
 }
})