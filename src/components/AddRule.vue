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
          <v-row  style="flex:5"><span class="headline">添加规则</span> </v-row>
          <v-row style="flex:2">
          <v-checkbox
            v-model="multi"
            label="多规则添加"
            color="secondary"
            value
            hide-details
            class=""
          ></v-checkbox>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-select :items="ruleTypes" v-model="inputForm.type" label="规则类型"></v-select>
          <v-text-field  v-model="inputForm.content" label="规则正文" v-if="!multi"></v-text-field>
          <v-textarea
            v-if="multi"
            v-model="inputForm.content"
            filled
            label="规则正文"
            auto-grow
            outlined
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          >
          </v-textarea>
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
    },
    multi: false
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
      const singleAddURL = 'http://39.96.77.139:8080/user/rule/add'
      const multiAddURL = 'http://39.96.77.139:8080/user/rule/multiadd'
      const target = this.multi ? multiAddURL : singleAddURL
      var payload = {}
      if (this.multi) {
        payload = {
          server_id: sessionStorage.getItem('serverId') === null ? 0 : parseInt(sessionStorage.getItem('serverId')),
          uri_id: sessionStorage.getItem('uriId') === null ? 0 : parseInt(sessionStorage.getItem('uriId')),
          type: this.inputForm.type,
          content: this.inputForm.content
        }
      } else {
        payload = {
          server_id: sessionStorage.getItem('serverId') === null ? 0 : parseInt(sessionStorage.getItem('serverId')),
          uri_id: sessionStorage.getItem('uriId') === null ? 0 : parseInt(sessionStorage.getItem('uriId')),
          rules: [
            this.inputForm
          ]
        }
      }
      console.log(JSON.stringify(payload))
      this.axios.post(
        target,
        JSON.stringify(payload),
        { headers: { scarlet: localStorage.getItem('token'), 'Content-Type': 'application/json' } }
      ).then((response) => {
        console.log(response)
        if (response.data.code === 200) {
          console.log(200)
          this.reload()
        } else if (response.data.code === 400) {
          this.$message.error('表单不合法')
        }
      }).catch((err) => {
        console.log(err.response)
      })
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
