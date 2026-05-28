import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateLoader, TranslateModule, TranslationObject } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { Observable, of } from 'rxjs';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const serverBundleDir = dirname(fileURLToPath(import.meta.url));
const browserAssetsDir = join(serverBundleDir, '../browser/assets/i18n');
const sourceAssetsDir = join(process.cwd(), 'apps', 'client', 'src', 'assets', 'i18n');

class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    const candidates = [join(browserAssetsDir, `${lang}.json`), join(sourceAssetsDir, `${lang}.json`)];

    for (const filePath of candidates) {
      if (existsSync(filePath)) {
        return of(JSON.parse(readFileSync(filePath, 'utf8')));
      }
    }

    return of({});
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
