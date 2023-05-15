import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Events from './pages/Events';
import KnowlegeBases from './pages/KnowlegeBases';
import Career from './pages/Career';
import CourseDetail from './pages/CourseDetail';
import Authentication from './pages/Authentication';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ConfirmationNotice from './pages/ConfirmationNotice';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path='/confirmation' element={<ConfirmationNotice />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/knowlege" element={<KnowlegeBases />} />
          <Route path="/career" element={<Career />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />}/>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;