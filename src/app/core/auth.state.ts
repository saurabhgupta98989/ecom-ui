import { signal } from '@angular/core';

export const isAuthenticated = signal(false);
export const authUser = signal<any | null>(null);

