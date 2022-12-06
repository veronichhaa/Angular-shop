import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricefilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any[], filterValue: number, propName: string): any[] {
    let resultArray=[];
    if(value.length===0 || filterValue===0||propName===''){
   //   console.log('error')
      return value;
    }
    for(let item of value){
      if(item[propName]['price']<=filterValue){
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
