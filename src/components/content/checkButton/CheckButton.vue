<template>
  <div class="check-button" :class="{active: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default { 
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check-button img {
    width: 100%;
  }

  .active {
    background-color: #fd5469;
    border-color: #fd5469;
  }
</style>