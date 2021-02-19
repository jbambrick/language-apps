import { Contributor } from "./contributor";
import { MemoryCard } from "./memory-card";

export interface MemoryRound {
    "name": string,
    "cardBackImageURL": string,
    "id": string,
    "credits": Object,
    "description": string,
    "contributor": Contributor,
    "cards": MemoryCard[]
}