// DATOS DE TU TIENDA
const tienda = {
  whatsapp: "526674901045",

  mensaje:
    "Hola, me interesa un conjunto deportivo de YeipiStore.",

  
  instagram: "https://www.instagram.com/yeipi_store1?stkn=MWN2bjFjZWswZ295aA==",

  tiktok: "https://www.tiktok.com/@yeipistore"
};

const enlaces = {
  whatsapp:
    "https://wa.me/" +
    tienda.whatsapp +
    "?text=" +
    encodeURIComponent(tienda.mensaje),

  instagram: tienda.instagram,
  tiktok: tienda.tiktok
};


document.querySelectorAll("[data-red]").forEach(elemento => {
  const enlace = enlaces[elemento.dataset.red];

  if (enlace) {
    elemento.href = enlace;
    elemento.target = "_blank";
    elemento.rel = "noopener noreferrer";
  } else {
    elemento.setAttribute("aria-disabled", "true");
    elemento.title = "Enlace pendiente";
  }
});


document
  .querySelector("#compartir-pagina")
  .addEventListener("click", async () => {
    const aviso = document.querySelector("#aviso");

    if (location.protocol === "file:") {
      aviso.textContent =
        "Publica la página en internet para compartir su enlace.";
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "YeipiStore",
          url: location.href
        });
      } else {
        await navigator.clipboard.writeText(location.href);
        aviso.textContent = "Enlace copiado";
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        aviso.textContent =
          "Copia el enlace desde la barra del navegador.";
      }
    }
  });