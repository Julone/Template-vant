<template>
  <div class="home">
    home
  </div>
</template>

<script>
import Vue from 'vue';
import {test}  from './../api/api_cur'
export default {
  data(){
    return  {

    }
  },
  methods: {

  },
  mounted(){
    test()
  }
}
</script>
