window.onload = function() {

    // Character Click Events
    $("#count-btn").on("click", function() {
        rpg.start("Count Chocula")
    });
    $("#frank-btn").on("click", function() {
        rpg.start("Franken Berry")
    });
    $("#brute-btn").on("click", function() {
        rpg.start("Frute Brute")
    });
    $("#boo-btn").on("click", function() {
        rpg.start("Boo Berry")
    });

    // Enemy Select Click Events
    $(document.body).on("click", "#frankenberrybtn", function() {
        activeEnemy = "Franken Berry"
        rpg.hideEnemyMenu()
        rpg.displayEnemy()
    });

    // Other Click Events
    $(document.body).on("click", "#attack-btn", function() {
        rpg.calculateDamage()
        console.log(enemies[activeEnemy].counterpower)
        console.log(currentPlayerHealth)
        console.log(currentPlayerAttack)
        console.log(currentEnemyHealth)
    });

    $(document.body).on("click", "#play-again", function() {
        location.reload()
    });

    $(document.body).on("click", "#play-on", function() {
        rpg.cleanUp()
        console.log(allenemies)
        console.log(enemies)
        rpg.start("Count Chocula")
    });

    // Set Character Stats
    $("#count-atk").html(allenemies["Count Chocula"].attackpower)
    $("#count-health").html(allenemies["Count Chocula"].healthpoints)
    $("#frank-atk").html(allenemies["Franken Berry"].attackpower)
    $("#frank-health").html(allenemies["Franken Berry"].healthpoints)
    $("#brute-atk").html(allenemies["Frute Brute"].attackpower)
    $("#brute-health").html(allenemies["Frute Brute"].healthpoints)
    $("#boo-atk").html(allenemies["Boo Berry"].attackpower)
    $("#boo-health").html(allenemies["Boo Berry"].healthpoints)
  };
    // Global Variables
    var gamestarted = false;
    var enemies = [];
    var playerCharName;
    var playerChar;
    var activeEnemy;
    var battle = false;
    var currentPlayerHealth;
    var currentEnemyHealth;
    var currentPlayerAttack;
    var attacks=0;

    var allenemies = {
        "Count Chocula" : {
            "attackpower" : 8,
            "healthpoints" : 120,
            "counterpower" : 15, 
            "pic" : "<img src='./assets/images/countchoculaatk.png'>"
        },
        "Franken Berry" : {
            "attackpower" : 7,
            "healthpoints" : 180,
            "counterpower" : 25,
            "pic" : "<img src='./assets/images/frankenberryatk.png'>"
        },
        "Frute Brute" : {
            "attackpower" : 8,
            "healthpoints" : 150,
            "counterpower" : 20,
            "pic" : "<img src='./assets/images/frutebruteatk.png'>" 
        },
        "Boo Berry" : {
            "attackpower" : 14,
            "healthpoints" : 100,
            "counterpower" : 5, 
            "pic" : "<img src='./assets/images/booberryatk.png'>"
        }
    }

    var rpg = {
        start : function (x) {
            if (x === "Count Chocula") {
                playerCharName = "Count Chocula"
                rpg.getEnemies(playerCharName)
                $("#enemy-area").html("<ul id='enemyMenu' class='choose-enemy col-3 list-group'><div class='choosetext'><h3 class='text-light blink_me'>CHOOSE AN OPPONENT</h3></div></ul>")
                for (var i = 0; i < Object.keys(enemies).length; i++) {
                    var currentEnemy = Object.keys(enemies)[i]
                    var counterattackstat = enemies[currentEnemy].counterpower
                    var healthpointsstat = enemies[currentEnemy].healthpoints
                    var currentEnemyId = currentEnemy.replace(/\s+/g, '');
                    var currentEnemyId = currentEnemyId.toLowerCase()
                    $(".choose-enemy").append("<a href='#' id='" + currentEnemyId + "btn' class='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>" + Object.keys(enemies)[i] + "<div class='stats justify-content-around'><i class='fas fa-sm fa-shield-alt ml-3'></i>" + counterattackstat + "<i class='fas fa-sm fa-lemon ml-3'></i>" + healthpointsstat + "</div></a>")
                }
            }
            if (gamestarted === false) {
            rpg.createGameUI()
            setTimeout(rpg.hideMenu,1000)
            }
            rpg.setGamestart()
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
        },
        initPlayer : function() {
            playerChar = {
                [playerCharName] : {
                    "attackpower" : enemies[playerCharName].attackpower,
                    "healthpoints" : enemies[playerCharName].healthpoints,
                    "counterpower" : enemies[playerCharName].counterpower,
                }
            }
            $("#char-name").html(Object.keys(playerChar))
            $("#char-atk").html(playerChar[playerCharName].attackpower)
            $("#char-health").html(playerChar[playerCharName].healthpoints)
        },
        hideEnemyMenu : function() {
            $('#enemyMenu').toggleClass('hidden');
        },
        displayEnemy : function() {
            $("#enemy-area").html(enemies[activeEnemy].pic)
            $("#enemy-stats").removeClass('hidden');
            $("#action-area").removeClass('hidden');
            $("#enem-name").html(activeEnemy)
            $("#enem-atk").html(enemies[activeEnemy].counterpower)
            $("#enem-health").html(enemies[activeEnemy].healthpoints)
        },
        cleanUp : function() {
            $("#char-health").html(playerChar[playerCharName].healthpoints)
            currentPlayerHealth = playerChar[playerCharName].healthpoints
            $("#enemy-area").html(" ")
            $("#enemy-stats").toggleClass('hidden');
            delete allenemies[activeEnemy];
        },
        youLose : function() {
            $("#attack-btn").removeClass('btn-danger');
            $("#attack-btn").toggleClass('btn-secondary');
            $("#fight-summary").html("You lose!<br><a href='#' id='play-again'><i class='fas fa-arrow-left'></i> Return to Character Select</a>")
            $('.disable-attack').removeAttr('id');
            $("#char-health").html(0)
            battle = false;
        },
        youWin : function() {
            $("#attack-btn").removeClass('btn-danger');
            $("#attack-btn").toggleClass('btn-secondary');
            $("#fight-summary").html("You win!!<br><a href='#' id='play-on'>Select a New Opponent <i class='fas fa-arrow-right'></i></a>")
            $('.disable-attack').removeAttr('id');
            $("#enem-health").html(0)
            battle = false;
        },
        calculateDamage : function() {
            if (currentEnemyHealth <= currentPlayerAttack) {
                currentPlayerHealth = currentPlayerHealth - enemies[activeEnemy].counterpower
                $("#char-health").html(currentPlayerHealth)
                rpg.youWin()
                return
            }
            if (currentPlayerHealth <= enemies[activeEnemy].counterpower) {
                currentEnemyHealth = currentEnemyHealth - currentPlayerAttack
                $("#enem-health").html(currentEnemyHealth)
                rpg.youLose()
                return
            }
            if(battle === false && attacks === 0) {  
            currentPlayerHealth = playerChar[playerCharName].healthpoints
            currentPlayerAttack = playerChar[playerCharName].attackpower
            currentEnemyHealth = enemies[activeEnemy].healthpoints

            $("#fight-summary").html("You attacked " + activeEnemy + " for " + currentPlayerAttack + " damage.<br>" + activeEnemy + " attacked you back for " + enemies[activeEnemy].counterpower + " damage.")
            currentPlayerHealth = currentPlayerHealth - enemies[activeEnemy].counterpower
            currentEnemyHealth = currentEnemyHealth - currentPlayerAttack
            currentPlayerAttack = currentPlayerAttack + playerChar[playerCharName].attackpower

            $("#char-health").html(currentPlayerHealth)
            $("#enem-health").html(currentEnemyHealth)
            $("#char-atk").html(currentPlayerAttack)

            battle = true;
            }
            attacks++;
            if (battle === true && attacks > 1 ) {
            $("#fight-summary").html("You attacked " + activeEnemy + " for " + currentPlayerAttack + " damage.<br>" + activeEnemy + " attacked you back for " + enemies[activeEnemy].counterpower + " damage.")
            
            currentPlayerHealth = currentPlayerHealth - enemies[activeEnemy].counterpower
            currentEnemyHealth = currentEnemyHealth - currentPlayerAttack
            currentPlayerAttack = currentPlayerAttack + playerChar[playerCharName].attackpower

            $("#char-health").html(currentPlayerHealth)
            $("#enem-health").html(currentEnemyHealth)
            $("#char-atk").html(currentPlayerAttack)

            }
        },
        getEnemies : function (x) {
            enemies = allenemies
            if(attacks === 0) {
            rpg.initPlayer()
            $("#player-area").html(enemies[playerCharName].pic)
            delete enemies[x];
            }
        }
    }
  
