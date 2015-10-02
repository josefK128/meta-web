// a0.js

var a0 = {
  delta: {
    timeline: [{id: 'cube0_1', dur: 10, p:{scale:[1,1,1]}, delay:2}],
    branches: {
      cube0: {children: {
                cube0_2: {form: {type: "'cube.i3d'",
                                   x:0.0, y:0.0, z:0.0, 
                                   textureurl:"./images/sky.jpg",
                                   w:20.0, h:20.0, d:20.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [-20,-10,0],s:[0.25,1,0.25]},
                            children: {}
                },
                cube0_3: {form: {type: "'cube.i3d'",
                                   x:0.0, y:-20.0, z:0.0, 
                                   textureurl:"sky_jpg",
                                   w:20.0, h:40.0, d:20.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [20,0,0],s:[0.5,1, 0.5]},
                            children: {}
                }
             }//children
      }//cube0
    }//branches
  }//delta
};//a0

