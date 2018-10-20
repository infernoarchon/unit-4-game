window.onload = function() {
    $("#count-btn").on("click", function() {
        rpg.start("count")
    });
  };
    // Global Variables
    var gamestarted = false
    var enemies = [];
    var playerChar;

    var rpg = {
        start : function (x) {
            rpg.setGamestart()
            if (x === "count") {
                playerChar = "count"
                enemies.push("frank","brute","boo")
                console.log(enemies)
                $("#player-area").html("<img src='./assets/images/countchoculaatk.png'>")
            }
            rpg.createGameUI()
            setTimeout(rpg.hideMenu,1000)
        },
        setGamestart : function () {
            gamestarted = true;
        },
        createGameUI : function () {
            $('.body-bg-halloween').toggleClass('body-bg-castle');
            $('.big-wrapper').toggleClass('wrapper-slideout');
            $('.game-area').removeClass('hidden');
        },
        hideMenu : function () {
            $('.wrapper').toggleClass('hidden');
            $('.navbar').toggleClass('hidden');
        }
    }
