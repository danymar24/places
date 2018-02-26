import { observable, action } from 'mobx';

class store {
    @observable territory = {};
    @observable mode = '';

    @action setSelectedTerritory(territory) {
        this.territory = territory;
    }

    @action getSelectedTerritory() {
        return this.territory;
    }
}

export const TerritoryStore = new store;
