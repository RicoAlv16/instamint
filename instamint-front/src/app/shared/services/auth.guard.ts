import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const router = inject(Router)
    const authService = inject(AuthService)
    if (authService.isAuthenticated() ||next.routeConfig?.path ==='' || state.url.startsWith('/account')) {
        return true;
    } else {
        router.navigate(['/not-found-page']);
        return false;
    }
}
