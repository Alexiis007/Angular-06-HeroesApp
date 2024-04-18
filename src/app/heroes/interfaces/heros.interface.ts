export interface Data {
    users:  User[];
    heroes: Hero[];
}

export interface Hero {
    id:               string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_image?:        string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}

export interface User {
    id:      number;
    usuario: string;
    email:   string;
}
