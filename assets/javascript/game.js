function starWars() {

    $(document).ready(function () {

        //Constructor method to create each character
        function Character(name, healthPoints, attackPower, counterAttack, identifier) {
            this.name = name;
            this.healthPoints = healthPoints;
            this.attackPower = attackPower;
            this.counterAttack = counterAttack;
            this.identifier = identifier;
        }

        //initialize each character here
        var luke = new Character("Luke Skywalker", 100, 10, 10, "luke");
        var jarJar = new Character("Jar Jar Binks", 75, 25, 1, "jar-jar");
        var hanSolo = new Character("Han Solo", 150, 15, 3, "han-solo");
        var yoda = new Character("Yoda", 50, 50, 25, "yoda");

        //create divs for each character, append to character select bank
        function createCharacter(character) {
            var characterSpan = $("<span>");
            var nameSpan = $("<div>");
            var characterImg = $("<img>");
            var healthSpan = $("<div>");

            nameSpan.addClass("character-name").append(character.name).appendTo(characterSpan);
            characterImg.addClass("character-pic").attr("src", character.identifier).appendTo(characterSpan);
            healthSpan.addClass("health-points").append(character.healthPoints).appendTo(characterSpan);
            characterSpan.addClass("character").appendTo(".character-select");   
            characterSpan.attr("id", character.identifier); 
            }

        createCharacter(luke);
        createCharacter(jarJar);
        createCharacter(hanSolo);
        createCharacter(yoda);

        //variables for character selection
        var yourCharPicked = false;
        var enemyCharPicked = false;
        var enemyCharAlive = false;
 

        //first click selects character, second selects enemy
        //enemyCharAlive will be checked after attack function for hp > 0
        $(".character-select").on("click", ".character", function () {
            if(!yourCharPicked) {
            $(this).appendTo(".your-character");
            yourCharPicked = true;      
            }

            else if (!enemyCharPicked && !enemyCharAlive) {
                $(this).appendTo(".defending-character");
                enemyCharPicked = true;
                enemyCharAlive = true;
            }
        });

        //next click chooses enemy and moves them to defender area
        //hide remaining characters until fight is over

        //attack function:
        //your hp = hp - enemy counter
        //enemy hp = enemy hp - your attack
        //scaling attack power, attack = attack + X

        $("#attack-button").on("click", function() {

        });




    });

}