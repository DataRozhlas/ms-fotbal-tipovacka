import Head from "next/head";
import Script from "next/script";

const countries = [
  {
    value: "Anglie",
    id: "gb-eng",
  },
  {
    value: "Argentina",
    id: "ar",
  },
  {
    value: "Austrálie",
    id: "au",
  },
  {
    value: "Belgie",
    id: "be",
  },
  {
    value: "Brazílie",
    id: "br",
  },
  {
    value: "Dánsko",
    id: "dk",
  },
  {
    value: "Ekvádor",
    id: "ec",
  },
  {
    value: "Francie",
    id: "fr",
  },
  {
    value: "Ghana",
    id: "gh",
  },
  {
    value: "Chorvatsko",
    id: "hr",
  },
  {
    value: "Írán",
    id: "ir",
  },
  {
    value: "Japonsko",
    id: "jp",
  },
  {
    value: "Jižní Korea",
    id: "kr",
  },
  {
    value: "Kamerun",
    id: "cm",
  },
  {
    value: "Kanada",
    id: "ca",
  },
  {
    value: "Katar",
    id: "qa",
  },
  {
    value: "Kostarika",
    id: "cr",
  },
  {
    value: "Maroko",
    id: "ma",
  },
  {
    value: "Mexiko",
    id: "mx",
  },
  {
    value: "Německo",
    id: "de",
  },
  {
    value: "Nizozemsko",
    id: "nl",
  },
  {
    value: "Polsko",
    id: "pl",
  },
  {
    value: "Portugalsko",
    id: "pt",
  },
  {
    value: "Saudská Arábie",
    id: "sa",
  },
  {
    value: "Senegal",
    id: "sn",
  },
  {
    value: "Srbsko",
    id: "rs",
  },
  {
    value: "Španělsko",
    id: "es",
  },
  {
    value: "Švýcarsko",
    id: "ch",
  },
  {
    value: "Tunisko",
    id: "tn",
  },
  {
    value: "Uruguay",
    id: "uy",
  },
  {
    value: "USA",
    id: "us",
  },
  {
    value: "Wales",
    id: "gb-wls",
  },
];

export default function Tip(props: any) {
  const vitez = props.vitez;
  return (
    <div>
      <Head>
        <title>{`Mistrovství světa ve fotbale letos vyhraje ${vitez}!`}</title>
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.irozhlas.cz/sport/ms-fotbal/ms-fotbal-2022-katar-tipovacka-ceny__pek"
        />
        <meta
          property="og:title"
          content={`Mistrovství světa ve fotbale letos vyhraje ${vitez}!`}
        />
        <meta
          property="og:description"
          content="Tipněte si, kdo získá medaile, a vyhrajte digitální rádio!"
        />
        <meta
          property="og:image"
          content={`https://data.irozhlas.cz/fotbal-ms-tipovacka-img/${props.tip}.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@irozhlascz" />
        <meta name="twitter:creator" content="@datarozhlas" />
        <meta
          name="twitter:title"
          content={`Mistrovství světa ve fotbale letos vyhraje ${vitez}!`}
        />
        <meta
          name="twitter:image"
          content={`https://data.irozhlas.cz/fotbal-ms-tipovacka-img/${props.tip}-tw.png`}
        />
        <meta
          name="twitter:description"
          content="Tipněte si, kdo získá medaile, a vyhrajte digitální rádio!"
        />
      </Head>
      <Script>
        window.location.replace("https://www.irozhlas.cz/node/8865912")
      </Script>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const vitez = countries.find(country => {
    return context.params.tip.startsWith(country.id);
  })?.value;

  return {
    props: { tip: context.params.tip, vitez: vitez }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const paths = [];

  for (let i = 0; i < countries.length; i++) {
    const country1 = countries[i].id;
    for (let j = 0; j < countries.length; j++) {
      const country2 = countries[j].id;
      for (let k = 0; k < countries.length; k++) {
        const country3 = countries[k].id;
        for (let l = 0; l < 11; l++) {
          const goly = l.toString();
          paths.push({
            params: {
              tip: `${country1}${country2}${country3}${goly}`,
            },
          });
        }
      }
    }
  }

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}
