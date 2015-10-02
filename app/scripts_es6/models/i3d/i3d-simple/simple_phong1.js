// simple_phong1.js

var simple_phong1 = {
          actors: {          // directive attributes
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,
                                 transparent:true, opacity:1.0, color:"green" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{
                          key: {form: {type:"'pointlight.i3d'",
                                       color: 'orange', 
                                       intensity: 1.0,
                                       distance: 100.0},
                                transform: {t:[50.0,0.0,0.0]}
                          },
                          fill: {form: {type:"'pointlight.i3d'",
                                       color: 'blue', 
                                       intensity: 1.0,
                                       distance: 100.0},
                                transform: {t:[-50.0,0.0,0.0]}
                          }
//                          back: {form: {type:"'pointlight.i3d'",
//                                       color: 'green', 
//                                       intensity: 1.0,
//                                       distance: 100.0},
//                                transform: {t:[0.0,0.0,50.0]}
//                          }
                        }//children
              }//csphere
            },

            axes: {
              axes0: {form: {length:3000.0}}
            },

//            alights: {
//              alight0: {form: {color:"#0f0000"}}
//            },

            spheres: {
              sphere_phong: {form: {type: "'sphere.i3d'",
                               color: 'white',
                               phong: true,
                               specular_color: 'orange', shininess: 5.0,
                               r:10.0,  wsegments:60.0, hsegments:60.0},
                      transform: {t: [0.0,0.0,0.0]},
                      children:{}
              }//sphere_phong
            }//spheres
          }//actors
};//simple-phong

