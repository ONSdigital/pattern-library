addLoadingOverlay();

function addLoadingOverlay() {
    var body = document.getElementsByTagName('body')[0];
    var overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style['width'] = '100%';
    overlay.style['height'] = '100%';
    overlay.style['position'] = 'fixed';
    overlay.style['display'] = 'table';
    overlay.style['top'] = '0';
    overlay.style['bottom'] = '0';
    overlay.style['left'] = '0';
    overlay.style['right'] = '0';
    overlay.style['background'] = '#ffffff';
    overlay.style['z-index'] = '99999';
    overlay.style['right'] = '0';

    var loader = document.createElement('div');
    loader.innerHTML = "<p>Loading...</p>",
    loader.className = 'loader'


    // overlayhtml = '<div style="width:100%;height:100%;position:fixed;top:0;bottom:0;left:0;right:0;background:red;z-index:99999"></div>';

    // overlay.innerHTML = overlayhtml;
    overlay.appendChild(loader);
    body.appendChild(overlay);
}
