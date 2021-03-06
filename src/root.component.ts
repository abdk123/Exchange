import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService, SeoService } from '@core/utils';
import { AbService } from '@core/utils/ab.service';
import { NbThemeService } from '@nebular/theme';
import { withLatestFrom, filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent  implements OnInit {
    themes = ['default', 'cosmic', 'corporate', 'dark'];
    constructor(private analytics: AnalyticsService,
        private activatedRoute: ActivatedRoute,
        private abService: AbService,
        private themeService: NbThemeService,
        private seoService: SeoService) {

    this.themeService.onThemeChange()
    .subscribe((theme: any) => {
    this.analytics.trackEvent('changeTheme', theme.name);
    });

    this.activatedRoute.queryParams
    .subscribe((params: any) => {
    if (params.theme && this.themes.includes(params.theme)) {
        this.themeService.changeTheme(params.theme);
    }
    });
}

ngOnInit(): void {

const variants = [
    AbService.VARIANT_THEME_CORPORATE,
    AbService.VARIANT_THEME_DEFAULT,
    AbService.VARIANT_THEME_COSMIC,
    AbService.VARIANT_THEME_DARK,
];

this.analytics.trackPageViews();
this.abService.onAbEvent()
    .pipe(
    withLatestFrom(this.activatedRoute.queryParams),
    filter(([e, params]: [{ name: string }, any]) => !params.theme),
    )
    .subscribe(([e, params]: [{ name: string }, any]) => {
    const themeName = e.name.replace('theme-change-', '');
    if (variants.includes(e.name) && this.themes.includes(themeName)) {
        this.themeService.changeTheme(themeName);
    }
    });
this.seoService.trackCanonicalChanges();
}
}
