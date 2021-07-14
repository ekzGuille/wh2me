<template>
  <div class="wrapper">
    <LoadingComponent/>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent';

export default {
  name: 'loading',
  components: { LoadingComponent },
};
</script>

<style scoped>
  .wrapper {
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
  }
</style>
