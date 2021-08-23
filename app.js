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

    Canvas.prototype.createRandomIntArray = function(){
        const arr = [];
        const scale = this.getAnimals().length;
        while(arr.length < scale - 1){
            let randomInt = this.createRandomInt(scale, 0);
            if(arr.indexOf(randomInt) === -1){
                if(randomInt !== 4){
                    arr.push(randomInt);
                }
            }
        }
        arr.splice(4, 0, 4);
        return arr;
    }

    Canvas.prototype.relativeDinoHumanDifference = function(dinoSize, humanSize){
        return Math.round(100 * (dinoSize - humanSize) / humanSize) + "%";
    }

    Canvas.prototype.getProperUnits = function(number){
        let units = '';
        switch(number){
            case 0:
                units = ' in weight';
                break;
            case 1:
                units = ' in height';
                break;
            case 2:
                units = ' diet';
                break;
            case 3:
                units = ' location';
                break;
            case 4:
                units = ' era';
        }
        return units;
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Canvas.prototype.compareDinoHumanQuantity = function(animal){
        const randomInt = this.createRandomInt(2, 0);
        const dinoQuant = animal.getDinoFeatures()[randomInt];
        const units = this.getProperUnits(randomInt);
        const humanQuant = this.human.getHumanFeatures()[randomInt];
        const fact = this.relativeDinoHumanDifference(dinoQuant, humanQuant)
                    + ' difference ';

        this.displayDinoFact(animal, fact, units);
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Canvas.prototype.compareDinoHumanQuality = function(animal){
        const randomInt = this.createRandomInt(3, 2);
        const dinoQuality = animal.getDinoFeatures()[randomInt];
        const humanQuality = this.human.getHumanFeatures()[randomInt];
        const units = this.getProperUnits(randomInt);
        const diff = `${dinoQuality} ${units} (differs)`;
        const same = `${humanQuality} ${units} (same)`;
        const fact = (dinoQuality.includes(humanQuality)) ? same : diff;

        this.displayDinoFact(animal, fact, '');


    Canvas.prototype.selectFactFunction = function(animal){
        const randomInt = this.createRandomInt(3, 0);
        switch(randomInt){
            case 0:
                this.givenDinoFact(animal);
                break;
            case 1:
                this.compareDinoHumanQuantity(animal);
                break;
            case 2:
                this.compareDinoHumanQuality(animal);
        }
    }

    Canvas.prototype.displayAnimalFact = function(animal){
        if(animal.species === 'Human'){
            this.displayHumanName(animal);
        } else if(animal.species === 'Pigeon'){
            this.displayPigeonFact(animal);
        } else{
            this.selectFactFunction(animal);
        }
    }

    Canvas.prototype.buildInfoGraph = function(){
        this.removeForm();
        const randomArray = this.createRandomIntArray();
        for(const randomIndex of randomArray){
            let animal = this.getAnimals()[randomIndex];
            this.createTile(animal);
            this.addImageOnTile(animal);
            this.displayAnimalFact(animal);
        }
    }

    Canvas.prototype.isDataValid = function(){
        return this.human.height > 0 && this.human.weight > 0
            && this.human.name;
    }

    const canvas = new Canvas();
    if(canvas.isDataValid()){
        document.getElementById('dino-compare').reset();
        canvas.buildInfoGraph();
    } else{
        alert("Enter valid Name, Height, or Weight");
    }

}
});
