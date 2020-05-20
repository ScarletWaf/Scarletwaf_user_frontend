<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-3 float-right " fab dark color="red" x-small outlined v-on="on">
          <v-icon>mdi-shield-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">添加 URI</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="inputForm.path" label="URI"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">取消</v-btn>
          <v-btn color="blue darken-1" text @click="add">添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import config from '../config'

export default {
  
  name: 'AddUri',
  inject: ['reload'],
  props: ['serverId'],
  data: () => ({
    dialog: false,
    inputForm: {
      path: ''
    }
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    close () {
      this.dialog = false
    },
    add () {
      this.inputForm.server_id = this.serverId
      console.log(this.serverId)
      this.axios.post(
        config.uriAddApi,
        JSON.stringify(this.inputForm),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          console.log(200)
          this.reload()
        } else if (response.data.code === 400) {
          this.$message.error('已存在')
        }
      })
      this.close()
    }
  }
}
</script>

<style scoped>
  .btn{
    /*margin-bottom: 20px;*/
    /*margin-top: 200px;*/
  }
</style>
