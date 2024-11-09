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
  public totalSells: number = 4536835.5568;
  public percent: number = 0.4856;

  public gender: 'male' | 'female' = 'male';
  public clients = ['Maria', 'Pedro','Fernando','Hernando', 'Sadid', 'Caro'];

  public clientMap = {
    '=0': 'No tenemos clientes esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'Tenemos 2 personas esperando',
    'other': 'tenemos # clientes esperando'
  }

  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  public date = new Date();

  get isInit(): boolean {
    return this.gifService.isInit;
  }

  get gifs(): Gif[] {
    // console.log('object :>> ', this.gifService.gifList);
    return this.gifService.gifList;
  }

  changeClient(): void {
    console.log('hizo click');
    this.nameLower = 'Diana';
    this.gender = 'female';
  }

  deleteClient():void{
this.clients.shift();
  }
}
