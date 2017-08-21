<template>
  <q-layout
    ref="layout">
    <q-toolbar slot="header" color="primary">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Studio APG Calendar Tools
      </q-toolbar-title>
      <q-btn
        outline
        color="amber"
        v-if="!this.$store.state.isSignedIn"
        v-on:click="logIn()">
        Authorize
      </q-btn>
      <q-btn
        outline
        color="amber"
        v-if="this.$store.state.isSignedIn"
        v-on:click="logOut()">
        Sign Out
      </q-btn>
    </q-toolbar>

    <q-scroll-area slot="left" style="width: 100%; height: 100%">
      <q-list-header>Menu</q-list-header>
      <q-side-link
        item
        to="/home">
        <q-item-side icon="home" />
        <q-item-main label="Home" />
      </q-side-link>
      <q-side-link
        item
        to="/weekly-allocation">
        <q-item-side icon="playlist_add" />
        <q-item-main label="Weekly Allocation" />
      </q-side-link>
      <q-side-link
        item
        to="/deleted">
        <q-item-side icon="remove_red_eye" />
        <q-item-main label="Deleted Events" />
      </q-side-link>
    </q-scroll-area>

    <router-view class="layout-view" />
  </q-layout>
</template>

<script>
import {
  QBtn,
  QIcon,
  QItemMain,
  QItemSide,
  QLayout,
  QListHeader,
  QScrollArea,
  QSideLink,
  QToolbar,
  QToolbarTitle
} from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QItemMain,
    QItemSide,
    QLayout,
    QListHeader,
    QScrollArea,
    QSideLink,
    QToolbar,
    QToolbarTitle
  },
  data () {
    return {
      isSignedIn: this.$store.state.isSignedIn // TODO: why isn't this working to change button state?
    }
  },
  methods: {
    logIn() {
      this.$store.dispatch('handleAuthClick')
    },
    logOut() {
      this.$store.dispatch('handleSignoutClick')
    }
  }
}
</script>

<style lang="stylus">
</style>
