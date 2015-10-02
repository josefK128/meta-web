"use strict";
var e2e_spec = [{
  "action": {
    "t": "camera3d",
    "f": "tiltflyTo",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope1",
  "delta_url": "//////shot-anim:scope1",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-fixed:scope2",
  "delta_url": "//////shot-fixed:scope2",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope3",
  "delta_url": "//////shot-anim:scope3",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope4",
  "delta_url": "//////shot-anim:scope4",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope5",
  "delta_url": "//////shot-anim:scope5",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope6",
  "delta_url": "//////shot-anim:scope6",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope7",
  "delta_url": "//////shot-anim:scope7",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope8",
  "delta_url": "//////shot-anim:scope8",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope9",
  "delta_url": "//////shot-anim:scope9",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope10",
  "delta_url": "//////shot-anim:scope10",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope11",
  "delta_url": "//////shot-anim:scope11",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-fixed:scope12",
  "delta_url": "//////shot-fixed:scope12",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope13",
  "delta_url": "//////shot-anim:scope13",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope14",
  "delta_url": "//////shot-anim:scope14",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope15",
  "delta_url": "//////shot-anim:scope15",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope16",
  "delta_url": "//////shot-anim:scope16",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope17",
  "delta_url": "//////shot-anim:scope17",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope18",
  "delta_url": "//////shot-anim:scope18",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope19",
  "delta_url": "//////shot-anim:scope19",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope20",
  "delta_url": "//////shot-anim:scope20",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope21",
  "delta_url": "//////shot-anim:scope21",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope22",
  "delta_url": "//////shot-anim:scope22",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope23",
  "delta_url": "//////shot-anim:scope23",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope24",
  "delta_url": "//////shot-anim:scope24",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope25",
  "delta_url": "//////shot-anim:scope25",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope26",
  "delta_url": "//////shot-anim:scope26",
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
  "abs_url": "/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-anim:scope27",
  "delta_url": "//////shot-anim:scope27",
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
    "f": "change_state",
    "a": "///i2d-scene:mf2d0///"
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/black:/ui-msgbg:/shot-fixed:",
  "delta_url": "///i2d-scene:mf2d0///",
  "shot": {}
}, {
  "action": {
    "t": "narrative",
    "f": "change_state",
    "a": "////videocam://"
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/videocam:/ui-msgbg:/shot-fixed:",
  "delta_url": "////videocam://",
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
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/videocam:/ui-msgbg:/shot-anim:scope31",
  "delta_url": "//////shot-anim:scope31",
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
    "t": "camera3d",
    "f": "tiltflyBy",
    "a": {
      "r": -0.7854,
      "d": 4
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/videocam:/ui-msgbg:/shot-anim:scope32",
  "delta_url": "//////shot-anim:scope32",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:camera:rotation": [{
            "dur": 4,
            "p": {
              "x": -0.7854,
              "immediateRender": false
            }
          }]}
      }}}
}, {
  "action": {
    "t": "narrative",
    "f": "change_state",
    "a": "////base-skycube:test_cube//"
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope32",
  "delta_url": "////base-skycube:test_cube//",
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
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope34",
  "delta_url": "//////shot-anim:scope34",
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
    "f": "zoomflyBy",
    "a": {
      "s": 0.3,
      "d": 4
    }
  },
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope35",
  "delta_url": "//////shot-anim:scope35",
  "shot": {"delta": {"timeline": {
        "p": {
          "paused": true,
          "repeat": 0
        },
        "actors": {"i3d:csphere:scale": [{
            "dur": 4,
            "p": {
              "x": 0.3,
              "y": 0.3,
              "z": 0.3,
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
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope36",
  "delta_url": "//////shot-anim:scope36",
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
  "abs_url": "/payments:/i3d-simple:phong_head_sphere_kfb/i2d-scene:mf2d0/base-skycube:test_cube/ui-msgbg:/shot-anim:scope37",
  "delta_url": "//////shot-anim:scope37",
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

//# sourceMappingURL=e2e_spec_2015-09-28-01-05-12.js.map