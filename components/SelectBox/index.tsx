import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const countries = [
  { name: "Katar", id: "qa" },
  { name: "Brazílie", id: "br" },
  { name: "Belgie", id: "be" },
  { name: "Francie", id: "fr" },
  { name: "Argentina", id: "ar" },
  { name: "Anglie", id: "gb-eng" },
  { name: "Španělsko", id: "es" },
  { name: "Portugalsko", id: "pt" },
  { name: "Mexiko", id: "mx" },
  { name: "Nizozemsko", id: "nl" },
  { name: "Dánsko", id: "dk" },
  { name: "Německo", id: "de" },
  { name: "Uruguay", id: "uy" },
  { name: "Švýcarsko", id: "ch" },
  { name: "USA", id: "us" },
  { name: "Chorvatsko", id: "hr" },
  { name: "Senegal", id: "sn" },
  { name: "Írán", id: "ir" },
  { name: "Japonsko", id: "jp" },
  { name: "Maroko", id: "ma" },
  { name: "Srbsko", id: "rs" },
  { name: "Polsko", id: "pl" },
  { name: "Jižní Korea", id: "kr" },
  { name: "Tunisko", id: "tn" },
  { name: "Kamerun", id: "cm" },
  { name: "Kanada", id: "ca" },
  { name: "Ekvádor", id: "ec" },
  { name: "Saudská Arábie", id: "sa" },
  { name: "Ghana", id: "gh" },
  { name: "Wales", id: "gb-wls" },
  { name: "Kostarika", id: "cr" },
  { name: "Austrálie", id: "au" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SelectBox = (props: { label: string }) => {
  const [selected, setSelected] = useState({
    id: undefined,
    name: "Vyberte tým",
  });

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {props.label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                {selected.id && (
                  <img
                    src={`../../flags/${selected.id}.svg`}
                    alt=""
                    className="h-6 w-6 flex-shrink-0"
                  />
                )}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {countries.map(country => (
                  <Listbox.Option
                    key={country.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={`../../flags/${country.id}.svg`}
                            alt=""
                            className="h-6 w-6 flex-shrink-0"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {country.name}
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
