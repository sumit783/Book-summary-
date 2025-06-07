import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import About from './pages/About';
import BookDetails from './pages/BookDetails';
import PageNotFound from './components/PageNotFound';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="books" element={<Books />} />
      <Route path="book/:id" element={<BookDetails />} />
      <Route path="about" element={<About />} />
      <Route path="unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
