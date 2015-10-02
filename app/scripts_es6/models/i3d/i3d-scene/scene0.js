// scene0.js

var scene0 = {
          actors: { 
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"red" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },

            // metaforms are named by id of root node - exp 'tree0'
            // children are named by level-index exp: 0,1/00,01,10/000,...
            metaforms: {
              tree0: {form: {
                        type: "'cube.i3d'",
                        textureurl:"./images/sky.jpg",
                        w:20.0, h:20.0, d:20.0,
                        opacity:1.0, color:"blue", visible:true},
                      transform: {t:[0.0,0.0,0.0]},
                      children:{
                        alpha:{
                          form: {
                            type: "'cube.i3d'", 
                            width:10, height:30, depth:10,
                            visible:true, transparent:false, 
                            opacity:0.6, color:"green"
                          },
                          transform: {t:[0.0,20.0,0.0]},
                          children:{}
                        },
                        beta:{
                          form: {
                            type: "'cube.i3d'", 
                            width:10, height:10, depth:10,
                            visible:true, wireframe:true, 
                            opacity:1.0, color:"blue"},
                          transform: {t:[-20.0,-20.0,0.0]},
                          children:{
                            gamma: {
                              form: {
                                "type": "'cube.i3d'",
                                width:10, height:30, depth:10,
                                visible:true, wireframe:true, 
                                opacity:1.0, color:"red"
                              },
                              transform: {t:[20.0,0.0,0.0]},
                              children:{}
                            }
                          }
                        }
                      }//children
              }//tree0
            },//metaforms
  
            axes: {
              axes0: {form: {length:3000.0}}
            },
  
            alights: {
              alight0: {form: {color:"0x000022"}},
              alight1: {form: {color:"0xff0000"}}
            },
            
            dlights: {
              dlight0: {form: {color:"0xffffff", directionx:1, directiony:1, 
                directionz:1}},
              dlight1: {form: {color:"0x002288", directionx:-1, directiony:-1, 
                directionz:-1}},
              dlight2: {form: {color:"0x00ff00", directionx:1, directiony:-1, 
                directionz:-1}}
            },
  
            cubes: {
              cube0: {form: {type: "'cube.i3d'",
                             x:0.0, y:0.0, z:0.0, 
                             textureurl:"./images/sky.jpg",
                             w:20.0, h:20.0, d:20.0},
                      transform: { t: [0.0,25.0,0.0],
                                   e: [0.0,0.785,0.0],
                                   s: [1.0,2.0,1.0]},
                      children:{}
              }//cube0
            },
           
            spheres: {
              sphere0: {form: {textureurl:"glad_png",
                          r:4.0, wsegments:20.0, hsegments:20.0, color:"white" },
                        transform: {t:[10,10,0]}},
              sphere1: {form: {r:4.0, wsegments:20.0, hsegments:20.0, 
                          opacity:0.5, color:"red", transparent:true },
                        transform: {t:[10,-10,0]}},
              sphere2: {form: {r:16.0, wsegments:20.0, hsegments:20.0, 
                          opacity:0.5, color:"red", transparent:true },
                        transform: {t:[-10,10,0]}}
            },
  
  
            billboards: {
              bb_singular: {form: {textureurl:"./images/snow_posZ.jpg",
                                   width:50, height:50, aspect:true},
                            transform: {t:[20,20,-10]}}
            }
  
          }//actors
};//scene0

