<template>
  <div class="basic__card">
    <div class="basic__card__header">
      <div class="basic__card__header__title">{{ props.title }}</div>
      <div class="basic__card__header__right">
        <slot name="extra"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BasicCard'
}
</script>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>

<style lang="scss">
.basic__card {
  width: 100%;

  .basic__card__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 15px;

    .basic__card__header__title {
      width: max-content;
      font-size: 16px;
      color: #333;
      text-align: left;
      font-weight: 600;
    }
    .basic__card__header__right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>