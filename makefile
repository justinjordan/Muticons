JS_FILE = dist/muticons.min.js
CSS_FILE = dist/muticons.min.css

all:
	minify src/muticons.js -o $(JS_FILE);
	lessc src/muticons.less --clean-css="--s1 --advanced --compatibility=ie8" > $(CSS_FILE);
	find src/icons/ -name '*.less' -exec lessc {} --clean-css="--s1 --advanced --compatibility=ie8" \; >> $(CSS_FILE);