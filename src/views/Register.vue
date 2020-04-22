/* eslint-disable */
<template>
  <v-content>
    <v-snackbar v-model="messageBar" color="error" :timeout="2000" :top="true">{{ message }}</v-snackbar>
    <v-row align="center" justify="center" style="margin-top: 5%;">
      <h1 class="display-2 font-weight-thin">ScarletWaf</h1>
    </v-row>
    <br>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>注册</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="inputForm.name"
            :rules="nameRules"
            label="账号"
            required
            autocomplete="off"
          />
          <v-text-field
            v-model="inputForm.email"
            :rules="emailRules"
            label="邮箱"
            required
            autocomplete="off"
          />
          <v-text-field
            v-model="inputForm.password"
            :rules="passwordRules"
            label="密码"
            type="password"
            required
            autocomplete="off"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="primary" @click="onRegister">注册</v-btn>
        <v-btn text @click="onReset">重置</v-btn>
        <v-btn text @click="toLogin">返回登录</v-btn>
      </v-card-actions>
    </v-card>
    <div class="mt-8 text-center">ScarletWaf管理面板</div>

    <!-- 注册等待 -->
    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card dark>
        <v-card-text>
          <p>登录中.....</p>
          <v-progress-linear indeterminate color="white" class="mb-0"/>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-content>
</template>

<script>
import config from '../config'

export default {
  name: 'Register',
  data () {
    return {
      isLoading: false,
      messageBar: false,
      message: '',
      nameRules: [
        v => !!v || '请输入账号'
      ],
      emailRules: [
        v => !!v || '请输入邮箱'
      ],
      passwordRules: [
        v => !!v || '请输入密码'
      ],
      inputForm: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onRegister: function () {
      this.axios.post(
        config.RegApi,
        JSON.stringify(this.inputForm)
      ).then((response) => {
        console.log(response.data)
        var RegisterResult = response.data
        if (RegisterResult.code === 200) {
          this.$message({
            message: '注册成功',
            type: 'success',
            onClose: () => {
              this.$router.replace({ path: '/Login' })
            }
          })
        } else if (RegisterResult.code === 400) {
          this.$message.error('用户名不合法')
        }
      })
    },
    onReset () {
      this.inputForm = {
        name: '',
        email: '',
        password: ''
      }
    },
    toLogin () {
      this.$router.push({ path: '/Login' })
    }

  }
}
</script>

<style scoped>
</style>
