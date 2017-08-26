<template>
  <div class="hello">
    <!-- TODO: only display if logged in-->
    <button v-on:click="listUpcomingEvents(thisWeek - 1)">This Week</button>
    <button v-on:click="listUpcomingEvents(thisWeek - 2)">Last Week</button>
    <!-- <button v-for="sunday in sundays" :key="sunday.i" v-on:click="listUpcomingEvents(sunday.id)">{{ sunday.humanFormat }}</button> -->
    <table>
      <div class="partner" v-for="partner in partners" :key="partner.email">
        <tr>
          <td colspan=3 class="partner-name">
            {{ partner.displayName }} <{{ partner.email }}>
          </td>
        </tr>
        <tr v-for="event in partner.events" :key="event.id">
          <a v-bind:href="event.htmlLink" target="_blank">
            <td>{{ event.summary }}</td>
            <td>{{ event.startDate }}</td>
            <td>{{ event.duration.hours }} hours {{ event.duration.minutes }} minutes</td>
          </a>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import uniqWith from 'lodash/uniqWith'
import moment from 'moment'

export default {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

button
  display: block

.partner
  margin-bottom: 20px
  border: 1px solid red
.partner-name
  border-bottom: 1px solid red

</style>
