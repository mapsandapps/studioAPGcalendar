<template>
  <div>
    <q-card v-if="multiple.length > 0">
      <q-card-title>
        Multiple
      </q-card-title>
      <q-list>
        <q-item v-for="event in multiple" :key="event.id">
          <q-item-main>
            <a v-bind:href="event.htmlLink" target="_blank">
              <q-item-tile label>{{ event.summary }}</q-item-tile>
              <q-item-tile sublabel>{{ event.startDate }}</q-item-tile>
            </a>
          </q-item-main>
        </q-item>
      </q-list>
    </q-card>
    <q-card v-if="unknown.length > 0">
      <q-card-title>
        Unknown
      </q-card-title>
      <q-list>
        <q-item v-for="event in unknown" :key="event.id">
          <q-item-main>
            <a v-bind:href="event.htmlLink" target="_blank">
              <q-item-tile label>{{ event.summary }}</q-item-tile>
              <q-item-tile sublabel>{{ event.startDate }}</q-item-tile>
            </a>
          </q-item-main>
        </q-item>
      </q-list>
    </q-card>
    <q-card v-if="events.length > 0 && multiple.length === 0 && unknown.length === 0">
      <q-card-title>
        All good
      </q-card-title>
      <q-card-main>
        <p>No events are missing studios or have multiple studios listed between now and {{ events[events.length - 1].start.dateTime }}.</p>
      </q-card-main>
    </q-card>
    <q-btn
      v-if="events.length === 0"
      v-on:click="listUpcomingEvents()">
      Refresh
    </q-btn>
  </div>
</template>

<script>
import {
  Loading,
  Toast,
  QBtn,
  QCard,
  QCardMain,
  QCardTitle,
  QItem,
  QItemMain,
  QItemTile,
  QList
} from 'quasar'

export default {
  components: {
    Loading,
    Toast,
    QBtn,
    QCard,
    QCardMain,
    QCardTitle,
    QItem,
    QItemMain,
    QItemTile,
    QList
  },
  data() {
    return {
      events: [],
      multiple: [],
      unknown: []
    }
  },
  methods: {
    listUpcomingEvents() {
      gapi.client.calendar.events.list({
        calendarId: 'studioapg@gmail.com',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      }).then(resp => {
        this.events = resp.result.items
        for (var event of this.events) {
          event = this.MIXINcomputeEventInfo(event)
          if (event.studio === 'multiple') {
            this.multiple.push(event)
          } else if (event.studio === 'unknown') {
            this.unknown.push(event)
          }
        }
        Loading.hide()
      }, reason => {
        if (reason.status === 403) {
          Toast.create.negative('Error 403: Try logging in.')
        } else {
          Toast.create.negative(`${reason.status}: ${reason.result.error.message}`)
        }
      })
    }
  },
  beforeMount() {
    Loading.show()
    setTimeout(() => {
      this.listUpcomingEvents()
    }, 2000)
  }
}
</script>

<style scoped>

</style>
