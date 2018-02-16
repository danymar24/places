import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Territories = new Mongo.Collection('territories');

if (Meteor.isServer) {
    Meteor.publish('territories', () => {
        return Territories.find();
    });
}

Meteor.methods({
    'territories.insert'(data) {
        return Territories.insert(data);
    },
    'territories.remove'(ids) {
        return Territories.remove( {_id: { $in: ids }});
    }
})