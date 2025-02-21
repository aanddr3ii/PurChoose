import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-nav-belt',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './nav-belt.component.html',
  styleUrl: './nav-belt.component.css'
})
export class NavBeltComponent {
  currentLang: string = 'en';
  dropdownOpen = false;

  languages = [
    { code: 'en', label: 'inglés - EN' },
    { code: 'pt', label: 'portugués - PT' },
    { code: 'es', label: 'español - ES' },
    { code: 'fr', label: 'francés - FR' }
  ];

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: object) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      const savedLang = localStorage.getItem('selectedLanguage');
      if (savedLang) {
        this.currentLang = savedLang;
      } else {
        this.currentLang = this.translate.getBrowserLang() || 'en';
      }
      this.translate.use(this.currentLang);
    }
  }

  toggleDropdown(state: boolean): void {
    this.dropdownOpen = state;
  }

  onLanguageSelect(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('selectedLanguage', lang);
    this.dropdownOpen = false;
    location.reload(); // Refresh the page to apply language globally
  }
}
