import { MotionWrapper } from "@/components/common/motion-wrapper";

export default function Privacy() {
    return (
        <div className="bg-background min-h-screen py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <MotionWrapper>
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
                    <div className="prose prose-lg dark:prose-invert">
                        <p className="text-muted-foreground mb-6">
                            Last updated: December 26, 2025
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-4 text-muted-foreground">
                            Cashyo ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
                        <p className="mb-4 text-muted-foreground">
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date).</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Security of Your Information</h2>
                        <p className="mb-4 text-muted-foreground">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
                        <p className="mb-4 text-muted-foreground">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <p className="font-semibold">support@cashyo.com</p>
                    </div>
                </MotionWrapper>
            </div>
        </div>
    );
}
