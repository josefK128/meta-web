    // auxiliary function 1
    // NOTE: this.params is current set of all absolute url components
    delta_params(p){
      console.log(`\ndelta_params(${p})`);
      var delta = {};

      for(let term of this.terms){
        //console.log("p[" + term + "] = " + p[term]);
        //console.log("this.params[" + term + "] = " + this.params[term]);
        if(p[term] === this.params[term]){
          delta[term] = "";
        }else{
          delta[term] = p[term];
        }
        console.log("delta[" + term + "] = " + delta[term]);
      }
      return(delta);
    }

    // auxiliary function 2
    // from relative url and this.params get all absolute url components
    // NOTE: this.params is current set of all absolute url components
    all_params(url){
      console.log(`\nall_params(${url})`);
      var p = {},
          urla = url.split('/'),
          index = 1;

      //p['state'] = urla[0];
      p['state'] = url.match(/^[0,1]+/);
      for(let term of this.terms){
        //console.log("urla[" + index + "] = " + urla[index]);
        //console.log("this.params[" + term + "] = " + this.params[term]);
        if(urla[index] === ""){
          p[term] = this.params[term];
        }else{
          p[term] = urla[index];
        }
        console.log("p[" + term + "] = " + p[term]);
        index += 1;
      }
      return(p);
    }

    // auxiliary function 3
    // from absolute url and this.params get relative url
    // NOTE: this.params is current set of all absolute url components
    delta_url(url){
      console.log(`\ndelta_url(${url})`);
      var delta = [],
          urla = url.split('/'),
          index = 1;

      delta[0] = urla[0];
      for(let term of this.terms){
        //console.log("urla[" + index + "] = " + urla[index]);
        //console.log("this.params[" + term + "] = " + this.params[term]);
        if((urla[index] === "") || (urla[index] === this.params[term])){
          delta[index] = "";
        }else{
          delta[index] = urla[index];
        }
        console.log("delta[" + index + "] = " + delta[index]);
        index += 1;
      }
      return(delta.join('/'));
    }

