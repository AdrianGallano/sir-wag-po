import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hola_bg from "./../assets/images/hola_bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import dataFetch from "@/services/data-service";
import { Label } from "@/components/ui/label";

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
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please check the entered details.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-custom-paleButter py-10 ]">
        <div className="flex shadow-md ">
          <div className="flex flex-wrap content-center justify-center rounded-l-lg w-[29rem] h-[32rem]">
            <img
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-lg"
              src={hola_bg}
            />
          </div>
          <div className="flex flex-wrap content-center justify-center rounded-r-lg bg-white w-[30rem] h-[32rem] ">
            <div className="w-80">
              {/* Heading */}
              <h1 className="text-3xl font-semibold text-center text-custom-goldenMustard">
                Register
              </h1>
              <p className="text-muted-foreground text-sm text-center text-nowrap">
                Welcome to Hola Cafe Inventory System!
              </p>
              <form className="mt-2" onSubmit={handleRegister}>
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
                    <Label>Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  </div>
                  <Button
                    type="submit"
                    className="w-full hover:bg-custom-goldenMustard bg-custom-sunnyGold"
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
                  className="underline hover:text-custom-goldenMustard text-custom-sunnyGold"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
