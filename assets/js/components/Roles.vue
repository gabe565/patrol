<template>
    <div class="container-fluid p-0">
        <section class="p-3 p-lg-5">
            <h1 class="mb-0">
                Roles
            </h1>
            <div class="subheading mb-5">
                Here are the shuffled roles:
            </div>
            <transition-group name="flip-list" tag="div" class="card-deck">
                <div class="col-sm-6 col-md-4 col-xl-3" v-for="e in results" :key="e.name">
                    <div class="card text-white mb-5" :class="[ 'bg-' + e.type.color ]">
                        <img class="card-img-top" :src="'images/' + sample(e.type.image)">
                        <h3 class="card-header text-white">{{ e.name }}</h3>
                        <div class="card-body">
                            <p class="card-text">{{ e.type.name }}</p>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="text-center">
                <button class="btn btn-primary" v-on:click="shuffle">
                    <svgicon name="random"></svgicon>
                    &nbsp;Re-Shuffle
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import '../svg/random'

import {types} from '../rules'

export default {
    data: function() {
        return {
            typeList: []
        }
    },
    computed: {
        results: function() {
            var vue = this
            var result = _.map(this.players, function(value, i) {
                return {
                    'name': value,
                    'type': types[vue.typeList[i]]
                }
            })
            return _.sortBy(result, 'type.order')
        },
        players: function() {
            return this.$route.params.players
        },
        config: function() {
            return this.$route.params.config
        }
    },
    created: function() {
        if (_.isEmpty(this.players) || _.isEmpty(this.config)) {
            this.$router.replace({ name: 'home' })
        }

        var vue = this
        var typeList = []
        _.forEach(this.config, function(i, type) {
            _.times(i, function() { typeList.push(type) })
        })
        this.typeList = typeList
    },
    methods: {
        shuffle: function() {
            this.typeList = _.shuffle(this.typeList)
        },
        sample: function(collection) {
            return _.sample(collection)
        }
    }
}
</script>
