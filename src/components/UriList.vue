<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="font-weight-black subtitle-1">URI</th>
        <add-uri :server-id="serverId"></add-uri>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in items" :key="index">
        <td>{{ item.path }}</td>
        <td>
          <v-icon @click="deleteItem(item.ID, serverId)" class="float-right align-center">mdi-close-circle-outline</v-icon>
          <v-icon @click="uriRuleConfig(item.ID, item.server_id)" class="float-right align-center config">mdi-cog-outline</v-icon>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
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
        'http://39.96.77.139:8080/user/uri/delete',
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
  .config{
    margin-right: 8px;
  }
</style>
