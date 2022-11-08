library(magick)
library(rsvg)
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

tw_background <- image_read("twitter-blank.png")


makeImageTw <- function(prvni, druhy, treti, goly) {
  # nedělej zbytečné obrázky
  
  if (prvni == druhy || druhy == treti || treti == prvni) {
    print("stejný")
    return()
  }
  
  # první vlajka
  flag <-
    image_read_svg(paste0("flags/", prvni$value, ".svg"), height = 45)
  result_1 <-
    image_composite(tw_background,
                    flag,
                    offset = "+0-95", gravity = "Center")
  
  # druhá vlajka
  flag <-
    image_read_svg(paste0("flags/", druhy$value, ".svg"), height = 45)
  result_2 <-
    image_composite(result_1,
                    flag,
                    offset = "-140-35", gravity = "Center")
  
  # třetí vlajka
  flag <-
    image_read_svg(paste0("flags/", treti$value, ".svg"), height = 45)
  result_3 <-
    image_composite(result_2,
                    flag,
                    offset = "+140+5", gravity = "Center")
  
  result_4 <-
    image_annotate(
      result_3,
      prvni$label,
      font = "Arial",
      color = "white",
      location = "+0-45",
      size = 22,
      weight = 600,
      gravity = "Center"
    )
  
  result_5 <-
    image_annotate(
      result_4,
      druhy$label,
      font = "Arial",
      color = "white",
      location = "-140+10",
      size = 22,
      weight = 600,
      gravity = "Center"
    )
  
  result_6 <-
    image_annotate(
      result_5,
      treti$label,
      font = "Arial",
      color = "white",
      location = "+140+50",
      size = 22,
      weight = 600,
      gravity = "Center"
    )
  
  result_7 <-
    image_annotate(
      result_6,
      goly,
      font = "Arial",
      color = "white",
      location = "+120+206",
      gravity = "Center",
      size = 24,
      weight = 600
    )
  
  put_object(image_write(result_7,
                         paste0(prvni$value,
                                druhy$value ,
                                treti$value,
                                goly,
                                ".png")), bucket = "fotbal-euro-tipovacka/tw")
  
}

counter <- 0
for (i in 1:24) {
  for (j in 1:24) {
    for (k in 1:24) {
      for (l in 1:10) {
        makeImageTw(countries[i, ], countries[j, ], countries[k, ], l)
        counter <- counter + 1
        print(counter)
      }
    }
  }
}
