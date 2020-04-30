<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="font-weight-black subtitle-1">Rule</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" :key="index">
            <td>{{ item }}</td>
            <td><v-icon @click="deleteItem(item)" class="float-right">mdi-close-circle-outline</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'RuleList',
  inject: ['reload'],
  props: ['items', 'index'],
  data () {
    return {
      serverId: parseInt(sessionStorage.getItem('serverId')),
      ruleTypes: [
        'get',
        'POST',
        'UA',
        'HEADER',
        'COOKIE',
        'BLACKIP',
        'WHITEIP'
      ]
    }
  },
  created () {
    // console.log(sessionStorage.getItem('uriId'), 'if uriId')
  },
  methods: {
    deleteItem (item) {
      if (sessionStorage.getItem('uriId') === null) {
        const obj = {
          content: item,
          server_id: this.serverId,
          type: this.ruleTypes[this.index]
        }
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/delete',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            this.reload()
          }
        })
      } else {
        const obj = {
          content: item,
          server_id: this.serverId,
          uri_id: parseInt(sessionStorage.getItem('uriId')),
          type: this.ruleTypes[this.index]
        }
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/delete',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            this.reload()
          }
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
