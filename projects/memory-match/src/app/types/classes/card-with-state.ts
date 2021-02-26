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

    constructor(card: MemoryCard, initialState: CardState){
        this._card = card;
        this._state = initialState;
    }
}