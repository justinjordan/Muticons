class Muticons {
  init() {
    const elements = document.getElementsByClassName("mut");

    for (let i = 0; i < elements.length; i++) {
      let el = elements[i];
      
      if (el.muticons_init) {
        continue;
      } else {
        el.muticons_init = true;
      }
      
      if (typeof el !== 'object') {
        continue;
      }
      
      // Apply Quick Classes
      el.states = [];
      let classes = typeof el.className !== 'undefined' ? el.className.split(/\s+/) : [];

      for (let i in classes) {
        let c = classes[i];
        
        if (c.indexOf('mut-')!==-1) {
          el.states = c.replace('mut-','').split('--');
        }
      }

      el.state = 0;
      el.className += ' ' + el.states[0];
      
      // Get button "color" to apply to shapes
      let style = window.getComputedStyle(el);
      
      // Add Shapes
      let segments = 3;
      for (let i = 0; i < segments; i++) {
        el.innerHTML += '<span class="mut-segment" style="background-color: '+ style.color +';"></span>';
      }

      let masks = 2;
      for (let i = 0; i < masks; i++) {
        let bg = style.backgroundColor;
        el.innerHTML += '<span class="mut-mask" style="background-color: '+ bg +';"></span>';
      }
      
      // Read data attributes
      let attrs = el.attributes;
      for (let i in attrs) {
        let attr = attrs[i];
        let v = attr.value;
        
        switch (attr.name) {
          case 'mut-bg':
          case 'mut-background':
            el.style.backgroundColor = v;
            let masks = el.getElementsByClassName('mut-mask');
            for (let j in masks) {
              if (typeof masks[j] === 'object') {
                masks[j].style.backgroundColor = v;
              }
            }
            break;
          
          case 'mut-fg':
          case 'mut-foreground':
          case 'mut-color':
            let segs = el.getElementsByClassName('mut-segment');
            for (let j in segs) {
              if (typeof segs[j] === 'object') {
                segs[j].style.backgroundColor = v;
              }
            }
            break;
          
          case 'mut-duration':
            let shapes = el.getElementsByClassName('mut-segment');
            for (let j in shapes) {
              if (typeof shapes[j] === 'object') {
                shapes[j].style.transitionDuration = v;
              }
            }

            shapes = el.getElementsByClassName('mut-mask');
            for (let j in shapes) {
              if (typeof shapes[j] === 'object') {
                shapes[j].style.transitionDuration = v;
              }
            }
            break;
          
          case 'mut-size':
            el.style.width = v;
            el.style.height = v;
            break;
        }
      }
      
      
      // Add Mutate to Element
      el.mutate = this.mutate;
      
      // Add Jquery Compatibility
      if (typeof jQuery === 'function') {
        jQuery.fn.extend({
          mutate: (s) => {
            return this.each(function() {
              this.mutate(s);
            });
          }
        });
      }
      
      // Add Click Function
      el.addEventListener("click", () => {
        this.mutate(null, el);
      });
    }
  }

  mutate(desiredState, obj) {
    let stateName, nextState, nextStateName, newClass, callbackPath, callback;
    
    stateName = obj.states[obj.state];
    
    if (desiredState) {
      // mutation specified
      switch (typeof desiredState) {
        case 'number':
          nextState		= desiredState;
          nextState		= nextState < obj.states.length ? nextState : 0;
          break;
        
        case 'string':
          let index = obj.states.indexOf(s);
          if (index >= 0) {
            nextState = index;
          } else {
            console.error(
              "Couldn't mutate to '" + desiredState + "' because it's not a mutation defined in the element."
            );
            return;
          }
          break;
      }
    } else {
      // Increment to next mutation
      nextState		= obj.state + 1;
      nextState		= nextState < obj.states.length ? nextState : 0;
    }
    
    nextStateName	= obj.states[nextState];
    newClass = obj.className.replace(new RegExp('(?:^|\\s)'+ stateName + '(?:\\s|$)'), '   '+nextStateName+' ');
    newClass = newClass.trim().replace(/[\s]{2,}/g, ' ');
    
    obj.className = newClass;
    obj.state = nextState;
    
    // Fire Callback
    callbackPath = obj.getAttribute('mut-callback');
    callbackPath = typeof callbackPath === 'string' ? callbackPath.trim().replace(/^window\./, '').split('.') : [];
    callback = callbackPath.length > 0 ? window : null;
    for (let i in callbackPath) {
      if (typeof callback[callbackPath[i]] !== 'undefined') {
        callback = callback[callbackPath[i]];
      }
    }

    if (typeof callback === 'function') {
      callback(stateName, obj);
    }
  }
}

export default Muticons;
