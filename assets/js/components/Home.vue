<template>
    <div class="container-fluid p-0">
        <section class="p-3 p-lg-5">
            <h1 class="mb-0">
                Patrol
            </h1>
            <div class="subheading mb-5">
                Enter the player names:
            </div>
            <form v-on:submit.prevent="submit">
                <div class="input-group py-1" v-for="(e, i) in inputs" :key="e.id">
                    <label class="ml-auto my-auto col-auto col-xl-auto" :for="e.id">Player <span>{{ i + 1 }}</span></label>
                    <input class="col-8 col-xl-4 form-control" type="text" :id="e.id" v-model="e.val" autocomplete="off">
                    <div class="mr-auto input-group-btn" v-if="i > 0">
                        <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="remove(i)" :disabled="!canRemove">
                            <svgicon name="minus" class="svg-fw"></svgicon>
                        </button>
                    </div>
                    <div class="mr-auto input-group-btn" v-else>
                        <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="add" :disabled="!canAdd">
                            <svgicon name="plus" class="svg-fw"></svgicon>
                        </button>
                    </div>
                    </li>
                </div>
                <div class="col-xl-5 mx-auto pt-3">
                    <div class="card" disabled>
                        <a data-toggle="collapse" href="#config" aria-exanded="true" aria-controls="config">
                            <div class="card-header">Game Configuration</div>
                        </a>
                        <div class="collapse show" id="config">
                            <div class="card-body">
                                <transition name="fade" mode="out-in">
                                    <div class="card-text" v-if="valid" key="invalid">
                                        Here is the configuration for a {{ numPlayers }} player game:
                                        <ul class="list-unstyled">
                                            <li v-for="(e, key) in config">
                                                <div class="col-10 mx-auto">
                                                    <div class="input-group py-1">
                                                        <input type="number" v-model.number="config[key]" class="form-control" min="1" :max="maxs[key]" autocomplete="off"></input>
                                                        <span class="input-group-addon" style="min-width: 130px;">
                                                            {{ key }}<span v-if="e > 1">s</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-primary" v-on:click="resetConfig">Reset</button>
                                        </div>
                                    </div>
                                    <div class="card-text" v-else key="valid">
                                        This game requires at least {{ constraints.min }} players!
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button :disabled="!valid" class="btn btn-primary">Assign Roles</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import '../svg/plus'
import '../svg/minus'

import { defaultConfigs } from '../rules/configs'

export default {
    data: function() {
        return {
            nextID: 5,
            inputs: [
                { id: 0, val: '' },
                { id: 1, val: '' },
                { id: 2, val: '' },
                { id: 3, val: '' },
                { id: 4, val: '' }
            ],
            configs: {}
        }
    },
    computed: {
        numInputs: function() {
            return _.size(this.inputs)
        },
        players: function() {
            return _.compact(_.map(this.inputs, 'val'))
        },
        numPlayers: function() {
            return _.size(this.players)
        },
        valid: function() {
            return this.numPlayers >= this.constraints.min && this.numPlayers <= this.constraints.max
        },
        canAdd: function() {
            return this.numInputs < this.constraints.max
        },
        canRemove: function() {
            return this.constraints.min < this.numInputs
        },
        config: {
            get: function() {
                return this.configs[this.numPlayers]
            },
            set: function(newValue) {
                this.configs[this.numPlayers] = newValue
            }
        },
        constraints: function() {
            var keys = _.keys(this.configs)
            return {
                'min': _.min(keys),
                'max': _.max(keys)
            }
        },
        maxs: function() {
            var result = {}
            var total = 0
            _.forEach(this.config, function(value, key) {
                total += value
            })
            if (total >= this.numPlayers)
                return this.config
            else
                return _.mapValues(this.config, function(value) { return value + 1 })
        }
    },
    methods: {
        add: function() {
            this.inputs.push({ id: this.id(), val: '' })
        },
        remove: function(i) {
            this.inputs.splice(i, 1)
        },
        submit: function() {
            this.$router.push({ name: 'roles', params: { players: this.players, config: this.config }})
        },
        id: function() {
            return this.nextID++
        },
        resetConfigs: function() {
            this.configs = _.cloneDeep(defaultConfigs)
        },
        resetConfig: function() {
            this.config = _.clone(defaultConfigs[this.numPlayers])
        }
    },
    created: function() {
        this.resetConfigs()
    }
}
</script>
