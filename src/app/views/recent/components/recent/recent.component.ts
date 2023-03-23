import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { faSearch, faPlay, faSpinner, faMusic, faClock, faCompactDisc, faUser } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlbumResponse } from 'src/app/core/dto/response/album/album-response.model';
import { TrackResponse } from 'src/app/core/dto/response/track/track-reponse.model';
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
export class RecentComponent implements AfterViewInit , OnDestroy{
  faSearch = faSearch;
  faPlay = faPlay;
  faSpinner = faSpinner;
  faMusic = faMusic;
  faClock = faClock;
  faCompactDisc = faCompactDisc;
  faUser = faUser;

  // Datatable
  @ViewChild(DataTableDirective, {static: false})
  public dtElement: DataTableDirective | undefined
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  // Canciones
  public tracks: Track[] = []
  public tracksCurrent:Track[] = [];
  public current:number = 0
  public loadingTrack:boolean = false;

  // Albumnes
  public albums: Album[] = []
  public loadingAlbum:boolean = false;
  public idAlbumLoading: number = 0;

  public find:string = "";

  constructor(
    private trackService:TrackService,
    private albumService:AlbumService,
  ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // this.search("adele")
    this.createTable();
  }

  public playTrack(current: number){
    this.tracksCurrent = this.tracks;
    this.current = current;
  }

  public playAlbum(album: Album){
    this.idAlbumLoading = album.id;
    var trackReponse:Track[] = [];
    this.albumService.get(this.idAlbumLoading).subscribe({
      next: (response: any) => {
        var data:TrackResponse[] = response.tracks.data;
        if(data.length < 1) return

        // Se obtiene las musicas
        data.forEach(item => {
          trackReponse.push(this.fillTrack(item));
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.idAlbumLoading = 0;
        this.tracksCurrent = trackReponse;
        this.current = 0;
      }
    })
    
  }

  // Si en caso no encuentra una imagen
  public notFoundImage(event:Event, size: number){
    var target = (event.target as HTMLInputElement);
    target.src = 'assets/images/foxbel-music-icon.png';
    target.width = size;
    target.height = size;
  }
  
  // Busca cada vez que el usuario suelte una tecla al momento de escribir
  // Por temas de rendimiento se comentara esta parte
  public searchKey(e:Event){
    // var find:string = (e.target as HTMLInputElement).value;
    // this.search(find);
  } 
  
  public search(find: string) {
    if (find == "") return;

    this.loadingTrack = true;
    this.loadingAlbum = true;

    var trackReponse:Track[] = [];
    
    this.trackService.search(find).subscribe({
      next: (response: any) => {
        var data:TrackResponse[] = response.data;
        if(data.length < 1) return

        // Se obtiene las musicas
        data.forEach(item => {
          trackReponse.push(this.fillTrack(item));
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.tracks = trackReponse;
        this.tracksCurrent = this.tracks;
        this.rerender();
        this.loadingTrack = false;
      }
    })

    this.albums = [];
    this.albumService.search(find).subscribe({
      next: (response: any) => {
        var data:AlbumResponse[] = response.data;
        if(data.length < 1) return

        var album:Album;
        var artist:Artist;

        // Se obtiene los albumes
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
      error: (e) => console.error(e),
      complete: () => {
        this.loadingAlbum = false;
      }
    })

  }

  public fillTrack(item: TrackResponse):Track {
     
    var track:Track = track = new Track();
    track.id = item.id;
    track.title = item.title;
    track.duration = item.duration;
    track.preview = item.preview;
    track.rank = item.rank;

    if(item.artist != null) {
      var artistResponse = item.artist;
      var artist:Artist = new Artist();
      artist.id = artistResponse.id;
      artist.name = artistResponse.name;

      track.artist = artist;
    }

    if(item.album != null) {
      var albumResponse = item.album;
      var album:Album = new Album();
      album.id = albumResponse.id;
      album.title = albumResponse.title;
      album.cover = albumResponse.cover;
      album.coverSmall = albumResponse.cover_small
      album.coverMedium = albumResponse.cover_medium
      album.coverBig = albumResponse.cover_big

      track.album = album;
    }

    return track;
  }

  public createTable(){
    this.dtOptions = {
      retrieve: true,
      destroy: true,
      search: { regex: true },
      pageLength: 10,
      language: {

        emptyTable: "No hay información",
        info: "",
        infoEmpty: "",

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

    this.dtTrigger.next(this.dtOptions);
  }

  public rerender(): void {
    if(this.dtElement != undefined){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.dtTrigger.next(this.dtOptions);
        dtInstance.destroy()
      });
    }
  }

  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
