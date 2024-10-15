import Head from "next/head";
import Chat from "../components/Chat";

export default function chat() {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Head>
        <title>Chat App</title>
      </Head>
      <Chat />
    </div>
  );
}
