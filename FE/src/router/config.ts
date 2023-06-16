import path from "path";
import QueryString from "qs";

const HOME_PATH = '/home';
export const withHome = (path: string) => `${HOME_PATH}/${path}`;

export const ROUTES = {
    ROOT: `${HOME_PATH}/`,
    RESULTS: withHome('results'),
}

export default ROUTES;