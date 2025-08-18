import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import Aura from "@primeng/themes/aura";
import { providePrimeNG } from "primeng/config";
import { routes } from "./app.routes";
import { environment } from "../environments/environment";
import { API_BASE_URL, API_KEY } from "../shared/api/api.tokens";
import { apiInterceptor } from "../shared/api/api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([apiInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    { provide: API_BASE_URL, useValue: environment.API_BASE_URL },
    { provide: API_KEY, useValue: environment.API_KEY },
  ],
};
