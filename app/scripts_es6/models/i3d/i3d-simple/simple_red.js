// simple_red.js

var simple_red = {
          actors: {          // directive attributes
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0, visible:true, wireframe:true,
                          transparent:true, opacity:1.0, color:"red" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },

//            billboards: {
//              bb_singular: {
//                form: {textureurl: "./images/sky.jpg",
//                       w:50, h:50, aspect:true},
//                transform: {t: [25,25,0]}
//              },
//              bb0: {form: {textureurl:"./images/Escher.png",
//                w:50, h:50, aspect:true}, transform:{t:[0,0,0]}},
//              bb1: {form: {textureurl:"./images/Escher.png",
//                w:50, h:50, aspect:true}, transform:{t:[0,-100,0]}},
//              bb2: {form: {textureurl:"./images/1.png",
//                w:50, h:50, aspect:true}, transform:{t:[0,100,0]}},
//              bb3: {form: {textureurl:"./images/p2.jpg",
//                w:50, h:50, aspect:true}, transform:{t:[-100,0,0]}},
//              bb4: {form: {textureurl:"./images/sky.jpg",
//                w:50, h:50, aspect:true}, transform:{t:[100,0,0]}},
//              bb5: {form: {textureurl:"./images/Escher.png",
//                w:50, h:50, aspect:true}, transform:{t:[-100,100,0]}},
//              bb6: {form: {textureurl:"./images/1.png",
//                w:50, h:50, aspect:true}, transform:{t:[100,100,0]}},
//              bb7: {form: {textureurl:"./images/p2.jpg",
//                w:50, h:50, aspect:true}, transform:{t:[-100,-100,0]}},
//              bb8: {form: {textureurl:"./images/sky.jpg",
//                w:50, h:50, aspect:true}, transform:{t:[100,-100,0]}}
//            },

//            spheres: {
//              sphere0: {form: {textureurl:"glad_png",
//                          r:4.0, wsegments:20.0, hsegments:20.0, color:"white" },
//                        transform: {t:[10,10,0]}},
//              sphere1: {form: {r:4.0, wsegments:20.0, hsegments:20.0, 
//                          opacity:0.5, color:"red", transparent:true },
//                        transform: {t:[10,-10,0]}},
//              sphere2: {form: {r:16.0, wsegments:20.0, hsegments:20.0, 
//                          opacity:0.5, color:"red", transparent:true },
//                        transform: {t:[-10,10,0]}}
//            },
  
  
//            axes: {
//              axes0: {form: {length:3000.0}},
//              axes1: {form: {length:3000.0},
//                      transform: {t: [10.0,20.0,0.0],
//                                  e: [0.0,0.3,0.0]}
//              }
//            },

//            grounds: {
//              ground0: {form: {textureurl:"glad_png",
//                               opacity:0.6, w:50.0, h:50.0 },
//                        transform: {t: [0.0,-20.0,0.0]}},
//              ground1: {form: {color:"blue", transparent:true,
//                        opacity:0.7, w:50.0, h:50.0 },
//                        transform: {t: [0.0,-40.0,0.0]}},
//              ground2: {form: {color:"red", transparent:true,
//                        opacity:0.7, w:50.0, h:50.0 },
//                        transform: {t: [0.0,-60.0,0.0]}}
//            },

            cubes: {
              cube0: {form: {type: "'cube.i3d'",
                             textureurl:"sky_jpg",
                             w:20.0, h:20.0, d:20.0},
                      transform: { t: [0.0,15.0,0.0],
                                   e: [0.0,0.785,0.0],
                                   s: [1.0,1.0,1.0]},
                      children:{
                         cube0_0: {form: {type: "'cube.i3d'",
                                          textureurl:"glad_png",
                                          w:10.0, h:10.0, d:10.0},
                                   transform: {t: [20.0,25.0,0.0],
                                     //q: [0.0,0.3825,0.0,0.9239557],
                                     s: [2.0,2.0,1.0]
                                   },
                                   children:{}},
                         cube0_1: {form: {type: "'cube.i3d'",
                                          color: 'green',
                                          wireframe: true,
                                          w:10.0, h:10.0, d:10.0},
                                   transform: {t: [-20.0,25.0,0.0],
                                     e: [0.0,0.785,0.0],
                                     //q: [0.0,0.3825,0.0,0.9239557]
                                   },
                                   children:{}}
                      }//children
              }//cube0
            }//cubes

//            tetrahedra: {
//              tetrahedron0: {form: {type: "'tetrahedron.i3d'",
//                             textureurl:"sky_jpg",
//                             r:10.0},
//                      transform: { t: [0.0,15.0,0.0],
//                                   e: [0.0,0.785,0.0],
//                                   s: [1.0,2.0,1.0]},
//                      children:{
//                         tetrahedron0_0: {form: {type: "'tetrahedron.i3d'",
//                                          textureurl:"glad_png",
//                                          r:10.0, detail:4.0},
//                                   transform: {t: [20.0,15.0,0.0],
//                                     //q: [0.0,0.3825,0.0,0.9239557],
//                                     s: [1.0,2.0,1.0]
//                                   },
//                                   children: {}},
//                         tetrahedron0_1: {form: {type: "'tetrahedron.i3d'",
//                                          color: 'green',
//                                          wireframe: false,
//                                          r:10.0},
//                                   transform: {t: [-20.0,15.0,0.0],
//                                     e: [0.0,0.785,0.0],
//                                     //q: [0.0,0.3825,0.0,0.9239557]
//                                   },
//                                   children: {}}
//                      }//children
//              }//tetrahedron0
//            }//tetrahedra

          }//actors
};//simple-red

