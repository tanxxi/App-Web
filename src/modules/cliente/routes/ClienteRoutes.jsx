import { Route } from 'react-router-dom';
import { PrivateRoute } from '../../../components/PrivateRoute'; // se va a cragar desde routes (cliente, modules, src) hacia components

import ClienteDashboard from '../pages/ClienteDashboard';

import { ROLES } from '../../../constants/roles';

export default function ClienteRoutes() {

    return (

        <Route
            element={
                <PrivateRoute
                    allowedRoles={[ROLES.CLIENTE]}
                />
            }
        >

            <Route
                path="/cliente"
                element={<ClienteDashboard />}
            />

        </Route>
    );
}
