import { Routes, Route } from "react-router-dom"
import { Hero } from "./app_components/hero"
import { Loginpage } from "./app_components/loginpage"
import Dashboard from "./app_components/dashboard"

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

  </>)

}

export default App