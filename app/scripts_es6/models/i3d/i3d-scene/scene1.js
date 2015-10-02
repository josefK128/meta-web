// scene1.js

var scene1 = {
          actors: {   
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"red" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },

//            metaforms: {
//              tree0: {form: {
//                        type: "'cube.i3d'",
//                        textureurl:"sky_jpg",
//                        w:20.0, h:20.0, d:20.0,
//                        opacity:1.0, color:"blue", visible:true},
//                      transform: {t:[0.0,0.0,0.0]},
//                      children:{
//                        alpha:{
//                          form: {
//                            type: "'cube.i3d'", 
//                            width:10, height:30, depth:10,
//                            visible:true, transparent:false, 
//                            opacity:0.6, color:"green"
//                          },
//                          transform: {t:[0.0,20.0,0.0]},
//                          children:{}
//                        },
//                        beta:{
//                          form: {
//                            type: "'cube.i3d'", 
//                            width:10, height:10, depth:10,
//                            visible:true, wireframe:true, 
//                            opacity:1.0, color:"blue"},
//                          transform: {t:[-20.0,-20.0,0.0]},
//                          children:{
//                            gamma: {
//                              form: {
//                                "type": "'cube.i3d'",
//                                width:10, height:30, depth:10,
//                                visible:true, wireframe:true, 
//                                opacity:1.0, color:"red"
//                              },
//                              transform: {t:[20.0,0.0,0.0]},
//                              children:{}
//                            }
//                          }
//                        }
//                      }//children
//              }//tree0
//            },

            billboards: { 
              
              bb_singular: {form: {textureurl:"./images/snow_posZ.jpg",
                w:50, h:50, aspect:true}, transform: {t:[20,20,-10]}},

              bb_singular2: {form: {textureurl: "sky_jpg",
                       w:50, h:50, aspect:true}, transform: {t: [25,25,0]}},
             
              // 0,0
              bb0: {form: {textureurl:"Escher_png",
                w:50, h:50, aspect:true}, transform:{t:[0,0,0]}},
              bb1: {form: {textureurl:"Escher_png",
                w:50, h:50, aspect:true}, transform:{t:[0,-100,0]}},
              bb2: {form: {textureurl:"glad_png",
                w:50, h:50, aspect:true}, transform:{t:[0,100,0]}},
              bb3: {form: {textureurl:"p2_jpg",
                w:50, h:50, aspect:true}, transform:{t:[-100,0,0]}},
              bb4: {form: {textureurl:"sky_jpg",
                w:50, h:50, aspect:true}, transform:{t:[100,0,0]}},
              bb5: {form: {textureurl:"Escher_png",
                w:50, h:50, aspect:true}, transform:{t:[-100,100,0]}},
              bb6: {form: {textureurl:"glad_png",
                w:50, h:50, aspect:true}, transform:{t:[100,100,0]}},
              bb7: {form: {textureurl:"p2_jpg",
                w:50, h:50, aspect:true}, transform:{t:[-100,-100,0]}},
              bb8: {form: {textureurl:"sky_jpg",
                w:50, h:50, aspect:true}, transform:{t:[100,-100,0]}},
    
    
              // 300,0
              bb18: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true}, transform: {t:[300,0,0]}},
              bb19: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true},transform: {t:[300,-100,0]}},
              bb20: {form: {textureurl:"glad_png",
                width:50, height:50, aspect:true},transform: {t:[300,100,0]}},
              bb21: {form: {textureurl:"p2_jpg",
                width:50, height:50, aspect:true},transform: {t:[200,0,0]}},
              bb22: {form: {textureurl:"sky_jpg",
                width:50, height:50, aspect:true},transform: {t:[400,0,0]}},
              bb23: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true},transform: {t:[200,100,0]}},
              bb24: {form: {textureurl:"glad_png",
                width:50, height:50, aspect:true},transform: {t:[400,100,0]}},
              bb25: {form: {textureurl:"p2_jpg",
                width:50, height:50, aspect:true},transform: {t:[200,-100,0]}},
              bb26: {form: {textureurl:"sky_jpg",
                width:50, height:50, aspect:true},transform: {t:[400,-100,0]}},
    
    
              // -300,0
              bb54: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true}, transform: {t:[-300,-0,0]}},
              bb55: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true},transform: {t:[-300,-100,0]}},
              bb56: {form: {textureurl:"glad_png",
                width:50, height:50, aspect:true},transform: {t:[-300,100,0]}},
              bb57: {form: {textureurl:"p2_jpg",
                width:50, height:50, aspect:true},transform: {t:[-400,0,0]}},
              bb58: {form: {textureurl:"sky_jpg",
                width:50, height:50, aspect:true},transform: {t:[-200,0,0]}},
              bb59: {form: {textureurl:"Escher_png",
                width:50, height:50, aspect:true},transform: {t:[-400,100,0]}},
              bb60: {form: {textureurl:"glad_png",
                width:50, height:50, aspect:true},transform: {t:[-200,100,0]}},
              bb61: {form: {textureurl:"p2_jpg",
                width:50, height:50, aspect:true},transform: {t:[-400,-100,0]}},
              bb62: {form: {textureurl:"sky_jpg",
                width:50, height:50, aspect:true},transform: {t:[-200,-100,0]}}
    
            }//billboards
          }//actors
};//scene1

