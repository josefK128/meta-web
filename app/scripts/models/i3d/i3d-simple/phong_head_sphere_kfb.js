"use strict";
var phong_head_sphere_kfb = {actors: {
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
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [50.0, 20.0, 0.0]}
          },
          fill: {
            form: {
              type: "'pointlight.i3d'",
              color: 'blue',
              intensity: 1.0,
              distance: 100.0
            },
            transform: {t: [-50.0, -10.0, 0.0]}
          },
          back: {
            form: {
              type: "'pointlight.i3d'",
              color: 'grey',
              intensity: 2.5,
              distance: 100.0
            },
            transform: {t: [-40.0, -10.0, -50.0]}
          }
        }
      }},
    axes: {axes0: {form: {length: 3000.0}}},
    jsonmodels: {head_scan: {
        form: {
          type: "'jsonmodel.i3d'",
          jsonmodel_url: './webgl/models/head_scan/head_scan.js',
          color: 'white',
          phong: true,
          specular_color: 'orange',
          shininess: 3.0
        },
        transform: {
          t: [0.0, -12.0, 0.0],
          e: [0.0, 0.185, 0.0],
          s: [8.0, 8.0, 8.0]
        },
        children: {}
      }},
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
        transform: {t: [0.0, 30.0, 0.0]},
        children: {}
      }}
  }};

//# sourceMappingURL=../../../models/i3d/i3d-simple/phong_head_sphere_kfb.js.map