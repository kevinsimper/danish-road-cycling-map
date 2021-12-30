import data from "../data/raw";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
