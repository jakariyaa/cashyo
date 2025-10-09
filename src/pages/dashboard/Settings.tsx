import UpdateProfileForm from "@/components/common/update-profile-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const handleResetTour = () => {
    localStorage.removeItem("hasTakenTour");
    toast.success(
      "Guided tour has been reset. It will start on your next visit to the homepage."
    );
  };

  return (
    <div className="space-y-8">
      <UpdateProfileForm />
      <Card>
        <CardHeader>
          <CardTitle>Guided Tour</CardTitle>
          <CardDescription>
            Reset the guided tour to see it again on your next visit to the
            homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleResetTour}>Reset Tour</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
