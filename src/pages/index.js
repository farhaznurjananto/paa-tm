import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const loginConsume = async (account) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    };

    await fetch("http://localhost:3000/api/auth", options)
      .then((response) => {
        if (response.ok) {
          router.push("/meme");
          return response.json();
        } else {
          throw new Error("Invalid username or password!");
        }
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
      })
      .catch((error) => {
        if (error) {
          alert("Your email or password is incorrect!");
        }
      });
  };

  const signUp = (event) => {
    router.push("/regis");
  };

  const signIn = (event) => {
    event.preventDefault();

    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    const account = {
      email: emailValue,
      password: passwordValue,
    };
    loginConsume(account);

    history.replaceState(null, null, "/meme");
  };

  return (
    <>
      <form className="w-96 m-auto mt-40">
        <div className="mb-6">
          <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            ></input>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={signIn}
        >
          Sign In
        </button>
        <p className="text-right">
          Belum punya akun?{" "}
          <button className="text-blue-500" onClick={signUp}>
            Sign Up
          </button>
        </p>
      </form>
    </>
  );
}
