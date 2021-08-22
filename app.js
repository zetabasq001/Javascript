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
    }

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

    // Create Human Object
    function Human(name, weight, height, diet, location){
        this.species = 'Human';
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = location;
        this.when = 'Holocene';
    }

    Human.prototype.getHumanFeatures = function(){
        return [this.weight, this.height, this.diet, this.where, this.when];
    }

    Dinosaur.prototype.getDinoFeatures = function(){
        return [this.weight, this.height, this.diet, this.where,
             this.when, this.fact];
    }

    Canvas.prototype.getAnimals = function(){
        const animals = this.dinosaurs.slice();
        animals.splice(4, 0, this.human);
        return animals;
    }

    // Generate Tiles for each Dino in Array
    Canvas.prototype.createTile = function(animal){
        const species = animal.species;
        const main = document.getElementById('grid');
        const div = document.createElement('div');
        const header = document.createElement('h3');

        if(animal.species !== 'Human'){
            const paragraph = document.createElement('p');
            paragraph.setAttribute('id', species + 'fact');
            div.appendChild(paragraph);
        }

        header.setAttribute('id', species);
        div.setAttribute('class', 'grid-item');
        div.appendChild(header);

        const image = document.createElement('img');
        image.setAttribute('id', species + 'img');
        div.appendChild(image);
        main.appendChild(div);
    }

    // Remove form from screen
    Canvas.prototype.removeForm = function(){
        let form = document.getElementById('dino-compare');
        form.remove();
    }

    // Add tiles to DOM
    Canvas.prototype.addImageOnTile = function(animal){
        const value = './images/' + animal.species.toLowerCase() + '.png';
        const image = document.getElementById(animal.species + 'img');
        image.setAttribute('src', value);
    }

    Canvas.prototype.displayContent = function(animal, content){
        const species = animal.species;
        const header = document.getElementById(species);
        if(!content){
            header.innerHTML = animal.name;
            return;
        }
        header.innerHTML = species;
        const paragraph = document.getElementById(species + 'fact');
        paragraph.innerHTML = content;
    }

    Canvas.prototype.displayHumanName = function(animal){
        this.displayContent(animal, '');
    }

    Canvas.prototype.displayPigeonFact = function(animal){
        this.displayContent(animal, `Fact: ${animal.fact}`);
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Canvas.prototype.givenDinoFact = function(animal){
        this.displayDinoFact(animal, animal.fact, '');
    }

    Canvas.prototype.displayDinoFact = function(animal, fact, units){
        const content = `Fact: ${fact} ${units}`;
        this.displayContent(animal, content);
    }

    Canvas.prototype.createRandomInt = function(scale, shift){
        return Math.trunc(scale * Math.random()) + shift;
    }


});




    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
