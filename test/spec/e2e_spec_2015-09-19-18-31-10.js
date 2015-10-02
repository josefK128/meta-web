"use strict";
var e2e_spec = [{
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-fixed:",
  "delta_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube//",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a0"
  },
  "abs_url": "/a0:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope1",
  "delta_url": "/a0://///shot-graft:scope1",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {"i3d:cube0:scale": [{
            "dur": 10,
            "p": {
              "x": 0.5,
              "y": 0.5,
              "z": 0.5
            }
          }]}
      },
      "branches": {"cube0": {"children": {
            "cube0_2": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": 0,
                "z": 0,
                "textureurl": "./images/sky.jpg",
                "w": 5,
                "h": 10,
                "d": 10,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [-20, -10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            },
            "cube0_3": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": -20,
                "z": 0,
                "textureurl": "sky_jpg",
                "w": 5,
                "h": 10,
                "d": 10,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [20, 0, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            }
          }}}
    }}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a1"
  },
  "abs_url": "/a1:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope2",
  "delta_url": "/a1://///shot-graft:scope2",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {
          "i3d:cube0_2:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }],
          "i3d:cube0_3:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }]
        }
      },
      "branches": {"cube0_2": {"children": {
            "s0_2_0": {
              "form": {
                "type": "'sphere.i3d'",
                "r": 5,
                "color": "blue",
                "transparent": true,
                "opacity": 0.8
              },
              "transform": {
                "e": [0, -0.785, 0],
                "t": [-10, -10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            },
            "s0_2_1": {
              "form": {
                "type": "'sphere.i3d'",
                "r": 5,
                "color": "blue",
                "transparent": true,
                "opacity": 0.8
              },
              "transform": {
                "e": [0, 0.785, 0],
                "t": [10, 10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            }
          }}}
    }}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a2"
  },
  "abs_url": "/a2:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope3",
  "delta_url": "/a2://///shot-graft:scope3",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {
          "i3d:s0_2_0:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }],
          "i3d:s0_2_1:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }]
        }
      },
      "branches": {}
    }}
}, {
  "action": {
    "t": "camera3d",
    "f": "dollyflyTo",
    "a": {
      "x": 10,
      "y": 10,
      "z": -20,
      "d": 4
    }
  },
  "abs_url": "/a2:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope4",
  "delta_url": "//////shot-anim:scope4",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:position": [{
            "dur": 4,
            "p": {
              "x": 10,
              "y": 10,
              "z": -20,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "payments"
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:",
  "delta_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black://shot-fixed:",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-fixed:",
  "delta_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube//",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "shot",
    "a": "shot-graft:{\"delta\":{\"timeline\":{\"p\":{\"repeat\":0},\"actors\":{\"i3d:cube0:scale\":[{\"dur\":10,\"p\":{\"x\":0.5,\"y\":0.5,\"z\":0.5}}]}},\"branches\":{\"cube0\":{\"children\":{\"cube0_2\":{\"form\":{\"type\":\"'cube.i3d'\",\"x\":0,\"y\":0,\"z\":0,\"textureurl\":\"./images/sky.jpg\",\"w\":5,\"h\":10,\"d\":10,\"color\":\"blue\",\"transparent\":true,\"opacity\":1},\"transform\":{\"t\":[-20,-10,0],\"s\":[0.01,0.01,0.01]},\"children\":{}},\"cube0_3\":{\"form\":{\"type\":\"'cube.i3d'\",\"x\":0,\"y\":-20,\"z\":0,\"textureurl\":\"sky_jpg\",\"w\":5,\"h\":10,\"d\":10,\"color\":\"blue\",\"transparent\":true,\"opacity\":1},\"transform\":{\"t\":[20,0,0],\"s\":[0.01,0.01,0.01]},\"children\":{}}}}}}}"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope7",
  "delta_url": "//////shot-graft:scope7",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {"i3d:cube0:scale": [{
            "dur": 10,
            "p": {
              "x": 0.5,
              "y": 0.5,
              "z": 0.5
            }
          }]}
      },
      "branches": {"cube0": {"children": {
            "cube0_2": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": 0,
                "z": 0,
                "textureurl": "./images/sky.jpg",
                "w": 5,
                "h": 10,
                "d": 10,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [-20, -10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            },
            "cube0_3": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": -20,
                "z": 0,
                "textureurl": "sky_jpg",
                "w": 5,
                "h": 10,
                "d": 10,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [20, 0, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            }
          }}}
    }}
}, {
  "action": {
    "t": "narrative",
    "f": "shot",
    "a": "shot-graft:{\"delta\":{\"timeline\":{\"p\":{\"repeat\":0},\"actors\":{\"i3d:cube0_2:scale\":[{\"dur\":10,\"p\":{\"x\":1,\"y\":1,\"z\":1}}],\"i3d:cube0_3:scale\":[{\"dur\":10,\"p\":{\"x\":1,\"y\":1,\"z\":1}}]}},\"branches\":{\"cube0_2\":{\"children\":{\"s0_2_0\":{\"form\":{\"type\":\"'sphere.i3d'\",\"r\":5,\"color\":\"blue\",\"transparent\":true,\"opacity\":0.8},\"transform\":{\"e\":[0,-0.785,0],\"t\":[-10,-10,0],\"s\":[0.01,0.01,0.01]},\"children\":{}},\"s0_2_1\":{\"form\":{\"type\":\"'sphere.i3d'\",\"r\":5,\"color\":\"blue\",\"transparent\":true,\"opacity\":0.8},\"transform\":{\"e\":[0,0.785,0],\"t\":[10,10,0],\"s\":[0.01,0.01,0.01]},\"children\":{}}}}}}}"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope8",
  "delta_url": "//////shot-graft:scope8",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {
          "i3d:cube0_2:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }],
          "i3d:cube0_3:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }]
        }
      },
      "branches": {"cube0_2": {"children": {
            "s0_2_0": {
              "form": {
                "type": "'sphere.i3d'",
                "r": 5,
                "color": "blue",
                "transparent": true,
                "opacity": 0.8
              },
              "transform": {
                "e": [0, -0.785, 0],
                "t": [-10, -10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            },
            "s0_2_1": {
              "form": {
                "type": "'sphere.i3d'",
                "r": 5,
                "color": "blue",
                "transparent": true,
                "opacity": 0.8
              },
              "transform": {
                "e": [0, 0.785, 0],
                "t": [10, 10, 0],
                "s": [0.01, 0.01, 0.01]
              },
              "children": {}
            }
          }}}
    }}
}, {
  "action": {
    "t": "narrative",
    "f": "shot",
    "a": "shot-graft:{\"delta\":{\"timeline\":{\"p\":{\"repeat\":0},\"actors\":{\"i3d:s0_2_0:scale\":[{\"dur\":10,\"p\":{\"x\":1,\"y\":1,\"z\":1}}],\"i3d:s0_2_1:scale\":[{\"dur\":10,\"p\":{\"x\":1,\"y\":1,\"z\":1}}]}},\"branches\":{}}}"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope9",
  "delta_url": "//////shot-graft:scope9",
  "shot": {"delta": {
      "timeline": {
        "p": {"repeat": 0},
        "actors": {
          "i3d:s0_2_0:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }],
          "i3d:s0_2_1:scale": [{
            "dur": 10,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1
            }
          }]
        }
      },
      "branches": {}
    }}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": 0.7854,
      "d": 4
    }
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope10",
  "delta_url": "//////shot-anim:scope10",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "y": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "footprint"
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-fixed:",
  "delta_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher://shot-fixed:",
  "shot": {}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": 0.7854,
      "d": 4
    }
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope12",
  "delta_url": "//////shot-anim:scope12",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "y": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyTo",
    "a": {
      "r": 0.7854,
      "d": 4
    }
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope13",
  "delta_url": "//////shot-anim:scope13",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "x": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyBy",
    "a": {
      "r": -0.7854,
      "d": 4
    }
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope14",
  "delta_url": "//////shot-anim:scope14",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "x": 0,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyBy",
    "a": {
      "r": -0.7854,
      "d": 4
    }
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope15",
  "delta_url": "//////shot-anim:scope15",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "y": 0,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "circle"
  },
  "abs_url": "/circle:/i3d-simple:simple_red/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:a0",
  "delta_url": "/circle:/i3d-simple:simple_red/i2d-scene:disks0/base-skycube:test_cube//shot-graft:a0",
  "shot": {"delta": {
      "timeline": [{
        "id": "cube0_1",
        "dur": 10,
        "p": {"scale": [1, 1, 1]},
        "delay": 2
      }],
      "branches": {"cube0": {"children": {
            "cube0_2": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": 0,
                "z": 0,
                "textureurl": "./images/sky.jpg",
                "w": 20,
                "h": 20,
                "d": 20,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [-20, -10, 0],
                "s": [0.25, 1, 0.25]
              },
              "children": {}
            },
            "cube0_3": {
              "form": {
                "type": "'cube.i3d'",
                "x": 0,
                "y": -20,
                "z": 0,
                "textureurl": "sky_jpg",
                "w": 20,
                "h": 40,
                "d": 20,
                "color": "blue",
                "transparent": true,
                "opacity": 1
              },
              "transform": {
                "t": [20, 0, 0],
                "s": [0.5, 1, 0.5]
              },
              "children": {}
            }
          }}}
    }}
}, {
  "action": {
    "t": "narrative",
    "f": "change_state",
    "a": "/circle:/i3d-simple:simple_red/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-fixed:"
  },
  "abs_url": "/circle:/i3d-simple:simple_red/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-fixed:",
  "delta_url": "///i2d-scene:mf2d0///shot-fixed:",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "stocks"
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:defsuse0/grid:/ui-msgbg:/shot-fixed:",
  "delta_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:defsuse0/grid://",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_state",
    "a": "///i2d-scene:mf2d0///"
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-fixed:",
  "delta_url": "///i2d-scene:mf2d0///",
  "shot": {}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyBy",
    "a": {
      "r": -0.7854,
      "d": 4
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope20",
  "delta_url": "//////shot-anim:scope20",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "y": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}];

//# sourceMappingURL=e2e_spec_2015-09-19-18-31-10.js.map