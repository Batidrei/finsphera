// app/api/spacex/launches/route.ts
import { SPACEX_API } from "@/lib/constants";
import { NextResponse } from "next/server";
import { Launch } from "@/app/types/spacex";

export async function GET() {
  try {
    const res = await fetch(`${SPACEX_API}/launches`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error obteniendo lanzamientos" },
        { status: 500 }
      );
    }

    const launches: Launch[] = await res.json();

    const last10 = launches.slice(-10).reverse();

    return NextResponse.json(last10);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error de servidor" },
      { status: 500 }
    );
  }
}