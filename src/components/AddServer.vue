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
          <span class="headline">添加 Server</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="inputForm.domain" label="domain"></v-text-field>
          <v-text-field v-model="inputForm.ip" label="ip"></v-text-field>
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
  name: 'AddServer',
  inject: ['reload'],
  data: () => ({
    dialog: false,
    inputForm: {
      domain: '',
      ip: ''
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
      var arr = []
      arr[0] = this.inputForm
      this.axios.post(
        'http://39.96.77.139:8080/user/server/add',
        JSON.stringify(arr),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          console.log(200)
          // this.$router.go(0)
          this.reload()
        } else if (response.data.code === 400) {
          this.$message.error('添加失败')
        }
      }
      )
      this.close()
    }
  }
}
</script>

<style scoped>
  .btn{
    margin-bottom: 20px;
    margin-top: 10%;
  }
</style>
