    // Create Dino Constructor
    // Create Dino Objects
    this.dinosaurs = (function(){
        const dinoObjects = [];
        for(const dino of dinoData["Dinos"]){
            dinoObjects.push(new Dinosaur(dino.species, dino.weight,
                dino.height, dino.diet, dino.where, dino.when, dino.fact));
        }
        return dinoObjects;
    })();

    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
