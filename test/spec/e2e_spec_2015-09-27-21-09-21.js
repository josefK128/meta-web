"use strict";
var e2e_spec = [{
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope0",
  "delta_url": "//////shot-anim:scope0",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "y": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "lookAt"
  },
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-fixed:scope1",
  "delta_url": "//////shot-fixed:scope1",
  "shot": {
    "delta-t": "camera3d",
    "f": "lookAt",
    "a": {}
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope2",
  "delta_url": "//////shot-anim:scope2",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "y": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "home",
    "a": {"d": 3}
  },
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope3",
  "delta_url": "//////shot-anim:scope3",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1,
              "immediateRender": false
            }
          }],
          "i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "scale": 1,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": 0,
      "d": 3
    }
  },
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope4",
  "delta_url": "//////shot-anim:scope4",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
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
    "a": "a"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-fixed:",
  "delta_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube//shot-fixed:",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a0"
  },
  "abs_url": "/a0:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope6",
  "delta_url": "/a0://///shot-graft:scope6",
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
  "abs_url": "/a1:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope7",
  "delta_url": "/a1://///shot-graft:scope7",
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
  "abs_url": "/a2:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope8",
  "delta_url": "/a2://///shot-graft:scope8",
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
  "abs_url": "/a2:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope9",
  "delta_url": "//////shot-anim:scope9",
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
    "t": "camera3d",
    "f": "toggle_csphere",
    "a": {"val": false}
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope11",
  "delta_url": "//////shot-fixed:scope11",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_csphere",
    "a": false
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_csphere",
    "a": {"val": true}
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope12",
  "delta_url": "//////shot-fixed:scope12",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_csphere",
    "a": true
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "key",
      "val": false
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope13",
  "delta_url": "//////shot-fixed:scope13",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "key",
      "val": false
    }
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "fill",
      "val": false
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope14",
  "delta_url": "//////shot-fixed:scope14",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "fill",
      "val": false
    }
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "back",
      "val": false
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope15",
  "delta_url": "//////shot-fixed:scope15",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "back",
      "val": false
    }
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "key",
      "val": true
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope16",
  "delta_url": "//////shot-fixed:scope16",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "key",
      "val": true
    }
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "fill",
      "val": true
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope17",
  "delta_url": "//////shot-fixed:scope17",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "fill",
      "val": true
    }
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "back",
      "val": true
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-empty:/black:/ui-msgbg:/shot-fixed:scope18",
  "delta_url": "//////shot-fixed:scope18",
  "shot": {
    "delta-t": "camera3d",
    "f": "toggle_light",
    "a": {
      "name": "back",
      "val": true
    }
  }
}, {
  "action": {
    "t": "narrative",
    "f": "change_scene",
    "a": "a"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-fixed:",
  "delta_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube//shot-fixed:",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "shot",
    "a": "shot-graft:{\"delta\":{\"timeline\":{\"p\":{\"repeat\":0},\"actors\":{\"i3d:cube0:scale\":[{\"dur\":10,\"p\":{\"x\":0.5,\"y\":0.5,\"z\":0.5}}]}},\"branches\":{\"cube0\":{\"children\":{\"cube0_2\":{\"form\":{\"type\":\"'cube.i3d'\",\"x\":0,\"y\":0,\"z\":0,\"textureurl\":\"./images/sky.jpg\",\"w\":5,\"h\":10,\"d\":10,\"color\":\"blue\",\"transparent\":true,\"opacity\":1},\"transform\":{\"t\":[-20,-10,0],\"s\":[0.01,0.01,0.01]},\"children\":{}},\"cube0_3\":{\"form\":{\"type\":\"'cube.i3d'\",\"x\":0,\"y\":-20,\"z\":0,\"textureurl\":\"sky_jpg\",\"w\":5,\"h\":10,\"d\":10,\"color\":\"blue\",\"transparent\":true,\"opacity\":1},\"transform\":{\"t\":[20,0,0],\"s\":[0.01,0.01,0.01]},\"children\":{}}}}}}}"
  },
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope20",
  "delta_url": "//////shot-graft:scope20",
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
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope21",
  "delta_url": "//////shot-graft:scope21",
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
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-graft:scope22",
  "delta_url": "//////shot-graft:scope22",
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
  "abs_url": "/a:/i3d-simple:simple_green/i2d-scene:disks0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope23",
  "delta_url": "//////shot-anim:scope23",
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
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope25",
  "delta_url": "//////shot-anim:scope25",
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
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope26",
  "delta_url": "//////shot-anim:scope26",
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
    "f": "billboardsFaceCamera"
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-fixed:scope27",
  "delta_url": "//////shot-fixed:scope27",
  "shot": {
    "delta-t": "camera3d",
    "f": "billboardsFaceCamera"
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyBy",
    "a": {
      "r": -0.7854,
      "d": 4
    }
  },
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope28",
  "delta_url": "//////shot-anim:scope28",
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
  "abs_url": "/footprint:/i3d-scene:scene1/i2d-empty:/escher:/ui-msgbg:/shot-anim:scope29",
  "delta_url": "//////shot-anim:scope29",
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
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope34",
  "delta_url": "//////shot-anim:scope34",
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
}, {
  "action": {
    "t": "camera2d",
    "f": "zoomflyBy",
    "a": {
      "s": 0.9,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope35",
  "delta_url": "//////shot-anim:scope35",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "scale": 0.9,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "zoomflyTo",
    "a": {
      "s": 2,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope36",
  "delta_url": "//////shot-anim:scope36",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "scale": 2,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "zoomflyTo",
    "a": {
      "s": 0.5,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope37",
  "delta_url": "//////shot-anim:scope37",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "scale": 0.5,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope38",
  "delta_url": "//////shot-anim:scope38",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": 0,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "center",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope39",
  "delta_url": "//////shot-anim:scope39",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "home",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope40",
  "delta_url": "//////shot-anim:scope40",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "scale": 1,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "rollflyTo",
    "a": {
      "r": -90,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope41",
  "delta_url": "//////shot-anim:scope41",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": -90,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "rollflyBy",
    "a": {
      "r": 45,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope42",
  "delta_url": "//////shot-anim:scope42",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": -45,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "rollflyBy",
    "a": {
      "r": 45,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope43",
  "delta_url": "//////shot-anim:scope43",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope44",
  "delta_url": "//////shot-anim:scope44",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": 0,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "y": 20,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope45",
  "delta_url": "//////shot-anim:scope45",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": -20,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "x": 0,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope46",
  "delta_url": "//////shot-anim:scope46",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": -20,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "y": -40,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope47",
  "delta_url": "//////shot-anim:scope47",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 40,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope48",
  "delta_url": "//////shot-anim:scope48",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": 40,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera2d",
    "f": "dollyflyTo",
    "a": {
      "x": 0,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope49",
  "delta_url": "//////shot-anim:scope49",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0,
          "tweens": []
        },
        "actors": {"i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 40,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyTo",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope50",
  "delta_url": "//////shot-anim:scope50",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyTo",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope51",
  "delta_url": "//////shot-anim:scope51",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "y": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "lookAt"
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-fixed:scope52",
  "delta_url": "//////shot-fixed:scope52",
  "shot": {
    "delta-t": "camera3d",
    "f": "lookAt",
    "a": {}
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "y": 0,
      "z": 0,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope53",
  "delta_url": "//////shot-anim:scope53",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "zoomflyTo",
    "a": {
      "s": 0.5,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope54",
  "delta_url": "//////shot-anim:scope54",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 0.5,
              "y": 0.5,
              "z": 0.5,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "zoomflyTo",
    "a": {
      "s": 2,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope55",
  "delta_url": "//////shot-anim:scope55",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 2,
              "y": 2,
              "z": 2,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "y": 20,
      "z": -20,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope56",
  "delta_url": "//////shot-anim:scope56",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": 20,
              "z": -20,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "zoomflyTo",
    "a": {
      "s": 0.5,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope57",
  "delta_url": "//////shot-anim:scope57",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 0.5,
              "y": 0.5,
              "z": 0.5,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "center",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope58",
  "delta_url": "//////shot-anim:scope58",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "home",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope59",
  "delta_url": "//////shot-anim:scope59",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1,
              "immediateRender": false
            }
          }],
          "i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "scale": 1,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "panflyBy",
    "a": {
      "r": 0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope60",
  "delta_url": "//////shot-anim:scope60",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "y": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyBy",
    "a": {
      "r": 0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope61",
  "delta_url": "//////shot-anim:scope61",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "lookAt"
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-fixed:scope62",
  "delta_url": "//////shot-fixed:scope62",
  "shot": {
    "delta-t": "camera3d",
    "f": "lookAt",
    "a": {}
  }
}, {
  "action": {
    "t": "camera3d",
    "f": "rollflyTo",
    "a": {
      "r": -1.57,
      "d": 4
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope63",
  "delta_url": "//////shot-anim:scope63",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "z": -1.57,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "rollflyBy",
    "a": {
      "r": 0.3927,
      "d": 4
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope64",
  "delta_url": "//////shot-anim:scope64",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "z": -1.1773,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "rollflyBy",
    "a": {
      "r": 0.3927,
      "d": 4
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope65",
  "delta_url": "//////shot-anim:scope65",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "z": -0.7846,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "center",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope66",
  "delta_url": "//////shot-anim:scope66",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "yawflyTo",
    "a": {
      "r": 1.57,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope67",
  "delta_url": "//////shot-anim:scope67",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "y": 1.57,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "yawflyBy",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope68",
  "delta_url": "//////shot-anim:scope68",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "y": 0.7846000000000001,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "yawflyBy",
    "a": {
      "r": -0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope69",
  "delta_url": "//////shot-anim:scope69",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "y": -0.0007999999999999119,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "pitchflyTo",
    "a": {
      "r": -1.57,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope70",
  "delta_url": "//////shot-anim:scope70",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": -1.57,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "pitchflyBy",
    "a": {
      "r": 0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope71",
  "delta_url": "//////shot-anim:scope71",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": -0.7846000000000001,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "pitchflyBy",
    "a": {
      "r": 0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope72",
  "delta_url": "//////shot-anim:scope72",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0.0007999999999999119,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "dollyflyTo",
    "a": {
      "x": 20,
      "y": -20,
      "z": -30,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope73",
  "delta_url": "//////shot-anim:scope73",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 20,
              "y": -20,
              "z": -30,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "dollyflyTo",
    "a": {
      "x": 0,
      "y": 0,
      "z": 30,
      "d": 6
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope74",
  "delta_url": "//////shot-anim:scope74",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:position": [{
            "dur": 6,
            "p": {
              "x": 20,
              "y": -20,
              "z": 30,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "tiltflyBy",
    "a": {
      "r": 0.7854,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope75",
  "delta_url": "//////shot-anim:scope75",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "zoomflyTo",
    "a": {
      "s": 2,
      "d": 3
    }
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope76",
  "delta_url": "//////shot-anim:scope76",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 2,
              "y": 2,
              "z": 2,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "camera3d",
    "f": "home",
    "a": {"d": 3}
  },
  "abs_url": "/stocks:/i3d-jsonmodels:phonghead_kfb/i2d-scene:mf2d0/grid:/ui-msgbg:/shot-anim:scope77",
  "delta_url": "//////shot-anim:scope77",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {
          "i3d:camera:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:position": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i3d:csphere:scale": [{
            "dur": 3,
            "p": {
              "x": 1,
              "y": 1,
              "z": 1,
              "immediateRender": false
            }
          }],
          "i3d:csphere:rotation": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "z": 0,
              "immediateRender": false
            }
          }],
          "i2d:plane": [{
            "dur": 3,
            "p": {
              "x": 0,
              "y": 0,
              "immediateRender": false
            }
          }],
          "i2d:zoom_plane": [{
            "dur": 3,
            "p": {
              "rotation": 0,
              "scale": 1,
              "svgOrigin": "0% 0%",
              "immediateRender": false
            }
          }]
        }
      }}}
}];

//# sourceMappingURL=e2e_spec_2015-09-27-21-09-21.js.map