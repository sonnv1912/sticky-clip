import { Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/home-page';

export const App = () => {
   const routes = [
      {
         path: '/',
         component: <HomePage />,
      },
   ];

   return (
      <Routes>
         {routes.map((route) => (
            <Route
               key={route.path}
               path={route.path}
               element={route.component}
            />
         ))}

         <Route path='/portfolio' element={<Navigate to='/portfolio/me' />} />
      </Routes>
   );
};
