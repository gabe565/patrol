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
            config: []
        }
    },
    computed: {
        results: function() {
            var vue = this

            var result = [];
            _.forEach(this.players, function(value, i) {
                var name = value
                var role = vue.config[i]
                result.push({
                    'name': name,
                    'type': vue.types[role]
                })
            })
            return _.sortBy(result, 'type.order')
        },
        types: function() {
            return require('../json/types.json')
        },
        players: function() {
            return _.compact(this.$route.params.players)
        },
        num: function() {
            return _.size(this.players)
        },
    },
    created: function() {
        // if (_.isEmpty(this.players) || !_.has(rules.configs, this.num)) {
        //     this.$router.replace({ name: 'home' })
        // }

        var vue = this

        var config = []
        _.forEach(this.$route.params.config, function(value, key) {
            for(var i = 0; i < value; i++) {
                config.push(key)
            }
        })
        this.config = config
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
