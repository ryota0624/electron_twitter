export class ActionDatabase {
  storeName: string;
  commitedStrage: Array<any>;
  strage: Array<any>;
  db: any;
  constructor(storeName, db) {
    this.db = db;
    this.storeName = storeName;
    this.commitedStrage = [];
    this.strage = [];
  }
  async init() {
    this.commitedStrage = await this.db.get(this.storeName);
  }
  add(value) {
    this.strage.push(value)
  }
  load() {
    return [].concat(this.strage, this.commitedStrage);
  }
  async commit() {
    await this.db.set(this.storeName, this.strage);
  }
}

export class LocalStoregeDatabase {
  async get(storeName) {
    return JSON.parse(localStorage.getItem(storeName));
  }
  async set(storeName, state) {
    const currentState = JSON.parse(localStorage.getItem(storeName));
    const newState = [].concat(currentState, state);
    localStorage.setItem(storeName, JSON.stringify(newState));
  }
}

const mockDB = {
   getItem(dbName) {
    return dbName
  }
}