export class Configuration {
    apiKey: string = "57c3d915d9a3900a1b5ec39f43e1c28b";
    username: string;
    password: string;
    accessToken: string | (() => string);
}
