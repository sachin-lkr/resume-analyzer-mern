import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

   if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#E2E8F0] border-t-[#6366F1] border-r-[#8B5CF6]"></div>
    </main>
  );
}

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-xl shadow-[#6366F1]/10">

                <h1 className="mb-2 text-center text-3xl font-bold text-[#0F172A]">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-sm text-[#64748B]">
                    Create your account to get started
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-semibold text-[#0F172A]"
                        >
                            Username
                        </label>

                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name='username'
                            placeholder='Enter username'
                            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-[#0F172A]"
                        >
                            Email
                        </label>

                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter email address'
                            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-[#0F172A]"
                        >
                            Password
                        </label>

                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Enter password'
                            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFF] px-4 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
                        />
                    </div>

                    <button
                        className="w-full rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 font-semibold text-white shadow-lg shadow-[#6366F1]/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6366F1]/30"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-[#64748B]">
                    Already have an account?{" "}
                    <Link
                        to={"/login"}
                        className="font-semibold text-[#6366F1] transition hover:text-[#8B5CF6]"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    )
}

export default Register