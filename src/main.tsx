import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx"
import ProtectedLayout from "./layouts/ProtectedLayout.tsx"
import Records from "./pages/Records.tsx"
import Setting from "./pages/Setting.tsx"
import { AuthProvider } from "./contexts/AuthProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route element={<ProtectedLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
