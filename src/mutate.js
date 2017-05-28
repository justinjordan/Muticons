/*! Mutate v0.1.0 - (c) Justin Jordan - www.opensource.org/licenses/MIT */

window.Mutate = new (function()
{
	var _this = this;
	
	this.test = function(state)
	{
		console.log(state);
	};
	
	this.init = function()
	{
		var elements = document.getElementsByClassName("mut");
		
		for (var x in elements)
		{	
			var el = elements[x];
			
			if (typeof el !== 'object')
				{ continue; }
			
			// Apply Quick Classes
			el.states = [];
			var classes = typeof el.className !== 'undefined' ? el.className.split(/\s+/) : [];
			for (var i in classes)
			{
				var c = classes[i];
				
				if (c.indexOf('mut-')!==-1)
				{
					el.states = c.replace('mut-','').split('--');
				}
			}
			el.state = 0;
			el.className += ' '+el.states[0];
			
			// Get button "color" to apply to shapes
			var style = window.getComputedStyle(el);
			
			// Add Shapes
			var segments = 3;
			for (var i = 0; i < segments; i++)
			{
				el.innerHTML += '<span class="mut-segment" style="background-color: '+ style.color +';"></span>';
			}
			var masks = 2;
			for (var i = 0; i < masks; i++)
			{
				var bg = style.backgroundColor;
				el.innerHTML += '<span class="mut-mask" style="background-color: '+ bg +';"></span>';
			}
			
			// Read data attributes
			var attrs = el.attributes;
			for (var i in attrs)
			{
				var attr = attrs[i];
				var v = attr.value;
				
				switch (attr.name)
				{
					case 'mut-bg':
					case 'mut-background':
						el.style.backgroundColor = v;
						var masks = el.getElementsByClassName('mut-mask');
						for (var j in masks)
						{
							if (typeof masks[j] === 'object')
								{ masks[j].style.backgroundColor = v; }
						}
					break;
					
					case 'mut-fg':
					case 'mut-foreground':
					case 'mut-color':
						var segs = el.getElementsByClassName('mut-segment');
						for (var j in segs)
						{
							if (typeof segs[j] === 'object')
								{ segs[j].style.backgroundColor = v; }
						}
					break;
					
					case 'mut-duration':
						var shapes = el.getElementsByClassName('mut-segment mut-mask');
						for (var j in shapes)
						{
							if (typeof shapes[j] === 'object')
								{ shapes[j].style.transitionDuration = v; }
						}
					break;
					
					case 'mut-size':
						el.style.width = v;
						el.style.height = v;
					break;
				}
			}
			
			// Add API
			el.transform = function(s)
			{
				var stateName	= this.states[this.state];
				var nextState	= this.state + 1;
				nextState		= nextState < this.states.length ? nextState : 0;
				var nextStateName = this.states[nextState];
				
				var newClass = this.className.replace(new RegExp('(?:^|\\s)'+ stateName + '(?:\\s|$)'), '   '+nextStateName+' ');
				newClass = newClass.trim().replace(/[\s]{2,}/g, ' ');
				
				this.className = newClass;
				this.state = nextState;
				
				// Fire Callback
				var callbackPath = this.getAttribute('mut-callback');
				callbackPath = typeof callbackPath === 'string' ? callbackPath.trim().replace(/^window\./, '').split('.') : [];
				var callback = callbackPath.length > 0 ? window : null;
				for (var i in callbackPath)
				{
					if (typeof callback[callbackPath[i]] !== 'undefined')
						{ callback = callback[callbackPath[i]]; }
				}
				if (typeof callback === 'function')
					{ callback(stateName); }
			};
			
			// Add Click Function
			el.onclick = function()
			{
				this.transform();
			};
		}
	};
});

window.onload = window.Mutate.init;