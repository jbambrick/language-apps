import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';

export class ListVariable<T> {
    name: string;
    type: string;
    data: DropdownData<T>;
    currentValue: DropdownItem<T>;
    defaultValue: DropdownItem<T>;
    constructor( dropdownData: DropdownData<T>, defaultIndex: number = 0, name: string, type: string ){
        if(name.length === 0) throw new Error(`Name must be non-empty string.`);
        this.name = name;

        if(type.length === 0) throw new Error(`Type must be non-empty string.`);
        this.type = type;

        this.data = dropdownData;

        let i: number = this.isValidIndex(defaultIndex) ? defaultIndex : 0; 
        if(!this.setDefaultValueFromIndex(i)) throw new Error(`Failed to instantiate ListVariable using defaultIndex ${defaultIndex}`);
        this.currentValue = this.defaultValue; // initialize currentValue
    }

    isValidIndex(i: number){
        console.log(`this.data.items.length = ${this.data.items.length}`);
        if(!this.data?.items) return false; // null, empty, undefined
        let isValidIndex: boolean = 0 <= i && i < this.data.items.length;
        console.log(`The index ${i} is valid: ${isValidIndex}`);
        return isValidIndex; // i in range of items
    }

    setCurrentValueFromIndex(i: number){
        if(!this.isValidIndex(i)) return false;
        this.currentValue = this.data.items[i];
    }

    setDefaultValueFromIndex(i: number){
        if(!this.isValidIndex(i)) return false;
        this.defaultValue = this.data.items[i];
        return true;
    }
}

