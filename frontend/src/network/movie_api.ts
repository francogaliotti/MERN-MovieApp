import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Actor } from "../models/actor";
import { Movie } from "../models/movie";
import { Genre } from "../models/genre";
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

export interface MovieInput {
    title: string,
    description: string,
    release_date: string,
    image: File[],
    genderId: string
}

export interface ActorInput {
    name: string,
    lastname: string,
    birth_date: string,
    biography: string,
    image: File[],
}

export interface GenreInput {
    name: string
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

export async function getGenders(): Promise<Genre[]> {
    const response = await fetchData(`/api/genders`, {method: "GET"});
    return await response.json();
}

export async function getActorsByMovie(id: string): Promise<Actor[]> {
    const response = await fetchData(`/api/actors/movie/${id}`, {method: "GET"});
    return await response.json();
}

export async function getMoviesByActor(id: string): Promise<Movie[]> {
    const response = await fetchData(`/api/movies/actor/${id}`, {method: "GET"});
    return await response.json();
}

export async function createMovie(movie: FormData): Promise<Movie> {
    const response = await fetchData("/api/movies", {
        method: "POST",
        body: movie
    });
    return await response.json();
}

export async function createActor(actor: FormData): Promise<Actor> {
    const response = await fetchData("/api/actors", {
        method: "POST",
        body: actor
    });
    return await response.json();
}

export async function createGenre(genre: GenreInput): Promise<Genre>{
    const response = await fetchData("/api/genders", {
        method: "POST",
        body: JSON.stringify(genre),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

export async function updateMovie(id: string, movie: FormData): Promise<Movie> {
    const response = await fetchData(`/api/movies/${id}`, {
        method: "PATCH",
        body: movie
    });
    return await response.json();
}

export async function updateActor(id: string, actor: FormData): Promise<Actor> {
    const response = await fetchData(`/api/actors/${id}`, {
        method: "PATCH",
        body: actor
    });
    return await response.json();
}

export async function deleteMovie(id: string): Promise<void> {
    await fetchData(`/api/movies/${id}`, {
        method: "DELETE"
    });
}

export async function deleteActor(id: string): Promise<void> {
    await fetchData(`/api/actors/${id}`, {
        method: "DELETE"
    });
}

