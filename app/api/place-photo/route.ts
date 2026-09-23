import { NextResponse } from "next/server";

type PlacePhotoResponse = {
  photoUri?: string;
  authorAttributions?: Array<{
    displayName?: string;
    uri?: string;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json({ error: "Foto do local indisponível" }, { status: 404 });
  }

  try {
    const detailsResponse = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?fields=photos&key=${encodeURIComponent(apiKey)}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );

    if (!detailsResponse.ok) {
      return NextResponse.json({ error: "Não foi possível consultar o local" }, { status: 404 });
    }

    const details = (await detailsResponse.json()) as { photos?: Array<PlacePhotoResponse & { name?: string }> };
    const photo = details.photos?.[0];

    if (!photo?.name) {
      return NextResponse.json({ error: "O local não possui fotos" }, { status: 404 });
    }

    const mediaResponse = await fetch(
      `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=1200&skipHttpRedirect=true&key=${encodeURIComponent(apiKey)}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );

    if (!mediaResponse.ok) {
      return NextResponse.json({ error: "Não foi possível carregar a foto" }, { status: 404 });
    }

    const media = (await mediaResponse.json()) as PlacePhotoResponse;
    if (!media.photoUri) {
      return NextResponse.json({ error: "Foto do local indisponível" }, { status: 404 });
    }

    return NextResponse.json({
      photoUri: media.photoUri,
      authorAttributions: photo.authorAttributions ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Erro ao consultar a foto do local" }, { status: 500 });
  }
}
