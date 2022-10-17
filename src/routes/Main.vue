<template>
    <div>
        Main page
    </div>
    <el-input v-model="input" @change="handleChange"></el-input>
    <router-link to="/second">To second</router-link>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useString } from '../store/stringState';

const stringState = useString();

const input = ref(stringState.state.data);

const handleChange = () => {
    if(stringState){
        stringState.commit("change", input.value)
    }
}

</script>