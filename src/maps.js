export var nameMap
export var colorMap

nameMap = {
  cc_defense: 'cc',
  cookie_check: 'cookie',
  get_args_check: 'get',
  post_args_check: 'post',
  ip_blacklist: 'blackip',
  ip_whitelist: 'whiteip',
  sql_token_check: 'sql',
  ua_check: 'ua'
}

colorMap = {
  get: 'indigo',
  post: 'green',
  blackip: 'teal',
  cookie: 'orange',
  whiteip: 'primary'
}

export default {
  nameMap,
  colorMap
}
