var baseUrl = 'http://39.96.77.139:8080'

export default {
  // user api
  RegApi: baseUrl + '/user',
  LogApi: baseUrl + '/login',
  // Rule api
  singleRuleAddApi: baseUrl + '/user/rule/add',
  multiRuleAddApi: baseUrl + '/user/rule/multiadd',
  ruleDelApi: baseUrl + '/user/rule/delete',
  ruleGetApi: baseUrl + '/user/rule/get',
  // Server api
  serverAddApi: baseUrl + '/user/server/add',
  serverGetApi: baseUrl + '/user/server/get',
  serverDelApi: baseUrl + '/user/server/delete',
  // URI api
  uriAddApi: baseUrl + '/user/uri/add',
  uriDelApi: baseUrl + '/user/uri/delete',
  uriGetApi: baseUrl + '/user/uri/get',
  // Switch api
  switchGetApi: baseUrl + '/user/switch/get',
  switchChangeApi: baseUrl + '/user/switch/change'
}
