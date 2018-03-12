import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Territories = new Mongo.Collection('territories');

if (Meteor.isServer) {
    Meteor.publish('territories', () => {
        return Territories.find();
    });
}

Meteor.methods({
    'territories.save'(id, data) {
        if (id) {
            return Territories.update({ _id: id }, { $set: { geometry: data.geometry }});
        } else {
            return Territories.insert(data);
        }
    },
    'territories.remove'(id) {
        return Territories.remove( {_id: id});
    }
})