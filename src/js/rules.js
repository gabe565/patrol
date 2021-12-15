const types = {
    "Commander": {
        "name": "Commander",
        "order": 0,
        "color": "success",
        "image": [
            "commander1.jpg",
            "commander2.jpg",
            "commander3.jpg",
            "commander4.jpg"
        ]
    },
    "Scout": {
        "name": "Scout",
        "order": 1,
        "color": "info",
        "image": [
            "scout.jpg",
        ]
    },
    "Agent": {
        "name": "Agent",
        "order": 2,
        "color": "warning",
        "image": [
            "agent1.jpg",
            "agent2.jpg",
            "agent3.jpg"
        ]
    },
    "Patrol": {
        "name": "Patrol",
        "order": 3,
        "color": "danger",
        "image": [
            "patrol1.jpg",
            "patrol2.jpg",
            "patrol3.jpg"
        ]
    }
}

const configs = {
    "5": {
        "Commander": 1,
        "Agent": 2,
        "Patrol": 2
    },
    "6": {
        "Commander": 1,
        "Agent": 3,
        "Patrol": 2
    },
    "7": {
        "Commander": 1,
        "Agent": 4,
        "Patrol": 2
    },
    "8": {
        "Commander": 1,
        "Agent": 4,
        "Patrol": 3
    },
    "9": {
        "Commander": 1,
        "Scout": 1,
        "Agent": 5,
        "Patrol": 2
    },
    "10": {
        "Commander": 1,
        "Scout": 1,
        "Agent": 6,
        "Patrol": 2
    }
}

module.exports = {
    types,
    configs
}
