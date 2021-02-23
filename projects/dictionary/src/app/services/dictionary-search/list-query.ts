import { Parameter } from './parameter';

export type ListQuery<T> = {
    'parameters': Parameter<T>[]
}
