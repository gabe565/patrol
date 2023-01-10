import agent1 from './images/agent1.jpg';
import agent2 from './images/agent2.jpg';
import agent3 from './images/agent3.jpg';
import commander1 from './images/commander1.jpg';
import commander2 from './images/commander2.jpg';
import commander3 from './images/commander3.jpg';
import commander4 from './images/commander4.jpg';
import patrol1 from './images/patrol1.jpg';
import patrol2 from './images/patrol2.jpg';
import patrol3 from './images/patrol3.jpg';
import scout from './images/scout.jpg';

const types = {
    "Commander": {
        "name": "Commander",
        "order": 0,
        "color": "success",
        "image": [
            commander1,
            commander2,
            commander3,
            commander4
        ]
    },
    "Scout": {
        "name": "Scout",
        "order": 1,
        "color": "info",
        "image": [
            scout,
        ]
    },
    "Agent": {
        "name": "Agent",
        "order": 2,
        "color": "warning",
        "image": [
            agent1,
            agent2,
            agent3
        ]
    },
    "Patrol": {
        "name": "Patrol",
        "order": 3,
        "color": "danger",
        "image": [
            patrol1,
            patrol2,
            patrol3
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

export default {
    types,
    configs
}
