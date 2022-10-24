import { InjectionKey } from "vue";
import { createStore, Store, useStore as useBasicStore } from "vuex";
import { IRecord } from "../custom-types/record";
import db from "../utils/db";

export type RecordState = {
  records: IRecord[];
};
export const key: InjectionKey<Store<RecordState>> = Symbol();

const RecordState = createStore<RecordState>({
  state() {
    return { records: [] };
  },
  mutations: {
    setRecords(state, records: IRecord[]) {
      state.records = records;
    },
    addRecord(state, record: IRecord) {
      state.records.push(record);
    },
  },
  actions: {
    async getRecords({ commit }) {
      let records = await db.getRecords();
      commit("setRecords", records);
    },
    async saveRecord({ commit }, record: IRecord): Promise<string> {
      let id = await db.saveRecord(record);
      commit("addRecord", record);
      return id;
    },
  },
});

export const useRecords = () => useBasicStore(key);

export default RecordState;
