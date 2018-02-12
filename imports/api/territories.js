import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Territories = new Mongo.Collection('territories');

if (Meteor.isServer) {
    Meteor.publish('territories', () => {
        return Territories.find();
    });
}