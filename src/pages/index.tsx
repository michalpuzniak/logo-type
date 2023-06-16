import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ChangeEvent } from "react";
import { json } from "stream/consumers";
import { api } from "~/utils/api";

const initState = {
  name: "",
  color: "",
  style: "",
  secondaryText: "",
  field: "",
};
type ResponseData = { 
  url: string | undefined;
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [prompt, setPrompt] = useState(initState);
  const [imageURL, setImageURL] = useState("")
  const handleClick = () => {
    console.log("0");
  };
  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>): Promise<any> => {
    e.preventDefault();
    const promptMessage =  `Logo of a company in ${prompt.field} which name is ${prompt.name}, secondary text of this logo is ${prompt.secondaryText}. Logo should be created in ${prompt.color} and ${prompt.style} style.`;
    const response: ResponseData = await fetch("/api/image", {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propmpt:`${promptMessage}`
      })
    });
   const data = await response.json();
   setImageURL(data.url);  
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrompt({ ...prompt, [name]: value });
  };

  return (
    <>
      <Head>
        <title>LOGO-TYPE</title>
        <meta name="description" content="Type your logo out" />
        <link rel="icon" href="/chip.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-6xl font-bold text-white">LOGO-TYPE</h1>
        <form
          action="POST"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={prompt.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Secondary text"
            name="secondaryText"
            value={prompt.secondaryText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Style"
            name="style"
            value={prompt.style}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={prompt.color}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Business field"
            name="field"
            value={prompt.field}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Create Logo"
            className="rounded bg-slate-300 text-lg font-semibold"
          />
        </form>

        <div>
          <h1>Image Display</h1>
          <div className=" p-4 border border-dotted">
              <img src={imageURL} alt="alt" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
