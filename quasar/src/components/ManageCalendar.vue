<template>
  <div>
    <q-card>
      <form block @submit.prevent>
        <q-card-title>
          Add to calendar
        </q-card-title>
        <q-card-main class="relative-position">
          <q-input
            v-model="newMember.email"
            float-label="Email address" />
          <q-field
            helper="Pick one role"
            label="Role">
            <q-option-group
              type="radio"
              v-model="newMember.role"
              :options="roleOptions" />
          </q-field>
          <q-btn @click="addMember()">
            Add Person
          </q-btn>
          <q-inner-loading :visible="adding" />
        </q-card-main>
      </form>
    </q-card>
    <q-card>
      <q-card-title>
        View members
      </q-card-title>
      <q-card-main>
        <q-btn v-if="members.length === 0" @click="loadMembers()">
          Load Members
        </q-btn>
      </q-card-main>
      <q-data-table
        v-if="members.length > 0"
        :data="members"
        :config="tableConfig"
        :columns="columns">
      </q-data-table>
    </q-card>
  </div>
</template>

<script>
import {
  Toast,
  QBtn,
  QCard,
  QCardMain,
  QCardSeparator,
  QCardTitle,
  QDataTable,
  QField,
  QInnerLoading,
  QInput,
  QOptionGroup
} from 'quasar'

export default {
  components: {
    Toast,
    QBtn,
    QCard,
    QCardMain,
    QCardSeparator,
    QCardTitle,
    QDataTable,
    QField,
    QInnerLoading,
    QInput,
    QOptionGroup
  },
  data() {
    return {
      adding: false,
      members: [],
      newMember: {
        email: '',
        role: 'freeBusyReader'
      },
      roleOptions: [
        {
          label: 'See only free/busy (hide details)',
          value: 'freeBusyReader'
        },
        {
          label: 'See all event details',
          value: 'reader'
        },
        {
          label: 'Make changes to events',
          value: 'writer'
        },
        {
          label: 'Make changes AND manage sharing',
          value: 'owner'
        }
      ],
      tableConfig: {
        rowHeight: '50px',
        title: 'Members',
        noHeader: false,
        refresh: false,
        columnPicker: false,
        responsive: true // TODO: play with this
      },
      columns: [
        {
          label: 'Email',
          field: 'email',
          width: '300px',
          filter: true,
          sort: true,
          type: 'string'
        },
        {
          label: 'Role',
          field: 'longRole',
          width: '200px',
          filter: true,
          sort: true,
          type: 'string'
        }
      ]
    }
  },
  methods: {
    addMember() {
      this.adding = true
      gapi.client.calendar.acl.insert({
        calendarId: 'studioapg@gmail.com',
        resource: {
          role: this.newMember.role,
          scope: {
            type: 'user',
            value: this.newMember.email
          }
        }
      }).then(resp => {
        this.loadMembers()
        this.newMember = {
          email: '',
          role: 'freeBusyReader'
        }
      }, reason => {
        this.adding = false
        if (reason.status === 403) {
          Toast.create.negative('Error 403: Try logging in.')
        } else {
          Toast.create.negative(`${reason.status}: ${reason.result.error.message}`)
        }
      })
    },
    loadMembers() {
      gapi.client.calendar.acl.list({
        calendarId: 'studioapg@gmail.com'
      }).then(resp => {
        this.adding = false
        this.members = resp.result.items
        for (var member of this.members) {
          member.email = member.scope.value
          if (member.role === 'freeBusyReader') {
            member.longRole = 'See only free/busy (hide details)'
          } else if (member.role === 'reader') {
            member.longRole = 'See all event details'
          } else if (member.role === 'writer') {
            member.longRole = 'Make changes to events'
          } else if (member.role === 'owner') {
            member.longRole = 'Make changes AND manage sharing'
          }
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

<style scoped>
  
</style>
