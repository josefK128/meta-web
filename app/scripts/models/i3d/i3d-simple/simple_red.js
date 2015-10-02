"use strict";
var simple_red = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "red"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }},
    cubes: {cube0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "sky_jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0
        },
        transform: {
          t: [0.0, 15.0, 0.0],
          e: [0.0, 0.785, 0.0],
          s: [1.0, 1.0, 1.0]
        },
        children: {
          cube0_0: {
            form: {
              type: "'cube.i3d'",
              textureurl: "glad_png",
              w: 10.0,
              h: 10.0,
              d: 10.0
            },
            transform: {
              t: [20.0, 25.0, 0.0],
              s: [2.0, 2.0, 1.0]
            },
            children: {}
          },
          cube0_1: {
            form: {
              type: "'cube.i3d'",
              color: 'green',
              wireframe: true,
              w: 10.0,
              h: 10.0,
              d: 10.0
            },
            transform: {
              t: [-20.0, 25.0, 0.0],
              e: [0.0, 0.785, 0.0]
            },
            children: {}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_red.js.map