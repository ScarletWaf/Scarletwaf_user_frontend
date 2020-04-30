<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(sw,index) in switches"
        :key="index"
        :cols=3
      >
        <v-switch v-model="sw.value" inset :label="sw.name" @change="changeSwitch(sw.name,sw.value)"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Switches',
  inject: ['reload'],
  data: () => ({
    switches: [
      { name: 'CC攻击防御', key: 'cc_defense', value: false },
      { name: 'COOKIE过滤', key: 'cookie_check', value: false },
      { name: 'GET过滤', key: 'get_args_check', value: false },
      { name: 'IP黑名单', key: 'ip_blacklist', value: false },
      { name: 'IP白名单', key: 'ip_whitelist', value: false },
      { name: 'POST过滤', key: 'post_args_check', value: false },
      { name: 'SQL语义识别', key: 'sql_token_check', value: false },
      { name: 'UA过滤', key: 'ua_check', value: false }
    ]
  }),
  created () {
    if (sessionStorage.getItem('uriId') === null) {
      const obj = {
        server_id: parseInt(sessionStorage.getItem('serverId'))
      }
      this.axios.post(
        'http://39.96.77.139:8080/user/switch/get ',
        JSON.stringify(obj),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data)
          this.switches[0].value = response.data.data.cc_defense
          this.switches[1].value = response.data.data.cookie_check
          this.switches[2].value = response.data.data.get_args_check
          this.switches[3].value = response.data.data.ip_blacklist
          this.switches[4].value = response.data.data.ip_whitelist
          this.switches[5].value = response.data.data.post_args_check
          this.switches[6].value = response.data.data.sql_token_check
          this.switches[7].value = response.data.data.ua_check
          console.log(this.switches)
        }
      })
    } else {
      const obj = {
        server_id: parseInt(sessionStorage.getItem('serverId')),
        uri_id: parseInt(sessionStorage.getItem('uriId'))
      }
      this.axios.post(
        'http://39.96.77.139:8080/user/switch/get',
        JSON.stringify(obj),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data)
          this.switches[1].value = response.data.data.cookie_check
          this.switches[2].value = response.data.data.get_args_check
          this.switches[3].value = response.data.data.ip_blacklist
          this.switches[4].value = response.data.data.ip_whitelist
          this.switches[5].value = response.data.data.post_args_check
          console.log(this.switches)
        }
      })
    }
  },
  methods: {
    changeSwitch (name, value) {
      let ConfigName, obj
      switch (name) {
        case 'CC攻击防御' :
          ConfigName = 'cc'
          break
        case 'COOKIE过滤' :
          ConfigName = 'cookie'
          break
        case 'GET过滤' :
          ConfigName = 'get'
          break
        case 'IP黑名单' :
          ConfigName = 'blackip'
          break
        case 'IP白名单' :
          ConfigName = 'whiteip'
          break
        case 'POST过滤' :
          ConfigName = 'post'
          break
        case 'SQL语义识别' :
          ConfigName = 'sql'
          break
        case 'UA过滤' :
          ConfigName = 'ua'
          break
      }
      if (sessionStorage.getItem('uriId') === null) {
        obj = {
          server_id: parseInt(sessionStorage.getItem('serverId')),
          config_name: ConfigName,
          config_value: value
        }
      } else {
        obj = {
          server_id: parseInt(sessionStorage.getItem('serverId')),
          uri_id: parseInt(sessionStorage.getItem('uriId')),
          config_name: ConfigName,
          config_value: value
        }
      }
      this.axios.post(
        'http://39.96.77.139:8080/user/switch/change',
        JSON.stringify(obj),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        console.log(response, 'change switch')
      })
    }
  }
}
</script>

<style scoped>

</style>
