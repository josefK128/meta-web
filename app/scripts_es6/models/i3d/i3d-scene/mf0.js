// mf0.js

var mf0 = {
          actors: {         
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"red" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },
            metaforms: {
              tree1: {form: { type:"'sphere.i3d'",
                          textureurl:"glad_png",
                          r:4.0, wsegments:20.0, hsegments:20.0, color:"white" },
                        transform: {t:[10,10,0]},
                        children: {
                          sphere0: {form: {type:"'sphere.i3d'", 
                            textureurl:"glad_png",
                            r:4.0, wsegments:20.0, hsegments:20.0, color:"white" },
                            transform: {t:[10,10,0]}},
                          sphere1: {form: {type:"'sphere.i3d'", 
                            r:4.0, wsegments:20.0, hsegments:20.0, 
                            opacity:0.5, color:"red", transparent:true },
                            transform: {t:[10,-10,0]}},
                          sphere2: {form: {type:"'sphere.i3d'",
                            r:16.0, wsegments:20.0, hsegments:20.0, 
                            opacity:0.5, color:"red", transparent:true },
                            transform: {t:[-10,10,0]}}
                        }
                      },//tree1

              tree0: {form: {
                        type: "'cube.i3d'",
                        textureurl:"sky_jpg",
                        w:20.0, h:20.0, d:20.0,
                        opacity:1.0, color:"blue"},
                      transform: {t: [-30,0,0]},
                      children:{
                            bb_0: {form: {type: "'billboard.i3d'",
                                     textureurl: "sky_jpg",
                                     w:10, h:10, aspect:true},
                                   children: {
                                     bb_0_0: {form: {type: "'billboard.i3d'",
                                       textureurl: "glad_png",
                                       w:10, h:10, aspect:true},
                                       transform: {t: [20,10,0]}
                                     },
                                     bb_0_1: {form: {type: "'billboard.i3d'",
                                       textureurl: "glad_png",
                                       w:10, h:10, aspect:true},
                                       transform: {t: [10,-10,0]}
                                     },
                                     bb_0_2: {form: {type: "'billboard.i3d'",
                                       textureurl: "glad_png",
                                       w:10, h:10, aspect:true},
                                       transform: {t: [10,20,0]}
                                     }
                                  }}
                      }
              }//tree0
            }//metaforms
          }//actors
};//mf0

