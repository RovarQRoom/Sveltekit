import { json } from '@sveltejs/kit';
import Admin from '../../../components/lib/firebase/admin_firebase';
import type { RequestHandler } from './$types';
import { admin_employeesHandlers } from '../../../store/Admin_Storing';

// GET /api/users
export const GET: RequestHandler = async (event) => {
  const authorization = event.request.headers.get('authorization');
  if (!authorization) {
      return json({ success: false}, {
        status: 401
    });
  }

  const token = authorization.split(' ')[1];
  
  if (!token) {
    return json({ success: false}, {
        status: 401
    });
  }
    const decodedToken = await Admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const user = await Admin.auth().getUser(uid);
    const employees = await admin_employeesHandlers.getAllEmployees();

    event.setHeaders({
        'Cache-Control': 'max-age=60',
    })

    return json({employees: employees?.employees});
};