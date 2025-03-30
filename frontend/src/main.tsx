import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "boosted/dist/css/boosted.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")!).render(<App />);
