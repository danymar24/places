import React from 'react';
import { SessionStore } from './SessionStore';

export const Authorization = (allowedRoles) => {
    if (!Meteor.loggingIn() && Meteor.userId()) {
        return allowedRoles.includes(role);
    }
}