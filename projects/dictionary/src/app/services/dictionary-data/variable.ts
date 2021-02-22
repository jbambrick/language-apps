import { AliasedValue } from './aliased-value';

export type Variable<T> = {
    "name": string,
    "type": string,
    "validValues": AliasedValue<T>[]
}