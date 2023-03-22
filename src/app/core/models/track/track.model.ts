import { Album } from "../album/album.model";
import { Artist } from "../artist/artist.model";

export class Track {
    id: number = 0;
    title: string = "";
    titleShort: string = "";
    preview:string = "";
    duration: number = 0;
    artist: Artist = new Artist();
    album: Album = new Album();
}