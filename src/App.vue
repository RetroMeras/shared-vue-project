<script setup lang="ts">

import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)

</script>

<template>
  <div class="flex flex-row gap-3 items-center">
    <div>Empty</div>
    <el-button>123</el-button>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-pink-900' : 'bg-pink-700'"
      class="w-10 h-5 relative rounded-full"
      >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-1' : 'translate-x-0'"
        class="inline-block w-4 h-4 transform rounded-full bg-white transition"
        />
    </Switch>
  </div>
</template>