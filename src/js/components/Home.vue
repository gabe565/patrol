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
                        <label class="input-group-addon" :for="e.id" style="min-width: 87px;">Player {{ i + 1 }}</label>
                        <input class="form-control" type="text" :id="e.id" v-model="e.val" autocomplete="off">
                        <div class="mr-auto input-group-btn">
                            <button type="button" class="btn btn-secondary rounded-0 rounded-end" tabindex="-1" v-on:click="removeInput(i)" :disabled="!canRemove" v-if="i > 0">
                                <svgicon name="minus"></svgicon>
                            </button>
                            <button type="button" class="btn btn-secondary rounded-0 rounded-end" tabindex="-1" v-on:click="addInput" :disabled="!canAdd" v-else>
                                <svgicon name="plus"></svgicon>
                            </button>
                        </div>
                    </div>
                    <div class="col pt-3">
                        <div class="card" disabled>
                            <a data-bs-toggle="collapse" href="#config" role="button" aria-exanded="false" aria-controls="config" class="text-decoration-none">
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
import rules from '../rules';
const defaultConfigs = JSON.stringify(rules.configs)

let id = 0

export default {
    data() {
        return {
            inputs: [],
            configs: {}
        }
    },
    computed: {
        numInputs() {
            return this.inputs.length
        },
        players() {
            return this.inputs.map(v => v.val).filter(Boolean)
        },
        numPlayers() {
            return this.players.length
        },
        valid() {
            return this.validWith(this.numPlayers)
        },
        canAdd() {
            return this.validWith(this.numInputs + 1)
        },
        canRemove() {
            return this.validWith(this.numInputs - 1)
        },
        config: {
            get() {
                return this.configs[this.numPlayers]
            },
            set(newValue) {
                this.configs[this.numPlayers] = newValue
            }
        },
        constraints() {
            let keys = Object.keys(this.configs).map(Number)
            return {
                min: Math.min(...keys),
                max: Math.max(...keys)
            }
        },
        maxs() {
            var total = Object.values(this.config).reduce((a, c) => a + c)
            if (total >= this.numPlayers)
                return this.config
            else
                return Object.entries(this.config).reduce((obj, [k, v]) => ({ ...obj, [k]: v + 1 }), {})
        },
        supplies() {
            return {
                phones: this.config['Agent'] + this.config['Commander'],
                headphones: this.config['Agent']
            }
        }
    },
    methods: {
        addInput() {
            this.inputs.push({ id: id++, val: '' })
        },
        removeInput(i) {
            this.inputs.splice(i, 1)
        },
        validWith(num) {
            return this.constraints.min <= num && num <= this.constraints.max
        },
        submit() {
            this.$router.push({ name: 'roles', params: { players: this.players, config: this.config }})
        },
        resetConfigs() {
            this.configs = JSON.parse(defaultConfigs)
        },
        resetConfig() {
            this.config = JSON.parse(defaultConfigs)[this.numPlayers]
        }
    },
    created() {
        this.resetConfigs()
        for (let i = 0; i < this.constraints.min; i++) {
            this.addInput()
        }
    }
}
</script>
