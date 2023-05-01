import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Events from './pages/Events';
import KnowlegeBases from './pages/KnowlegeBases';
import Career from './pages/Career';
import CourseDetail from './pages/CourseDetail';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="events" element={<Events />} />
        <Route path="knowlege" element={<KnowlegeBases />} />
        <Route path="career" element={<Career />} />
        <Route path="coursedetail" element={<CourseDetail />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
};

export default App;