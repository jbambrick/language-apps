import { DropdownItem } from './dropdown-item';

export type DropdownData<T> = {
    'prompt': string,
    'items': DropdownItem<T>[]
}