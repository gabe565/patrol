<template>
    <div class="container-fluid p-0">
        <section class="p-3 p-lg-5">
            <h1 class="mb-0">
                Roles
            </h1>
            <div class="subheading mb-5">
                Here are the shuffled roles:
            </div>
            <transition-group name="flip-list" tag="div" class="row">
                <div class="col-sm-6 col-md-4 col-xl-3" v-for="e in results" :key="e.name">
                    <div class="card text-white mb-5" :class="[ 'bg-' + e.type.color ]">
                        <img class="card-img-top" :src="sample(e.type.image)">
                        <h3 class="card-header text-white">{{ e.name }}</h3>
                        <div class="card-body">
                            <p class="card-text">{{ e.type.name }}</p>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="text-center">
                <button class="btn btn-primary" v-on:click="shuffle">
                    <font-awesome-icon icon="fa-regular fa-shuffle"/>
                    &nbsp;Reassign
                </button>
            </div>
        </section>
    </div>
</template>

<script>
import rules from '../rules';
const types = rules.types

export default {
    props: {
        'players': {
            type: Array,
            default() {
                return []
            }
        },
        'config': {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            typeList: []
        }
    },
    computed: {
        results() {
            var result = this.players.map((v, k) => ({
                'name': v,
                'type': types[this.typeList[k]]
            }))
            result.sort((a, b) => a.type.order - b.type.order)
            return result
        }
    },
    created() {
        if (this.players.length === 0 || this.config.length === 0) {
            this.$router.replace({ name: 'home' })
        }

        Object.entries(this.config).forEach(([type, n]) => {
            for (let i = 0; i < n; i++) {
                this.typeList.push(type)
            }
        })
    },
    methods: {
        shuffle() {
            this.typeList = this.typeList.map(v => [Math.random(), v]).sort(([a,], [b,]) => a - b).map(([rand, v]) => v)
        },
        sample(collection) {
            return collection[Math.floor(Math.random() * collection.length)]
        }
    }
}
</script>
