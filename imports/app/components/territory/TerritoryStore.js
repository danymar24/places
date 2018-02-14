import { observable } from 'mobx';

class store {
    @observable mode = '';
    @observable path = [];
    @observable type = '';
}

export const TerritoryStore = new store;
