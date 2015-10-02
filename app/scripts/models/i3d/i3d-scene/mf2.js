"use strict";
var mf2 = {actors: {
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
    metaforms: {tree0: {
        form: {
          type: "'cube.i3d'",
          textureurl: "sky_jpg",
          w: 20.0,
          h: 20.0,
          d: 20.0,
          opacity: 1.0,
          color: "blue",
          visible: true
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          alpha: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 30,
              depth: 10,
              visible: true,
              transparent: false,
              opacity: 0.6,
              color: "green"
            },
            transform: {t: [0.0, 20.0, 0.0]},
            children: {}
          },
          beta: {
            form: {
              type: "'cube.i3d'",
              width: 10,
              height: 10,
              depth: 10,
              visible: true,
              wireframe: true,
              opacity: 1.0,
              color: "blue"
            },
            transform: {t: [-20.0, -20.0, 0.0]},
            children: {gamma: {
                form: {
                  "type": "'cube.i3d'",
                  width: 10,
                  height: 30,
                  depth: 10,
                  visible: true,
                  wireframe: true,
                  opacity: 1.0,
                  color: "red"
                },
                transform: {t: [20.0, 0.0, 0.0]},
                children: {}
              }}
          }
        }
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-scene/mf2.js.map