import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthRedirect() {
    const {isSignedIn} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if(isSignedIn) {
            router.push("/dashboard")
        }
    }, [isSignedIn, router]) 
    return null
}