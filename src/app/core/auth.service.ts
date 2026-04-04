import { Injectable } from '@angular/core';
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
} from 'aws-amplify/auth';
import { isAuthenticated, authUser } from './auth.state';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async login(email: string, password: string) {
    await signIn({ username: email, password });
    await this.loadSession();
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return signUp({
      username: email,
      password,
      options: { userAttributes: { email, given_name: firstName, family_name: lastName } },
    });
  }

  confirm(email: string, code: string) {
    return confirmSignUp({ username: email, confirmationCode: code });
  }

  async logout() {
    await signOut();
    isAuthenticated.set(false);
    authUser.set(null);
  }

  async loadSession() {
    try {
      const session = await fetchAuthSession();
      const payload: any = session.tokens?.idToken?.payload;

      authUser.set({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
      });
      isAuthenticated.set(true);
    } catch {
      isAuthenticated.set(false);
      authUser.set(null);
    }
  }

  async googleLogin() {
    await signInWithRedirect({ provider: 'Google', options: { prompt: 'SELECT_ACCOUNT' } });
  }

  async googleSignup() {
    await signInWithRedirect({ provider: 'Google', options: { prompt: 'CONSENT' } });
  }

  async getToken() {
    const session = await fetchAuthSession();
    return session.tokens?.accessToken?.toString();
  }
}
