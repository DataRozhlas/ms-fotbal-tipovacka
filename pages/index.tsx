import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { SelectBox } from "../components";
import {
  PaperAirplaneIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import TwitterLogo from "../public/twitter-solid.svg";
import FacebookLogo from "../public/facebook-solid.svg";

const otazky = ["1. zlato", "2. stříbro", "3. bronz"];

const countries = [
  { value: "Katar", id: "qa" },
  { value: "Brazílie", id: "br" },
  { value: "Belgie", id: "be" },
  { value: "Francie", id: "fr" },
  { value: "Argentina", id: "ar" },
  { value: "Anglie", id: "gb-eng" },
  { value: "Španělsko", id: "es" },
  { value: "Portugalsko", id: "pt" },
  { value: "Mexiko", id: "mx" },
  { value: "Nizozemsko", id: "nl" },
  { value: "Dánsko", id: "dk" },
  { value: "Německo", id: "de" },
  { value: "Uruguay", id: "uy" },
  { value: "Švýcarsko", id: "ch" },
  { value: "USA", id: "us" },
  { value: "Chorvatsko", id: "hr" },
  { value: "Senegal", id: "sn" },
  { value: "Írán", id: "ir" },
  { value: "Japonsko", id: "jp" },
  { value: "Maroko", id: "ma" },
  { value: "Srbsko", id: "rs" },
  { value: "Polsko", id: "pl" },
  { value: "Jižní Korea", id: "kr" },
  { value: "Tunisko", id: "tn" },
  { value: "Kamerun", id: "cm" },
  { value: "Kanada", id: "ca" },
  { value: "Ekvádor", id: "ec" },
  { value: "Saudská Arábie", id: "sa" },
  { value: "Ghana", id: "gh" },
  { value: "Wales", id: "gb-wls" },
  { value: "Kostarika", id: "cr" },
  { value: "Austrálie", id: "au" },
];

let goals: { value: string; id: string }[] = [];

for (let i = 0; i < 11; i++) {
  goals.push({ id: "goly", value: i.toString() });
}

export default function Home() {
  const [currentTip, setCurrentTip] = useState([
    { id: "", value: "Vyberte tým" },
    { id: "", value: "Vyberte tým" },
    { id: "", value: "Vyberte tým" },
    { id: "", value: "Zadejte počet" },
  ]);

  const [saved, setSaved] = useState(true);

  const handleResetClick = () => {
    setCurrentTip([
      { id: "", value: "Vyberte tým" },
      { id: "", value: "Vyberte tým" },
      { id: "", value: "Vyberte tým" },
      { id: "", value: "Zadejte počet" },
    ]);
    setSaved(false);
  };

  const handlePostClick = () => {
    const http = new XMLHttpRequest();
    const url =
      "https://lw1k02zee1.execute-api.eu-central-1.amazonaws.com/default/fotbal-euro-tipovacka";
    http.open("POST", url);
    http.send(
      JSON.stringify({
        prvni: currentTip[0].id,
        druhy: currentTip[1].id,
        treti: currentTip[2].id,
        goly: +currentTip[3].value,
      })
    );
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center pb-2">
          Váš tip byl uložen!
        </h1>
        <h2 className="text-xl font-bold text-center">
          Sdílejte ho veřejně na Facebooku nebo na Twitteru a můžete vyhrát DAB
          rádio nebo jinu cenu
        </h2>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-6">
          <img
            src={
              "https://data.irozhlas.cz/fotbal-ms-tipovacka-img/fb/qabear10.png"
            }
          />
        </div>
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 py-8 flex flex-row flex-wrap justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <img
              src={"../facebook-solid.svg"}
              className="-ml-1 mr-3 h-5 w-5"
              aria-hidden="true"
            />
            Sdílet na Facebooku
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <img
              src={"../twitter-solid.svg"}
              className="-ml-1 mr-3 h-5 w-5"
              aria-hidden="true"
            />
            Sdílet na Twitteru
          </button>
          <button
            type="button"
            onClick={handleResetClick}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ArrowLeftOnRectangleIcon
              className="-ml-1 mr-3 h-5 w-5"
              aria-hidden="true"
            />
            Nový tip
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center pb-6">
          Kdo podle vás získá medaile na MS ve fotbale 2022 v Kataru?
        </h1>
        <ol role="list" className="space-y-3">
          {otazky.map((otazka, index) => (
            <li
              key={index}
              className="bg-white px-4 py-1 sm:rounded-md sm:px-6 text-xl"
            >
              <SelectBox
                index={index}
                label={otazka}
                options={countries}
                currentTip={currentTip}
                setCurrentTip={setCurrentTip}
              ></SelectBox>
            </li>
          ))}
        </ol>
      </div>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-center py-6">
          A kolik padne ve finále gólů?
        </h2>
        <ol role="list" className="space-y-3">
          <li className="bg-white px-4 py-1 sm:rounded-md sm:px-6 text-xl">
            <SelectBox
              index={3}
              label={"4. Góly ve finále v řádné hrací době"}
              options={goals}
              currentTip={currentTip}
              setCurrentTip={setCurrentTip}
            ></SelectBox>
          </li>
        </ol>
      </div>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 py-8 flex flex-row flex-wrap justify-center gap-3">
        <button
          disabled={currentTip.some(item => item.id === "")}
          type="button"
          onClick={handlePostClick}
          className="w-2/5  inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300"
        >
          <PaperAirplaneIcon
            className="-ml-1 mr-3 h-5 w-5"
            aria-hidden="true"
          />
          Odeslat tip
        </button>
        <button
          type="button"
          onClick={handleResetClick}
          disabled={currentTip.every(item => item.id === "")}
          className="w-2/5 inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-white"
        >
          <TrashIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Resetovat
        </button>
      </div>
    </>
  );
}
