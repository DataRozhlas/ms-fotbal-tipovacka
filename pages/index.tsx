import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { SelectBox } from "../components";

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

export default function Home() {
  const [currentTip, setCurrentTip] = useState([
    { id: "", value: "Vyberte tým" },
    { id: "", value: "Vyberte tým" },
    { id: "", value: "Vyberte tým" },
    { id: "", value: "" },
  ]);

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
    </>
  );
}
