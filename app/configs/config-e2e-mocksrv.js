  // register configuration values
  var config = {
    controls: {ui: true,
               scene: true, 
               HOME: false,
               CNTR: false,
               hide2Daxes: false, 
               hide2D: false, 
               hidebase: false,
               hidefps: false,
               hide3D: false, 
               key: true,
               fill: true,
               back: true,
               csph: true
    },
    scenes: {
      metaweb: { scene: 'metaweb:',
                 i3d: "i3d-empty:",
                 i2d: "i2d-reflect:",
                 base: "empty:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      escher: {  scene: "escher:",
                 i3d: "i3d-simple:simple_red",
                 i2d: "i2d-scene:mf2d0",
                 base: "base-skycube:no_anim", // no css3d
                 //base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 ui: "ui-msgbg:",
                 shot: "shot-anim:s0"}, // GSAP
                 //shot: "shot-anim:",     // no GSAP
      circle: {  scene: "circle:",
                 i3d: "i3d-simple:simple_red",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: "shot-graft:a0"},
      ellipse: { scene: "ellipse:",
                 i3d: "i3d-simple:simple_red",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${a0json}`}, // loaded json a0json
                                           // use full string, not simple name
      a: { scene: "a:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      a0: { scene: "a0:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${growa0json}`}, // loaded json a0json
      a1: { scene: "a1:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${growa1json}`}, // loaded json a1json
                                           // use full string, not simple name
      a2: { scene: "a2:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${growa2json}`}, // loaded json a2json
                                           // use full string, not simple name
      b: { scene: "b:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      b0: { scene: "b0:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${a0json}`}, // loaded json a0json
      b1: { scene: "b1:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: `shot-graft:${a1json}`}, // loaded json a1json
                                           // use full string, not simple name
      b2: { scene: "b2:",
                 i3d: "i3d-simple:simple_green",
                 i2d: "i2d-scene:disks0",
                 base: "base-skycube:test_cube", // css3d (overrides GSAP)
                 //base: "escher:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      stocks: {  scene: "stocks:",
                 //i3d: "i3d-scene:mf2",
                 //i3d: "i3d-jsonmodels:phongballchair_kfb", // ../models2
                 //i3d: "i3d-jsonmodels:phongstatue_kfb",    // ../models2
                 i3d: "i3d-jsonmodels:phonghead_kfb",        // ./webgl/models
                 i2d: "i2d-scene:defsuse0",
                 base: "grid:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      payments: {scene: "payments:",
                 //i3d: "i3d-simple:simple_phong_kfb",
                 i3d: "i3d-simple:phong_head_sphere_kfb",
                 i2d: "i2d-empty:",
                 base: "black:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"},
      footprint:{scene: "footprint:",
                 i3d: "i3d-scene:scene1",
                 i2d: "i2d-empty:",
                 base: "escher:",
                 ui: "ui-msgbg:",
                 shot: "shot-fixed:"}
    }, 

    // models are imported from ./scripts_es6/models/**/*.js
    models: {
      scene: {}, // @later - holds refs to audio and dialogues for each scene
      base: {'videocam': {id: "videocam"},
             'base-skycube': { 'vasarely': vasarely,
                               'test_bg': test_bg,
                               'test_cube': test_cube,
                               'no_anim': no_anim},
             'base-skycube-i': { 'snow': snow,
                                 'vasarely': vasarely,
                                 'vasarely_nearpsp': vasarely_nearpsp},
             'base-skycube-descent': {'gladioluses': gladioluses,
                                      'gladioluses_warp': gladioluses_warp,
                                      'face_test': face_test},
             'base-skycube-stratos': { 'stratos': stratos },
             'base-skycube-rotate': { 'vasarely': vasarely,
                                      'action_ski': action_ski,
                                      'action_skate': action_skate,
                                      'blocks': blocks,
                                      'blocks_stream': blocks_stream,
                                      'blocks_center': blocks_center,
                                      'dome': dome,
                                      'mf': mf,
                                      'moon': moon,
                                      'red_moon': red_moon,
                                      'red_moon_bg': red_moon_bg,
                                      'sky': sky,
                                      'snow': snow,
                                      'space': space,
                                      'test_bg': test_bg},
             'base-skycube-rotatewarp': { 'vasarely': vasarely,
                                          'mf': mf,
                                          'mf_warp_img': mf_warp_img,
                                          'mf_warp_lgrad': mf_warp_lgrad,
                                          'mf_warp_rp_lgrad': mf_warp_rp_lgrad,
                                          'mf_warp_rgrad': mf_warp_rgrad,
                                          'mf_warp_rp_rgrad': mf_warp_rp_rgrad}
      },
      ui: {},
      shot: {
        'shot-graft': {
          'a0': a0,
          'a0json': a0json,
          'a1json': a1json,
          'growa0json': growa0json,
          'growa1json': growa1json,
          'growa2json': growa2json
        },
        'shot-anim': {
          's0': s0
        },
        'shot-fixed': {}
      },
      i2d: {
        'i2d-empty': {},
        'i2d-reflect': {},
        // i2d-scene:defsuse0 is template:model
        // NOTE: % is equivalent to viewport units (since viewport is 100x100)
        'i2d-scene': {
          'defsuse0': defsuse0,
          'disks0': disks0,
          // tree of defsuse models 
          'mf2d0' : mf2d0,
          'scene2d0': scene2d0
        }//i2d-scene
      },
      i3d: {
        'i3d-empty': {},
        'i3d-simple': {      // i3d_name - for template-view and model
          'simple_blue': simple_blue,
          'simple_red': simple_red,
          'simple_green': simple_green,
          'simple_green_empty': simple_green_empty,
          'simple_phong': simple_phong,
          'simple_phong1': simple_phong1,
          'simple_phong_kfb': simple_phong_kfb,
          'phong_head_sphere_kfb': phong_head_sphere_kfb,
        },//i3d-simple
        'i3d-scene': {
          'mf0': mf0,
          'mf1': mf1,
          'mf2': mf2,
          'scene0': scene0,
          'scene1': scene1
        },//i3d-scene
        'i3d-jsonmodels': {
          'phonghead_kfb': phonghead_kfb,
          'phongstatue_kfb': phongstatue_kfb,
          'phongballchair_kfb': phongballchair_kfb
        }//i3d-jsonmodels
      }// i3d
    },// models
    keyframes: {},
    opening_scene: 'metaweb', 
    canvas3d: "3D",
    Scene: Scene || {},
    initial_url: '/metaweb:/i3d-empty:/i2d-reflect:/empty:/ui-msgbg:/shot-fixed:',
    templates_url: './views/templates.html',
    svg_defs_url: './views/svg-defs.svg',
    webgl_defs_url: './views/webgl-defs.html',
    mockserver_connect: true,  // then start score by 'alt-3'
    server_connect: false,     // server logs, records stream & iactive cameras 
    server_host: 'localhost',
    http_port: 8080,
    channels_port: 8081,
    channels_in: ['actions'],
    channels_out: ['log', 'actions'],
    record_stream: false,   // re-record action sequence
    record_shots: false,   // record (overdub) interactive camera shots
    log: false,           // log action, abs_url, delta_url and scope.shot
    unit_test: true,    // test components injected into unit_spec
    e2e_test: true,   // run e2e_test using action-seq in e2e_spec script 
    unit_spec: unit_spec,  // function which runs all tests
    e2e_spec: e2e_spec    // array of action-expect cells
  };
