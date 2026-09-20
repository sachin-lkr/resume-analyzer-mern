import { RouterProvider } from "react-router"
import { router } from "./appRoutes.jsx"
import { AuthProvider } from "./features/auth/authContexts.jsx"
import { InterviewProvider } from "./features/ai/interviewContext.jsx"



function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
