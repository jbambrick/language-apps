import { Variable } from './variable';

export type VocabularyList = {
    "id": string,
    "name": string,
    "name_english": string,
    "credits": object,
    "comments": string,
    "variables": Variable<any>[]
}



