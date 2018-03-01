import { observable, action, computed } from 'mobx';

class store {
    @observable loggedInUser = {};
    @action setLoggedInUser(user) {
        this.loggedInUser = user;
    }

    @action getLoggedInUser() {
        return this.loggedInUser;
    }

    @action userRole() {
        if (this.loggedInUser && this.loggedInUser.profile) {            
            return this.loggedInUser.profile.role;
        }
    }
}

export const SessionStore = new store;
