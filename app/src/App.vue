<template>
  <div id="app">
    <button id="authorize-button" style="display: none;">Authorize</button>
    <button id="signout-button" style="display: none;">Sign Out</button>
    <!-- TODO: move this into other vue file -->
    <div v-for="event in events" :key="event.id">{{ event.creator.email }}</div>
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
        'clientId': '441992456530-8r9rc9itr1lp6ek9fdtnldnk9ptt5poc.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/calendar.readonly'
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        document.getElementById('authorize-button').onclick = this.handleAuthClick
        document.getElementById('signout-button').onclick = this.handleSignoutClick
      })
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        document.getElementById('authorize-button').style.display = 'none'
        document.getElementById('signout-button').style.display = 'block'
        this.listUpcomingEvents()
      } else {
        document.getElementById('authorize-button').style.display = 'block'
        document.getElementById('signout-button').style.display = 'none'
      }
    },
    handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn()
    },
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut()
    },
    listUpcomingEvents() {
      gapi.client.calendar.events.list({
        calendarId: 'studioapg@gmail.com',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      }).then(resp => {
        var events = resp.result.items
        if (events.length > 0) {
          this.events = events // TODO: instead of this, reformat it so these are by organizer
        } else {
          console.log('no events loaded')
        }
      })
    }
  },
  mounted() {
    gapi.load('client:auth2', this.initClient)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
