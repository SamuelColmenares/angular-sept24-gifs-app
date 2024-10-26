import { Component } from '@angular/core';

import { Gif } from '../../interfaces/gifs.interface';
import { GifsService } from './../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(private gifService: GifsService) {}

  public nameLower: string = 'samuel';
  public nameUpper: string = 'SAMUEL';
  public fullName: string = 'sAmUeL CoLmEnArEs';

  public date = new Date();

 get isInit(): boolean{
  return this.gifService.isInit;
 }

  get gifs(): Gif[] {
    // console.log('object :>> ', this.gifService.gifList);
    return this.gifService.gifList;
  }
}
