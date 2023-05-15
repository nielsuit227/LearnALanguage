import { BrowserRouter, Route, Routes } from "react-router-dom";
import Practice from "./pages/Practice/Practice";
import WordLists from "./pages/WordList/WordList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WordLists />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </BrowserRouter>
  );
}
