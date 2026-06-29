import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lutiy Digital",
    short_name: "Lutiy Digital",
    description:
      "Преміальна розробка фулстек веб-застосунків та автоматизація бізнес-процесів за допомогою n8n від студії Lutiy Digital.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
