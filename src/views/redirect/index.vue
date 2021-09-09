<script lang="jsx">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElEmpty } from 'element-plus'

export default {
  name: 'Redirect',
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query
      })
    })
    return () => <ElEmpty />
  }
}
</script>
