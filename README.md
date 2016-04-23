# Gulp-fontastic
Download your fonts from the awesome [Fontastic](https://app.fontastic.me) webapp.

[![npm](https://img.shields.io/npm/dt/gulp-fontastic.svg)](https://www.npmjs.com/package/gulp-fontastic
) [![npm](https://img.shields.io/npm/dm/gulp-fontastic.svg)](https://www.npmjs.com/package/gulp-fontastic
) [![GitHub release](https://img.shields.io/github/release/metrakit/gulp-fontastic.svg)](https://www.npmjs.com/package/gulp-fontastic)

This Gulp plugin will download your fonts from Fontastic webapp (https://app.fontastic.me) and copy in folder the fonts with a hash and the style in .css file or .scss file.

I have make this plugin because for my personnal developments I'm using the Fontastic CDN when I'm developing then I'm using the fonts in local for the production. So this plugin can get automatically the fonts thanks to your gulp workflow.

## Install

```
/npm install gulp-fontastic
```

## Usage

```js
var fontastic = require('gulp-fontastic');

gulp.task('fontastic', function() {
    fontastic({
        key: 'your-api-key',
        font_dir: 'public/fonts/',
        font_path: '/fonts/',
        style_path: 'scss/',
        font_name: 'my-font', // (optional) If you precise the font_name so your font file will not have a filename with a hash
        file_name: '_fontastic',
        scss: true
    });
});
```

## TODO

- Create fonts and style folders if they doesnt exist
