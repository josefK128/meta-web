"use strict";
var growa1json = JSON.stringify({delta: {
    timeline: {
      p: {repeat: 0},
      actors: {
        'i3d:cube0_2:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }],
        'i3d:cube0_3:scale': [{
          dur: 10,
          p: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        }]
      }
    },
    branches: {cube0_2: {children: {
          s0_2_0: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, -0.785, 0],
              t: [-10, -10, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          },
          s0_2_1: {
            form: {
              type: "'sphere.i3d'",
              r: 5.0,
              color: "blue",
              transparent: true,
              opacity: 0.8
            },
            transform: {
              e: [0, 0.785, 0],
              t: [10, 10, 0],
              s: [0.01, 0.01, 0.01]
            },
            children: {}
          }
        }}}
  }});

//# sourceMappingURL=../../../models/shot/shot-graft/growa1json.js.map