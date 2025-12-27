import { MotionWrapper } from "@/components/common/motion-wrapper";

export default function Terms() {
    return (
        <div className="bg-background min-h-screen py-20 px-6">
            <MotionWrapper>
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Welcome to Cashyo. By using our services, you agree to these terms.</p>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                </div>
            </MotionWrapper>
        </div>
    );
}
