<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h) {
    const { icon, title } = this
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(h('i', { class: [icon, 'sub-el-icon'] }))
      } else {
        vnodes.push(h('svg-icon', { attrs: { iconClass: icon } }))
      }
    }

    if (title) {
      vnodes.push(h('span', { slot: 'title' }, [title]))
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
