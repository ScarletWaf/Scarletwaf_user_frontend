<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Rule</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item">
            <td>{{ item}}</td>
  <!--          <td><v-btn color = "blue" outlined>Delete</v-btn></td>-->
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'RuleList',
  props: [],
  data () {
    return {
      items: ['ruledsadadasa1',
        'dsafdfiifidnfi2',
        'dssssssssdwewe3',
        'ddddddd2iiiiiiiiii4',
        'regegregfdfjlkdajg;saj'
      ]
    }
  }

}
</script>

<style scoped>

</style>
