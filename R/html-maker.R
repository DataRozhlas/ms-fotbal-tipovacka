library(aws.s3)

countries <-
  data.frame(
    value = c(
      "be",
      "it",
      "ru",
      "pl",
      "ua",
      "es",
      "fr",
      "tr",
      "gb-eng",
      "cz",
      "fi",
      "se",
      "hr",
      "at",
      "nl",
      "de",
      "pt",
      "ch",
      "dk",
      "gb-wls",
      "mk",
      "hu",
      "sk",
      "gb-sct"
    ),
    label = c(
      "Belgie",
      "Itálie",
      "Rusko",
      "Polsko",
      "Ukrajina",
      "Španělsko",
      "Francie",
      "Turecko",
      "Anglie",
      "Česko",
      "Finsko",
      "Švédsko",
      "Chorvatsko",
      "Rakousko",
      "Nizozemsko",
      "Německo",
      "Portugalsko",
      "Švýcarsko",
      "Dánsko",
      "Wales",
      "S. Makedonie",
      "Maďarsko",
      "Slovensko",
      "Skotsko"
    )
  )

makeHTML <- function (prvni, druhy, treti, goly) {
  if (prvni == druhy || druhy == treti || treti == prvni) {
    print("stejný")
    return()
  }
writeLines(paste0('<!DOCTYPE html>
<meta charset="UTF-8" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.irozhlas.cz/node/8506137" />
<meta property="og:title" content="Fotbalové EURO letos vyhraje ',prvni$label,'" />
<meta
  property="og:description"
  content="Tipněte si, jak dopadne EURO a vyhrajte digitální rádio!"
/>
<meta
  property="og:image"
  content="https://d1nbm95z8kbfuw.cloudfront.net/fb/',paste0(prvni$value,druhy$value,treti$value,goly),'.png"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="628" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@irozhlascz" />
<meta name="twitter:creator" content="@datarozhlas" />
<meta name="twitter:title" content="Fotbalové EURO letos vyhraje ',prvni$label,'" />
<meta
  name="twitter:description"
  content="Tipněte si, jak dopadne EURO a vyhrajte digitální rádio!"
/>
<meta
  name="twitter:image"
  content="https://d1nbm95z8kbfuw.cloudfront.net/tw/',paste0(prvni$value,druhy$value,treti$value,goly),'.png"
/>
<script>
  window.location.replace("https://www.irozhlas.cz/node/8506137");
</script>'),  paste0("html/", paste0(prvni$value,druhy$value,treti$value,goly), ".html")) }

counter <- 0
for (i in 1:24) {
  for (j in 1:24) {
    for (k in 1:24) {
  #    for (l in 1:10) {
        makeHTML(countries[i, ], countries[j, ], countries[k, ], 0)
        counter <- counter + 1
        print(counter)
   #   }
    }
  }
}
  