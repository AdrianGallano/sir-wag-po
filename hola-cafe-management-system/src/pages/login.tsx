import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hola_bg from "./../assets/images/hola_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCheckIcon, CircleCheck } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, success, id } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    if (success) {
      toast.success("Login successful!", {
        duration: 1000,
      });

      console.log(id);

      setTimeout(() => {
        navigate("/analytics");
      }, 1000);
    } else {
      toast.error("Invalid credentials!", {
        duration: 1000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-custom-paleButter py-10 ]">
        <div className="flex shadow-md ">
          <div className="flex flex-wrap content-center justify-center rounded-l-lg bg-white w-[30rem] h-[32rem] ">
            <div className="w-80">
              {/* Heading */}
              <h1 className="text-3xl font-semibold text-center text-custom-goldenMustard">
                Login
              </h1>
              <p className="text-muted-foreground text-sm text-center text-nowrap">
                Welcome to Hola Cafe Inventory System!
              </p>
              <form className="mt-2" onSubmit={handleLogin}>
                <div className="grid gap-4 mt-2">
                  <div className="grid gap-2">
                    <Label>Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="flex items-center">
                      <a
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm "
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full hover:bg-custom-goldenMustard bg-custom-sunnyGold"
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
                  className="underline hover:text-custom-goldenMustard text-custom-sunnyGold"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-center justify-center rounded-r-lg w-[29rem] h-[32rem]">
            <img
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-lg"
              src={hola_bg}
            />
          </div>
        </div>
      </div>

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
