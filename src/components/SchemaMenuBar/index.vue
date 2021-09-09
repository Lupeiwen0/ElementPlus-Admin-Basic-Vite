<template>
  <div class="schema__menu__bar__cantainer" :style="laoutStyle">
    <template v-for="(item, index) in localBarList">
      <div class="menu__bar__item">
        <el-button size="small" v-bind="item.attr" @click.stop="clickHandler(item, index)">{{ item.label }}</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SchemaMenuBar'
}
</script>

<script setup>
import { computed } from 'vue'

// interface barItem {
//   label: String
//   hidden?: Boolean
//   attr?: Attribute<ElButton>
//   targetMethod: () => void
// }

// interface barList: barItem[]

const props = defineProps({
  barList: {
    type: Array,
    default: () => ([])
  },
  justify: {
    type: String,
    default: 'start'
  }
})

const laoutStyle = computed(() => {
  let style = 'justify-content: '
  switch (props.justify) {
    case 'end':
      style += 'flex-end'
      break;
    case 'center':
      style += 'flex-end'
      break;
    case 'space-around':
      style += 'space-around'
      break;
    case 'space-between':
      style += 'space-between'
      break;
    default:
      style += 'flex-start'
  }
  return style
})

const localBarList = computed(() => props.barList.filter(item => !item.hidden))

const clickHandler = (info, index) => {
  info.targetMethod && info.targetMethod()
}
</script>

<style lang="scss">
.schema__menu__bar__cantainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;

  .menu__bar__item {
    margin: 0 10px;
  }
}
</style>