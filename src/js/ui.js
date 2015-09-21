/**
 * Created by William on 7/25/2015.
 */

var SimonSays = window.SimonSays || {};
SimonSays.ui = (function($){
    var ui = {
        init:function(){
        },
        hideButton: function(){
            $(".new_game").fadeOut(300);
        },
        showScore: function(){
            $("#score").fadeIn(3000);
        }

    };
    return ui;
})(jQuery);


