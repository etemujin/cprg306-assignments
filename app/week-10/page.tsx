"use client";

import { useUserAuth } from "./_utils/auth-context";

export default function AuthPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-blue-500 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Week 8 Auth Page</h1>

        {user ? (
          <div className="space-y-4">
            <p className="text-lg">
              Welcome,{" "}
              <span className="font-semibold text-blue-300">
                {user.displayName || "User"}
              </span>
            </p>
            <p className="text-sm text-gray-300 break-words">{user.email}</p>

            <button
              onClick={() => (window.location.href = "/week-10/shopping-list")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Go to Shopping List
            </button>

            <button
              onClick={handleSignOut}
              className="w-full bg-black border border-white hover:bg-zinc-800 text-white font-semibold py-3 rounded-lg transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-200">You are not signed in.</p>

            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign in with GitHub
            </button>
          </div>
        )}
      </div>
    </main>
  );
}