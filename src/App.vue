<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
      <router-link to="/" class="navbar-brand">
        <font-awesome-icon icon="fa-thin fa-toilet-paper" class="fa-2x align-middle"/>
        &nbsp;Patrol
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>
              <font-awesome-icon icon="fa-regular fa-users" class="fa-fw"/>
              Roles
            </router-link>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <font-awesome-icon icon="fa-regular fa-info-circle" class="fa-fw"/>
              About
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'fade'
    }
  },
  watch: {
    '$route'(to, from) {
      let fromIndex = this.$router.getRoutes().findIndex(obj => obj.path === from.path)
      let toIndex   = this.$router.getRoutes().findIndex(obj => obj.path === to.path)
      this.transitionName = (fromIndex < toIndex) ? 'slide-left' : 'slide-right'
    }
  }
}
</script>
