// phonghead_kfb.js

var phonghead_kfb = {
          actors: {          // directive attributes
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,
                                 transparent:true, opacity:1.0, color:"green" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{
                          key: {form: {type:"'pointlight.i3d'",
                                       color: 'orange', 
                                       intensity: 2.5,
                                       distance: 100.0},
                                transform: {t:[50.0,20.0,0.0]}
                          },
                          fill: {form: {type:"'pointlight.i3d'",
                                       color: 'blue', 
                                       intensity: 0.8,
                                       distance: 100.0},
                                transform: {t:[-50.0,-10.0,0.0]}
                          },
                          back: {form: {type:"'pointlight.i3d'",
                                       color: 'grey', 
                                       intensity: 2.5,
                                       distance: 100.0},
                                transform: {t:[-40.0,-10.0,-50.0]}
                          }
                        }//children
              }//csphere
            },

            axes: {
              axes0: {form: {length:3000.0}}
            },

//            alights: {
//              alight0: {form: {color:"#0f0000"}}
//            },

            jsonmodels: {
              head_scan: {form: {type: "'jsonmodel.i3d'",
                               jsonmodel_url:'./webgl/models/head_scan/head_scan.js',
                               color: 'white',
                               phong: true,
                               specular_color: 'orange', shininess: 3.0},
                      // for head_scam, ball_chair
                      transform: {t: [0.0,0.0,-10.0], e:[0.0,0.185, 0.0], s:[10.0,10.0,10.0]},
                      children:{}
              }//head_scan
            }//jsonmodels
          }//actors
};//phonghead_kfb

