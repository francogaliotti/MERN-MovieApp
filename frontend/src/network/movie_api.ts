import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Actor } from "../models/actor";
import { Movie } from "../models/movie";
import { Gender } from "../models/gender";
import { ActorMovie } from "../models/actorMovie";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = await errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw new Error(errorMessage);
        }

    }
}

export async function getMovies(): Promise<Movie[]> {
    const response = await fetchData("/api/movies", {method: "GET"});
    return await response.json();
}

export async function getMovie(id: string): Promise<Movie> {
    const response = await fetchData(`/api/movies/${id}`, {method: "GET"});
    return await response.json();
}

export async function getActors(): Promise<Actor[]> {
    const response = await fetchData("/api/actors", {method: "GET"});
    return await response.json();
}

export async function getActor(id: string): Promise<Actor> {
    const response = await fetchData(`/api/actors/${id}`, {method: "GET"});
    return await response.json();
}

export async function getGenders(): Promise<Gender[]> {
    const response = await fetchData(`/api/genders`, {method: "GET"});
    return await response.json();
}

export async function getActorsByMovie(id: string): Promise<Actor[]> {
    const response = await fetchData(`/api/actors/movie/${id}`, {method: "GET"});
    return await response.json();
}