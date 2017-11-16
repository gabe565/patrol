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
                <button class="btn btn-primary" v-on:click="shuffle">Re-Shuffle</button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            types: [],
            config: [],
            num: 0
        }
    },
    computed: {
        results: function() {
            var vue = this

            var result = [];
            _.forEach(this.$route.params, function(value, i) {
                var name = value
                var role = vue.config[i]
                result.push({
                    'name': name,
                    'type': vue.types[role]
                })
            })
            return _.sortBy(result, 'type.order')
        }
    },
    created: function() {
        var vue = this
        var rules = require('../rules.json')
        this.types = rules.types
        var params = _.compact(this.$route.params)
        this.num = _.size(params)

        if (_.isEmpty(params) || !_.has(rules.configs, this.num)) {
            this.$router.replace({ name: 'home' })
        }

        _.forEach(rules.configs[this.num], function(value, key) {
            for(var i = 0; i < value; i++) {
                vue.config.push(key)
            }
        })
        this.shuffle()
    },
    methods: {
        shuffle: function() {
            this.config = _.shuffle(this.config)
        },
        sample: function(collection) {
            return _.sample(collection)
        }
    }
}
</script>
