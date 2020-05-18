<template>
  <div>
    <v-card color="basil">
      <v-card-title>
        <switches></switches>
      </v-card-title>

      <v-divider></v-divider>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="red"
        grow
        height="55px"
      >
        <v-tab
          v-for="(ruleType,index) in ruleTypes"
          :key="index"
        >
          {{ ruleType }}
        </v-tab>
      </v-tabs>

        <v-btn
          icon
          block
          @click="show = !show"
        >
          <v-icon color="red" size="32px">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(rules,index) in ruleFile"
          :key="index"
        >
          <v-card
            color="basil"
            flat
          >
            <v-expand-transition>
              <div v-show="show">
                <v-card-text>
                    <rule-list :items="rules" :index="index"></rule-list>
                </v-card-text>
              </div>
            </v-expand-transition>

          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-card>

    <v-btn class="mx-2 float-left btn" fab dark color="blue"  @click="btn">
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
    <add-rule :rule-types="ruleTypes"></add-rule>
  </div>
</template>

<script>
import RuleList from '../components/RuleList'
import AddRule from '../components/AddRule'
// import bus from '../utils/eventBus'
import Switches from '../components/Switches'

export default {
  name: 'RuleConfig',
  components: {
    RuleList,
    AddRule,
    Switches
  },
  data () {
    return {
      show: false,
      tab: null,
      serverId: parseInt(sessionStorage.getItem('serverId')),
      ruleTypes: [
        'GET',
        'POST',
        'UA',
        'HEADER',
        'COOKIE',
        'BLACKIP',
        'WHITEIP'
      ],
      ruleFile: []
    }
  },
  created () {
    const types = ['GET', 'POST', 'UA', 'HEADER', 'COOKIE', 'BLACKIP', 'WHITEIP']
    var ruleArray = []
    if (sessionStorage.getItem('uriId') === null) {
      for (let i = 0; i < types.length; i++) {
        const obj = {
          page: 1,
          limit: 15,
          server_id: this.serverId,
          type: types[i]
        }
        // console.log(this.serverId)
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/get',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            // console.log(response.data)
            var contentArray = []
            for (let j = 0; j < response.data.data.length; j++) {
              contentArray[j] = response.data.data[j].content
            }
            ruleArray[i] = contentArray
            // retrieve all rule and save in ruleArray example: [[#getrule,max to 15 items],[#post...]...]
          }
        })
      }
    } else {
      // if uriId not exists
      // then we get the server rule
      for (let i = 0; i < types.length; i++) {
        const obj = {
          page: 1,
          limit: 15,
          server_id: this.serverId,
          type: types[i],
          uri_id: parseInt(sessionStorage.getItem('uriId'))
        }
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/get',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            // console.log(response.data)
            var contentArray = []
            for (let j = 0; j < response.data.data.length; j++) {
              contentArray[j] = response.data.data[j].content
            }
            ruleArray[i] = contentArray
          }
        })
      }
    }
    this.ruleFile = ruleArray
  },
  beforeDestroy () {
    // sessionStorage.removeItem('serverId')
  },
  methods: {
    // 事实上 我就不经常点这个，而是直接导航栏跳转。问题就会出现在这里。
    // uriID和serverId永远不会被清除。
    // 遂在路由守卫中做了特判
    btn () {
      this.$router.replace('/')
      sessionStorage.removeItem('serverId')
      sessionStorage.removeItem('uriId')
    }
  }
}
</script>

<style scoped>
  /*.center{*/
  /*  margin-left: 48%;*/
  /*}*/
  .btn{
    margin-bottom: 20px;
    margin-top: 100px;
  }
</style>
