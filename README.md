# Muticons
An easy to use library for creating animated buttons, or "material" buttons as the cool kids are calling it.


## Usage:

To start, you must include the Muticons CSS and JS files. Next, create an element and give it the `mut` class. To assign an icon, add a second class that starts with `mut-` followed by the name of the icon. For example, if you'd like to make the classic "hamburger" mobile navigation button, use this markup:

```html
<button type="button" class="mut mut-bars"></button>
```

Well that's cool, but it doesn't really accomplish anything you couldn't have done with [Font Awesome](http://fontawesome.io/) or an image.


### Making a Mutation

Here's where it gets fun. If you'd like your mobile navigation button to mutate into an X when clicked, you simply append a new icon name ("x" in this case) onto the second class separated with `--`. For example:

```html
<button type="button" class="mut mut-bars--x"></button>
```

This button will start as a mobile navigation icon, then, when clicked, it'll mutate into an X. Dead simple!


### Multiple Mutations

Not entirely sure why you'd want to do something like this next example, but that doesn't mean you shouldn't be able to. You can add as many mutations to a button as you want just by separating them by `--`. Here's a ridiculous example, but it works:

```html
<button
	type="button"
	class="mut mut-bars--x--arrow-left--arrow-right--circle--circle-o--check--minus"
></button>
```

As you may have guessed, this button will cycle through all the different mutations until it reached the end, then it will change back into the bars icon. Try it out just for funsies!


### Javascript Integration

There's no reason you can't use onclick to handle click events, but you might want to know what state your button is in when it's clicked. If that's the case, you can assign a callback function to your button by using the `mut-callback` attribute like so:

```html
<button
	type="button"
	class="mut mut-bars--x"
	mut-callback="myAppObject.myCallbackFunction"
></button>
```

```javascript
window.myAppObject = {
	myCallbackFunction: function(mutation)
	{
		switch (mutation)
		{
			case 'bars':
			
				// open menu
				
			break;
			
			case 'x':
			
				// close menu
				
			break;
		}
	}
};
```


### Styling

There's a couple ways to change the button's colors. You can use the custom attributes `mut-bg` and `mut-fg` like this:

```html
<button
	type="button"
	class="mut mut-circle-o--check"
	mut-bg="#0cf"
	mut-fg="#0f0"
></button>
```

Or you can just use CSS like this:

```html
<button
	type="button"
	id="mybutton"
	class="mut mut-circle-o--check"
	style="background-color: #0cf; color: #0f0;"
></button>
```

**Notes:**
* If you need to change the foreground color after page load, you'll have to set the `background-color` of the `.mut-segment` elements within your button.
* Some of the mutations, such as `circle-o`, can't have a transparent background because they use masking elements to make their shapes.


## Mutation List
|Mutation Name	|Icon			|
|:-------------:|:-------------:|
|bars			|![bars]		|
|check			|![check]		|
|x				|![x]			|
|minus			|![minus]		|
|arrow-right	|![arrow-right]	|
|arrow-left		|![arrow-left]	|
|circle			|![circle]		|
|circle-o		|![circle-o]	|
|square (stop)	|![square]		|
|play			|![play]		|
|pause			|![pause]		|

[bars]: images/bars.png
[check]: images/check.png
[x]: images/x.png
[minus]: images/minus.png
[arrow-right]: images/arrow-right.png
[arrow-left]: images/arrow-left.png
[circle]: images/circle.png
[circle-o]: images/circle-o.png
[square]: images/square.png
[play]: images/play.png
[pause]: images/pause.png


## Muticons Attributes
|Attribute Name	|Description								|Example									|
|---------------|-------------------------------------------|-------------------------------------------|
|mut-fg			|Foreground color.							|`mut-fg="#0f0"`							|
|mut-bg			|Background color.							|`mut-bg="#0cf"`							|
|mut-size		|Button size. (square)						|`mut-size="20px"`							|
|mut-duration	|Animation duration.						|`mut-duration="0.5s"`						|
|mut-callback	|Assign a function to be called on click.	|`mut-callback="myApp.myCallbackFunction"`	|

















