
import LoginForm from "./components/LoginForm"
import { RegisterForm } from "./components/RegisterForm"
import SignForm from "./components/SignForm"

function App() {
  return (
    <div>
      <SignForm />

      <RegisterForm />
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      {/* Left side with illustration */}
      <div className="md:col-span-2 bg-[#eaf0f5] flex items-center justify-center p-8">
        <img src="/grovia.png" alt="Illustration" className="max-h-[80%]" />
      </div>

      {/* Right side with form */}
      <div className="bg-white flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
    </div>
  )
}

export default App
