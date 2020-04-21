<template>
  <div>
    {{test}}
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      test: ''
    }
  },
  mounted () {
    this.axios.get('http://mock-api.com/jz8VMon4.mock/test').then((response) => {
      this.test = response.data
      console.log(response.data)
    })
  }
}
</script>

<style scoped>

</style>
