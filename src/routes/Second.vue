<template>
    <div>
        Second page {{string.state.data}}
    </div>
</template>


<script setup lang="ts">
import { useString } from '../store/stringState';

const string = useString();
</script>