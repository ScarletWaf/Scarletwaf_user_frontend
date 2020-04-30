<template>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(card,index) in cards"
          :key="index"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-icon @click="deleteItem(card.serverId)" class="float-right" color="red" size="25px">mdi-close-thick</v-icon>
              <div class="end">
                <v-card-title v-text="card.title" class="display-1"></v-card-title>
                <v-card-subtitle v-text="card.subtitle" class="white--text title"></v-card-subtitle>
              </div>

            </v-img>

            <v-card-actions>
              <v-btn
                class="ma-2" outlined color="blue darken-1"
                @click="serverRuleConfig(card.serverId)"
              >
                 规则配置
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="card.show = !card.show"
              >
                uri
                <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="card.show">
                <v-divider></v-divider>

                <v-card-text>
                  <uri-list :items="card.uriArray" :server-id="card.serverId"></uri-list>
                </v-card-text>
              </div>
            </v-expand-transition>

          </v-card>
        </v-col>
      </v-row>

      <add-server></add-server>
    </v-container>
</template>

<script>
import AddServer from '../components/AddServer'
import UriList from '../components/UriList'
// import bus from '../utils/eventBus'

export default {
  inject: ['reload'],
  components: {
    AddServer,
    UriList
  },
  data: () => ({
    serverId: null,
    cards: [
      // { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3, show: false },
    ]
  }),
  mounted () {
    var data = []
    this.axios.post(
      'http://39.96.77.139:8080/user/server/get',
      {},
      { headers: { scarlet: localStorage.getItem('token') } }
    ).then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        var obj = {}
        obj.title = response.data.data[i].ip
        obj.subtitle = response.data.data[i].domain
        obj.src = require('../assets/server.jpg')
        obj.flex = 4
        obj.show = false
        obj.serverId = response.data.data[i].ID
        // console.log(obj)
        data[i] = obj
        // this.cards[i] = obj
        // 不明白为什么这样不行
      }
      this.cards = data
      for (let i = 0; i < this.cards.length; i++) {
        // TODO: 不懂为什么const改成var后URI列表无法正常显示，明明数字是一样的
        const CurServerId = this.cards[i].serverId
        this.axios.post(
          'http://39.96.77.139:8080/user/uri/get',
          JSON.stringify({ server_id: CurServerId }),
          { headers: { scarlet: localStorage.getItem('token') } }
        ).then((res) => {
          // console.log(res)
          if (res.data.code === 200) {
            // 这种写法会导致：没有添加uri的话，控制台会报错，但不影响功能，应改没啥事
            if (CurServerId === res.data.data[0].server_id) {
              this.cards[i].uriArray = res.data.data
            }
          }
        })
      }
      // console.log(this.cards)
    })
  },
  beforeDestroy () {
    // bus.$emit('sendServerId', {
    //   serverId: this.serverId
    // })
  },
  methods: {
    deleteItem (ServerId) {
      console.log(ServerId)
      this.axios.post(
        'http://39.96.77.139:8080/user/server/delete',
        JSON.stringify({ server_id: ServerId }),
        { headers: { scarlet: localStorage.getItem('token') } }
      ).then((response) => {
        if (response.data.code === 200) {
          this.reload()
        }
      })
    },
    serverRuleConfig (serverId) {
      this.serverId = serverId
      sessionStorage.setItem('serverId', this.serverId)
      this.$router.replace({ path: '/RuleConfig' })
      this.reload()
    }
  }
}
</script>

<style scoped>
  .end{
    margin-top: 27%;
  }
</style>
