<template>
  <div class="container-fluid p-0">
    <section class="p-3 p-lg-5">
      <h1 class="mb-0">Patrol</h1>
      <div class="subheading mb-5">Enter the player names:</div>
      <div class="col-xl-5 col-md-8 mx-auto">
        <form @submit.prevent="submit">
          <div v-for="(e, i) in inputs" :key="e.id" class="input-group py-1 col">
            <label class="input-group-text" :for="e.id" style="min-width: 87px"
              >Player {{ i + 1 }}</label
            >
            <input :id="e.id" v-model="e.val" class="form-control" type="text" autocomplete="off" />
            <button
              v-if="i > 0"
              type="button"
              class="btn btn-secondary"
              tabindex="-1"
              :disabled="!canRemove"
              @click="removeInput(i)"
            >
              <font-awesome-icon icon="fa-regular fa-minus" />
            </button>
            <button
              v-else
              type="button"
              class="btn btn-secondary"
              tabindex="-1"
              :disabled="!canAdd"
              @click="addInput"
            >
              <font-awesome-icon icon="fa-regular fa-plus" />
            </button>
          </div>
          <div class="col pt-3">
            <div class="card" disabled>
              <a
                data-bs-toggle="collapse"
                href="#config"
                role="button"
                aria-exanded="false"
                aria-controls="config"
                class="text-decoration-none"
              >
                <div class="card-header">
                  <font-awesome-icon icon="fa-regular fa-cog" />
                  &nbsp;Game Configuration
                </div>
              </a>
              <div id="config" class="collapse">
                <div class="card-body">
                  <transition name="fade" mode="out-in">
                    <div v-if="valid" key="invalid" class="card-text">
                      Here is the configuration for a {{ numPlayers }} player game:
                      <ul class="list-unstyled">
                        <li v-for="(e, key) in config" :key="key">
                          <div class="col-10 mx-auto">
                            <div class="input-group py-1">
                              <input
                                v-model.number="config[key]"
                                type="number"
                                class="form-control"
                                min="1"
                                :max="maxs[key]"
                                autocomplete="off"
                              />
                              <span class="input-group-text" style="min-width: 130px">
                                {{ key }}<span v-if="e > 1">s</span>
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="text-center">
                        <button type="button" class="btn btn-primary" @click="resetConfig">
                          <font-awesome-icon icon="fa-regular fa-rotate-left" />
                          &nbsp;Reset
                        </button>
                      </div>
                    </div>
                    <div v-else key="valid" class="card-text">
                      This game requires at least {{ constraints.min }} players!
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
          <div class="col pt-3">
            <div class="card">
              <div class="card-header">
                <font-awesome-icon icon="fa-regular fa-cubes" />
                &nbsp;Needed Supplies
              </div>
              <transition name="fade" mode="out-in">
                <ul v-if="valid" class="list-group list-group-flush">
                  <li class="list-group-item">5 toilet paper rolls</li>
                  <li class="list-group-item">{{ supplies.phones }} phones</li>
                  <li class="list-group-item">{{ supplies.headphones }} sets of headphones</li>
                </ul>
              </transition>
            </div>
          </div>
          <div class="text-center mt-3">
            <button :disabled="!valid" class="btn btn-primary">Assign Roles</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import rules from "../rules";
import { useGameStore } from "../plugins/store";

const defaultConfigs = JSON.stringify(rules.configs);

let id = 0;

export default {
  data() {
    return {
      inputs: [],
      configs: {},
    };
  },
  computed: {
    ...mapStores(useGameStore),

    numInputs() {
      return this.inputs.length;
    },
    players() {
      return this.inputs.map((v) => v.val).filter(Boolean);
    },
    numPlayers() {
      return this.players.length;
    },
    valid() {
      return this.validWith(this.numPlayers);
    },
    canAdd() {
      return this.validWith(this.numInputs + 1);
    },
    canRemove() {
      return this.validWith(this.numInputs - 1);
    },
    config: {
      get() {
        return this.configs[this.numPlayers];
      },
      set(newValue) {
        this.configs[this.numPlayers] = newValue;
      },
    },
    constraints() {
      const keys = Object.keys(this.configs).map(Number);
      return {
        min: Math.min(...keys),
        max: Math.max(...keys),
      };
    },
    maxs() {
      const total = Object.values(this.config).reduce((a, c) => a + c);
      if (total >= this.numPlayers) return this.config;
      return Object.entries(this.config).reduce((obj, [k, v]) => ({ ...obj, [k]: v + 1 }), {});
    },
    supplies() {
      return {
        phones: this.config.Agent + this.config.Commander,
        headphones: this.config.Agent,
      };
    },
  },
  created() {
    this.resetConfigs();
    for (let i = 0; i < this.constraints.min; i += 1) {
      this.addInput();
    }
  },
  methods: {
    addInput() {
      this.inputs.push({ id, val: "" });
      id += 1;
    },
    removeInput(i) {
      this.inputs.splice(i, 1);
    },
    validWith(num) {
      return this.constraints.min <= num && num <= this.constraints.max;
    },
    submit() {
      this.gameStore.players = this.players;
      this.gameStore.config = this.config;
      this.$router.push({ name: "roles" });
    },
    resetConfigs() {
      this.configs = JSON.parse(defaultConfigs);
    },
    resetConfig() {
      this.config = JSON.parse(defaultConfigs)[this.numPlayers];
    },
  },
};
</script>
