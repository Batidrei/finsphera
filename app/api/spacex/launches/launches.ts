// app/api/spacex/launches/route.ts
import { SPACEX_API } from "@/lib/constants";
import { NextResponse } from "next/server";
import { Launch } from "@/app/types/spacex";

/**
 * GET handler to fetch the most recent SpaceX launches.
 * Retrieves data from the official API and returns the last 10 successful entries.
 * * @async
 * @function GET
 * @returns {Promise<NextResponse>} JSON response with an array of launches or error message.
 */
export async function GET() {
  try {
    /** @type {Response} Fetch call to SpaceX API with no-store cache policy. */
    const res = await fetch(`${SPACEX_API}/launches`, {
      cache: "no-store",
    });

    // Check if the external API request was successful
    if (!res.ok) {
      return NextResponse.json(
        { error: "Error fetching launches from SpaceX" },
        { status: 500 }
      );
    }

    /** @type {Launch[]} Complete list of launches from the source. */
    const launches: Launch[] = await res.json();

    /** @type {Launch[]} Processed list containing only the last 10 launches in reverse order. */
    const last10 = launches.slice(-10).reverse();

    return NextResponse.json(last10);
  } catch (error) {
    /** Log the error for internal server debugging. */
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}