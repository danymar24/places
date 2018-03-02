import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Places = new Mongo.Collection('places');

if (Meteor.isServer) {
    Meteor.publish('places', () => {
        return Places.find();
    });
}

Meteor.methods({
    'places.insert'(data) {
        return Places.insert(data);
    },
    'places.remove'(id) {
        return Places.remove({ _id: id });
    }
})