<template>
  <div
    class="flex gap-3 flex-row flex-wrap absolute w-full p-5 top-0 right-0 left-0 bottom-0 select-none"
  >
    <div v-for="word in letters" class="flex flex-row flex-nowrap">
      <span
        v-for="letter in word"
        :class="`w-3 text-center ${letter.correct ? '' : 'text-red-700'}`"
      >
        {{ letter.letter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch, ref } from "vue";

const props = defineProps<{
  text: string;
  mask: boolean[] | undefined;
}>();
const { text, mask } = toRefs(props);

interface ILetter {
  letter: string;
  correct: boolean;
}

const letters = ref([] as ILetter[][]);

const calculate_letters = () => {
  const inter_letters: ILetter[][] = [];
  let letter_index = 0;
  for (let idx = 0; idx < text.value.split(" ").length; idx++) {
    const word = text.value.split(" ")[idx];
    inter_letters.push([]);
    for (let jdx = 0; jdx < word.length; jdx++) {
      const letter = word[jdx];
      inter_letters[idx].push({
        letter,
        correct: mask.value !== undefined ? mask.value[letter_index] : true,
      });
      letter_index++;
    }
    letter_index++;
  }
  letters.value = inter_letters;
};

calculate_letters();
watch([text, mask], calculate_letters);
</script>
