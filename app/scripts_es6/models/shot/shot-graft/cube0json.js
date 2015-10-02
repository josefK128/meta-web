// cube0json.js
// writes visible cube but then csphere and camera controls
// do NOT work ?!

var cube0json = JSON.stringify({
  delta: {
    timeline: {},
    branches: {
      'i3d': {children: {
                'cube0': {form: {type: "'cube.i3d'",
                                   x:0.0, y:0.0, z:0.0, 
                                   textureurl:"./images/sky.jpg",
                                   w:10.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [-10,-10,0],s:[1.0,1.0,1.0]},
                            children: {}
                }
             }//children
           }//i3d - parent
    }//branches
  }//delta
});//cube0json


