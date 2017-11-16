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
                <div class="input-group py-1" v-for="(e, i) in inputs">
                    <label class="col-3" :for="i">Player <span>{{ i + 1 }}</span></label>
                    <input class="col-8 form-control" type="text" :id="i" v-model="inputs[i]">
                    <div class="input-group-btn" v-if="i > 0">
                        <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="remove(i)" :disabled="!canRemove">
                            <svgicon name="minus" class="svg-fw"></svgicon>
                        </button>
                    </div>
                    <div class="input-group-btn" v-else>
                        <button type="button" class="btn btn-secondary" tabindex="-1" v-on:click="add" :disabled="!canAdd">
                            <svgicon name="plus" class="svg-fw"></svgicon>
                        </button>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button :disabled="!valid" class="btn btn-primary">Tell Me What to Do</button>
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
            constraints: {
                "min": 4,
                "max": 8
            },
            inputs: ['', '', '', '', '']
        }
    },
    computed: {
        numInputs: function() {
            return _.size(this.inputs)
        },
        players: function() {
            return _.compact(this.inputs)
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
        }
    },
    methods: {
        add: function() {
            this.inputs.push('')
        },
        remove: function(i) {
            this.inputs.splice(i, 1)
        },
        submit: function() {
            this.$router.push({ name: 'roles', params: this.players })
        }
    }
}
</script>
