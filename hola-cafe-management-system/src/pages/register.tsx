import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "recharts";
import hola_bg from "./../assets/images/hola_bg2.jpg";
import { Link } from "react-router-dom";

const Register = () => {
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="HolaCafe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
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
