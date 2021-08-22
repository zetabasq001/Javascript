// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener('click', function(){
    function Canvas(){
        // Use IIFE to get human data from form
        this.human = (function(){
            const name = document.getElementById('name').value;
            const weight = Number(document.getElementById('weight').value);

            const feet = Number(document.getElementById('feet').value);
            const inches = Number(document.getElementById('inches').value);

            const height = (function heightInInches(){
                return (12 * feet) + inches;
            })();

            const diet = document.getElementById('diet').value.toLowerCase();
            const location = document.getElementById('where').value;

            return new Human(name, weight, height, diet, location);
        })();
        
        // Create Dino Objects
        this.dinosaurs = (function(){
            const dinoObjects = [];
            for(const dino of dinoData["Dinos"]){
                dinoObjects.push(new Dinosaur(dino.species, dino.weight,
                    dino.height, dino.diet, dino.where, dino.when, dino.fact));
            }
            return dinoObjects;
        })();

        // Create Dino Constructor
        function Dinosaur(name, weight, height, diet, where, when, fact){
            this.species = name;
            this.weight = weight;
            this.height = height;
            this.diet = diet;
            this.where = where;
            this.when = when;
            this.fact = fact;
        }
    }
});

    // Create Human Object


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen
