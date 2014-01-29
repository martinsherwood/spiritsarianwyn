//Top slider
//****************************************************************************
$(function(indexSlides) {
	$(".slides").responsiveSlides( {
		auto: true,             // Boolean: Animate automatically, true or false
		speed: 1000,            // Integer: Speed of the transition, in milliseconds
		timeout: 6000,          // Integer: Time between slide transitions, in milliseconds
		pager: false,           // Boolean: Show pager, true or false
		nav: true,              // Boolean: Show navigation, true or false
		random: false,          // Boolean: Randomize the order of the slides, true or false
		pause: false,           // Boolean: Pause on hover, true or false
		pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		prevText: "<",   		// String: Text for the "previous" button
		nextText: ">",       	// String: Text for the "next" button
		maxwidth: "1100",       // Integer: Max-width of the slideshow, in pixels
		navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls: "",     // Selector: Declare custom pager navigation
		namespace: "slides",    // String: Change the default namespace used
		before: function(){},   // Function: Before callback
		after: function(){}     // Function: After callback
	});
});

//Quote rotator
//****************************************************************************
;( function( $, window, undefined ) {
 
    "use strict";
 
    //global
    var Modernizr = window.Modernizr;
 
    $.quoteRotate = function(options, element) {
        this.$el = $(element);
        this._init(options);
    };
 
    //setting
    $.quoteRotate.defaults = {
        //transition speed in ms
        speed : 700,
        //transition easing
        easing : "ease",
        //interval
        interval : 8000
    };
 
    $.quoteRotate.prototype = {
        _init : function( options ) {
            this.options = $.extend( true, {}, $.quoteRotate.defaults, options );
            this._config(); //cache some elements and initialize some variables
            this.$items.eq( this.current ).addClass("quote-current"); //show current item
            if (this.support) { //set the transition to the items
                this._setTransition();
            }
            //start
            this._startRotator();
        },
        _config : function() {
            this.$items = this.$el.children("div.quote-content");
            this.itemsCount = this.$items.length;
            this.current = 0; //current item´s index
            this.support = Modernizr.csstransitions; //test for transitions
            //add the progress bar
            if( this.support ) {
                this.$progress = $( "<span class=\"quote-progress\"></span>" ).appendTo( this.$el );
            }
        },
        _setTransition : function() {
            setTimeout( $.proxy( function() {
                this.$items.css("transition", "opacity" + this.options.speed + "ms" + this.options.easing );
            }, this ), 25 );
        },
        _startRotator: function() {
            if( this.support ) {
                this._startProgress();
            }
 
            setTimeout( $.proxy( function() {
                if( this.support ) {
                    this._resetProgress();
                }
                this._next();
                this._startRotator();
            }, this ), this.options.interval );
 
        },
        _next : function() {
            this.$items.eq( this.current ).removeClass("quote-current"); //hide previous item
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0; //update current value
            this.$items.eq( this.current ).addClass("quote-current"); //show next
        },
        _startProgress : function() {
             
            setTimeout( $.proxy( function() {
                this.$progress.css( { transition : "width " + this.options.interval + "ms linear", width : "100%" } );
            }, this ), 25 );
 
        },
        _resetProgress : function() {
            this.$progress.css( { transition : "none", width : "0%" } );
        },
        destroy : function() {
            if (this.support) {
                this.$items.css("transition", "none");
                this.$progress.remove();
            }
            this.$items.removeClass( "quote-current" ).css( {
                "position" : "relative",
                "z-index" : 100,
                "pointer-events" : "auto",
                "opacity" : 1
            } );
        }
    };
 
    var logError = function( message ) {
        if ( window.console ) {
            window.console.error( message );
        }
    };
 
    $.fn.quoteRotate = function( options ) {
        if ( typeof options === 'string' ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            this.each(function() {
                var instance = $.data( this, 'quoteRotate' );
                if ( !instance ) {
                    logError( "cannot call methods on quoteRotate prior to initialization; " +
                    "attempted to call method '" + options + "'" );
                    return;
                }
                if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                    logError( "no such method '" + options + "' for quoteRotate instance" );
                    return;
                }
                instance[ options ].apply( instance, args );
            });
        } 
        else {
            this.each(function() {  
                var instance = $.data( this, "quoteRotate" );
                if ( instance ) {
                    instance._init();
                }
                else {
                    instance = $.data( this, "quoteRotate", new $.quoteRotate( options, this ) );
                }
            });
        }
        return this;
    };
 
} )( jQuery, window );

$(function(startRotation) {
	$(".quotes-rotate").quoteRotate();
});

