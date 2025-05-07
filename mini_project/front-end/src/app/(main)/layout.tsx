"use client";
import Image from "next/image";
import PhindojoText from "../components/PhindojoText";
import {
  GraduationCap,
  UserPlus,
  LogIn,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, token, getCookiesToken } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getCookiesToken();
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [!token]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-800 z-50">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/phindojo-logo.png"
            alt={"Phindojo Icons"}
            width={24}
            height={24}
          />
          <PhindojoText className="text-2xl ml-2 font-bold" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap color="#00ccff" />
            <span className="select-none text-sm md:text-base hidden sm:inline">
              Training Center
            </span>
          </div>
          <div className="relative">
            <div className="md:flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-300">
                    Halo,{" "}
                    <span className="text-cyber font-medium">{user.email}</span>
                  </span>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-cyber bg-gray-800"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    type="button"
                  >
                    Options
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-cyber bg-gray-800"
                    onClick={() => router.push("/login")}
                    type="button"
                  >
                    <LogIn />
                    Login
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-cyber hover:bg-cyber/90 text-white"
                    type="button"
                  >
                    <UserPlus />
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-full overflow-hidden z-50">
          <div
            className={`w-64 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-lg
            transform transition-all duration-300 ease-out
            ${isOpen ? "translate-x-0 mr-6" : "translate-x-full"}`}
          >
            {/* User info section */}
            <div className="flex items-center justify-start gap-2 p-2 mb-1 border-b border-gray-700">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
            </div>

            {/* Completed Exams section */}
            <div className="mb-1 border-b border-gray-700 relative select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-700 cursor-pointer flex items-center">
              <ClipboardList width={24} height={24} className="h-4 w-4 mr-2" />
              <span>Completed Exams</span>
            </div>

            {/* Logout section */}
            <div className="relative select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-red-600 cursor-pointer flex items-center text-red-400 hover:text-white">
              <LogOut width={24} height={24} className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 mt-16">{children}</main>
      <footer className="bg-gray-800 py-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Phindojo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
