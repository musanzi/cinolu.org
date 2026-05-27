import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateLoader, TranslateModule, TranslationObject } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';

class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    try {
      const filePath = join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
      return of(JSON.parse(readFileSync(filePath, 'utf8')));
    } catch {
      return of({});
    }
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'fr',
        loader: { provide: TranslateLoader, useClass: ServerTranslateLoader }
      })
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
