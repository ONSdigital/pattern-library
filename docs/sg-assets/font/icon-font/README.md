# Updating the font

If you wish to update the font to include different glyphs, follow the following steps:

1. Visit http://icomoon.io/app/#/select
2. Click on 'Import icons' purple button in the header, then select the selection.json file to load in icon set.
3. Make any additions you wish to make, then click the blue 'Font' button at the bottom of the page
4. Click on the download button
5. Replace selection.json with the new one
6. Replace the files in `font` with the font files in the archive.
7. Open up /ui/scss/project/_icons.scss and replace everything after the `// Individual icons` comment with the contents of the `style.css` file
