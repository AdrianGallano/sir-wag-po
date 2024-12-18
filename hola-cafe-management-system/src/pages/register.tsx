import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hola_bg from "./../assets/images/hola_bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import dataFetch from "@/services/data-service";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCheckIcon, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { register } from "module";

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
      toast.error("Registration failed. Please check the entered details.", {
        duration: 1000,
      });
    }
  };

  return (
    <>
      <main className="flex w-full min-h-svh flex-col items-center justify-center  p-6 md:p-10">
        <div className="flex flex-col gap-6 ">
          <Card className="overflow-hidden  max-w-5xl w-full border-none shadow-none">
            <CardContent className="grid p-0 md:grid-cols-2 w-full">
              <div className="relative hidden bg-muted md:block h-[35rem] ">
                <img
                  src={hola_bg}
                  alt="Image"
                  className="absolute inset-0 h-full w-full  object-cover rounded-md"
                />
              </div>
              <form className="p-6 md:p-8 h-[35rem]" onSubmit={handleRegister}>
                <div className="flex flex-col gap-6 justify-center h-full">
                  <div className="flex flex-col items-start md:text-left text-center">
                    <h1 className="md:text-5xl  max-sm:mx-auto font-bold text-xl ">
                      {" "}
                      Hola, Signup!
                    </h1>
                    <p className="text-balance md:text-base text-sm text-muted-foreground">
                      Welcome to Hola Cafe Inventory Management System!
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="relative z-0 w-full mb-5 group">
                      <Input
                        type="email"
                        name="float_email"
                        id="float_email"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-custom-char bg-transparent border-0 border-b border-gray-300 appearance-none peer focus:outline-none focus:border-b-custom-charcoalOlive rounded-none focus:ring-0 focus-visible:ring-0  focus-visible:ring-ring focus-visible:ring-offset-0 "
                        placeholder=" "
                        required
                      />
                      <Label
                        htmlFor="float_email"
                        className="peer-focus:font-medium absolute text-sm text-custom-char  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email
                      </Label>
                    </div>
                  </div>
                  <div className="grid gap-2">
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
                      <Label
                        htmlFor="float_username"
                        className="peer-focus:font-medium absolute text-sm text-custom-char  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </Label>
                    </div>
                  </div>
                  <div className="grid gap-2">
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
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full hover:bg-custom-charcoalOlive bg-custom-char"
                  >
                    Signup
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className=" underline-offset-4 underline hover:text-[#783727] text-[#FD4719] transition ease-in-out"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
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
