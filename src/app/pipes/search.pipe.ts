import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchValue: string, propName: string): any[] {
    let resultArray=[];
    if(value.length===0 || searchValue===''||propName===''){
     // console.log('error')
      return value;
    }
    for(let item of value){
      if((item[propName].toLowerCase()).includes((searchValue).toLowerCase())){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
