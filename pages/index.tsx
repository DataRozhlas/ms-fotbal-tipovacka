import { SelectBox } from "../components";

const otazky = [
  "1. zlato",
  "2. stříbro",
  "3. bronz",
  "Kolik padne ve finále gólů?",
];

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center pb-6">
          Kdo podle vás získá medaile na MS ve fotbale 2022 v Kataru?
        </h1>
      </div>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <ol role="list" className="space-y-3">
          {otazky.map((otazka, index) => (
            <li
              key={index}
              className="overflow-hidden bg-white px-4 py-6 shadow sm:rounded-md sm:px-6 text-xl"
            >
              {otazka}
              <SelectBox></SelectBox>
            </li>
          ))}{" "}
        </ol>
      </div>
    </>
  );
}
