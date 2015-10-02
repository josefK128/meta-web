// s0.js

// model for shot-anim
// NOTE!: base:cube is sufficient actor name in this case, but the extra 
// suffix is for actor name uniqueness if multiple animations are defined 
// on the same type:id actor. Only the first two string splits
// are used in tuple - type=tuple[0]; id=tuple[1]
// NOTE!: all animations should set timeline.paused:true. This nullifies
// default immediate animating on timeline creation and allows the
// animation to be started at a chosen correct time.
var s0 = {
  delta: {
    branches: {},
    timeline: {p:{repeat:-1, yoyo:true},
               actors:{
                   'base:cube':[{dur:60, p:{rotationY:'360', delay:0}}, 
                                {dur:30, p:{rotationZ:'-360', delay:30}}],
                   'i2d:zoom_plane':[{dur:30, p:{scale:0.5, svgOrigin:'0% 0%'}},
                                     {dur:30, p:{rotation:90, svgOrigin:'0% 0%', 
                                       delay:30}}],
                   'i2d:c':[{dur:30, p:{bezier:{autoRotate:true, curviness:2, values:[{x:0, y:0}, {x:10, y:-10}, {x:10, y:0}, {x:10,y:10}, {x:0,y:10}, {x:0,y:0}]}}}] 
               }
              }
  }//delta
};//s0

