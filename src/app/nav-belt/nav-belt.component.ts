import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-belt',
  standalone: true,
  imports: [RouterModule, TranslateModule], // Ensure RouterModule is imported
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

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
  
      // Get the current route path without query parameters
      const currentUrl = this.router.url.split('?')[0]; 
  
      // Navigate to the same page with updated language parameter
      this.router.navigate([currentUrl], {
        queryParams: { lang },
        queryParamsHandling: 'merge'
      }).then(() => {
        window.location.reload(); // Ensures full translation reload
      });
    }
  }
}