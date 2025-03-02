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
import AddRecord from "./pages/AddRecord.tsx"
import RecordDetail from "./pages/RecordDetail.tsx"
import EditRecord from "./pages/EditRecord.tsx"
import QueryProvider from "./contexts/QueryProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route element={<ProtectedLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="records" element={<Records />} />
              <Route path="records/new" element={<AddRecord />} />
              <Route path="records/:id" element={<RecordDetail />} />
              <Route path="records/:id/edit" element={<EditRecord />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
)
