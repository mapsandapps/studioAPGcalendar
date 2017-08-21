<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      events: []
    }
  },
  methods: {
    initClient() {
      gapi.client.init({
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        'apiKey': 'AIzaSyAWQD4_qwHs1LB6eS1weN4yl3uZTPULA8I',
        'clientId': '441992456530-8r9rc9itr1lp6ek9fdtnldnk9ptt5poc.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/calendar.readonly'
      }).then(() => {
        // TODO: call updateSignInStatus
      })
    }
  },
  mounted() {
    gapi.load('client:auth2', this.initClient)
  }
}
</script>

<style></style>
