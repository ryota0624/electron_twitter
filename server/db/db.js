'use strict';
const fs = require('fs');
class Db {
  constructor(adaptor, dbNames) {
    this.adaptor = adaptor;
    this.dbNames = dbNames;
  }
  init() {
    return this.adaptor.init(this.dbNames);
  }
  save(dbName, key, obj) {
    return this.adaptor.save(dbName, key, obj);
  }
  load(dbName) {
    return this.adaptor.load(dbName);
  }
  destroy(dbName) {
    return this.adaptor.destroy(dbName);
  }
}

class FileDb {
  constructor(filePath) {
    this.filePath = filePath;
  }
  init(dbNames) {
    const dbStats = dbNames.map((name) => new Promise(res => {
      fs.stat(`${this.filePath}${name}`, (err, stats) => {
        if (err) res({ name, stats });
        res({ name, stats });
      });
    }));
    return Promise.all(dbStats).then((files) => files.map((file) => new Promise((res, rej) => {
      if (!file.stats) {
        fs.writeFile(`${this.filePath}${file.name}`, '', (err) => {
          if (err) rej(err);
          res(true);
        });
      } else {
        res(true);
      }
    })));
  }
  save(dbName, key, obj) {
    const recordString = ` "${String(key)}": ${JSON.stringify(obj)},`;
    return new Promise((res, rej) => fs.appendFile(this.filePath + dbName, recordString, (err) => {
      if (err) rej(err);
      res(true);
    }));
  }
  load(dbName) {
    return new Promise((res, rej) => {
      fs.readFile(`${this.filePath}${dbName}`, (err, data) => {
        if (err) rej(err);
        const recordString = `{${data.slice(0, -1)}}`;
        res(JSON.parse(recordString));
      });
    });
  }
  destroy(dbName) {
    return new Promise((res, rej) => {
      fs.writeFile(`${this.filePath}${dbName}`, '', (err) => {
        if (err) rej(err);
        res(true);
      });
    });
  }
}

module.exports = {
  Db, FileDb,
};
