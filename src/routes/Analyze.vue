<template>
  <el-button type="danger" v-if="records.length == 0" @click="router.push('/')">
    Вернуться назад
  </el-button>
  <div v-else>Records count {{ records.length }}</div>
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
import { useRoute, useRouter } from "vue-router";
import { IRecord } from "../custom-types/record";
import { IWord } from "../custom-types/record";
import { useRecords } from "../store/records";

const router = useRouter();

const { state: recordsState, dispatch } = useRecords();
const records = recordsState.records;
dispatch("getRecords");

let stats = ref([] as any[]);

const roundTwo = (n: number): number => {
  return Math.round(n * 100) / 100;
};
const createStats = () => {
  if (records.length == 0) {
    return;
  }
  const words = records.reduce(
    (words, record) => words.concat(record.words),
    [] as IWord[]
  );
  console.log(words);

  const records10 = records.slice(Math.max(0, records.length - 10));
  const words10 = records10.reduce(
    (words, record) => words.concat(record.words),
    [] as IWord[]
  );

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
        records10.reduce((sum: number, item: IRecord) => (sum += item.wpm), 0) /
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

    {
      label: "The slowest word",
      value: words.reduce(
        (sw, item) => (sw = sw.wpm < item.wpm ? sw : item),
        words[0]
      ).word,
    },

    {
      label: "The slowest word in last 10 attempts",
      value: words10.reduce(
        (sw10, item) => (sw10 = sw10.wpm < item.wpm ? sw10 : item),
        words10[0]
      ).word,
    },
  ];
};
createStats();
watch(records, createStats);
</script>
