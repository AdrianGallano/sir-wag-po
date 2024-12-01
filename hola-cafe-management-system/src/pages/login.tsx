import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hola_bg from "./../assets/images/hola_bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, success, id } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await login(username, password);

    if (isSuccess) {
      toast.success("Login successful!", { duration: 1000 });
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast.error("Invalid credentials!", { duration: 1000 });
    }
  };

  return (
    <>
      <main className="flex flex-wrap min-h-screen w-full content-center justify-center  py-10 ]">
        <div className="grid md:grid-cols-2 grid-cols-1 max-w-md md:max-w-5xl p-3">
          <div className="hidden md:flex flex-wrap content-center justify-center rounded-lg  h-[35rem] ">
            <img
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
              src={hola_bg}
            />
          </div>
          <div className="col-span-1 flex flex-wrap content-center justify-center rounded-l-lg bg-white h-[35rem] ">
            <div>
              {/* Heading */}
              <h1 className="text-5xl font-bold text-left text-custom-charcoalOlive">
                Hola, Login!
              </h1>
              <p className="w-full text-muted-foreground text-sm text-center text-nowrap">
                Welcome to Hola Cafe Inventory Management System!
              </p>
              <form className="mt-2" onSubmit={handleLogin}>
                <div className="grid gap-2 mt-5">
                  <div className="relative z-0 w-full mb-5 group">
                    <Input
                      type="text"
                      name="float_username"
                      id="float_username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-custom-char bg-transparent border-0 border-b border-gray-300 appearance-none peer focus:outline-none focus:border-b-custom-charcoalOlive rounded-none focus:ring-0 focus-visible:ring-0  focus-visible:ring-ring focus-visible:ring-offset-0 "
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="float_username"
                      className="peer-focus:font-medium absolute text-sm text-custom-char  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Username
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <Input
                      type="password"
                      name="floating_password"
                      id="floating_password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-custom-char bg-transparent border-0 border-b border-gray-300 appearance-none peer focus:outline-none focus:border-b-custom-charcoalOlive rounded-none focus:ring-0 focus-visible:ring-0  focus-visible:ring-ring focus-visible:ring-offset-0 "
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-custom-char  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>{" "}
                    <div className="flex justify-start items-center mt-3">
                      <a
                        href="/forgot-password"
                        className="mr-auto inline-block text-sm "
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
                  >
                    Login
                  </Button>
                </div>
              </form>
              {/* Footer */}
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="underline hover:text-[#783727] text-[#FD4719] transition ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toaster
        position="top-right"
        icons={{
          success: <CircleCheck className="fill-green-500 text-white" />,
        }}
      />
    </>
  );
};

export default Login;
