import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { CardState } from '../../components/widgets/card/card-state';
import { MemoryCard } from '../types/memory-card';
export class CardWithState{
    private _card: MemoryCard;

    get card() : MemoryCard{
        return this._card;
    }

    private _state: CardState;
    
    get state(): CardState{
        return this._state;
    }

    set state(newState: CardState){
        this._state = newState;
    }

    private _active: boolean;
    
    get active(): boolean{
        return this._active;
    }

    set active(a: boolean){
        if(a) console.log(`Setting card as active`);
        if(!a) console.log(` setting card as inactive`)
        this._active = a;
    }

    private _currentImageURL: string;

    get currentImageURL(): string{
        return this._currentImageURL;
    }

    set currentImageURL(u: string){
        this._currentImageURL = u;
    }

    constructor(card: MemoryCard, initialState: CardState, initialImageURL: string, active: boolean){
        this._card = card;
        this._state = initialState;
        this._currentImageURL = initialImageURL;
        this._active = active;
    }
}