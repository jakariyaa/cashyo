import { authClient } from "@/lib/auth-client";
import { setCredentials, clearCredentials } from "@/redux/features/auth/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SplashScreen } from "@/components/common/splash-screen";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await authClient.getSession();
                if (data?.session) {
                    const serializedUser = {
                        ...data.user,
                        createdAt: new Date(data.user.createdAt).toISOString(),
                        updatedAt: new Date(data.user.updatedAt).toISOString(),
                    };
                    dispatch(setCredentials({ user: serializedUser as any }));
                } else {
                    dispatch(clearCredentials());
                }
            } catch (error) {
                console.error("Failed to fetch session:", error);
                dispatch(clearCredentials());
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [dispatch]);



    if (loading) {
        return <SplashScreen onComplete={() => { }} />;
    }

    return <>{children}</>;
}
