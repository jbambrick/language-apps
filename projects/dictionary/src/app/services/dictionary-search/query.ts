import { Parameter } from './parameter';

export type Query<T> = {
    parameters: Parameter<T>[]
}
