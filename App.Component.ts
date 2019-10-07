// import { MyordersPage } from '../pages/myorders/myorders';
// import { OrderdetailsPage } from '../pages/orderdetails/orderdetails';
// import { PickupschedulePage } from '../pages/pickupschedule/pickupschedule';
// import { SettingPage } from '../pages/setting/setting';
// import { PlaceorderPage } from '../pages/placeorder/placeorder';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
// import { PaymentPage } from '../pages/payment/payment';
// import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { OneSignal } from '@ionic-native/onesignal';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppVersion } from '@ionic-native/app-version';
import { LoginPage } from '../pages/login/login';
// import { PayoptionPage } from '../pages/payoption/payoption';
// import { Map2Page } from '../pages/map2/map2';
// import { DashboardPage } from '../pages/dashboard/dashboard';
// import { NotificationsPage } from '../pages/notifications/notifications';
// import { SignupPage } from '../pages/signup/signup';
// import { TestinggeoPage } from '../pages/testinggeo/testinggeo';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('navControl') navControl: NavController;
 
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(private appVersion: AppVersion,private loadingCtrl:LoadingController,private http:Http,private nativeStorage: NativeStorage,private oneSignal: OneSignal,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private menu : MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage  },
    
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      console.log(  this.appVersion.getAppName());
      console.log( this.appVersion.getPackageName());
      console.log( this.appVersion.getVersionCode());
      console.log(this.appVersion.getVersionNumber());
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
//   orderpage(){
//     this.navControl.push(PlaceorderPage)
//     this.menu.close()
//   }
//   paymentpage(){
//     this.navControl.push(PaymentPage)
//     this.menu.close()
//   }
//   myorderpage(){
//     this.navControl.push(MyordersPage)
//     this.menu.close()
//   }
//   settingpage(){
//     this.navControl.push(SettingPage)
//     this.menu.close()
//   }

//   changepassword(){
//     this.navControl.push(ChangepasswordPage)
//     this.menu.close();
//   }
// noti(){
//   this.navControl.push(NotificationsPage)
//   this.menu.close();
// }
  // getData(){
  //   this.nativeStorage.getItem('userData').then((data)=>{
  //     this.logoutpage(data.email)
  //   })
  //}
  logoutpage(email){
    // let loader = this.loadingCtrl.create({
    //   content: "Logging out...",
    //   dismissOnPageChange:true,
    //   enableBackdropDismiss:true
    // });
    // loader.present();
    // let apiurl= 'https://drycleaningmadezy.com/Application/login.php?email='+email 
    // console.log(apiurl)
    //   this.http.get(apiurl).map(res => res.json())
    //     .subscribe(data => {
          
         
          this.nativeStorage.setItem('userData', null)
            // .then(
            // (data) => {
              // loader.dismiss()
              this.menu.close()
            //  this.navControl.setRoot(PlaceorderPage);
            this.platform.exitApp();

              
            // },
            // error => alert(JSON.stringify(error))
            // );
     

}
  
  
}
