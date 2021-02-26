import { MemoryCard } from './memory-card';

export type MemoryRound = {
    'id': string,
    'name'?: string,
    'nameEnglish'?: string,
    'credits': object,
    'contributor': string,
    'cardbackImageURL': string,
    'cards': MemoryCard[]
}