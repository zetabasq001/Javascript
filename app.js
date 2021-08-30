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
    * @description Generate a tile for an animal: includes div, header,
    * paragraph (only for dinosaur), and image tag
    * @param {object} animal - A dinosaur or human object
    */
    Canvas.prototype.createTile = function(animal){
        // get species of animal
        const species = animal.species;
        // get the main tag
        const main = document.getElementById('grid');

        // and create 2 tag elements div and h3
        const div = document.createElement('div');
        const header = document.createElement('h3');

        // if animal is not human, then create a p tag for the fact-content
        if(animal.species !== 'Human'){
            // create p tag
            const paragraph = document.createElement('p');
            // id the p tag
            paragraph.setAttribute('id', species + 'fact');
            // append to div
            div.appendChild(paragraph);
        }
        // id the header with species name
        header.setAttribute('id', species);
        // all div tags have a class grid-item
        div.setAttribute('class', 'grid-item');
        // appeand header to div
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
        // get the form tag and remove it from DOM
        let form = document.getElementById('dino-compare');
        form.remove();
    }

    /**
    * @description Add image to tile
    * @param {object} animal - A dinosaur or human object
    */
    Canvas.prototype.addImageOnTile = function(animal){
        // get the image file
        const value = './images/' + animal.species.toLowerCase() + '.png';
        // get the specific img tag
        const image = document.getElementById(animal.species + 'img');
        // and set the attribute src to image file
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

        // get header tag associated with species
        const header = document.getElementById(species);
        if(!content){
            // human has no content other than its name
            header.innerHTML = animal.name;
        } else{
            // otherwise header name of dino
            header.innerHTML = species;

            // get paragraph tag associated with the dinosaur
            const paragraph = document.getElementById(species + 'fact');
            // and display its factual content in a paragraph tag
            paragraph.innerHTML = content;
        }
    }

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
                units = ' lbs';
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
    * @description Comparison of user and dinosaur quantities: weight or height
    * @param {object} animal - dinosaur object (no pigeon)
    */
    Canvas.prototype.compareDinoHumanQuantity = function(animal){

        // select at random the dino weight or height to compare to user
        const randomInt = this.createRandomInt(2, 0);
        // the dino weight or height selected
        const dinoQuant = animal.getDinoFeatures()[randomInt];
        // the corresponding user weight or height
        const humanQuant = this.human.getHumanFeatures()[randomInt];
        // and the corresponding units
        const units = this.getProperUnits(randomInt);

        let fact;
        // the quantitative fact about dino and user
        if(dinoQuant !== humanQuant){
            // if not equal in weight or height
            fact = `Dino - ${dinoQuant} ${units}; However, you are ${humanQuant}
             ${units}`;
        } else{
            // if equal in weight or height
            fact = `Dino - ${dinoQuant} ${units}. You are ${humanQuant} ${units}
             too`;
        }

        // display this comparison of dino fact relative to user input
        this.displayContent(animal, fact);
    }

    /**
    * @description Comparison of user and dinosaur qualities: diet, location, or
    * era
    * @param {object} animal - dinosaur object (no pigeon)
    */
    Canvas.prototype.compareDinoHumanQuality = function(animal){

        // select at random a quality to compare to user: diet, location, or era
        const randomInt = this.createRandomInt(3, 2);
        // the dino quality selected
        const dinoQuality = animal.getDinoFeatures()[randomInt];
        // the corresponding human quality of user
        const humanQuality = this.human.getHumanFeatures()[randomInt];
        // corresponding units
        const units = this.getProperUnits(randomInt);

        // the qualitative fact about dino and user
        const fact = `Dino - ${dinoQuality}. You - ${humanQuality} ${units}`

        this.displayContent(animal, fact);
    }

    /**
    * @description randomly selects from 3 categories of facts: given facts from
    * JSON file, quantitative facts, or qualitative facts
    * @param {object} animal - dinosaur object (no pigeon)
    */
    Canvas.prototype.selectFactFunction = function(animal){

        // selects any category of facts
        const randomInt = this.createRandomInt(3, 0);
        switch(randomInt){
            case 0:
                // given facts from JSON file
                this.displayContent(animal, animal.fact);
                break;
            case 1:
                // facts about height or weight
                this.compareDinoHumanQuantity(animal);
                break;
            case 2:
                // facts about diet, location, or era
                this.compareDinoHumanQuality(animal);
        }
    }

    /**
    * @description display a human, pigeon or dinosaur fact
    * @param {object} animal - animal object including human
    */
    Canvas.prototype.displayAnimalFact = function(animal){
        // depending on the animal display a corresponding fact or no fact
        if(animal.species === 'Human'){
            // if a human, then there is no fact
            this.displayContent(animal, '');
        } else if(animal.species === 'Pigeon'){
            // if a pigeon, then display the one given fact
            this.displayContent(animal, animal.fact);
        } else{
            // if a dinosaur (and not a pigeon), then display any fact
            this.selectFactFunction(animal);
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
