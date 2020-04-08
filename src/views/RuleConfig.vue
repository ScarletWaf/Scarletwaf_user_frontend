<template>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">BASiL</h1>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          v-for="ruleName in ruleNames"
          :key="ruleName"
        >
          {{ ruleName }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="rules in ruleFile"
          :key="rules"
        >
          <v-card
            color="basil"
            flat
          >
            <v-card-text>
              <rule-list ></rule-list>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
</template>

<script>
import RuleList from '../components/RuleList'

export default {
  name: 'RuleConfig',
  component: {
    RuleList
  },
  data () {
    return {
      tab: null,
      text: 'just a test',
      ruleNames: [
        'rulename1',
        'rulename2',
        'rulename3',
        'rulename4',
        'rulename5'
      ],
      items: ['ruledsadadasa1',
        'dsafdfiifidnfi2',
        'dssssssssdwewe3',
        'ddddddd2iiiiiiiiii4',
        'regegregfdfjlkdajg;saj'
      ],
      ruleFile: [
        ['ruledsadadasa1',
          'dsafdfiifidnfi2',
          'dssssssssdwewe3',
          'ddddddd2iiiiiiiiii4'
        ],
        ['ruledsadadasa1',
          'dsafdfiifidnfi2',
          'dssssssssdwewe3',
          'ddddddd2iiiiiiiiii4'
        ],
        ['ruledsadadasa1',
          'dsafdfiifidnfi2',
          'dssssssssdwewe3',
          'ddddddd2iiiiiiiiii4'
        ],
        ['ruledsadadasa1',
          'dsafdfiifidnfi2',
          'dssssssssdwewe3',
          'ddddddd2iiiiiiiiii4'
        ],
        ['ruledsadadasa1',
          'dsafdfiifidnfi2',
          'dssssssssdwewe3',
          'ddddddd2iiiiiiiiii4'
        ]
      ]
    }
  }
}
</script>

<style scoped>

</style>
