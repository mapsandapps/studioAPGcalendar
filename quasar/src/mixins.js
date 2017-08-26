import moment from 'moment'

var calculateDuration = (start, end) => {
  var hours = moment(end).diff(moment(start), 'hours')
  var totalMinutes = moment(end).diff(moment(start), 'minutes')
  var minutes = totalMinutes - hours * 60
  return {
    hours,
    minutes
  }
}

export default {
  methods: {
    MIXINcomputeEventInfo: event => {
      event.duration = calculateDuration(event.start.dateTime, event.end.dateTime)
      event.startDate = moment(event.start.dateTime).format('ddd MMM Do')
      if (event.summary) {
        if (event.summary.toLowerCase().indexOf('blue') > -1) {
          event.studio = 'blue'
          event.color = 'blue'
        }
        if (event.summary.toLowerCase().indexOf('red') > -1) {
          if (event.studio) {
            event.studio = 'multiple'
            event.color = 'amber-6'
          } else {
            event.studio = 'red'
            event.color = 'red'
          }
        }
        if (event.summary.toLowerCase().indexOf('white') > -1) {
          if (event.studio) {
            event.studio = 'multiple'
            event.color = 'amber-6'
          } else {
            event.studio = 'white'
            event.color = 'grey-5'
          }
        }
      }
      if (!event.studio) {
        event.studio = 'unknown'
        event.color = 'amber-6'
      }
      return event
    }
  }
}
