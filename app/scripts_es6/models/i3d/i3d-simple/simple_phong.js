// simple_phong.js

var simple_phong = {
          actors: {          // directive attributes
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,
                                 transparent:true, opacity:1.0, color:"green" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{
                          key: {form: {type:"'spotlight.i3d'",
                                       color: 'orange', 
                                       intensity: 2.5,
                                       distance: 30.0},
                                transform: {t:[20.0,20.0,20.0]}
                          },
                          fill: {form: {type:"'spotlight.i3d'",
                                       color: 'blue', 
                                       intensity: 0.8,
                                       distance: 30.0},
                                transform: {t:[-20.0,-10.0,20.0]}
                          },
                          back: {form: {type:"'pointlight.i3d'",
                                       color: 'grey', 
                                       intensity: 2.0,
                                       distance: 50.0},
                                transform: {t:[-40.0,0.0,-20.0]}
                          }
                        }//children
              }//csphere0
            },

            axes: {
              axes0: {form: {length:3000.0}}
            },

            spheres: {
              sphere_phong: {form: {type: "'sphere.i3d'",
                               color: 'white',
                               phong: true,
                               specular_color: 'white', shininess: 2.0,
                               r:10.0,  wsegments:60.0, hsegments:60.0},
                      transform: {t: [0.0,0.0,0.0]},
                      children:{}
              }//sphere_phong
            }//spheres
          }//actors
};//simple-phong

