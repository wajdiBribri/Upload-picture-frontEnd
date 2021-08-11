import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CameraResultType } from '@capacitor/camera';
import { ApiDjangoService } from  'src/app/api-django-service1/api-django-service.service';
const { Camera } = Plugins; 
@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.page.html',
  styleUrls: ['./upload-picture.page.scss'],
})
export class UploadPicturePage implements OnInit {

  constructor(public apiService:ApiDjangoService) { }

  ngOnInit() {
  }
  public b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
    async chooseOrTakePicture() {
    
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      //source: CameraSource.Camera
    }).catch((error)=>{
      console.log('***',error)
    })
    // variable image should contain our base64 image
    
    if (image){
      // convert base64 image to blob
      let blob = this.b64toBlob(image.base64String)
      if (this.apiService.networkConnected){
    
        //Create a form to send the file
        const formData = new FormData();
        //Generate a fake filename
        let name =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10);
        formData.append('file', blob, name+`.${image.format}`);
        formData.append('name', name);
        console.log(name)
       
        this.apiService.uploadPhoto(formData).subscribe((value)=>{

        })
    
      }
      else{
        this.apiService.showNoNetwork()
      }
      
    }
   
  } 
  
   
}


