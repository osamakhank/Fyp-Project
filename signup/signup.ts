import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
 

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  apiurl: string;
  confirmpassword: string='';
  password: string='';
  email: string='';
  firstname: string='';
  mobile: number=0;
rem:boolean=false
  constructor(private http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  loginpage() {
    this.navCtrl.push(LoginPage)
  }
  signUp(){ 
if(this.rem==true){
    if (this.mobile === 0 || this.firstname === '' || this.email === '' || this.password === '' || this.confirmpassword === '') {
      let alert = this.alertCtrl.create({
        title: 'Sign Up Status',
        subTitle: 'Enter required fields',
        buttons: ['Dismiss']
      });
      alert.present();
    }
else{
    if (this.password != this.confirmpassword) {
      let alert = this.alertCtrl.create({
        title: 'Sign Up Status',
        subTitle: 'Password did not match',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
    this.apiurl = "http://hungerspal.com/Admin panels 1/Application/signup.php?firstname=" + this.firstname +'&mobile='+this.mobile+
      '&email=' + this.email + '&password=' + this.password;
    let loader = this.loadingCtrl.create({
      content: "Signing Up..."
    });
    loader.present();

    this.http.get(this.apiurl).map(res => res.json())
      .subscribe(data => {

        console.log(data);
        loader.dismiss();
        var status = data.Status;

        if (status === 'exist') {

          let alert = this.alertCtrl.create({
            title: 'Signup Response',
            subTitle: 'User Already Exist',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(LoginPage);
        }
        else {
        
          let alert = this.alertCtrl.create({
            title: 'Signup Successful',
            buttons: ['OK']
          });
          alert.present();  
          this.navCtrl.setRoot(HomePage)
          this.firstname = '';
          this.mobile = 0;
          this.email = "";
          this.password = "";
          this.confirmpassword = '';
        }
      }, error => {
        console.log(error);

        let alert = this.alertCtrl.create({
          title: 'Signup Response',
          subTitle: "Error occur please try again",
          buttons: ['OK']
        });
        alert.present();

        loader.dismiss();

      });
  }
}
}
else{

  let alert = this.alertCtrl.create({
    title: 'Terms And Condition',
    subTitle: "Kindly accept terms and conditions",
    buttons: ['OK']
  });
  alert.present();
}
  }
  
}
