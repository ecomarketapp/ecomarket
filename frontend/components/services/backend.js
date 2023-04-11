import axios from 'axios';
// import { BACKEND_BASE_URL } from "../../utils/api";

const key = 'backend:api:token';

function getTokenFromPersistedStorage() {
  if (typeof window !== 'undefined') return window.localStorage.getItem(key);
}

export class Backend {
  #token = getTokenFromPersistedStorage();

  #http = axios;

  // async login(form) {
  //   const { data } = await this.#http.post("login", form);
  //   this.token = data.token;

  //   return data.user;
  // }



  async createCompany(wallet) {

    // return console.log(wallet, "company");
    const { data } = await this.#http.post(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/companies`, {wallet}
    );

    return data;
  }

  async createCollector(wallet) {
    // return console.log(wallet, "collector");

    const { data } = await this.#http.post(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/collectors`, {wallet}
    );
    return data;
  }

  async authCompany(wallet) {
    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/companies/${wallet}`
    );

    return data;
  }

  async authCollector(wallet) {
    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/collectors/${wallet}`
    );

    return data;
  }

  // Save Request
  async saveOffer(form) {
    const { data } = await this.#http.post(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/requests',
      form
    );
    if (data.success) {
      console.log('sucessfull');
    }
    return data;
  }

  // All Requests
  async listRequests(query = {}) {
    const queryParams = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');

    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/requests?${queryParams}`
    );
    return data;
  }

  // Company Requests
  async listRequestsByCompany(id) {
    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/companies/${id}/requests`
    );
    return data;
  }

  // Location Requests
  async listRequestsByLocation(id) {
    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/locations/${id}/requests`
    );
    return data;
  }

  // Single Request
  async getRequest(id) {
    const { data } = await this.#http.get(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/requests/${id}`
    );
    return data;
  }
}

const backend = new Backend();
export default backend;
