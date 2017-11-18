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
                                            <li v-for="(e, key) in currentConfig">
                                                <div class="col-10 mx-auto">
                                                    <div class="input-group py-1">
                                                        <input type="number" v-model="currentConfig[key]" class="form-control"></input>
                                                        <span class="input-group-addon" style="min-width: 120px;">
                                                            {{ key }}<span v-if="e > 1">s</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
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

export default {
    data: function() {
        return {
            nextID: 5,
            constraints: {
                "min": 4,
                "max": 8
            },
            inputs: [
                { id: 0, val: '' },
                { id: 1, val: '' },
                { id: 2, val: '' },
                { id: 3, val: '' },
                { id: 4, val: '' }
            ],
            config: require('../json/configs.json'),
            width: 90
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
            return this.numInputs > this.constraints.min
        },
        currentConfig: function() {
            return this.config[this.numPlayers]
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
            this.$router.push({ name: 'roles', params: { players: this.players, config: this.config[this.numPlayers] }})
        },
        id: function() {
            return this.nextID++
        }
    },
}
</script>
