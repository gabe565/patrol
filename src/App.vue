<template>
  <div id="app">
    <nav id="sideNav" class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <router-link to="/" class="navbar-brand">
        <logo-icon class="logo" />
        &nbsp;Patrol
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>
              <users-icon />
              Roles
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <info-icon />
              About
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import LogoIcon from "~icons/patrol/toilet-paper-thin";
import UsersIcon from "~icons/material-symbols/groups-rounded";
import InfoIcon from "~icons/material-symbols/info-rounded";
</script>

<style scoped lang="scss">
.logo {
  font-size: 2em;
}
</style>
