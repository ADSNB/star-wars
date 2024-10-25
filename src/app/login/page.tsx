"use client";

import { redirect } from "next/navigation";
// import { saveAuthorizationToken } from "./auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  function onsubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    fetch(process.env.NEXT_STARWARS_NET_API_URL_AUTH!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    }).then((response) => {
      if (response.status == 401) return;
      response.json().then((jwtToken) => {
        // store cookie
        Cookies.set("st-jwt", jwtToken, { expires: 7, secure: true, sameSite: "Strict" });
        redirect("/starships-api");
      });
    });
  }

  return (
    <div>
      {/* <form onSubmit={onsubmit}>
        <label>Login: (yoda@gmail.com)</label>
        <input type="text" name="email" autoComplete="email"></input>
        <label>Password: (maytheforcebewithyou)</label>
        <input type="password" name="password" autoComplete="current-password"></input>
        <button type="submit">Login</button>
      </form> */}

      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img alt="Your Company" src="https://i.pinimg.com/564x/f7/25/cc/f725cc9fda79b2b4bb80774f24279743.jpg" className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your STAR WARS account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={onsubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address ( yoda@gmail.com )
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password (maytheforcebewithyou)
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member of the Empire?{" "}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Join our force now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
