window.onload = function() {
    $("#count-btn").on("click", rpg.start);
  };
    // Global Variables
    var gamestarted = false

    var rpg = {
        start : function () {
            rpg.setGamestart()
            setTimeout(rpg.hideMenu,1000)
            rpg.createGameUI()
        },
        setGamestart : function () {
            gamestarted = true;
        },
        createGameUI : function () {
            $('.body-bg-halloween').toggleClass('body-bg-castle');
            $('.footer').toggleClass('footer-table');
            $('.wrapper').toggleClass('wrapper-slideout');
        },
        hideMenu : function () {
            $('.wrapper').toggleClass('hidden');
            $('.navbar').toggleClass('hidden');
        }

    }
