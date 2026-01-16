"use client"
import { API_BASE_URL } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const loginFunction = (data) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_BASE_URL}/api/auth/login`,
            headers: {
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                Cookies.set("token", response.data.data.access_token, { expires: 7, secure: true });
                toast.success("Logged in successfully")
                router.push("/admin/dashboard");
            })
            .catch((error) => {
                toast.error("Wrong email or password")
                console.log(error, 'catch');
            });
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        try {
            setLoading(true);
            await loginFunction({ email, password });
            // Redirect or show success message
        } catch (err) {
            setLoading(false);
            console.log(err, 'err')
            alert("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="space-y-1 items-center pb-2">
                    <img
                        alt="StaffScaw Logo"
                        src="/assets/images/logo.gif"
                        className="w-[180px] h-auto mb-4 drop-shadow-sm"
                    />
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the admin panel
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                            <Button className="w-full mt-2" type="submit" disabled={loading}>
                                {loading && (
                                    <svg
                                        className="mr-2 h-4 w-4 animate-spin"
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
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                )}
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;