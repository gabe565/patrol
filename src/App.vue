<template>
  <div id="app">
    <nav
      id="sideNav"
      class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
    >
      <router-link to="/" class="navbar-brand">
        <font-awesome-icon
          icon="fa-thin fa-toilet-paper"
          class="fa-2x align-middle fa-fw"
        />
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
              <font-awesome-icon icon="fa-regular fa-users" class="fa-fw" />
              Roles
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <font-awesome-icon
                icon="fa-regular fa-info-circle"
                class="fa-fw"
              />
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
