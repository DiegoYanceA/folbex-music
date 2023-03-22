import { AlbumResponse } from "../album/album-response.model";
import { ArtistResponse } from "../artist/artist-reponse.model";

export class TrackReponse {
    id: number = 0;
    title: string = "";
    title_short: string = "";
    title_version: string = "";
    duration: number = 0;
    preview: string = "";
    artist: ArtistResponse = new ArtistResponse();
    album: AlbumResponse =  new AlbumResponse();
}