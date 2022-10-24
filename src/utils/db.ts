import { IRecord } from "../custom-types/record";

const DB_NAME = "Records";
const STORAGE_NAME = "Records";
const DB_VERSION = 1;
let DB: IDBDatabase | undefined;

export default {
  async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);

      req.onerror = (e) => {
        reject("Error while opening db");
      };
      req.onsuccess = (e) => {
        if (!!e.target) {
          // @ts-ignore
          let db: IDBDatabase = e.target.result;
          DB = db;
          resolve(db);
        } else {
          reject("DB suddenly closed");
        }
      };

      req.onupgradeneeded = (e) => {
        if (!!e.target) {
          // @ts-ignore
          let db = e.target.result;
          db.createObjectStore(STORAGE_NAME, {
            autoIncrement: true,
            keyPath: "id",
          });
        }
      };
    });
  },
  async deleteRecord(record: IRecord): Promise<void> {
    const db = await this.getDB();

    return new Promise((resolve) => {
      const trans = db.transaction([STORAGE_NAME], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };
      const store = trans.objectStore(STORAGE_NAME);
      store.delete(record.id);
    });
  },
  async getRecords(): Promise<IRecord[]> {
    let db = await this.getDB();

    return new Promise(async (resolve, reject) => {
      const trans = db.transaction([STORAGE_NAME], "readonly");
      const records: IRecord[] = [];
      trans.oncomplete = () => {
        resolve(records);
      };
      const store = trans.objectStore(STORAGE_NAME);
      store.openCursor().onsuccess = (e) => {
        if (!!!e.target) {
          return reject("Error during records fetch");
        }
        // @ts-ignore
        const cursor = e.target.result;

        if (cursor) {
          records.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async saveRecord(record: IRecord): Promise<string> {
    let db = await this.getDB();
    let id =
      new Date().getTime().toString() + Math.floor(Math.random() * 1000000);

    return new Promise(async (resolve, reject) => {
      const trans = db.transaction([STORAGE_NAME], "readwrite");
      trans.oncomplete = () => resolve(id);

      let store = trans.objectStore(STORAGE_NAME);
      record.id = id;
      store.put(record);
    });
  },
};
