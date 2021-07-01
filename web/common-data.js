var HOTSPOTS = {
    'enterance' : {
        index: '2-1',
        position: {x: -5.68, y: 8.63, z: 40.55},
        direction: {x: 0.0, y: 0.0, z: -1.0},
        action: 'move',
        targetPosition: {x: 6.71, y: 10, z: 74},
        icon: 'tag-enterance.png'
    },

    'vita-link': {
        index: '3-1',
        position: {x: -44, y: 6, z: -83},
        direction: {x: -1, y: 0, z: 0},
        action: 'move-link',
        link: 'https://www.vitavitasoy.com/tc/sustainability',
        targetPosition: {x: -15, y: 10.0, z: -100.38},
        icon: 'tag-link.png'
    },

    'recycle-plan': {
        index: '3-1',
        position: {x: 8.88, y: 13.76, z: -76.88},
        direction: {x: 0, y: 0, z: 1.0},
        action: 'move-open',
        targetPosition: {x: 3, y: 13.0, z: -99.38},
        icon: 'tag-video.png'
    },

    'recycle-class': {
        index: '3-2',
        position: {x: 10.98, y: 9.40, z: -111.36},
        direction: {x: 0.0, y: -0.3, z: -0.8},
        action: 'move-open',
        targetPosition: {x: 12.98, y: 9.40, z: -105.36},
        icon: 'tag-info.png'
    },

    'recycle-backpack': {
        index: '3-3',
        position: {x: 48.0, y: 14, z: -120.65},
        direction: {x: 0.0, y: 0.0, z: -1.0},
        action: 'move-open',
        targetPosition: {x: 48.0, y: 10, z: -75.65},
        icon: 'tag-picture.png'
    },

    'recycle-where': {
        index: '4-1',
        position: {x: 29.7, y: 18.09, z: -59.05},
        direction: {x: -1.0, y: 0.0, z: 0.0},
        action: 'move-open',
        targetPosition: {x: 59.7, y: 10.00, z: -59.05},
        icon: 'tag-video.png'
    },

    'shoes': {
        index: '5-1',
        position: {x: 82.41, y: 13.03, z: -84.08},
        direction: {x: 1.0, y: 0.0, z: 0.0},
        action: 'move-open',
        targetPosition: {x: 56.41, y: 10, z: -98.08},
        icon: 'tag-info.png'
    },

    'video': {
        index: '5-2',
        position: {x: 54.59, y: 11.61, z: -45.41},
        direction: {x: 0.0, y: 0.0, z: 1.0},
        action: 'move-open',
        targetPosition: {x: 72.59, y: 10.0, z: -90.41},
        icon: 'tag-video.png'
    },

    'paper-case': {
        index: '5-3',
        position: {x: 133.40, y: 15.96, z: -51.58},
        direction: {x: 0.707, y: 0.0, z: 0.707},
        targetPosition: {x: 113.40, y: 10, z: -71.58},
        action: 'move-link',
		link: 'https://www.vitavitasoy.com/tc/sustainability',
        icon: 'tag-link.png'

    },

    'water-vending': {
        index: '6-1',
        position: {x: 94.06, y: 16.82, z: -107.83},
        direction: {x: -1.0, y: 0.0, z: 0.0},
        action: 'move-link',
        link: 'https://www.milmill.hk',
        targetPosition: {x: 120.06, y: 13, z: -100.83},
        icon: 'tag-milmill.png'
    },

    // 'recycle-wall': {
    //     index: '6-2',
    //     position: {x: 135.31, y: 22.02, z: -126.76},
    //     direction: {x: 1.0, y: 0.0, z: 0.0},
    //     action: 'move',
    //     targetPosition: {x: 112.31, y: 10.0, z: -135.76},
    //     icon: 'tag-info.png'
    // },

    'recycle-post': {
        index: '6-3',
        position: {x: 137.04, y: 18.35, z: -103.75},
        direction: {x: 1.0, y: 0.0, z: 0.0},
        action: 'move',
        targetPosition: {x: 117.04, y: 13.05, z: -110.75},
        icon: 'tag-info.png'
    },

    // 'recycle-case': {
    //     index: '6-4',
    //     position: {x: 135.66, y: 15.39, z: -65.13},
    //     direction: {x: 1.0, y: 0.0, z: 0.0},
    //     action: 'move',
    //     targetPosition: {x: 124.58, y: 12.39, z: -70.82},
    //     icon: 'tag-info.png'
    // },

    'food-paper': {
        index: '7-1',
        position: {x: 84.43, y: 15.28, z: -176.8},
        direction: {x: 0.0, y: 0.0, z: -1.0},
        targetPosition: {x: 72.50, y: 13.0, z: -155.98},
        action: 'move',
        icon: 'tag-info.png'
    },

    // 'edu-center': {
    //     index: '7-2',
    //     position: {x: 51.50, y: 19.23, z: -158.98},
    //     direction: {x: -1.0, y: 0.0, z: 0.0},
    //     action: 'move',
    //     targetPosition: {x: 63.50, y: 16.23, z: -148.98},
    //     icon: 'tag-picture.png'
    // },

    'stand': {
        index: '7-3',
        position: {x: 53.04, y: 9.02, z: -126.53},
        direction: {x: 0.0, y: -0.48, z: 0.82},
        action: 'move',
        targetPosition: {x: 53.04, y: 9.52, z: -130.53},
        icon: 'tag-info.png'
    },

    'yellow-post-1': {
        index: '8-1',
        position: {x: 126.27, y: 24.53, z: -224.16},
        direction: {x: 0.0, y: 0.0, z: -1.0},
        action: 'move-open',
        targetPosition: {x: 114.27, y: 10.0, z: -200.16},
        icon: 'tag-picture.png'
    },

    'yellow-post-2': {
        index: '8-2',
        position: {x: 78.56, y: 24.79, z: -224.05},
        direction: {x: 0.0, y: 0.12, z: -0.98},
        action: 'move-open',
        targetPosition: {x: 62.56, y: 10.00, z: -195.05},
        icon: 'tag-picture.png'
    },

    'vitasoy': {
        index: '9-1',
        position: {x: -28.76, y: 17.24, z: -193.44},
        direction: {x: 0.0, y: 0.1, z: -0.92},
        action: 'move-link',
        targetPosition: {x: -23.76, y: 10, z: -163.44},
        link: 'https://www.hktvmall.com/hktv/zh/search_a?keyword=維他蒸餾水',
        icon: 'tag-shopping.png'
    },

    'enterance-2': {
        index: '9-2',
        position: {x: -43.17, y: 9.48, z: -138.73},
        direction: {x: -1.0, y: 0.0, z: 0.0},
        action: 'move',
        targetPosition: {x: -17.17, y: 10.0, z: -161.73},
        icon: 'tag-enterance.png'
    },

    'game-ranking': {
        index: '10-1',
        position: {x: -165.75, y: 10.13, z: -97.74},
        direction: {x: 0.0, y: 0.0, z: 1.0},
        action: 'game',
        targetPosition: {x: -153.75, y: 10.63, z: -138.74},
        icon: 'tag-cup.png'
    },

    'car-racing': {
        index: '10-2',
        position: {x: -117.92, y: 5.0, z: -116.99},
        direction: {x: 0.0, y: 0.0, z: 1.0},
        action: 'game',
        icon: 'tag-game.png'
    },

    'running-game': {
        index: '10-3',
        position: {x: -181.73, y: 7.0, z: -132.47},
        direction: {x: 0.0, y: 0.0, z: 1.0},
        action: 'game',
        icon: 'tag-game.png'
    },

    'photo-hunter': {
        index: '10-4',
        position: {x: -166.72, y: 2.37, z: -152},
        direction: {x: -1.0, y: 0.0, z: 0.0},
        action: 'game',
        icon: 'tag-game.png'
    },

    'game-time': {
        index: '10-5',
        position: {x: -142.41, y: 15.01, z: -97.62},
        direction: {x: 0.0, y: 0.0, z: 1.0},
        action: 'game',
        targetPosition: {x: -158.41, y: 15.01, z: -118.62},
        icon: 'tag-T_C.png'
    }
};

var CHECKPOINTS = [
    {
        position: [-1.3, 4.2, -118.0],
        rotation: [0, Math.PI / 2, 0]
    },
    {
        position: [30.1, 2.3, -67.5],
        rotation: [0, -Math.PI / 2, 0]
    },
    {
        position: [138.4, 5.7, -88.8],
        rotation: [0, Math.PI / 2, 0]
    },
    {
        position: [138.4, 5.7, -187.3],
        rotation: [0, Math.PI / 2, 0]
    },
];

var ANIMATION_OBJECTS = [
    {
        fileName: 'car_rotation_20210520.glb',
        position: [30, 4.5, 80],
        rotaion: [0.0, 1.9, 0],
        scale: [1, 1, 1]
    },
    {
        fileName: 'shoe_rotation_20210520.glb',
        position: [-182.8, 2.5, -133.7],
        rotaion: [0.0, 1.9, 0],
        scale: [1, 1, 1]
    },
    {
        fileName: 'car_animation_20210520.glb',
        position: [-114.6, 1.5, -144],
        rotaion: [0.0, Math.PI / 2, 0],
        scale: [1, 1, 1]
    }
];

window.TOTAL_ASSET_COUNTS = 152;
