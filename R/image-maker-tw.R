library(magick)
library(rsvg)
library(aws.s3)

countries <-
  data.frame(
    value = c(
      "qa",
      "br",
      "be",
      "fr",
      "ar",
      "gb-eng",
      "es",
      "pt",
      "mx",
      "nl",
      "dk",
      "de",
      "uy",
      "ch",
      "us",
      "hr",
      "sn",
      "ir",
      "jp",
      "ma" ,
      "rs",
      "pl",
      "kr",
      "tn",
      "cm",
      "ca",
      "ec",
      "sa",
      "gh",
      "gb-wls",
      "cr",
      "au"
    ),
    label = c(
      "Katar",
      "Brazílie",
      "Belgie",
      "Francie",
      "Argentina",
      "Anglie",
      "Španělsko",
      "Portugalsko",
      "Mexiko",
      "Nizozemsko",
      "Dánsko",
      "Německo",
      "Uruguay",
      "Švýcarsko",
      "USA",
      "Chorvatsko",
      "Senegal",
      "Írán",
      "Japonsko",
      "Maroko",
      "Srbsko",
      "Polsko",
      "J. Korea",
      "Tunisko",
      "Kamerun",
      "Kanada",
      "Ekvádor",
      "S. Arábie",
      "Ghana",
      "Wales",
      "Kostarika",
      "Austrálie"
    )
  )

tw_background <- image_read("twitter-blank.jpg", strip=TRUE)


mujBucket = get_bucket("fotbal-ms-tipovacka-img")

makeImageTw <- function(prvni, druhy, treti, goly) {
  # nedělej zbytečné obrázky

  filename = paste0(prvni$value,
                    druhy$value ,
                    treti$value,
                    goly,
                    "-tw.png")

  # if (object_exists(filename, mujBucket)) {
  #   print("existuje")
  #   return()
  # }

  if (prvni == druhy || druhy == treti || treti == prvni) {
    print("stejný")
    return()
  }

  # první vlajka
  flag <-
    image_read_svg(paste0("public/flags/", prvni$value, ".svg"), height = 45)
  result_1 <-
    image_composite(tw_background,
                    flag,
                    offset = "+0-130", gravity = "Center")

  # druhá vlajka
  flag <-
    image_read_svg(paste0("public/flags/", druhy$value, ".svg"), height = 45)
  result_2 <-
    image_composite(result_1,
                    flag,
                    offset = "-140-70", gravity = "Center")

  # třetí vlajka
  flag <-
    image_read_svg(paste0("public/flags/", treti$value, ".svg"), height = 45)
  result_3 <-
    image_composite(result_2,
                    flag,
                    offset = "+140-30", gravity = "Center")

  result_4 <-
    image_annotate(
      result_3,
      prvni$label,
      font = "Noticia Text",
      color = "white",
      location = "+0-85",
      size = 22,
      weight = 600,
      gravity = "Center"
    )

  result_5 <-
    image_annotate(
      result_4,
      druhy$label,
      font = "Noticia Text",
      color = "white",
      location = "-140-30",
      size = 22,
      weight = 600,
      gravity = "Center"
    )

  result_6 <-
    image_annotate(
      result_5,
      treti$label,
      font = "Noticia Text",
      color = "white",
      location = "+140+10",
      size = 22,
      weight = 600,
      gravity = "Center"
    )

  result_7 <-
    image_annotate(
      result_6,
      goly,
      font = "Noticia Text",
      color = "white",
      location = "+128+178",
      gravity = "Center",
      size = 24,
      weight = 600
    )

  image_write(result_7, filename)

  put_object(filename, bucket = mujBucket, show_progress=T, acl="public-read")
  file.remove(list.files(pattern = ".png"))

}



counter <- 0
for (i in 18:32) {
  for (j in 1:32) {
    for (k in 1:32) {
      for (l in 0:10) {
        makeImageTw(countries[i, ], countries[j, ], countries[k, ], l)
        counter <- counter + 1
        print(counter)
      }
    }
  }
}

