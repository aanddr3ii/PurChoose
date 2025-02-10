import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import * as TranslationsEN from '../../public/i18n/en.json';
import * as TranslationsES from '../../public/i18n/es.json';

interface Translation {
    [key: string]: string | Translation;
}

const TRANSLATIONS: Translation = {
    en: TranslationsEN,
    es: TranslationsES,
};

export class StaticTranslationLoader implements TranslateLoader {
    public getTranslation(lang: string): Observable<Translation> {
        const translation = TRANSLATIONS[lang];
        if (translation) {
            return of(translation as Translation);
        } else {
            console.error(`Unknown language: ${lang}`);
            return of({});
        }
    }
}