import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTexto'
})
export class SliceTextoPipe implements PipeTransform {

  transform(value: string, cut: number): string {
    if(value.length < cut + 1){
      return value;
    }
    return value.slice(0, cut) + "...";
  }

}
