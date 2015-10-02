// mf2d0.js

var mf2d0 = {
          actors: {
            metaforms: {
              tree0: {form: {id: "#green-square"},
                      transform: 'scale(0.5)',
                      children: {
                        'd0': { form: {id: "#red-disk"},
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
                        'd1': { form: {id: "#blue-disk"},
                               transform: 'translate(15,25)',
                               children: {}
                             },
                        'd2': { form: {id: "#green-disk"},
                               transform: 'translate(20,35)',
                               children: {}
                             },
                        'd3': { form: {id: "#blue-disk"},
                               transform: 'translate(0,0)',
                               children: {}
                             }
                     }
              }//tree0
            }//metaforms
          }//actors
};//mf2d0

