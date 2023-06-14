import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import Home from './pages/Home';
import CourseList from './pages/CourseList'
import Events from './pages/Events';
import TestList from './pages/TestList';
import Test from './pages/Test';
import Career from './pages/Career';
import CourseDetail from './pages/CourseDetail';
import Authentication from './pages/Authentication';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ConfirmationNotice from './pages/ConfirmationNotice';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import AdminPanel from './pages/AdminPanel';
import ProfileSettings from './pages/ProfileSettings';
import MyEducation from './pages/MyEducation';
import Lesson from './pages/Lesson';

import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCanceled from './pages/PaymentCanceled';

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
          <Route path="/courses" element={<CourseList />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tests" element={<TestList />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/career" element={<Career />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />}/>
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path='/:user_id/education/' element={<MyEducation />} />
          <Route path='/payment_success/:session_id' element={<PaymentSuccess />} />
          <Route path='/payment_canceled' element={<PaymentCanceled />} />
          <Route path='/lesson/:lesson_id/:theme_id' element={<Lesson />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;