<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="font-weight-black subtitle-1">URI</th>
        <td></td>
        <add-uri :server-id="serverId"></add-uri>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in items" :key="index">
        <td>{{ item.path }}</td>
        <td>
        <v-chip v-if="item.switch.get_args_check" color="indigo" text-color="white">get</v-chip>
          <v-chip v-if="item.switch.post_args_check" color="green" text-color="white">post</v-chip>
          <v-chip v-if="item.switch.ip_blacklist" color="teal" text-color="white">blackip</v-chip>
          <v-chip v-if="item.switch.cookie_check" color="orange" text-color="white">cookie</v-chip>
          <v-chip v-if="item.switch.ip_whitelist" color="primary" text-color="white">whiteip</v-chip>
        </td>
        <td>
          <v-icon @click="deleteItem(item.ID, serverId)" class="float-right align-center">mdi-close-circle-outline
          </v-icon>
          <v-icon @click="uriRuleConfig(item.ID, item.server_id)" class="float-right align-center config">
            mdi-cog-outline
          </v-icon>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import config from '../config'

import AddUri from './AddUri'
export default {
  name: 'UriList',
  inject: ['reload'],
  props: ['items', 'serverId'],
  components: {
    AddUri
  },
  data () {
    return {
    }
  },
  created () {
    console.log(this.items, 'this is items')
  },
  beforeDestroy () {
  },
  methods: {
    deleteItem (id, serverId) {
      const obj = {
        id: id,
        server_id: serverId
      }
      this.axios.post(
        config.uriDelApi,
        JSON.stringify(obj),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          this.reload()
        }
      })
    },
    uriRuleConfig (uriId, serverId) {
      console.log(serverId)
      sessionStorage.setItem('serverId', serverId)
      sessionStorage.setItem('uriId', uriId)
      this.$router.replace({ path: '/RuleConfig' })
    }
  }

}
</script>

<style scoped>
  /*.config{*/
  /*  margin-right: 8px;*/
  /*}*/
</style>
