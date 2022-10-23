<template>
  <div>Records count {{ records.length }}</div>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="(item, index) in stats"
      :key="index"
      class="flex flex-col justify-center border-2 rounded-md border-indigo-500/100 m-10"
    >
      <div>{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IRecord } from "../custom-types/record";
import { useRecords } from "../store/records";

const { state: recordsState, dispatch } = useRecords();
const records = recordsState.records;
dispatch("getRecords");

let stats = ref([] as any[]);

const roundTwo = (n: number): number => {
  return Math.round(n * 100) / 100;
};
console.log(records.slice(Math.max(0, records.length - 10)));
const createStats = () => {
  stats.value = [
    {
      label: "Average all time",
      value: roundTwo(
        records.reduce((sum: number, item: IRecord) => (sum += item.wpm), 0) /
          Math.max(records.length, 1)
      ),
    },
    {
      label: "Average last 10",
      value: roundTwo(
        records
          .slice(Math.max(0, records.length - 10))
          .reduce((sum: number, item: IRecord) => (sum += item.wpm), 0) /
          Math.min(10, Math.max(records.length, 1))
      ),
    },
    { label: "Last Attempt", value: roundTwo(records[records.length - 1].wpm) },
    {
      label: "Best Attempt",
      value: roundTwo(
        records.reduce((mx, item) => (mx = Math.max(mx, item.wpm)), 0)
      ),
    },
  ];
};
createStats();
watch(records, createStats);
</script>
