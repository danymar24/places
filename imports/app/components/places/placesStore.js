import { observable, action } from 'mobx';

class store {
    @observable foundPlace = {};

    @action setFoundPlace(place) {
        this.foundPlace = place;
    }

    @action getFoundPlace() {
        return this.foundPlace;
    }
}

export const PlacesStore = new store;