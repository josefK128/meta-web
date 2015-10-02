"use strict";
var s0 = {delta: {
    branches: {},
    timeline: {
      p: {
        repeat: -1,
        yoyo: true
      },
      actors: {
        'base:cube': [{
          dur: 60,
          p: {
            rotationY: '360',
            delay: 0
          }
        }, {
          dur: 30,
          p: {
            rotationZ: '-360',
            delay: 30
          }
        }],
        'i2d:zoom_plane': [{
          dur: 30,
          p: {
            scale: 0.5,
            svgOrigin: '0% 0%'
          }
        }, {
          dur: 30,
          p: {
            rotation: 90,
            svgOrigin: '0% 0%',
            delay: 30
          }
        }],
        'i2d:c': [{
          dur: 30,
          p: {bezier: {
              autoRotate: true,
              curviness: 2,
              values: [{
                x: 0,
                y: 0
              }, {
                x: 10,
                y: -10
              }, {
                x: 10,
                y: 0
              }, {
                x: 10,
                y: 10
              }, {
                x: 0,
                y: 10
              }, {
                x: 0,
                y: 0
              }]
            }}
        }]
      }
    }
  }};

//# sourceMappingURL=../../../models/shot/shot-anim/s0.js.map