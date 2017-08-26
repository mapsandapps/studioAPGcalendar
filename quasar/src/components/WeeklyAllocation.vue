<template>
  <div class="layout-padding row justify-center">
    <!-- TODO: only display if logged in-->
    Week beginning:
    <q-datetime
      v-model="date"
      no-clear
      v-on:change="listUpcomingEvents()" />
    <q-list>
      <div class="partner" v-for="partner in partners" :key="partner.email">
        <q-list-header inset>
          {{ partner.displayName }} <{{ partner.email }}>
        </q-list-header>
        <q-item v-for="event in partner.events" :key="event.id">
          <q-item-side icon="view_column" v-bind:color="event.color" />
          <q-item-main>
            <a v-bind:href="event.htmlLink" target="_blank">
              <q-item-tile label>{{ event.summary }}</q-item-tile>
              <q-item-tile sublabel>{{ event.startDate }}</q-item-tile>
            </a>
          </q-item-main>
          <q-item-side right v-if="event.duration.minutes > 0">{{ event.duration.hours }}h{{ event.duration.minutes }}</q-item-side>
          <q-item-side right v-if="event.duration.minutes === 0">{{ event.duration.hours }}h</q-item-side>
        </q-item>
        <q-item-separator inset />
      </div>
    </q-list>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import uniqWith from 'lodash/uniqWith'
import moment from 'moment'

import {
  Toast,
  QBtn,
  QDatetime,
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile
} from 'quasar'

export default {
  components: {
    QBtn,
    QDatetime,
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile
  },
  data() {
    return {
      date: undefined,
      partners: []
    }
  },
  methods: {
    processEvents(events) {
      // get a list of all the creators
      var eventCreators = map(events, 'creator')
      // find the unique creators
      this.partners = uniqWith(eventCreators, isEqual)
      // add all their events as an object
      for (var event of events) {
        event = this.MIXINcomputeEventInfo(event)
        for (var partner of this.partners) {
          if (!partner.events) { partner.events = [] }
          if (partner.email === event.creator.email) {
            partner.events.push(event)
            break
          }
        }
      }
    },
    listUpcomingEvents() {
      var timeMin = this.date
      var timeMax = moment(this.date).add(1, 'weeks').format()
      gapi.client.calendar.events.list({
        calendarId: 'studioapg@gmail.com',
        timeMin,
        timeMax,
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      }).then(resp => {
        var events = resp.result.items
        if (events.length > 0) {
          this.processEvents(events)
        } else {
          console.log('no events loaded')
        }
      }, reason => {
        if (reason.status === 403) {
          Toast.create.negative('Error 403: Try logging in.')
        } else {
          Toast.create.negative(`${reason.status}: ${reason.result.error.message}`)
        }
      })
    }
  }
}
</script>

<!-- 
<style lang="sass" scoped>

button
  display: block

.partner
  margin-bottom: 20px
  border: 1px solid red
.partner-name
  border-bottom: 1px solid red

</style>
-->
