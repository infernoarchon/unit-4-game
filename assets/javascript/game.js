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
    $(document.body).on("click", "#countchoculabtn", function() {
        activeEnemy = "Count Chocula"
        currentEnemyHealth = allenemies[activeEnemy].healthpoints
        rpg.hideEnemyMenu()
        rpg.displayEnemy()
    });

    $(document.body).on("click", "#frankenberrybtn", function() {
        activeEnemy = "Franken Berry"
        currentEnemyHealth = allenemies[activeEnemy].healthpoints
        console.log("check reset of " + currentEnemyHealth)
        rpg.hideEnemyMenu()
        rpg.displayEnemy()
    });

    $(document.body).on("click", "#frutebrutebtn", function() {
        activeEnemy = "Frute Brute"
        currentEnemyHealth = allenemies[activeEnemy].healthpoints
        rpg.hideEnemyMenu()
        rpg.displayEnemy()
    });

    $(document.body).on("click", "#booberrybtn", function() {
        activeEnemy = "Boo Berry"
        currentEnemyHealth = allenemies[activeEnemy].healthpoints
        rpg.hideEnemyMenu()
        rpg.displayEnemy()
    });

    // Other Click Events
    $(document.body).on("click", "#attack-btn", function() {
        rpg.calculateDamage()
        console.log("check reset of " + currentEnemyHealth)
    });

    $(document.body).on("click", "#play-again", function() {
        location.reload()
    });

    $(document.body).on("click", "#play-on", function() {
        rpg.cleanUp()
        rpg.start(playerCharName)
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
            "attackpower" : 5,
            "healthpoints" : 90,
            "counterpower" : 8, 
            "pic" : "<img src='./assets/images/countchocula.png'>",
            "atkpic" : "<img src='./assets/images/countchoculaatk.png'>"
        },
        "Franken Berry" : {
            "attackpower" : 3,
            "healthpoints" : 120,
            "counterpower" : 4,
            "pic" : "<img src='./assets/images/frankenberry.png'>",
            "atkpic" : "<img src='./assets/images/frankenberryatk.png'>"
        },
        "Frute Brute" : {
            "attackpower" : 4,
            "healthpoints" : 100,
            "counterpower" : 7,
            "pic" : "<img src='./assets/images/frutebrute.png'>", 
            "atkpic" : "<img src='./assets/images/frutebruteatk.png'>"
        },
        "Boo Berry" : {
            "attackpower" : 6,
            "healthpoints" : 66,
            "counterpower" : 10, 
            "pic" : "<img src='./assets/images/booberry.png'>",
            "atkpic" : "<img src='./assets/images/booberryatk.png'>"
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
            if (x === "Franken Berry") {
                playerCharName = "Franken Berry"
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
            if (x === "Frute Brute") {
                playerCharName = "Frute Brute"
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
            if (x === "Boo Berry") {
                playerCharName = "Boo Berry"
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
        initActionArea : function() {
            $('.disable-attack').attr('id','attack-btn');
            $('.disable-attack').removeClass('btn-secondary');
            $('.disable-attack').toggleClass('btn-danger');
            battle = true;
        },
        displayEnemy : function() {
            if (attacks > 0) {
                rpg.initActionArea()
            }
            $("#enemy-area").html(enemies[activeEnemy].pic)
            $("#enemy-stats").removeClass('hidden');
            $("#action-area").removeClass('hidden');
            $("#enem-name").html(activeEnemy)
            $("#enem-atk").html(enemies[activeEnemy].counterpower)
            $("#enem-health").html(enemies[activeEnemy].healthpoints)
        },
        cleanUp : function() {
            $("#enemy-area").html(" ")
            $("#enemy-stats").toggleClass('hidden');
            delete allenemies[activeEnemy];
            $("#play-on").toggleClass('hidden');
        },
        youLose : function() {
            $("#attack-btn").removeClass('btn-danger');
            $("#attack-btn").toggleClass('btn-secondary');
            $("#fight-summary").html("You lose!<br><a href='#' id='play-again'><i class='fas fa-arrow-left'></i> Return to Character Select</a>")
            $('.disable-attack').removeAttr('id');
            if (currentEnemyHealth < 0) {
                $("#enem-health").html(0)
            }
            $("#char-health").html(0)
            battle = false;
        },
        youWin : function() {
            $("#attack-btn").removeClass('btn-danger');
            $("#attack-btn").toggleClass('btn-secondary');
            $('.disable-attack').removeAttr('id');
            if (currentPlayerHealth < 0) {
                $("#char-health").html(0)
            }
            $("#enem-health").html(0)
            battle = false;
            console.log(allenemies)
            if (Object.keys(allenemies).length == 1) {
                $("#fight-summary").html("Congratulations! You Beat Everyone!<br><a href='#' id='play-again'><i class='fas fa-arrow-left'></i> Return to Character Select</a>")
                return
            }
            $("#fight-summary").html("You win!!<br><a href='#' id='play-on'>Select a New Opponent <i class='fas fa-arrow-right'></i></a>")
        },
        calculateDamage : function() {
            if (currentPlayerHealth <= enemies[activeEnemy].counterpower) {
                currentEnemyHealth = currentEnemyHealth - currentPlayerAttack
                $("#enem-health").html(currentEnemyHealth)
                rpg.youLose()
                return
            }
            if (currentEnemyHealth <= currentPlayerAttack) {
                currentPlayerHealth = currentPlayerHealth - enemies[activeEnemy].counterpower
                $("#char-health").html(currentPlayerHealth)
                rpg.youWin()
                return
            }
            if(battle === false && attacks === 0) {  
                console.log("first attack")
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
                attacks++;
            }
            else {
                console.log("subsequent attack")
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
            $("#player-area").html(enemies[playerCharName].atkpic)
            delete enemies[x];
            }
        }
    }
  
