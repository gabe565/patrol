<template>
    <div class="container-fluid p-0">
        <section class="p-3 p-lg-5">
            <h1 class="mb-0">
                Patrol
            </h1>
            <div class="subheading mb-5">
                Enter the player names:
            </div>
            <div class="col-xl-5 col-md-8 mx-auto">
                <form v-on:submit.prevent="submit">
                    <div class="input-group py-1 col" v-for="(e, i) in inputs" :key="e.id">
                        <label class="input-group-addon" :for="e.id">Player {{ i + 1 }}</label>
                        <input class="form-control" type="text" :id="e.id" v-model="e.val" autocomplete="off">
                        <div class="mr-auto input-group-btn">
                            <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="remove(i)" :disabled="!canRemove" v-if="i > 0">
                                <svgicon name="minus" class="svg-fw"></svgicon>
                            </button>
                            <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="add" :disabled="!canAdd" v-else>
                                <svgicon name="plus" class="svg-fw"></svgicon>
                            </button>
                        </div>
                    </div>
                    <div class="col pt-3">
                        <div class="card" disabled>
                            <a data-toggle="collapse" href="#config" aria-exanded="false" aria-controls="config">
                                <div class="card-header">
                                    <svgicon name="cog"></svgicon>
                                    &nbsp;Game Configuration
                                </div>
                            </a>
                            <div class="collapse" id="config">
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
                                            <button type="button" class="btn btn-primary" v-on:click="resetConfig">
                                                <svgicon name="undo-alt"></svgicon>
                                                &nbsp;Reset</button>
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
                    <div class="col pt-3">
                        <div class="card">
                            <div class="card-header">
                                <svgicon name="cubes"></svgicon>
                                &nbsp;Needed Supplies
                            </div>
                            <transition name="fade" mode="out-in">
                            <ul class="list-group list-group-flush" v-if="valid">
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
import '../svg/plus'
import '../svg/minus'
import '../svg/cog'
import '../svg/undo-alt'
import '../svg/cubes'

import {configs as defaultConfigs} from '../rules'

export default {
    data: function() {
        return {
            inputs: [],
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
            return this.validWith(this.numPlayers)
        },
        canAdd: function() {
            return this.validWith(this.numInputs + 1)
        },
        canRemove: function() {
            return this.validWith(this.numInputs - 1)
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
                min: _.min(keys),
                max: _.max(keys)
            }
        },
        maxs: function() {
            var total = 0
            _.forEach(this.config, function(value) {
                total += value
            })
            if (total >= this.numPlayers)
                return this.config
            else
                return _.mapValues(this.config, function(value) { return value + 1 })
        },
        supplies: function() {
            return {
                phones: this.config['Agent'] + this.config['Commander'],
                headphones: this.config['Agent']
            }
        }
    },
    methods: {
        add: function() {
            this.inputs.push({ id: _.uniqueId(), val: '' })
        },
        remove: function(i) {
            this.inputs.splice(i, 1)
        },
        validWith: function(num) {
            return this.constraints.min <= num && num <= this.constraints.max
        },
        submit: function() {
            this.$router.push({ name: 'roles', params: { players: this.players, config: this.config }})
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
        _.times(this.constraints.min, this.add)
    }
}
</script>
