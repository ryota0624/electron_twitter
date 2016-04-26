'use strict';
const fs = require('fs');
class Db {
  constructor(adptor, dbNames) {
    this.adptor = adptor;
    this.dbNames = dbNames;
  }
  init() {
    return this.adptor.init(this.dbNames);
  }
  save(dbName, key, obj) {
    return this.adptor.save(dbName, key, obj);
  }
  load(dbName) {
    return this.adptor.load(dbName);
  }
  destory(dbName) {
    return this.adptor.destory(dbName);
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
  destory(dbName) {
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
