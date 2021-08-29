// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener('click', function(){

    /**
    * @description Represents a canvas with eight dinosaurs and a human
    * @constructor
    */
    function Canvas(){

        /**
        * @description Get human properties from input form
        * @returns {object} Human object
        */
        this.human = (function(){
            const name = document.getElementById('name').value;
            const weight = Number(document.getElementById('weight').value);

            const feet = Number(document.getElementById('feet').value);
            const inches = Number(document.getElementById('inches').value);

            /**
            * @description Convert height in feet and inches to inches only
            * @returns {number} height in inches
            */
            const height = (function heightInInches(){
                return (12 * feet) + inches;
            })();

            const diet = document.getElementById('diet').value.toLowerCase();
            const location = document.getElementById('where').value;

            return new Human(name, weight, height, diet, location);
        })();

        /**
        * @description Create an array of eight dinosaur objects from given data
        * @returns {array} Array of eight dinosaur objects
        */
        this.dinosaurs = (function(){
            const dinoObjects = [];
            for(const dino of dinoData["Dinos"]){
                dinoObjects.push(new Dinosaur(dino.species, dino.weight,
                    dino.height, dino.diet, dino.where, dino.when, dino.fact));
            }
            return dinoObjects;
        })();
    }

    /**
    * @description Represents a dinosaur
    * @constructor
    * @param {string} name - Name of species
    * @param {number} weight - Weight of dinosaur
    * @param {number} height - Height of dinosaur
    * @param {string} diet - Diet of dinosaur
    * @param {string} where - Continent location of dinosaur
    * @param {string} when - Geologic era of dinosaur
    * @param {string} fact - a fact pertaining to this dinosaur
    */
    function Dinosaur(name, weight, height, diet, where, when, fact){
        this.species = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    /**
    * @description Represents a human
    * @constructor
    * @param {string} name - Name of human
    * @param {number} weight - Weight of Human
    * @param {number} height - Height of Human
    * @param {string} diet - Diet of Human
    * @param {string} location - Continent location of Human
    */
    function Human(name, weight, height, diet, location){
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = location;
    }

    // additional human properties
    Human.prototype.species = 'Human';
    Human.prototype.when = 'Holocene';

    /**
    * @description Get input properties of human
    * @returns {array} array of the input properties of human
    */
    Human.prototype.getHumanFeatures = function(){
        return [this.weight, this.height, this.diet, this.where, this.when];
    }

    /**
    * @description Get properties of dinosaur
    * @returns {array} Properties of dinosaur
    */
    Dinosaur.prototype.getDinoFeatures = function(){
        return [this.weight, this.height, this.diet, this.where,
             this.when, this.fact];
    }

    /**
    * @description Get all animals including human
    * @returns {array} all animal instances
    */
    Canvas.prototype.getAnimals = function(){

        // copy array of the eight dinosaur objects
        const animals = this.dinosaurs.slice();

        // add human object to this array
        animals.splice(4, 0, this.human);

        return animals; // return all animal objects in this array
    }

    /**
    * @description Generate a tile for an animal
    * @param {object} animal - A dinosaur or human object
    */
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

    /**
    * @description Remove form from screen
    */
    Canvas.prototype.removeForm = function(){
        let form = document.getElementById('dino-compare');
        form.remove();
    }

    /**
    * @description Add image to tile
    * @param {object} animal - A dinosaur or human object
    */
    Canvas.prototype.addImageOnTile = function(animal){
        const value = './images/' + animal.species.toLowerCase() + '.png';
        const image = document.getElementById(animal.species + 'img');
        image.setAttribute('src', value);
    }

    /**
    * @description Display animal name and dinosaur fact
    * @param {object} animal - A dinosaur or human object
    * @param {string} content - Fact to display (empty string for human)
    */
    Canvas.prototype.displayContent = function(animal, content){
        // animal species name
        const species = animal.species;

        // gets header associated with species
        const header = document.getElementById(species);
        if(!content){

            header.innerHTML = animal.name;
            return;
        } else{

            header.innerHTML = species;
            const paragraph = document.getElementById(species + 'fact');
            paragraph.innerHTML = content;
        }
    }

    /**
    * @description Display human name
    * @param {object} animal - human object
    */
    Canvas.prototype.displayHumanName = function(animal){
        // display content of human tile
        // empty string indicates no human fact will be displayed
        this.displayContent(animal, '');
    }

    /**
    * @description Display pigeon and corresponding fact
    * @param {object} animal - pigeon object
    */
    Canvas.prototype.displayPigeonFact = function(animal){
        this.displayContent(animal, `Fact: ${animal.fact}`);
    }

    /**
    * @description Display dinosaur and corresponding fact from given data
    * @param {object} animal - dinosaur object
    * @param {string} fact - the fact pertaining to dinosaur
    * @param {string} units - proper units associated with this fact
    */
    Canvas.prototype.displayDinoFact = function(animal, fact){
        const content = `Fact: ${fact} `;
        this.displayContent(animal, content);
    }

    // /**
    // * @description Display only given fact from dinosaur data
    // * @param {object} animal - dinosaur object
    // */
    // Canvas.prototype.givenDinoFact = function(animal){
    //     this.displayDinoFact(animal, animal.fact);
    // }

    /**
    * @description Generate random integer
    * @param {number} scale - number of integers
    * @param {number} shift - range of integers
    * @returns {number} Random integer in range [shift, shift + scale)
    */
    Canvas.prototype.createRandomInt = function(scale, shift){
        return Math.trunc(scale * Math.random()) + shift;
    }

    /**
    * @description Generate array of random integers while maintaining integer
    * four in the center of array (center reserved for human)
    * @returns {array} Array of random integers
    */
    Canvas.prototype.createRandomIntArray = function(){
        const arr = [];
        const scale = this.getAnimals().length;

        // randomly add distinct integers in the specified range into empty array
        while(arr.length < scale - 1){   // until array is full
            let randomInt = this.createRandomInt(scale, 0);

            // center index reserved for human and only distinct integers
            if(randomInt !== 4 && arr.indexOf(randomInt) === -1){
                arr.push(randomInt);  // are pushed into array
            }
        }
        // place integer four in center of array (human is in fixed position)
        arr.splice(4, 0, 4);

        return arr;
    }

    /**
    * @description selects proper units corresponding to a fact
    * @param {number} - integer from 0 to 4 selects units, otherwise unitless
    * @returns {string} - units corresponding to fact
    */
    Canvas.prototype.getProperUnits = function(number){
        let units = '';
        switch(number){
            case 0:
                units = ' lbs of weight';
                break;
            case 1:
                units = ' inches in height';
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

    /**
    * @description Comparison of user and dinosaur weight or height
    * @param {object} animal - dinosaur object (no pigeon)
    */
    Canvas.prototype.compareDinoHumanQuantity = function(animal){

        // select at random the weight or height property
        const randomInt = this.createRandomInt(2, 0);
        const dinoQuant = animal.getDinoFeatures()[randomInt];       // for dino
        const humanQuant = this.human.getHumanFeatures()[randomInt]; // for human
        const units = this.getProperUnits(randomInt);                // with units

        let fact;
        if(dinoQuant > humanQuant){
            fact = `Dinosaur's ${dinoQuant} ${units} greater than your
                ${humanQuant} ${units}`;
        } else if(dinoQuant < humanQuant){
            fact = `Dinosaur's ${dinoQuant} ${units} less than your
                ${humanQuant} ${units}`;
        } else{
            fact = `Dinosaur's ${dinoQuant} ${units} equals your
                ${humanQuant} ${units}`;
        }


        // display this comparison of dino fact relative to user input
        this.displayDinoFact(animal, fact);
    }

    /**
    * @description Comparison of user and dinosaur qualities
    * @param {object} animal - dinosaur object
    */
    Canvas.prototype.compareDinoHumanQuality = function(animal){

        // select at random a quality to compare: diet, location, or era
        const randomInt = this.createRandomInt(3, 2);
        const dinoQuality = animal.getDinoFeatures()[randomInt];        // for dino
        const humanQuality = this.human.getHumanFeatures()[randomInt];  // for human
        const units = this.getProperUnits(randomInt);                   // with units

        // fact regarding the randomly chosen quality
        const fact = `Same ${units} - ${dinoQuality.includes(humanQuality)}.
            Dino - ${dinoQuality}; You - ${humanQuality} ${units}`

        this.displayDinoFact(animal, fact);
    }

    /**
    * @description randomly selects a fact from given data or a comparison fact
    * @param {object} animal - dinosaur object (no pigeon)
    */
    Canvas.prototype.selectFactFunction = function(animal){

        // selects at random among the three sets of facts
        const randomInt = this.createRandomInt(3, 0);
        switch(randomInt){
            case 0:
                this.displayDinoFact(animal, animal.fact);  // given facts from JSON file
                break;
            case 1:
                this.compareDinoHumanQuantity(animal); // quantitative properties
                break;
            case 2:
                this.compareDinoHumanQuality(animal);  // qualitative properties
        }
    }

    /**
    * @description display fact associated with animals randomly
    * @param {object} animal - animal object including human
    */
    Canvas.prototype.displayAnimalFact = function(animal){
        // depending on the animal display corresponding fact
        if(animal.species === 'Human'){
            this.displayHumanName(animal);       // if human
        } else if(animal.species === 'Pigeon'){
            this.displayPigeonFact(animal);      // if pigeon
        } else{
            this.selectFactFunction(animal);     // if dinosaur (not a pigeon)
        }
    }

    /**
    * @description Builds infographic on dinosaurs
    */
    Canvas.prototype.buildInfoGraph = function(){

        // removes form from browser
        this.removeForm();

        // create tile, image, and display fact for each animal
        const randomArray = this.createRandomIntArray();
        for(const randomIndex of randomArray){
            // positioned randomly on canvas
            let animal = this.getAnimals()[randomIndex];

            this.createTile(animal);
            this.addImageOnTile(animal);
            this.displayAnimalFact(animal);
        }
    }

    /**
    * @description Checks validity of input data
    */
    Canvas.prototype.isDataValid = function(){
        return this.human.height > 0 && this.human.weight > 0
            && this.human.name;
    }

    //Create a canvas object
    const canvas = new Canvas();

    //Check if data input into form is valid
    if(canvas.isDataValid()){

        // depopulates form after user submission
        document.getElementById('dino-compare').reset();

        // builds infographic
        canvas.buildInfoGraph();
    } else{

        // alerts user that user input into form is invalid
        alert("Enter valid Name, Height, or Weight");
    }

});
