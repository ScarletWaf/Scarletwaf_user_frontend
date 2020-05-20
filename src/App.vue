<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      expand-on-hover
      width="190"
      color="white"
    >
<!--      尝试循环失败-->
      <v-list>

        <v-list-item
          link
          to="/"
          @click="remove,ColorChange,currentTab='Servers'"
        >
          <v-list-item-icon>
            <v-icon :color="currentTab==='Servers'?'red':''">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>服务器</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/RuleConfig"
          @click="currentTab='RuleConfig'"
        >
          <v-list-item-icon>
            <v-icon :color="currentTab==='RuleConfig'?'red':''">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>规则配置</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/WafDetails" @click="currentTab='WafDetails'"
        >
          <v-list-item-icon>
            <v-icon :color="currentTab==='WafDetails'?'red':''">mdi-monitor-screenshot</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Waf 实时信息</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          @click="currentTab='ScarletPot', toPot()"
        >
          <v-list-item-icon>
            <v-icon :color="currentTab==='ScarletPot'?'red':''">mdi-beehive-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>蜜罐</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

<!--        <v-list-item-->
<!--          link-->
<!--          to="/Test" @click="currentTab='Test'"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-icon :color="currentTab==='Test'?'red':''">mdi-bell</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Test</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

<!--        <v-list-item-->
<!--          link-->
<!--          to="/WafAdmin" @click="currentTab='WafAdmin'"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-icon :color="currentTab==='WafAdmin'?'red':''">mdi-bell</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>Waf选项</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title
        style="width: 300px"
      >
<!--        <span class="hidden-sm-and-down">ScarletWaf 用户界面</span>-->
        <img src="./assets/logo1.png" height="52px" width="52px" class="logo">
        <span class="logo-title" >
          <link href='http://cdn.repository.webfont.com/webfonts/nomal/136362/35481/5ea9059df629d81024b5fa29.css' rel='stylesheet' type='text/css' />
          ScarletWaF
        </span>
      </v-toolbar-title>

      <v-text-field
        class="mx-4"
        flat
        hide-details
        label="搜索"
        solo-inverted
        outlined
        background-color="white"
        dense
        append-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-toobar-items>
        <v-btn
          icon
          x-large
          class="float-right"
          @click="onLogout"
        >
          <v-icon color="red darken-2">mdi-power</v-icon>
        </v-btn>
      </v-toobar-items>

    </v-app-bar>

    <v-content>
      <router-view v-if="isRouterAlive"></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data: () => ({
    dialog: false,
    isRouterAlive: true,
    drawer: false,
    MainColor: '',
    RuleConfigColor: '',
    currentTab: 'Servers'
  }),
  created () {
    // sessionStorage.setItem('currentTab', 'Servers')
  },
  methods: {
    onLogout () {
      localStorage.removeItem('token')
      this.drawer = false
      this.$router.replace({ path: '/Login' })
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 为什么要remove呢？主要是因为用session的话，如果先点uri的规则，那么storage中
    // 就会有serverId+uriId。如果不释放，那再点server的规则还是之前的uri的规则，因为
    // uriId没释放
    remove () {
      sessionStorage.removeItem('serverId')
      sessionStorage.removeItem('uriId')
    },
    toPot () {
      window.location.href = 'http://127.0.0.1:8081/'
    }
  }
}
</script>

<style scoped>
  .logo{
    vertical-align: middle;
  }
  .logo-title{
    vertical-align: middle;
    font-family:'Impact';
    font-size: 32px;
    /*background: linear-gradient(to right,black,darkred);*/
    /*-webkit-background-clip: text;*/
    /*color: transparent;*/
  }
  .red{
    background-color: red;
  }
</style>
