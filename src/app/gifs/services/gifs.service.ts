import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  public gifList: Gif[] = [];
  public isInit: boolean = true;

  private apiKey = ''; // COLOCAR AQUI TOKEN DE GIPHY
  private pageSize = '10';
  private urlPath = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;

      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
      this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;

    console.log('_tagHistory :>> ', this._tagsHistory);

    // const consumo = await fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=fxsW6vDUYRrR2F8rPRdO0Sx8Uj2SDSvd&q=goku&limit=10'
    // );
    // const json = await consumo.json();
    // console.log('data >> ', json);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.pageSize)
      .set('q', tag);

    this.http.get<SearchResponse>(this.urlPath, { params }).subscribe((res) => {
      this.gifList = res.data;
      this.isInit = false;

      if (this.gifList.length > 0) {
        this.organizeHistory(tag);
      }

      console.log({ result: this.gifList });
    });

    //.subscribe((res) => console.log('res :>> ', res));
  }
}
