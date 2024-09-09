// spacex.ts
import {type Doc, type APISpaceXResponse} from '../types/api'

export const getLaunchBy = async ({ id }: { id: string }) => {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
    const launch = (await res.json()) as Doc;
    return launch;
}

export const getLatestLaunches = async (page = 1, pageSize = 9) => {
    const res = await fetch('https://api.spacexdata.com/v5/launches/query', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: {},
            options: {
                sort: {
                    date_unix: 'asc'
                },
                limit: pageSize,  // Cuántos lanzamientos quieres obtener
                page: page,   // La página que quieres obtener
            }
        })
    });

    const { docs: launches, totalDocs } = (await res.json()) as APISpaceXResponse;
    return { launches, totalDocs };
}
