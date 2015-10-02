// a1json.js

var a1json = JSON.stringify({
  delta: {
    timeline: {},
    branches: {
      cube0_2: {children: {
                s0_2_0: {form: {type: "'sphere.i3d'",
                                   r:5.0,
                                   color:"blue", transparent:true, opacity:0.8},
                            transform: {e:[0,-0.785,0], t: [-15,-10,10],s:[1,1,1]},
                            children: {}
                },
                s0_2_1: {form: {type: "'sphere.i3d'",
                                   r:5.0,
                                   color:"blue", transparent:true, opacity:0.8},
                            transform: {e:[0,0.785,0], t:[15,10,10],s:[1,1,1]},
                            children: {}
                }
             }//children
      }//cube0_2 - parent
    }//branches
  }//delta
});//a1json


