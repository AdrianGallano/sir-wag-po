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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src={hola_bg}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale object-right"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Please fill out the fields to complete your registration.
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="HolaCafe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
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
                  placeholder="**********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
          <div className="mt- text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
