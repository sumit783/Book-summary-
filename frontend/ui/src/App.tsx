import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";

function About() {
  return <div className="text-xl">About Page</div>;
}

function Contact() {
  return <div className="text-xl">Contact Page</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="books/*" element={<HomePage />} /> */}
          <Route path="book/:id" element={<BookPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;