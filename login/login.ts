import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { SignupPage } from '../signup/signup';
  import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, LoadingController, Platform, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
  import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  player: string;
  data: any;
  password: string;
  username: string;
  apiurl: string;
  rem:boolean;
  
  constructor(private menu:MenuController,private nativeStorage: NativeStorage, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private http: Http,public dt:DataProvider) {
  this.menu.swipeEnable(false);

  
  }

  ionViewDidEnter(){
    this.nativeStorage.getItem('sign')
  .then(
    data => {    
    this.username=data.email;
    this.password=data.password;
    console.log(data+"this is sign stored");
    }

    
  );
  }


  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  login(){

    if (this.username === '' || this.password === '') {
      let alert = this.alertCtrl.create({
        title: 'Sign In Status',
        subTitle: 'Enter empty feilds',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Signing In...",
        dismissOnPageChange:true,
        enableBackdropDismiss:true
      });
      loader.present();
      this.apiurl = 'http://hungerspal.com/Admin panels 1/Application/login.php?email=' + this.username + '&password=' + this.password;
    console.log(this.apiurl)
      this.http.get(this.apiurl).map(res => res.json())
        .subscribe(data => {

          console.log(data);
          loader.dismiss();
          this.data = data;
          var status = data.Status;
          if (status === "success") {
            this.dt.setDatabase(this.data.id)
            this.nativeStorage.setItem('userData', {   id: this.data.id,
              email: this.data.email,
              name: this.data.fullname,
              mobile: this.data.mobile })
              .then(
              (data) => console.log('Stored item!',data),
              error => console.error('Error storing item', error)
              );
if(this.rem)
{
this.nativeStorage.setItem('sign',{email:this.username,password:this.password}).then(rxx=>{
  console.log("data is save email and pass"+ rxx);
})

           
            }
            
            this.navCtrl.push(HomePage, {
              id: this.data.id,
              email: this.data.email,
              name: this.data.fullname,
              mobile: this.data.mobile,
             
            })
          }

           

          else {
            let alert = this.alertCtrl.create({
              title: 'Signin Response',
              subTitle: "Incorrect email or password",
              buttons: ['OK']
            });
            alert.present();
          }
        }, error => {
          console.log(error);

          let alert = this.alertCtrl.create({
            title: 'Signin Response',
            subTitle: "Error occur please try again",
            buttons: ['OK']
          });
          alert.present();

          loader.dismiss();

        });
    }
  }
  
  signuppage() {console.log(this.rem)
    this.navCtrl.push(SignupPage)
  }
  forgetpassword() {
    this.navCtrl.push(ForgetpasswordPage)
  }
}
