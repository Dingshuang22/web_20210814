<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" size="small" @click="getCity">点击获取城市</el-button>
    <span>城市:</span>
    <span>{{city}}</span>
    <div class="show-pwd">
      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
    </div>
    <span>hello world</span>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      passwordType: 'password',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState('app',[
      'city'
    ])
  },
  created () {
    console.log(this.$store)
    console.log(this.$api.system.getGroups)
    this.$api.system.getGroups().then(result => {
      console.log(result)
    })
  },
  mounted () {
    console.log(this['city'])
  },
  methods: {
    ...mapActions('app',[
      'get_city'
    ]),
    ...mapMutations('app',[
      'SET_CITY'
    ]),
    getCity () {
      let value = this.city === 'cq' ? 'wh' : 'cq'
      this.SET_CITY(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.show-pwd {
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
