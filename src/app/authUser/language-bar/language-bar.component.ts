import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './language-bar.component.html',
  styleUrl: './language-bar.component.css'
})
export class LanguageBarComponent {
  currentLang: string = 'en';
  dropdownOpen = false;

  languages = [
    { code: 'en', label: 'inglés - EN' },
    { code: 'pt', label: 'portugués - PT' },
    { code: 'es', label: 'español - ES' },
    { code: 'fr', label: 'francés - FR' }
  ];

  constructor(private translate: TranslateService, private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Configuración del idioma
      const savedLang = localStorage.getItem('selectedLanguage');
      this.currentLang = savedLang || this.translate.getBrowserLang() || 'en';
      this.translate.use(this.currentLang);
    }
  }

  toggleDropdown(state: boolean): void {
    this.dropdownOpen = state;
  }

  onLanguageSelect(lang: string): void {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      this.translate.use(lang);
      localStorage.setItem('selectedLanguage', lang);
      this.dropdownOpen = false;

      const currentUrl = this.router.url.split('?')[0];
      this.router.navigate([currentUrl], {
        queryParams: { lang },
        queryParamsHandling: 'merge'
      }).then(() => {
        window.location.reload();
      });
    }
  }
}
