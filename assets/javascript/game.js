function starWars() {

    $(document).ready(function () {

        class character {
            //Constructor method to create each character
            constructor(name, healthPoints, attackPower, counterAttack, identifier) {
                this.name = name;
                this.healthPoints = healthPoints;
                this.attackPower = attackPower;
                this.attackIncrease = attackPower;
                this.counterAttack = counterAttack;
                this.identifier = identifier;
                this.createCharacter();      
            }

            //create html elements for characters
            //pass attack and counter attributes for attack calculations
            createCharacter() {
                var characterSpan = $("<span>");
                var nameSpan = $("<div>");
                var characterImg = $("<img>");             
                var healthSpan = $("<div>");
                nameSpan.addClass("character-name").append(this.name).appendTo(characterSpan);
                characterImg.addClass("character-pic").attr("src", ("assets/images/"+this.identifier+".png")).appendTo(characterSpan);
                healthSpan.addClass("health-points").append(this.healthPoints).appendTo(characterSpan);
                characterSpan.addClass("character").appendTo(".character-select");
                characterSpan.attr("id", this.identifier);
                characterSpan.attr("attackPower", this.attackPower);
                characterSpan.attr("counterAttack", this.counterAttack);
                totalCharacters++;
            }
        }

        //used to track enemies defeated to monitor win condition
        // +1 every createCharacter() call
        var totalCharacters = 0;

        //initialize each character here
        var luke = new character("Luke Skywalker", 100, 8, 10, "luke");
        var jarJar = new character("Jar Jar Binks", 75, 12, 2, "jar-jar");
        var hanSolo = new character("Han Solo", 150, 7, 5, "han-solo");
        var yoda = new character("Yoda", 50, 20, 25, "yoda");

        //variables for character selection to regulate selection clicks
        var yourCharAlive = false;
        var enemyCharAlive = false;

        //used to scale attack power, +1 every attack in attack button function
        var totalAttacks = 0;

        //grab divs to display text during combat
        var attackMessage = $("#attack-message");
        var counterMessage = $("#counter-message");
        var combatMessage = $("#combat-message");
        var newGameButton = $("#newgame-button");

        //grab variables from player and enemy divs
        //values are updated within attack method to update when new enemy is selected
        var playerAttack;
        var enemyCounter;
        var playerHealth;
        var enemyHealth;
        var enemyName;

        function updateAttackInfo() {
            playerAttack = parseInt($("#active-character").attr("attackPower"));
            enemyCounter = parseInt($("#active-enemy").attr("counterAttack"));
            playerHealth = $("#active-character .health-points");
            enemyHealth = $("#active-enemy .health-points");
            enemyName = $("#active-enemy .character-name").text();
        }

        //hides any lingering elements at start of game
        $("#active-character").hide();
        $("#active-character").remove();
        newGameButton.hide();


        //erase all prior combat text
        //called once on game start and after every enemy selection
        function clearCombatText() {
            attackMessage.empty();
            counterMessage.empty();
            combatMessage.empty();
        }
        clearCombatText();

        //first click selects character, second selects enemy
        //sets IDs to active character / active enemy
        $(".character-select").on("click", ".character", function () {
            $(this).attr("id", "active-character");
            $(this).appendTo(".your-character");
            yourCharAlive = true;
            playerAttack = $("#active-character").attr("attackPower");

            $(".character-select").children().each(function (node) {
                $(this).appendTo(".enemy-select");
            });
        });

        //next click chooses enemy and moves them to defender area
        //hide remaining characters until fight is over
        $(".enemy-select").on("click", ".character", function () {
            if (!enemyCharAlive && yourCharAlive) {
                $(this).appendTo(".defender");
                $(this).attr("id", "active-enemy");
                enemyCharAlive = true;
                clearCombatText();
                updateAttackInfo();
            }
        });

        $("#attack-button").on("click", function () {
            //check for active enemy before attempting any attack calculations
            if (enemyCharAlive && yourCharAlive) {
                updateAttackInfo();

                //calculate scaling attack for dmg increase
                var scalingAttack = playerAttack + (playerAttack * totalAttacks);

                //player hp = hp minus counter attack
                playerHealth.text((parseInt(playerHealth.text() - enemyCounter)));

                //enemy hp = hp minus (attack + attack*counter [for scaling])
                enemyHealth.text((parseInt(enemyHealth.text()) - scalingAttack));

                //attack counter +1 to scale up damage
                totalAttacks++;

                //add text for player damaged enemy for X, player-attacks div
                attackMessage.text("You attacked " + enemyName + " for " + scalingAttack + " damage!");

                //add text for enemy countered player for X, enemy-attacks div
                counterMessage.text(enemyName + " counter attacked you for " + enemyCounter + " damage!");

                if (enemyHealth.text() <= 0) {
                    $("#active-enemy").remove();
                    enemyCharAlive = false;
                    totalCharacters--;

                    //add text to combat-message div for character defeat & choose new enemy
                    combatMessage.text("You defeated " + enemyName + "! Select a new character to battle!");

                    if (totalCharacters === 1) {
                        combatMessage.text("Congratulations, you have defeated all your foes! Would you like to play again?");
                        newGameButton.show();
                        newGameButton.on("click", function () {
                            location.reload();
                        });
                    }
                }

                if (playerHealth.text() <= 0) {
                    yourCharAlive = false;
                    combatMessage.text("You have been defeated by " + enemyName + "!  Would you like to play again?");
                    //add new game button below
                    newGameButton.show();
                    newGameButton.on("click", function () {
                        location.reload();
                    });
                }
            }

        });
    });
}