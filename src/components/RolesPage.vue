<template>
  <div class="container-fluid p-0">
    <section class="p-3 p-lg-5">
      <h1 class="mb-0">Roles</h1>
      <div class="subheading mb-5">Here are the shuffled roles:</div>
      <transition-group name="flip-list" tag="div" class="row">
        <div
          v-for="e in results"
          :key="e.name"
          class="col-sm-6 col-md-4 col-xl-3"
        >
          <div class="card text-white mb-5" :class="['bg-' + e.type.color]">
            <img class="card-img-top" :src="sample(e.type.image)" />
            <h3 class="card-header text-white">{{ e.name }}</h3>
            <div class="card-body">
              <p class="card-text">{{ e.type.name }}</p>
            </div>
          </div>
        </div>
      </transition-group>
      <div class="text-center">
        <button class="btn btn-primary" @click="shuffle">
          <font-awesome-icon icon="fa-regular fa-shuffle" />
          &nbsp;Reassign
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useGameStore } from "../plugins/store";

import rules from "../rules";

const { types } = rules;

export default {
  data() {
    return {
      typeList: [],
    };
  },
  computed: {
    ...mapStores(useGameStore),

    results() {
      const result = this.gameStore.players.map((v, k) => ({
        name: v,
        type: types[this.typeList[k]],
      }));
      result.sort((a, b) => a.type.order - b.type.order);
      return result;
    },
  },
  created() {
    if (
      this.gameStore.players.length === 0 ||
      this.gameStore.config.length === 0
    ) {
      this.$router.replace({ name: "home" });
    }

    Object.entries(this.gameStore.config).forEach(([type, n]) => {
      for (let i = 0; i < n; i += 1) {
        this.typeList.push(type);
      }
    });
  },
  methods: {
    shuffle() {
      this.typeList = this.typeList
        .map((v) => [Math.random(), v])
        .sort(([a], [b]) => a - b)
        .map(([, v]) => v);
    },
    sample(collection) {
      return collection[Math.floor(Math.random() * collection.length)];
    },
  },
};
</script>
