// import {
//   ApplicationConfig,
//   importProvidersFrom,
//   provideZoneChangeDetection,
// } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),
//     importProvidersFrom([BrowserAnimationsModule]), provideAnimationsAsync(),
//   ],
// };

// export default appConfig;

import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Importa las rutas
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Configura las rutas
    provideHttpClient(), // Provee HttpClient
    importProvidersFrom([BrowserAnimationsModule]), // Importa BrowserAnimationsModule
    provideAnimationsAsync(), // Provee animaciones asíncronas
  ],
};

export default appConfig;