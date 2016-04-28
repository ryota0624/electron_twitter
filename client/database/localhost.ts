export class ActionDatabase {
  dbName: string;
  strage: Array<any>;
  db: any;
  constructor(dbName) {
    this.db = typeof window === "undefined" ? mockDB : localStorage;
    this.dbName = dbName;
    const strage = JSON.parse(this.db.getItem(dbName));
    this.strage = strage ? strage : [];
  }
  save(value) {
    this.strage.push(value)
  }
  load() {
    return this.strage
  }
  commit() {
    this.db.setItem(this.dbName, JSON.stringify(this.strage));
  }
}

const mockDB = {
   getItem(dbName) {
    return dbName
  }
}