EARL_THE_GAME = {
    keyCodes: {LEFT_ARROW: 37, RIGHT_ARROW: 39},
    compliments: ['fun!', 'great!', 'awesome!', 'brilliant!', 'successful!', 'amazing!'],
    messageStart: 'I am ',

    initialize: function() {
        var $speechBubble = $('#speech-bubble');
        var $messageDiv = $('.message', $speechBubble);
        var $earl = $('.earl');
        var complimentsLength = EARL_THE_GAME.compliments.length;
        var success = false;
        var parkWidth = $earl.parent().css('width');
        var earlWidth = $earl.css('width');
        var earlLeftDefault = $earl.css('left');
        var rightLimit = parseInt(parkWidth, 10) - parseInt(earlWidth, 10);

        $('.control-panel').on('click', 'button', function(event){
            var action = $(this).attr('data-action');

            EARL_THE_GAME.toggleButtonDisable();

            switch (action) {
                case 'jump':
                    success = EARL_THE_GAME.makeEarlJump($earl);
                    break;
                case 'fade':
                    success = EARL_THE_GAME.makeEarlFade($earl, EARL_THE_GAME.toggleButtonDisable);
                    break;
                case 'show-bubble':
                    EARL_THE_GAME.resetEarl($earl, earlLeftDefault);
                    success = EARL_THE_GAME.showMessage($speechBubble, $messageDiv, complimentsLength,
                        EARL_THE_GAME.toggleButtonDisable);
                    break;
                default:
                    console.log('This action not available: ' + action);
                    break;
            }

            if (!success) {
                EARL_THE_GAME.toggleButtonDisable();
            }
        });

        $(document).keydown(function(event) {
            switch(event.which) {
                case EARL_THE_GAME.keyCodes.LEFT_ARROW:
                    EARL_THE_GAME.makeEarlWalkLeft($earl);
                    break;
                case EARL_THE_GAME.keyCodes.RIGHT_ARROW:
                    EARL_THE_GAME.makeEarlWalkRight($earl, rightLimit);
                    break;
                default:
                    return;
            }
            event.preventDefault();
        });
    },

    toggleButtonDisable: function() {
        var disableStatus = $('.control-panel button').prop('disabled');
        $('.control-panel button').toggleClass('disabled').prop('disabled', !disableStatus);
    },

    makeEarlJump: function($earl, callback) {
        if ($earl === undefined) {
            return false;
        } else if (callback === undefined) {
            callback = EARL_THE_GAME.toggleButtonDisable;
        }

        $earl.animate({'top': '-=100'}).delay(200).animate({'top': '+=100'}, callback);
        return true;
    },

    makeEarlFade: function($earl, callback) {
        if ($earl === undefined) {
            return false;
        } else if (callback === undefined) {
            callback = EARL_THE_GAME.toggleButtonDisable;
        }

        $earl.animate({opacity: 0}, 400).delay(200).animate({opacity: 1}, 400, callback);
        return true;
    },

    showMessage: function($speechBubble, $messageDiv, complimentsLength, callback) {
        if ($speechBubble === undefined || $messageDiv === undefined || complimentsLength === undefined) {
            return false;
        } else if (callback === undefined) {
            callback = EARL_THE_GAME.toggleButtonDisable;
        }

        var messageIndex = Math.floor((Math.random() * complimentsLength));
        var compliment = EARL_THE_GAME.compliments[messageIndex];
        $messageDiv.html(EARL_THE_GAME.messageStart + compliment);
        $speechBubble.animate({opacity: 1}, 600).delay(400).animate({opacity: 0}, 600, callback);
        return true;
    },

    makeEarlWalkLeft: function($earl) {
        if ($earl === undefined) {
            return;
        }

        var currentLeft = $earl.css('left');
        if (parseInt(currentLeft, 10) - 8 <= 0) {
            return;
        }

        $earl.animate({'left': '-=8'}, 'fast');
    },

    makeEarlWalkRight: function($earl, rightLimit) {
        if ($earl === undefined || rightLimit === undefined) {
            return;
        }

        var currentLeft = $earl.css('left');
        if (parseInt(currentLeft, 10) + 8 >= rightLimit) {
            return;
        }

        $earl.animate({'left': '+=8'}, 'fast');
    },

    resetEarl: function($earl, earlLeftDefault) {
        $earl.animate({'left': earlLeftDefault}, 'fast');
        return;
    }
};

$(document).ready(function(){
    EARL_THE_GAME.initialize();
});

