import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey = 'fxsW6vDUYRrR2F8rPRdO0Sx8Uj2SDSvd';
  private pageSize = '10';
  private urlPath = 'https://api.giphy.com/v1/gifs/search';
  constructor(private http: HttpClient) {}

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
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;

    this.organizeHistory(tag);
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

    this.http
      .get(this.urlPath,{ params })
      .subscribe((res) => console.log('res :>> ', res));
  }
}
