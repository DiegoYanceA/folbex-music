import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faSearch, faPlay } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlbumResponse } from 'src/app/core/dto/response/album/album-response.model';
import { TrackReponse } from 'src/app/core/dto/response/track/track-reponse.model';
import { Album } from 'src/app/core/models/album/album.model';
import { Artist } from 'src/app/core/models/artist/artist.model';
import { Track } from 'src/app/core/models/track/track.model';
import { AlbumService } from 'src/app/core/services/album/album.service';
import { TrackService } from 'src/app/core/services/track/track.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.sass']
})
export class RecentComponent implements OnInit , OnDestroy{
  faSearch = faSearch;
  faPlay = faPlay;

  // Datatable
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective | undefined
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  // Canciones
  public tracks: Track[] = []
  public trackCurrent:Track = new Track();

  // Albumnes
  public albums: Album[] = []

  constructor(
    private trackService:TrackService,
    private albumService:AlbumService,
  ){}

  ngOnInit(): void {

    this.dtOptions = {
      retrieve: true,
      destroy: true,
      search: { regex: true },
      pageLength: 10,
      language: {

        emptyTable: "No hay información",
        info: "",
        infoEmpty: "Mostrando 0 a 0 de 0 Entradas",

        lengthMenu: "",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        infoFiltered: ")",
        infoPostFix: "",
        thousands: ",",
        paginate: {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      },
      responsive: true,
      dom: 'Bflrtip',
      sDom: "<'row '<'col-sm-12 col-md-6  my-2'l><'col-sm-12 col-md-6 my-2 'f>><'row d-flex justify-content-end 'B<'col-sm-12 'tr>><'row py-2'<'col-sm-12 col-md-6 'i><'col-sm-12 col-md-6 div-page'<'#colvis'>p>>",
      buttons: []

    };

    this.trackService.search("adele").subscribe({
      next: (response: any) => {
        var data:TrackReponse[] = response.data;
        if(data.length < 1) return
        console.log(data)
        var track:Track;
        var artist:Artist;
        var album:Album;
        data.forEach(item => {
          track = new Track();
          track.id = item.id;
          track.title = item.title;
          track.duration = item.duration;

          if(item.artist != null) {
            var artistResponse = item.artist;
            artist = new Artist();
            artist.id = artistResponse.id;
            artist.name = artistResponse.name;

            track.artist = artist;
          }

          if(item.album != null) {
            var albumResponse = item.album;
            album = new Album();
            album.id = albumResponse.id;
            album.title = albumResponse.title;
            album.cover = albumResponse.cover;
            album.coverSmall = albumResponse.cover_small
            album.coverMedium = albumResponse.cover_medium
            album.coverBig = albumResponse.cover_big

            track.album = album;
          }

          this.tracks.push(track);
        });

        this.trackCurrent = this.tracks[0];
        this.dtTrigger.next(null);
      },
      error: (e) => console.error(e)
    })

    this.albumService.search("adele").subscribe({
      next: (response: any) => {
        var data:AlbumResponse[] = response.data;
        if(data.length < 1) return
        console.log(data)
        var album:Album;
        var artist:Artist;
        data.forEach(item => {
          album = new Album();
          album.id = item.id;
          album.title = item.title;
          album.cover = item.cover;
          album.coverSmall = item.cover_small
          album.coverMedium = item.cover_medium
          album.coverBig = item.cover_big

          if(item.artist != null) {
            var artistResponse = item.artist;
            artist = new Artist();
            artist.id = artistResponse.id;
            artist.name = artistResponse.name;

            album.artist = artist;
          }

          this.albums.push(album);
        });

      },
      error: (e) => console.error(e)
    })
  }

  // Si en caso no encuentra una imagen
  public notFoundImage(event:Event){
    (event.target as HTMLInputElement).src = 'assets/images/foxbel-music-icon.png';
  }
  
  public search(e:Event){
    console.log((e.target as HTMLInputElement).value)
  } 

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
