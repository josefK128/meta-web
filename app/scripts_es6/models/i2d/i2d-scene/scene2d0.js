// scene2d0.js

var scene2d0 = {
          actors: {
            defsuse: {
              du0: {form: { id: "#red-square",
                            x: -10,
                            y:-10,
                            style: "stroke:blue ; stroke-width:1%"},
                    transform: "scale(0.5)"},
              du1: {form: {id: "#green-square",
                           x: -20,
                           y:-20},
                    transform: "scale(1.0)"},
            },//defsuse
            disks: {
              d0: {transform:'translate(20,20)',
                   form: {r:'10',
                          fill:'green',
                          'fill_opacity':'0.5',
                          stroke:'orange',
                          'stroke_opacity':'0.5',
                          'stroke_width':'2',
                          'stroke_dasharray':'1,1'}
              },//d0
              d1: {transform:'translate(25,25)',
                   form: {r:'5',
                          fill:'violet',
                          'fill_opacity':'0.5',
                          stroke:'yellow',
                          'stroke_opacity':'0.5',
                          'stroke_width':'1',
                          'stroke_dasharray':'1,1'}
              }//d1
            },//disks
            metaforms: {
              tree0: {form: {id: "#green-square"},
                      transform: 'scale(0.5)',
                      children: {
                        '0': { form: {id: "#red-disk"},
                               transform: 'translate(10,15)',
                               children: { 
                                 "a" : { form:{id: "#green-disk"},
                                         transform: 'translate(-20,-30)',
                                         children: { 
                                           "a1" : { form:{id: "#blue-disk"},
                                                    transform: 'translate(-10,-10)',
                                                    children: {}
                                                  }
                                         }
                                       }
                               }
                             },
                        '1': { form: {id: "#blue-disk"},
                               transform: 'translate(15,25)',
                               children: {}
                             },
                        '2': { form: {id: "#green-disk"},
                               transform: 'translate(20,35)',
                               children: {}
                             },
                        '3': { id: "#blue-disk",
                               transform: 'translate(0,0)',
                               children: {}
                             }
                     }
              }//tree0
            }//metaforms
          }//actors
};//scene2d0

