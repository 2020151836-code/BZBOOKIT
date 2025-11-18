import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function LoginPage() {
  const loginUrl = getLoginUrl();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <img src={APP_LOGO} alt="Logo" className="h-16 w-16 rounded-lg" />
          </div>
          <CardTitle className="text-3xl font-bold">{APP_TITLE}</CardTitle>
          <CardDescription>Book your beauty services with ease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Welcome to BZ Book It, your premier beauty booking platform. Sign in to manage your appointments and access exclusive features.
          </p>
          <Button
            onClick={() => (window.location.href = loginUrl)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
          >
            Sign In
          </Button>
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
