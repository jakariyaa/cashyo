
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfileMutation } from "@/redux/features/dashboard/userApi";
import type { RootState } from "@/redux/store";
import { getErrorMessage } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { Camera, User } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export default function UpdateProfileForm() {
  const user = useSelector((state: RootState) => state.user.user);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?._id) {
      toast.error("User ID not found.");
      return;
    }
    try {
      await updateUserProfile({ id: user._id, ...values }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.", {
        description: getErrorMessage(error),
      });
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-border/50">
      <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
        <div className="absolute -bottom-12 left-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-background border-4 border-background shadow-lg overflow-hidden flex items-center justify-center text-muted-foreground">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 opacity-50" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md cursor-pointer hover:bg-primary/90 transition-colors">
              <Camera className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pt-16 pb-8 px-8">
        <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
        <CardDescription className="text-base">
          Manage your account information and preferences.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary/50 focus:bg-background transition-all" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary/50 focus:bg-background transition-all" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex items-center justify-end gap-4">
              <Button type="button" variant="ghost">Cancel</Button>
              <Button type="submit" disabled={isLoading} className="min-w-[120px] shadow-lg shadow-primary/20">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
