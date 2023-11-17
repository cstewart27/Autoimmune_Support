import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { Capacitor} from '@capacitor/core'

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC1blMgP_-DoipxarHbGCFnYzCh0tgLbVQ",
      authDomain: "autoimmune-support.firebaseapp.com",
      projectId: "autoimmune-support",
      storageBucket: "autoimmune-support.appspot.com",
      messagingSenderId: "1013087395839",
      appId: "1:1013087395839:web:b9f096f6ae8b43e23051ca",
      measurementId: "G-04WDH9E12L"
    }))),
    importProvidersFrom(
      provideAuth(() => {
        if(Capacitor.isNativePlatform()){
          return initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence,
          });
        } else{
          return getAuth(); 
        }
      })
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),

  ],
});
