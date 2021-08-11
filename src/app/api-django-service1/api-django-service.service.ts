import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
// ???
@Injectable({
  providedIn: 'root'
})

export class ApiDjangoService   {
  
  apiPrefix = ""
  virtualHostName: string = "http://192.168.1.166:8000"
  networkConnected: boolean = true;
   //getUploadPhotoUrlBinary= this.virtualHostName + this.apiPrefix + "/uploadphotobinary"
  getUploadPhotoUrlBinary="http://192.168.1.166:8000/uploadphotobinary/"

  tokenSSO: String = "";
  constructor(public http: HttpClient,
    public alertCtrl: AlertController,) { }


  uploadPhoto(formData) {
    console.log(this.getUploadPhotoUrlBinary);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ this.tokenSSO);
  
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData
    };
    
    return Observable.create(observer => {
      console.log(formData);
    fetch(this.getUploadPhotoUrlBinary, requestOptions).then(response => response.json()).then(result => {
      
        observer.next(result);
        
    })
    .catch(error => {console.log('error', error);
        observer.next()});
    })
  }

  async showNoNetwork() {
    let alert = await this.alertCtrl.create({
      header: 'Sorry',
      message: 'No network detected. Please check your internet connexion',
      buttons: ['OK']
    });
   
    return await alert.present();
    
  }

}
