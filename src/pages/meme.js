import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [allMemems, setMeme] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: new Headers({
        // Authorization: sessionStorage.getItem("token"),
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }),
    };

    fetch("http://localhost:3000/api/user/read", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserId(data.user.id);
        sessionStorage.setItem("userId", data.user.id);
      });
    // .catch((error) => {
    //   if (error) {
    //     alert(` ${error}  Your time is up! Please login again.`);
    //   }
    // });

    // read
    fetch("http://localhost:3000/api/meme/read")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMeme(data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));
      });
  });

  // create
  const addMemeConsume = async (meme) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meme),
    };

    await fetch("http://localhost:3000/api/meme/create", options)
      .then((response) => {
        if (response.ok) {
          alert("Meme added successfully!");
          document.getElementById("memeForm").reset();
          return response.json();
        } else {
          throw new Error("Invalid to create!");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        if (error) {
          alert("Failed!");
        }
      });
  };

  const createMeme = (event) => {
    event.preventDefault();

    var nameValue = document.getElementById("name").value;
    var descriptionValue = document.getElementById("description").value;

    const meme = {
      name: nameValue,
      description: descriptionValue,
      userId: userId,
    };

    addMemeConsume(meme);
  };

  // edit
  const btnEdit = (event) => {
    event.preventDefault();
    document.getElementById("add").hidden = true;
    document.getElementById("update").style = "display:block";
    document.getElementById("cancel").style = "display:block";

    var fillName = (document.getElementById("name").value = "halo");
    var fillDescription = (document.getElementById("description").value = "halo2");
  };

  // update

  // delete
  const delMeme = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };

    const response = await fetch("http://localhost:3000/api/meme/delete", options);
    const responseJson = await response.json();
  };

  // signOut
  const signOut = () => {
    sessionStorage.clear();
    router.push("/");
    history.replaceState(null, null, "/");
  };

  return (
    <>
      {/* navbar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Meme in the World</span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {/* end-navbar */}

      {/* form */}
      <form className="w-96 mt-20 m-auto" id="memeForm">
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Meme Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Meme Descriptions
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <div className="flex justify-around">
          <button
            type="submit"
            id="add"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={createMeme}
          >
            Add
          </button>
          <button
            type="submit"
            id="update"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            hidden
          >
            Update
          </button>
          <button
            type="submit"
            id="cancel"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            hidden
          >
            Cancel
          </button>
        </div>
      </form>
      {/* end-form */}

      {/* meme */}
      <h1 className="text-3xl m-auto text-center my-3">List Meme</h1>
      {allMemems.map((data) => {
        return (
          <div className="flex justify-center m-auto" key={data.id}>
            <div href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-2">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://source.unsplash.com/random/?meme" alt=""></img>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
              </div>
            </div>
            <div className="action flex flex-col m-2">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-1 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={btnEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => {
                  delMeme(data.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {/* end-meme */}
    </>
  );
}
