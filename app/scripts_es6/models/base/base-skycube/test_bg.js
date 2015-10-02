// test_bg.js

var test_bg = {
  faces: {
    front: "url('./images/css3d/moon_tr.png'), radial-gradient(rgba(255,0,0,0.2), rgba(20,0,200,0.0) 80%)",
    back: "url('./images/css3d/moon_tr.png')",

    left: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",

    right: "url('./images/css3d/moon_tr.png'),radial-gradient(rgba(20,0,200,0.2), rgba(255,0,0,0.0) 80%)",

    sky: "url('./images/css3d/moon_tr.png')",
    ground: "url('./images/css3d/moon_tr.png')"
  },
  cube: {
    perspective: '100px',
    bg:  "linear-gradient(0deg, rgba(255,0,0,0.3), rgba(20,0,200,0.3) 80%), url('./images/css3d/moon_tr.png'), url('./images/css3d/redlight_corner.png')"
  },
  animation: {
    dur: '120s',
    repeat: 'infinite'
  }
};//test_bg

