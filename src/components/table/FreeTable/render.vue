<script>
export default {
  name: 'FreeRender',
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  mounted () {
  },
  render: (h, ctx) => {
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  }
}
</script>
