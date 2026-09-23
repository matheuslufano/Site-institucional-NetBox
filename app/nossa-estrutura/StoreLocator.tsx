"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

type Store = {
  city: string;
  shortCity: string;
  address: string;
  phone: string;
  placeId: string;
  imageSrc?: string;
  x: string;
  y: string;
};

type PlacePhotoData = {
  photoUri: string;
  authorAttributions?: Array<{ displayName?: string; uri?: string }>;
};

const stores: Store[] = [
  {
    city: "Barrolândia - TO",
    shortCity: "Barrolândia",
    address: "Av. Bernardo Sayão - Centro, Barrolândia - TO, 77665-000, Brasil",
    phone: "0800 602 2732",
    placeId: "ChIJA1L7lKR9I5MRbVAt1szFxzo",
    imageSrc: "/lojas/barrolandia.png",
    x: "48%",
    y: "55%",
  },
  {
    city: "Bom Jesus do Tocantins - TO",
    shortCity: "Bom Jesus",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJA8OrOHaFJpMRuE4Wzi6tvWI",
    x: "57%",
    y: "45%",
  },
  {
    city: "Brasilândia do Tocantins - TO",
    shortCity: "Brasilândia",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJQUUnzmVfJ5MRn08r3WnA3mw",
    imageSrc: "/lojas/brasilandia.png",
    x: "43%",
    y: "38%",
  },
  {
    city: "Colinas do Tocantins - TO",
    shortCity: "Colinas",
    address: "Avenida Pedro Ludovico Teixeira, 1152, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJQUUnzmVfJ5MRn08r3WnA3mw",
    imageSrc: "/lojas/colinas.png",
    x: "43%",
    y: "28%",
  },
  {
    city: "Colméia - TO",
    shortCity: "Colméia",
    address: "Avenida Longuinho Vieira Júnior, 470, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJm934FYkzIZMRMu_3aLyMWUc",
    imageSrc: "/lojas/colmeia.png",
    x: "40%",
    y: "43%",
  },
  {
    city: "Goianorte - TO",
    shortCity: "Goianorte",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJlzTfy9U7IZMRdKbXL6FuvMM",
    imageSrc: "/lojas/goianorte.png",
    x: "40%",
    y: "36%",
  },
  {
    city: "Guaraí - TO",
    shortCity: "Guaraí",
    address: "Rua Dr. Valdir, 1375, Bairro Planalto",
    phone: "0800 602 2732",
    placeId: "ChIJnTtNm4O5JpMRwJ74TEjr2eA",
    imageSrc: "/lojas/guarai.png",
    x: "53%",
    y: "44%",
  },
  {
    city: "Gurupi - TO",
    shortCity: "Gurupi",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJ_UsS65OVPpMR7YfAEjwZuH0",
    imageSrc: "/lojas/gurupi.png",
    x: "39%",
    y: "79%",
  },
  {
    city: "Itacajá - TO",
    shortCity: "Itacajá",
    address: "Rua Geraldo Veras, 119, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJScCGGE61J5MR3bq3RrxyRhc",
    imageSrc: "/lojas/itacaja.png",
    x: "62%",
    y: "40%",
  },
  {
    city: "Lajeado - TO",
    shortCity: "Lajeado",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJ8RyrQdxnJJMRxys-RuKW-RE",
    imageSrc: "/lojas/lajeado.png",
    x: "53%",
    y: "53%",
  },
  {
    city: "Luzimangues - TO",
    shortCity: "Luzimangues",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "",
    x: "52%",
    y: "64%",
  },
  {
    city: "Miracema do Tocantins - TO",
    shortCity: "Miracema",
    address: "Avenida Tocantins, 1644, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJ8RyrQdxnJJMRxys-RuKW-RE",
    imageSrc: "/lojas/miracema.png",
    x: "50%",
    y: "51%",
  },
  {
    city: "Miranorte - TO",
    shortCity: "Miranorte",
    address: "Avenida Tocantins, 812, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJgwn9blNxJJMRCbRPKV8hi3Q",
    imageSrc: "/lojas/miranorte.png",
    x: "47%",
    y: "51%",
  },
  {
    city: "Paraíso do Tocantins - TO",
    shortCity: "Paraíso",
    address: "Rua Bernardino Maciel, 891, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJWePgppJPI5MR72hOEa65hMU",
    imageSrc: "/lojas/paraiso.png",
    x: "43%",
    y: "63%",
  },
  {
    city: "Pedro Afonso - TO",
    shortCity: "Pedro Afonso",
    address: "Avenida Pedro Mariano dos Santos, 1078, Setor Maria Galvão",
    phone: "0800 602 2732",
    placeId: "ChIJA8OrOHaFJpMRuE4Wzi6tvWI",
    imageSrc: "/lojas/pedro-afonso.png",
    x: "60%",
    y: "45%",
  },
  {
    city: "Presidente Kennedy - TO",
    shortCity: "Presidente Kennedy",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJGUllUmwnJ5MRBs3W97itxxQ",
    imageSrc: "/lojas/presidente-kennedy.png",
    x: "45%",
    y: "41%",
  },
  {
    city: "Rio dos Bois - TO",
    shortCity: "Rio dos Bois",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJgwn9blNxJJMRCbRPKV8hi3Q",
    imageSrc: "/lojas/rio-dos-bois.png",
    x: "50%",
    y: "49%",
  },
  {
    city: "Santa Maria do Tocantins - TO",
    shortCity: "Santa Maria",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJA8OrOHaFJpMRuE4Wzi6tvWI",
    imageSrc: "/lojas/santa-maria.png",
    x: "46%",
    y: "44%",
  },
  {
    city: "Tabocão - TO",
    shortCity: "Tabocão",
    address: "Rua Vitória Regina, 112, Centro",
    phone: "0800 602 2732",
    placeId: "ChIJE26KfYCnJpMR6GRrWn2b1pk",
    imageSrc: "/lojas/tabocao.png",
    x: "50%",
    y: "46%",
  },
  {
    city: "Tocantínia - TO",
    shortCity: "Tocantínia",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJ8RyrQdxnJJMR6GRrWn2b1pk",
    imageSrc: "/lojas/tocantinia.png",
    x: "52%",
    y: "49%",
  },
  {
    city: "Tupirama - TO",
    shortCity: "Tupirama",
    address: "Endereço em atualização",
    phone: "0800 602 2732",
    placeId: "ChIJA8OrOHaFJpMRuE4Wzi6tvWI",
    imageSrc: "/lojas/tupirama.png",
    x: "63%",
    y: "45%",
  },
];

export function StoreLocator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mapZoom, setMapZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const selectedStore = stores[selectedIndex];
  const mapQuery = encodeURIComponent(`${selectedStore.city}, TO`);
  const hasStoreAddress = !selectedStore.address
    .toLowerCase()
    .startsWith("endereço em atualização");
  const googleMapsEmbedQuery = hasStoreAddress
    ? `${selectedStore.address}, ${selectedStore.city}`
    : selectedStore.city;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(googleMapsEmbedQuery)}&z=17&output=embed`;
  const mapHref = selectedStore.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}&query_place_id=${selectedStore.placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const reviewHref = selectedStore.placeId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(selectedStore.placeId)}`
    : null;

  const handleZoom = (amount: number) => {
    setZoomOrigin({ x: 50, y: 50 });
    setMapZoom((currentZoom) => Math.min(3, Math.max(1, currentZoom + amount)));
  };

  return (
    <section
      className="store-locator-section"
      aria-labelledby="store-locator-title"
    >
      <div className="model-shell">
        <div className="model-heading store-locator-heading">
          <small>Presença local</small>
          <h2 id="store-locator-title">Encontre uma loja Netbox.</h2>
          <p>Escolha um ponto no mapa para consultar endereço e contato.</p>
        </div>

        <div className="store-locator">
          <div
            className="store-map-panel"
            aria-label="Mapa ilustrativo das lojas Netbox no Tocantins"
          >
            <div className="store-map-topline">
              <div className="store-map-title">
                <span>TOCANTINS</span>
                <img
                  className="store-map-flag"
                  src="/bandeira-tocantins.jpg"
                  alt="Bandeira do Tocantins"
                />
              </div>
              <b>{stores.length} lojas</b>
            </div>
            <div
              className="store-map-canvas"
              aria-label="Mapa com zoom das lojas Netbox"
            >
              <div
                className="store-map-controls"
                aria-label="Controles de zoom do mapa"
              >
                <button
                  type="button"
                  onClick={() => handleZoom(0.25)}
                  disabled={mapZoom >= 3}
                  aria-label="Aumentar zoom"
                  title="Aumentar zoom"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-0.25)}
                  disabled={mapZoom <= 1}
                  aria-label="Diminuir zoom"
                  title="Diminuir zoom"
                >
                  −
                </button>
              </div>
              <div
                className="store-map-zoom-layer"
                style={{
                  transform: `scale(${mapZoom})`,
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
              >
                <img
                  className="store-map-image"
                  src="/mapa-tocantins-editavel.svg"
                  alt="Mapa do Tocantins"
                />
                {stores.map((store, index) => (
                  <button
                    className={`store-map-pin${selectedIndex === index ? " is-selected" : ""}`}
                    key={store.city}
                    type="button"
                    style={
                      {
                        left: store.x,
                        top: store.y,
                        "--pin-scale": 1 / mapZoom,
                      } as CSSProperties
                    }
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Selecionar loja de ${store.city}`}
                    aria-pressed={selectedIndex === index}
                    title={store.city}
                  >
                    <span aria-hidden="true" />
                    <b className="store-map-tooltip" aria-hidden="true">
                      {store.shortCity}
                    </b>
                  </button>
                ))}
              </div>
            </div>
            <div className="store-map-legend">
              <span />
              <small>Selecione um ponto para ver os detalhes</small>
            </div>
          </div>

          <article className="store-detail-panel" aria-live="polite">
            <div className="store-detail-photo">
              <GooglePlacePhoto
                key={selectedStore.city}
                store={selectedStore}
              />
              <span className="store-detail-photo-label">Loja Netbox</span>
            </div>
            <div className="store-detail-content">
              <small>Loja selecionada</small>
              <h3>{selectedStore.city}</h3>
              <p className="store-detail-line">
                <IoLocationOutline aria-hidden="true" />
                {selectedStore.address}
              </p>
              <p className="store-detail-line">
                <IoCallOutline aria-hidden="true" />
                {selectedStore.phone}
              </p>
              <div className="store-detail-map">
                <iframe
                  key={selectedStore.city}
                  src={googleMapsEmbedUrl}
                  title={`Mapa da Netbox em ${selectedStore.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="fullscreen"
                />
              </div>
              <div className="store-detail-actions">
                <a
                  className="model-button yellow"
                  href={mapHref}
                target="_blank"
                rel="noreferrer"
              >
                <FaRegEye aria-hidden="true" />
                Ver no mapa
              </a>
                {reviewHref ? (
                  <a
                    className="model-button orange"
                    href={reviewHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ⭐ Avaliar no Google
                  </a>
                ) : (
                  <span
                    className="model-button orange store-review-unavailable"
                    aria-disabled="true"
                    title="Avaliação indisponível para esta loja"
                  >
                    ⭐ Avaliar no Google
                  </span>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function GooglePlacePhoto({ store }: { store: Store }) {
  const fallback = "/structure/loja-netbox.png";
  const [photo, setPhoto] = useState<PlacePhotoData | null>(null);

  useEffect(() => {
    let active = true;

    if (store.imageSrc || !store.placeId) {
      setPhoto(null);
      return () => {
        active = false;
      };
    }

    setPhoto(null);
    fetch(`/api/place-photo?placeId=${encodeURIComponent(store.placeId)}`)
      .then(async (response) =>
        response.ok ? ((await response.json()) as PlacePhotoData) : null,
      )
      .then((data) => {
        if (active) setPhoto(data);
      })
      .catch(() => {
        if (active) setPhoto(null);
      });

    return () => {
      active = false;
    };
  }, [store.imageSrc, store.placeId]);

  const attribution = photo?.authorAttributions?.[0];
  const imageSrc = store.imageSrc ?? photo?.photoUri ?? fallback;

  return (
    <>
      <Image
        src={imageSrc}
        alt={`Foto da loja Netbox em ${store.city}`}
        fill
        unoptimized
        sizes="(max-width: 760px) calc(100vw - 56px), 38vw"
        onError={(event) => {
          event.currentTarget.src = fallback;
        }}
      />
      {attribution?.displayName && (
        <a
          className="store-detail-photo-credit"
          href={attribution.uri || "https://www.google.com/maps"}
          target="_blank"
          rel="noreferrer"
        >
          Foto: {attribution.displayName}
        </a>
      )}
    </>
  );
}
