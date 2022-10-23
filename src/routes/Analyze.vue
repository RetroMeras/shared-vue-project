<template>
  <div>Records count {{ records.length }}</div>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="pair in values"
      :key="pair.key"
      class="flex justify-center border-2 rounded-md border-indigo-500/100 m-10"
    >
      <p v-for="elem in pair" :key="elem">{{ elem }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRecords } from "../store/records";

const { state: recordsState, dispatch } = useRecords();
const records = recordsState.records;
dispatch("getRecords");
// computed(() => dispatch("getRecords"));
console.log(records);
watch([records], () => {
  console.log(records);
});
const values = [
  { key: "Набрано", value: "Много" },
  { key: "Набрано", value: "Мало" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
  { key: "Набрано", value: "Средне" },
];
</script>
