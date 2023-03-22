import { Artist } from "../artist/artist.model";
import { Track } from "../track/track.model"

export class Album {
    id: number = 0;
    title: string = "";
    cover:string = "";
    coverSmall: string = "";
    coverMedium: string = "";
    coverBig: string = "";
    artist: Artist = new Artist();
    tracks: Track[] = [];
}