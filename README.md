# Mutate
An easy to use library for creating animated buttons, or "material" buttons as the cool kids are calling it.

## Tutorial:

To start, you must include the Mutate CSS and JS files. Next, create an element and give it the "mut" class. To assign an icon, add a second class that starts with "mut-" followed by the name of the icon. For example, if you'd like to make the classic "hamburger" mobile navigation button, use this markup:

```html
<button type="button" class="mut mut-bars"></button>
```

Well that's cool, but it doesn't really accomplish anything you couldn't have done with [Font Awesome](http://fontawesome.io/) or an image.

### Making a Mutation

Here's where it gets fun. If you'd like your mobile navigation button to mutate into an X when clicked, you simply append a new icon name ("x" in this case) onto the second class separated with "--". For example:

```html
<button type="button" class="mut mut-bars--x"></button>
```
This button will start as a mobile navigation icon, then, when clicked, it'll mutate into an X. Dead simple!

### Multiple Mutations

Not entirely sure why you'd want to do this, but that doesn't mean you shouldn't be able to. You can add as many mutations to a button as you want just by separating them by "--". Here's a ridiculous example, but it works:

```html
<button
	type="button"
	class="mut mut-bars--x--arrow-left--arrow-right--circle--circle-o--check--minus"
></button>
```

### Mutation List
|Name			|Icon			|
|---------------|---------------|
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
