import { authHandlers } from '../store';
import { auth } from '../components/lib/firebase/firebase';

const clientRoutes = ['/home', '/profile', '/cart/{cartId}'];

export async function authMiddleware(){
    if(!auth.currentUser) return;
  const user = await authHandlers.getUserById(auth.currentUser.uid);
  if (user) {
    const isClient =  user.roles.includes('client');
    if (!isClient && clientRoutes.includes(window.location.pathname)) {
      return {
        status: 403,
        error: new Error('Forbidden')
      };
    }
  }
}
