import { observable, action } from 'mobx';

class store {
    @observable territory = {};
    @observable mode = '';
    @observable center = {};

    @action setCenter(center) {
        this.center = center;
    }

    @action setSelectedTerritory(territory) {
        this.territory = territory;
    }

    @action getSelectedTerritory() {
        return this.territory;
    }
}

export const TerritoryStore = new store;
