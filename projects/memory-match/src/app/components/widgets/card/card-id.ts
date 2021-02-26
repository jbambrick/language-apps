export class CardID {
    cardID: string;
    elementID: string;

    constructor(cardID,elementID){
        this.cardID = this.validateStringIdentifier(cardID);
        this.elementID = this.validateStringIdentifier(elementID);
    }

    private validateStringIdentifier(s: string){
        if(!s) throw new Error(`Identifier must be non-empty string.`);
        return s;
    }

}

