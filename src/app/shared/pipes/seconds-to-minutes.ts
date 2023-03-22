import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToMinutes'
})
export class SecondsToMinutes implements PipeTransform {

  transform(value: number): string {
    return this.convertSecondsToMinitus(value);
  }

  public convertSecondsToMinitus(seconds: number): string{
    var min:number = 0;
    var minLabel:string = "";
    var sec:number = 0;
    var secLabel:string = "";

    min = Math. trunc(seconds / 60) ;
    sec = seconds % 60;

    minLabel = this.formatTime(min);
    secLabel = this.formatTime(sec);

    return minLabel + ":" + secLabel;
  }

  private formatTime(time: number): string{
    if(time < 10){
      return "0" + time.toString();
    }
    return time.toString();
  }
}
