"use strict";
var simple_phong1 = {actors: {
    camerasphere: {csphere: {
        form: {
          r: 50.0,
          visible: true,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
          color: "green"
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {
          key: {
            form: {
              type: "'pointlight.i3d'",
              color: 'orange',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [50.0, 0.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, 0.0, 0.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    spheres: {sphere_phong: {
        form: {
          type: "'sphere.i3d'",
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 5.0,
          r: 10.0,
          wsegments: 60.0,
          hsegments: 60.0
        },
        transform: {t: [0.0, 0.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/simple_phong1.js.map