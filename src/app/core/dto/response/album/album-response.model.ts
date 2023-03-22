import { ArtistResponse } from "../artist/artist-reponse.model";

export class AlbumResponse {
    id: number = 0;
    title: string = "";
    cover:string = "";
    cover_small: string = "";
    cover_medium: string = "";
    cover_big: string = "";
    artist: ArtistResponse = new ArtistResponse();
}