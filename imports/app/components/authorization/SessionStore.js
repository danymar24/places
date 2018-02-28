import { observable, action } from 'mobx';

class store {
    @observable loggedInUser = {};
    @action setLoggedInUser(user) {
        this.loggedInUser = user;
    }

    @action getLoggedInUser() {
        return this.loggedInUser;
    }

    @action userRole() {
        return this.loggedInUser.profile.role;
    }
}

export const SessionStore = new store;
