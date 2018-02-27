import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

// Todo: add security to set password: it should not set another password if the email is verified

if (Meteor.isServer) {
    Meteor.publish('users', () => {
        return Meteor.users.find({}, { fields: {emails: 1, profile: 1}});
    });

    Accounts.onCreateUser((options, user) => {
        const modifiedUser = Object.assign({
            role: 'user'
        }, user);
        sendInvitation(user);
        return modifiedUser;
    })
}

Meteor.methods({
    'users.insert'(email, profile) {
        return Accounts.createUser({
            email,
            profile
        });
    },
    'users.setUserPassword'(data) {
        const { id, password } = data;
        return Accounts.setPassword(id, password);
    },
    'users.sendInvitation'(user) {
        sendInvitation(user);
    }
})

function sendInvitation(user) {
    const url = Meteor.absoluteUrl();
    return Email.send({
        to: user.emails[0].address,
        from: 'Daniel Rdz <danymar24@gmail.com>',
        subject: 'You have been invited to places!',
        html: `Please visit places app!!! <a href='${url}/set-password/${user._id}'>Here</a>`
    });
}