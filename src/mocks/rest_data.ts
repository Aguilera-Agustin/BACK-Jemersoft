import { Country } from "../api/rest_countries_api";

export const countriesMock: Country[] = [
  {
    name: "Argentina",
    alpha3Code: "ARG",
    capital: "Buenos Aires",
    region: "Americas",
    population: 45376763,
    area: 2780400.0,
    borders: ["BOL", "BRA", "CHL", "PRY", "URY"],
    currencies: [
      {
        code: "ARS",
      },
    ],
    languages: [
      {
        name: "Spanish",
      },
      {
        name: "Guaraní",
      },
    ],
    regionalBlocs: [
      {
        acronym: "USAN",
        name: "Union of South American Nations",
      },
    ],
  },
  {
    name: "Mexico",
    alpha3Code: "MEX",
    capital: "Mexico City",
    region: "Americas",
    population: 128932753,
    area: 1964375.0,
    borders: ["BLZ", "GTM", "USA"],
    currencies: [
      {
        code: "MXN",
      },
    ],
    languages: [
      {
        name: "Spanish",
      },
    ],
    regionalBlocs: [
      {
        acronym: "PA",
        name: "Pacific Alliance",
      },
      {
        acronym: "NAFTA",
        name: "North American Free Trade Agreement",
      },
    ],
  },
  {
    name: "Chile",
    alpha3Code: "CHL",
    capital: "Santiago",
    region: "Americas",
    population: 19116209,
    area: 756102.0,
    borders: ["ARG", "BOL", "PER"],
    currencies: [
      {
        code: "CLP",
      },
    ],
    languages: [
      {
        name: "Spanish",
      },
    ],
    regionalBlocs: [
      {
        acronym: "PA",
        name: "Pacific Alliance",
      },
      {
        acronym: "USAN",
        name: "Union of South American Nations",
      },
    ],
  },
  {
    name: "Portugal",
    alpha3Code: "PRT",
    capital: "Lisbon",
    region: "Europe",
    population: 10305564,
    area: 92090.0,
    borders: ["ESP"],
    currencies: [
      {
        code: "EUR",
      },
    ],
    languages: [
      {
        name: "Portuguese",
      },
    ],
    regionalBlocs: [
      {
        acronym: "EU",
        name: "European Union",
      },
    ],
  },

  {
    name: "Uruguay",
    alpha3Code: "URY",
    capital: "Montevideo",
    region: "Americas",
    population: 3473727,
    area: 181034.0,
    borders: ["ARG", "BRA"],
    currencies: [
      {
        code: "UYU",
      },
    ],
    languages: [
      {
        name: "Spanish",
      },
    ],
    regionalBlocs: [
      {
        acronym: "USAN",
        name: "Union of South American Nations",
      },
    ],
  },
  {
    name: "Bolivia (Plurinational State of)",
    alpha3Code: "BOL",
    capital: "Sucre",
    region: "Americas",
    population: 11673029,
    area: 1098581,
    borders: [],
    currencies: [{ code: "BOB" }],
    languages: [{ name: "Spanish" }, { name: "Aymara" }, { name: "Quechua" }],
    regionalBlocs: [
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Colombia",
    alpha3Code: "COL",
    capital: "Bogotá",
    region: "Americas",
    population: 50882884,
    area: 1141748,
    borders: [],
    currencies: [{ code: "COP" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "PA", name: "Pacific Alliance" },
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Brazil",

    alpha3Code: "BRA",

    capital: "Brasília",

    region: "Americas",
    population: 212559409,
    area: 8515767.0,

    borders: [
      "ARG",
      "BOL",
      "COL",
      "FRA",
      "GUF",
      "GUY",
      "PRY",
      "PER",
      "SUR",
      "URY",
      "VEN",
    ],

    currencies: [
      {
        code: "BRL",
      },
    ],
    languages: [
      {
        name: "Portuguese",
      },
    ],
    regionalBlocs: [
      {
        acronym: "USAN",
        name: "Union of South American Nations",
      },
    ],
  },
  {
    name: "Belize",
    alpha3Code: "BLZ",
    capital: "Belmopan",
    region: "Americas",
    population: 397621,
    area: 22966,
    borders: [],
    currencies: [{ code: "BZD" }],
    languages: [{ name: "English" }, { name: "Spanish" }],
    regionalBlocs: [
      { acronym: "CARICOM", name: "Caribbean Community" },
      { acronym: "CAIS", name: "Central American Integration System" },
    ],
  },
  {
    name: "French Guiana",
    alpha3Code: "GUF",
    capital: "Cayenne",
    region: "Americas",
    population: 254541,
    area: 0,
    borders: [],
    currencies: [{ code: "EUR" }],
    languages: [{ name: "French" }],
    regionalBlocs: [
      { acronym: "USAN", name: "Union of South American Nations" },
      { acronym: "EU", name: "European Union" },
    ],
  },
  {
    name: "Guatemala",
    alpha3Code: "GTM",
    capital: "Guatemala City",
    region: "Americas",
    population: 16858333,
    area: 108889,
    borders: [],
    currencies: [{ code: "GTQ" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "CAIS", name: "Central American Integration System" },
    ],
  },
  {
    name: "Guyana",
    alpha3Code: "GUY",
    capital: "Georgetown",
    region: "Americas",
    population: 786559,
    area: 214969,
    borders: [],
    currencies: [{ code: "GYD" }],
    languages: [{ name: "English" }],
    regionalBlocs: [
      { acronym: "CARICOM", name: "Caribbean Community" },
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Paraguay",
    alpha3Code: "PRY",
    capital: "Asunción",
    region: "Americas",
    population: 7132530,
    area: 406752,
    borders: [],
    currencies: [{ code: "PYG" }],
    languages: [{ name: "Spanish" }, { name: "Guaraní" }],
    regionalBlocs: [
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Peru",
    alpha3Code: "PER",
    capital: "Lima",
    region: "Americas",
    population: 32971846,
    area: 1285216,
    borders: [],
    currencies: [{ code: "PEN" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "PA", name: "Pacific Alliance" },
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Suriname",
    alpha3Code: "SUR",
    capital: "Paramaribo",
    region: "Americas",
    population: 586634,
    area: 163820,
    borders: [],
    currencies: [{ code: "SRD" }],
    languages: [{ name: "Dutch" }],
    regionalBlocs: [
      { acronym: "CARICOM", name: "Caribbean Community" },
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Venezuela (Bolivarian Republic of)",
    alpha3Code: "VEN",
    capital: "Caracas",
    region: "Americas",
    population: 28435943,
    area: 916445,
    borders: [],
    currencies: [{ code: "VEF" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "United States of America",
    alpha3Code: "USA",
    capital: "Washington, D.C.",
    region: "Americas",
    population: 329484123,
    area: 9629091,
    borders: [],
    currencies: [{ code: "USD" }],
    languages: [{ name: "English" }],
    regionalBlocs: [
      { acronym: "NAFTA", name: "North American Free Trade Agreement" },
    ],
  },
  {
    name: "Suriname",
    alpha3Code: "SUR",
    capital: "Paramaribo",
    region: "Americas",
    population: 586634,
    area: 163820,
    borders: [],
    currencies: [{ code: "SRD" }],
    languages: [{ name: "Dutch" }],
    regionalBlocs: [
      { acronym: "CARICOM", name: "Caribbean Community" },
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
  {
    name: "Spain",
    alpha3Code: "ESP",
    capital: "Madrid",
    region: "Europe",
    population: 47351567,
    area: 505992,
    borders: [],
    currencies: [{ code: "EUR" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [{ acronym: "EU", name: "European Union" }],
  },
  {
    name: "Panama",
    alpha3Code: "PAN",
    capital: "Panama City",
    region: "Americas",
    population: 4314768,
    area: 75417,
    borders: [],
    currencies: [{ code: "PAB" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "CAIS", name: "Central American Integration System" },
    ],
  },
  {
    name: "Honduras",
    alpha3Code: "HND",
    capital: "Tegucigalpa",
    region: "Americas",
    population: 9904608,
    area: 112492,
    borders: [],
    currencies: [{ code: "HNL" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "CAIS", name: "Central American Integration System" },
    ],
  },
  {
    name: "France",
    alpha3Code: "FRA",
    capital: "Paris",
    region: "Europe",
    population: 67391582,
    area: 640679,
    borders: [],
    currencies: [{ code: "EUR" }],
    languages: [{ name: "French" }],
    regionalBlocs: [{ acronym: "EU", name: "European Union" }],
  },
  {
    name: "El Salvador",
    alpha3Code: "SLV",
    capital: "San Salvador",
    region: "Americas",
    population: 6486201,
    area: 21041,
    borders: [],
    currencies: [{ code: "USD" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "CAIS", name: "Central American Integration System" },
    ],
  },
  {
    name: "Ecuador",
    alpha3Code: "ECU",
    capital: "Quito",
    region: "Americas",
    population: 17643060,
    area: 276841,
    borders: [],
    currencies: [{ code: "USD" }],
    languages: [{ name: "Spanish" }],
    regionalBlocs: [
      { acronym: "USAN", name: "Union of South American Nations" },
    ],
  },
];
