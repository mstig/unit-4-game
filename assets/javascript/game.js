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
                characterImg.addClass("character-pic").attr("src", this.identifier).appendTo(characterSpan);
                healthSpan.addClass("health-points").append(this.healthPoints).appendTo(characterSpan);
                characterSpan.addClass("character").appendTo(".character-select");
                characterSpan.attr("id", this.identifier);
                characterSpan.attr("attackPower", this.attackPower);
                characterSpan.attr("counterAttack", this.counterAttack);
            }
        }


        //initialize each character here
        var luke = new character("Luke Skywalker", 100, 10, 10, "luke");
        var jarJar = new character("Jar Jar Binks", 75, 25, 1, "jar-jar");
        var hanSolo = new character("Han Solo", 150, 15, 3, "han-solo");
        var yoda = new character("Yoda", 50, 50, 25, "yoda");




        //variables for character selection
        var yourCharPicked = false;
        var enemyCharPicked = false;
        var enemyCharAlive = false;

        //variables used for attack phase
        //values are updated when new character is selected
        var playerAttack = $("#active-character").attr("attackPower");
        var enemyCounter = $("#active-enemy").attr("counterAttack");


        //first click selects character, second selects enemy
        //sets IDs to active character / active enemy
        $(".character-select").on("click", ".character", function () {
            $(this).attr("id", "active-character");
            $(this).appendTo(".your-character");
            yourCharPicked = true;
            playerAttack = $("#active-character").attr("attackPower");

            $(".character-select").children().each(function (node) {
                $(this).attr("id", "active-enemy");
                $(this).appendTo(".enemy-select");
            });
        });

        //next click chooses enemy and moves them to defender area
        //hide remaining characters until fight is over
        $(".enemy-select").on("click", ".character", function () {
            $(this).appendTo(".defending-character");
            enemyCharPicked = true;
            enemyCharAlive = true;
        });

        $("#attack-button").on("click", function () {
            enemyCounter = $("#active-enemy").attr("counterAttack");    
            console.log(playerAttack);
            console.log($("#active-character").attr("attackPower"));
            console.log(enemyCounter);

        });




    });

}