<template>
  <div class="layout-padding row justify-center">
    <!-- TODO: only display if logged in-->
    <q-btn
      color="primary"
      v-on:click="listUpcomingEvents(thisWeek - 1)">
      This Week
    </q-btn>
    <q-btn
      color="primary"
      v-on:click="listUpcomingEvents(thisWeek - 2)">
      Last Week
    </q-btn>
    <!-- <button v-for="sunday in sundays" :key="sunday.i" v-on:click="listUpcomingEvents(sunday.id)">{{ sunday.humanFormat }}</button> -->
    <q-list>
      <div class="partner" v-for="partner in partners" :key="partner.email">
        <q-list-header inset>
          {{ partner.displayName }} <{{ partner.email }}>
        </q-list-header>
        <q-item v-for="event in partner.events" :key="event.id">
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
  QBtn,
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
      thisWeek: moment().week(),
      partners: [],
      sundays: []
    }
  },
  methods: {
    calculateDuration(start, end) {
      var hours = moment(end).diff(moment(start), 'hours')
      var totalMinutes = moment(end).diff(moment(start), 'minutes')
      var minutes = totalMinutes - hours * 60
      return {
        hours,
        minutes
      }
    },
    processEvents(events) {
      // get a list of all the creators
      var eventCreators = map(events, 'creator')
      // find the unique creators
      this.partners = uniqWith(eventCreators, isEqual)
      console.log(this.partners)
      // add all their events as an object
      for (var event of events) {
        event.duration = this.calculateDuration(event.start.dateTime, event.end.dateTime)
        event.startDate = moment(event.start.dateTime).format('ddd MMM Do')
        for (var partner of this.partners) {
          if (!partner.events) { partner.events = [] }
          if (partner.email === event.creator.email) {
            partner.events.push(event)
            break
          }
        }
      }
      console.log(this.partners)
    },
    listUpcomingEvents(day) {
      var timeMin = this.sundays[day].apiFormat
      var timeMax = this.sundays[day + 1].apiFormat
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
      })
    },
    getWeeks() {
      var numberOfWeeks = moment().weeksInYear()
      this.sundays = [...Array(numberOfWeeks)].map((_, i) => {
        var date = moment().week(i + 1).day(0).startOf('day')
        return {
          id: i,
          apiFormat: date.format(), // ISO8601
          humanFormat: date.format('LL')
        }
      })
    }
  },
  beforeMount() {
    this.getWeeks()
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
