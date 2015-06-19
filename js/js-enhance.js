//progressive enhancement (jQuery)

jQuery(window).load(function() {
    jsEnhance();

    function jsEnhance() {
        $('.js-enhance--show').show();
        $('.js-enhance--hide').hide();
        $('.nojs-hidden').removeClass('nojs-hidden');

        jsEnhanceULNavToSelectNav();

        setTimeout(function() { 
            $('#loading-overlay').fadeOut(300);
        }, 500);

    }

    function jsEnhanceULNavToSelectNav() {
        $('.js-enhance--ul-to-select').each(function() {
            var labeltext = $('p:first', this).text();
            var selectoptions = $('ul:first li a', this);

            var label = $('<label>', {
                class: 'definition-emphasis',
                text: labeltext
            }); 

            //$(document.createElement('select')) is faster
            var newselect = $('<select>', {
                class: 'field field--spaced'
            }); 

            newselect.append($('<option>', { 
                    value: '',
                    text : 'Select a relates time series'
                }));

            newselect.change(function() {
                var location = $(this).find('option:selected').val();
                if (location){
                    window.location = location;
                }
            });

            $.each(selectoptions, function (i, item) {
                newselect.append($('<option>', { 
                    value: $(this).attr('href'),
                    text : $(this).text()
                }));
            });

            label.append(newselect);

            $(this).html(label);

        });
    }

    function jsEnhanceHome() {}
});
