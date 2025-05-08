"use client";
import Image from "next/image";
import BaseCard from "../components/BaseCard";
import PhindojoText from "../components/PhindojoText";
import { Lock, LogIn, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export default function Login() {
  const { token, isLoading, fetchLogin, getCookiesToken } = useAuthStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCookiesToken();
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const onLoginClick = () => {
    fetchLogin(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black ">
      <BaseCard className="max-w-md w-full px-6 py-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/phindojo-logo.png"
            alt={"Phindojo Icons"}
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <h1 className="text-2xl font-semibold">
            <PhindojoText />
          </h1>
          <p className="text-gray-400 mt-2 text-center">
            Login untuk melanjutkan
          </p>
        </div>
        <form className="space-y-4" action={"#"}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber focus-within:border-transparent">
              <Mail
                className="w-5 h-5 mx-3 text-gray-400"
                width={24}
                height={24}
              />
              <input
                type="email"
                className="m-0.5 flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-[#252525] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 focus-visible:ring-0"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber focus-within:border-transparent">
              <Lock
                className="w-5 h-5 mx-3 text-gray-400"
                width={24}
                height={24}
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 focus-visible:ring-0"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="m-3 focus:outline-none"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-cyber hover:bg-cyber/90 mt-2"
            onClick={onLoginClick}
            type="button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <span className="flex items-center">
                <LogIn className="w-4 h-4 mr-2" width={24} height={24} />
                Login
              </span>
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Forget Password?{" "}
            <a className="text-cyber hover:underline" href="/forgot-password">
              Forgot Password
            </a>
          </p>
        </div>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a className="text-cyber hover:underline" href="/register">
              Register
            </a>
          </p>
        </div>
      </BaseCard>
    </div>
  );
}
