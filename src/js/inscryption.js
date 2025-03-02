export default class Inscryption {
    
    constructor() {
        this.success = true;
        this.deck_id = 'id';
        this.cards = [];
    }

    buildDeck() {
        this.cards = [
            this.buildCard('bee'),
            this.buildCard('beehive'),
            this.buildCard('black_goat'),
            this.buildCard('blank'),
            this.buildCard('bullfrog'),
            this.buildCard('cat'),
            this.buildCard('child_13'),
            this.buildCard('elk'),
            this.buildCard('great_white'),
            this.buildCard('grizzly'),
            this.buildCard('kingfisher'),
            this.buildCard('mantis'),
            this.buildCard('rabbit'),
            this.buildCard('rattler'),
            this.buildCard('raven'),
            this.buildCard('skunk'),
            this.buildCard('sparrow'),
            this.buildCard('squirrel'),
            this.buildCard('stoat_talking'),
            this.buildCard('wolf')

        ]
    }
    
    buildCard(name) {
        const card = new Card(name);
        return card;
    }
}

class Card {
    constructor(name) {
        this.src = `/inscryption/${name}.png`;
        this.alt = name;
    }
}