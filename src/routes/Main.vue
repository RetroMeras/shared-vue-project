<template>
  <div class="text-xl flex flex-row gap-5">
    <div>Left: {{ Math.floor(timeLeft / 1000) }}</div>
    <div>Wpm: {{ Math.floor(wpm) }}</div>
  </div>
  <div class="w-full h-30 relative">
    <DisplayText
      class="text-gray-900 bg-transparent z-50"
      :text="typed"
      :mask="mask"
    />
    <DisplayText :text="text" class="text-gray-500" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IWord, IRecord } from "../custom-types/record";
import { useRecords } from "../store/records";
import { replaceAt } from "../utils/replaceAt";
import { countWPM } from "../utils/wpm"
import {generateText} from '../utils/generateText'

const totalTime = 0.5; // minutes

const store = useRecords();
const cursor = "_";
const { text, mask } = generateText(50);
const typed = ref(cursor + new Array(text.length - 1).join(" "));
let started = false;
let finished = false;
let added = false;
let current_index = 0;

const timeLeft = ref(totalTime * 60 * 1000);
const wpm = ref(0);

const handleTime = () => {
  if (started && !finished) {
    timeLeft.value = Math.max(0, timeLeft.value - 100);
    if (timeLeft.value == 0) {
      finished = true;
      started = false;
      if (!added) {
        added = true;
        store.dispatch("saveRecord", {
          id: "",
          wpm: wpm.value,
          date: new Date().getTime(),
          words: words,
          accuracy: 0,
          misspelled: [],
        } as IRecord);
      }
    }
    wpm.value = countWPM(current_index, totalTime - timeLeft.value / 60 / 1000);
  }
};

const words: IWord[] = [];

const new_word = {
  startTime: new Date().getTime(),
  endTime: 0,
  time: 0,
  word: "",
  wpm: 0,
};

const handleTyping = (event: KeyboardEvent) => {
  if(event.ctrlKey){
    return;
  }
  event.preventDefault();
  if (words.length == 0) {
    words.push(new_word);
  }
  let index = words.length - 1;
  switch (event.key) {
    case "Backspace":
      typed.value = replaceAt(typed.value, current_index - 1, `${cursor} `);
      if (words[index].word.length == 0 && words.length > 1) {
        words.pop();
        index--;
      }
      words[index] = {
        ...words[index],
        word: words[index].word.slice(0, words[index].word.length - 1),
      };
      mask[current_index] = true;
      current_index = Math.max(0, current_index - 1);
      break;
    case " ":
      const endTime = new Date().getTime();
      const time = endTime - words[index].startTime;
      words[index] = {
        ...words[index],
        endTime,
        time,
        wpm: countWPM(words[index].word.length, time / 60 / 1000),
      };
      words.push(new_word);
      typed.value = replaceAt(typed.value, current_index, ` ${cursor}`);
      mask[current_index] = text[current_index] === " ";
      current_index++;
      break;
    default:
      if (
        event.key.length != 1 ||
        current_index == text.length ||
        finished
      ) {
        break;
      }
      started = true;
      typed.value = replaceAt(typed.value,
        current_index,
        `${event.key}${cursor}`
      );
      words[index] = {
        ...words[index],
        word: words[index].word + event.key,
      };
      mask[current_index] = text[current_index] === event.key;
      current_index++;
      break;
  }
};

const listener = addEventListener("keydown", handleTyping);
const inter = setInterval(handleTime, 100);
</script>