export * from './chordsDefaultAPI.service';
import { ChordsDefaultAPIService } from './chordsDefaultAPI.service';
export * from './chordsDefaultAPI.serviceInterface';
export * from './chordsUserAPI.service';
import { ChordsUserAPIService } from './chordsUserAPI.service';
export * from './chordsUserAPI.serviceInterface';
export const APIS = [ChordsDefaultAPIService, ChordsUserAPIService];
