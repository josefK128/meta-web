// mf1.js

var mf1 = {
          actors: {
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"red" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },
            metaforms: {
              tree0: {form: {
                      type: "'cube.i3d'",
                      visible:true, wireframe:true, 
                      transparent:false, opacity:1.0, color:"red"},
                      transform:{t:[0.0,0.0,0.0]},
                      children:{
                        alpha:{
                          form: {
                            type: "'cube.i3d'",
                            visible:true, wireframe:true, 
                            transparent:false, opacity:0.6, color:"green"},
                          transform:{t:[20.0,0.0,0.0]},
                          children:{}
                        },
                        beta:{form: {
                           type: "'cube.i3d'", 
                           visible:true, wireframe:true, 
                           transparent:false, opacity:1.0, color:"blue"},
                           transform:{t:[0.0,20.0,0.0]},
                           children: {
                             delta1: {form: {
                               type: "'cube.i3d'",
                               visible:true, wireframe:true, 
                               transparent:false, opacity:1.0, color:"yellow"},
                               transform:{t:[20.0,20.0,0.0]},
                               children:{}
                             },
                             delta2: {form: {
                               type: "'cube.i3d'",
                               visible:true, wireframe:true, 
                               transparent:false, opacity:1.0, color:"violet"},
                               transform:{t:[-20.0,-20.0,0.0]},
                               children:{}
                             }
                           }
                        },
                        gamma:{form: "'cube.i3d'", 
                           visible:true, wireframe:true, 
                           transparent:false, opacity:1.0, color:"orange",
                           transform:{t:[-20.0,0.0,0.0]},
                           children: {}
                        }
                      }//children
              }//tree0
            }//metaforms
          }//actors
};//mf1

