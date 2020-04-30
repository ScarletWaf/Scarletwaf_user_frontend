<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2 float-right btn" fab dark color="red"  v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">添加规则</span>
        </v-card-title>

        <v-card-text>
          <v-select :items="ruleTypes" v-model="inputForm.type" label="ruleType"></v-select>
          <v-text-field  v-model="inputForm.content" label="ruleContent"></v-text-field>
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
export default {
  name: 'AddRule',
  inject: ['reload'],
  props: ['ruleTypes'],
  data: () => ({
    dialog: false,
    serverId: parseInt(sessionStorage.getItem('serverId')),
    inputForm: {
      content: '',
      type: ''
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
      if (sessionStorage.getItem('uriId') === null) {
        const obj = {
          server_id: this.serverId,
          rules: [
            this.inputForm
          ]
        }
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/add',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            console.log(200)
            this.reload()
          } else if (response.data.code === 400) {
            this.$message.error('表单不合法')
          }
        })
      } else {
        const obj = {
          server_id: this.serverId,
          uri_id: parseInt(sessionStorage.getItem('uriId')),
          rules: [
            this.inputForm
          ]
        }
        this.axios.post(
          'http://39.96.77.139:8080/user/rule/add',
          JSON.stringify(obj),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((response) => {
          if (response.data.code === 200) {
            console.log(200)
            this.reload()
          } else if (response.data.code === 400) {
            this.$message.error('表单不合法')
          }
        })
      }

      this.close()
    }
  }
}
</script>

<style scoped>
  .btn{
    margin-bottom: 20px;
    margin-top: 100px;
  }
</style>
