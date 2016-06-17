( function(){

    $( function () {
        new Test($( '.test' ));

    } );

    var Test = function( obj ){

        //private properties
        var _self = this,
            _obj = obj,
            _paramsList = obj.find( '.params ul' ),
            _paramsCount = 0,
            _url = obj.find( '.url' ),
            _radio = obj.find( 'input[type="radio"]' ),
            _paramsAddBtn = obj.find( '.params__add' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addParametr = function () {
                _paramsCount++;

                _paramsList.append('<li>\
                                        <label for="param'+ _paramsCount +'">Name</label>\
                                        <input type="text" id="param'+ _paramsCount +'" required>\
                                        <label for="value'+ _paramsCount +'">Value</label>\
                                        <input type="text" id="value'+ _paramsCount +'" required>\
                                        <button class="params__remove">Remove</button>\
                                    </li>');
            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){

                _paramsAddBtn.on( {
                    click: function () {
                        _addParametr();
                        return false;
                    }
                } );
                _paramsList.on( 'click', '.params__remove', function(){
                    $( this ).parents( 'li' ).remove();
                    return false;
                } );

                _obj.on( {
                    submit: function () {
                        _sendRequest();
                        return false;
                    }
                } );
            },
            _sendRequest = function () {
                var params = '',
                    paramsList = _paramsList.find( 'li' ),
                    method = _radio.filter(':checked').val();

                paramsList.each( function () {
                    var inputs = $( this ).find( 'input' );

                    params+= ('&' + inputs.eq(0).val() + '=' + inputs.eq(1).val() );
                } );

                params = params.substr(1);

                _request = $.ajax({
                    url: _url.val(),
                    // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    dataType: 'json',
                    data: params,
                    timeout: 20000,
                    type: method,
                    success: function ( data ) {
                        console.log( data );
                    },
                    error: function (XMLHttpRequest) {
                        console.log( XMLHttpRequest );
                    }
                });

            };

        //public properties

        //public methods


        _init();
    };

} )();