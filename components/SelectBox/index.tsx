import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Stats } from "fs";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function getStats(selected: any, index: number, stats: any) {
  let numberCases: number = 0;
  if (index === 3) {
    numberCases = stats.find((stat: any) => stat.id === selected.value).pocet;
    return numberCases;
  }
  const stat: any = stats.find((stat: any) => stat.id === selected.id);
  switch (index) {
    case 0:
      numberCases = stat.prvni;
      break;
    case 1:
      numberCases = stat.druhy;
      break;
    case 2:
      numberCases = stat.treti;
      break;
  }
  return numberCases;
}

function sentence(pocet: number) {
  switch (pocet) {
    case 0:
      return "Žádný čtenář před vámi se takto nerozhodl";
    case 1:
      return "Jeden čtenář před vámi se rozhodl stejně";
    case 2:
      return "Dva čtenáři před vámi se rozhodli stejně";
    case 3:
      return "Tři čtenáři před vámi se rozhodli stejně";
    case 4:
      return "Čtyři čtenáři před vámi se rozhodli stejně";
    case 5:
      return "Pět čtenářů před vámi se rozhodlo stejně";
    default:
      return `${pocet} čtenářů před vámi se rozhodlo stejně`;
  }
}

const SelectBox = (props: {
  index: number;
  label: string;
  options: { value: string; id: string }[];
  currentTip: { id: string; value: string }[];
  setCurrentTip: any;
  stats: any;
}) => {
  const selected = props.currentTip[props.index];
  const updateData = (option: { id: string; value: string }) => {
    props.setCurrentTip((prevState: { id: string; value: string }[]) => {
      const duplikat = prevState.findIndex(item => item.id === option.id);
      prevState[duplikat] = { id: "", value: "Vyberte tým" };
      prevState[props.index] = option;
      return [...prevState];
    });
  };
  return (
    <Listbox value={selected} onChange={updateData}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-bold text-gray-700">
            {props.label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                {selected.id.length > 0 && (
                  <img
                    src={`/ms-fotbal-tipovacka/flags/${selected.id}.svg`}
                    alt=""
                    className="h-6 w-6 flex-shrink-0"
                  />
                )}
                <span className="ml-3 block truncate">{selected.value}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {props.stats.length > 0 && selected.id.length > 0 ? (
              <span className={"text-sm text-right "}>
                {sentence(getStats(selected, props.index, props.stats))}
              </span>
            ) : (
              <span className={"text-sm text-right invisible"}>
                placeholder
              </span>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {props.options.map((option, index) => (
                  <Listbox.Option
                    key={props.index === 3 ? index : option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={`/ms-fotbal-tipovacka/flags/${option.id}.svg`}
                            alt=""
                            className="h-6 w-6 flex-shrink-0"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option.value}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export { SelectBox };
