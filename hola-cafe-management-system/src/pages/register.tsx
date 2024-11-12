import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hola_bg from "./../assets/images/hola_bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import dataFetch from "@/services/data-service";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCheckIcon, CircleCheck } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    const payload = { username, email, password };
    e.preventDefault();
    console.log(payload);

    try {
      const response = await dataFetch("/api/auth/users/", "POST", payload);
      if (response) {
        toast.success("Successfully Registered", {
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please check the entered details.");
    }
  };

  return (
    <>
      <main className="flex flex-wrap min-h-screen w-full content-center justify-center py-10">
        <div className="grid md:grid-cols-2 grid-cols-1 max-w-md md:max-w-5xl  bg-white p-3">
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
                Hola, Register!
              </h1>
              <p className="w-full text-muted-foreground text-sm text-center text-nowrap">
                Welcome to Hola Cafe Inventory Management System!
              </p>
              <form className="mt-2 " onSubmit={handleRegister}>
                <div className="grid gap-2 mt-5">
                  <div className="relative z-0 w-full mb-5 group">
                    <Input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-custom-char bg-transparent border-0 border-b border-gray-300 appearance-none peer focus:outline-none focus:border-b-custom-charcoalOlive rounded-none focus:ring-0 focus-visible:ring-0  focus-visible:ring-ring focus-visible:ring-offset-0 "
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-custom-char  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email
                    </label>
                  </div>
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
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
                  >
                    Register
                  </Button>
                </div>
              </form>
              {/* Footer */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
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

export default Register;
