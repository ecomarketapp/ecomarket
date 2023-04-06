import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/api";

const key = "backend:api:token";

function getTokenFromPersistedStorage() {
  if (typeof window !== "undefined") return window.localStorage.getItem(key);
}

export class Backend {
  #token = getTokenFromPersistedStorage();

  #http = axios;

  
  // .create({
  //   baseURL: BACKEND_BASE_URL,
    // headers: {
    //   Authorization: this.#token ? `Bearer ${this.#token}` : undefined,
    // },
  // });

  // set token(value) {
  //   localStorage.setItem(key, value);
  //   this.#token = value;
  //   this.#http.defaults.headers["Authorization"] = value
  //     ? `Bearer ${this.#token}`
  //     : undefined;
  // }

  // async login(form) {
  //   const { data } = await this.#http.post("login", form);
  //   this.token = data.token;

  //   return data.user;
  // }

  // async authUser() {
  //   const { data } = await this.#http.get("authentication/show");

  //   return data;
  // }

  async saveOffer(form) {
    console.log(form, "form in backend")
    const { data } = await this.#http.post(BACKEND_BASE_URL + "/requests", form);
    if(data.success){
      console.log('sucessfull');
    }
    return data;
  }

  async storeAgency(form) {
    const { data } = await this.#http.post("agency/store", form);

    return data;
  }

  async searchAgency(query) {
    const { data } = await this.#http.get(`agency/search?query=${query}`);
    return data;
  }

  async storeInvoice(form) {
    const { data } = await this.#http.post("invoice/store", form);
    return data;
  }

  async getInvoice(id) {
    const { data } = await this.#http.get(`invoice/${id}`);
    return data;
  }

  async listInvoices(query = {}) {
    const queryParams = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    const { data } = await this.#http.get(`invoice/all?${queryParams}`);
    return data;
  }

  async listActiveInvoices(query = {}) {
    const queryParams = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    const { data } = await this.#http.get(`invoice/active/all?${queryParams}`);
    return data;
  }

  async getActiveInvoice(id) {
    const { data } = await this.#http.get(`invoice/${id}/active`);
    return data;
  }

  async lenderInvoiceStats() {
    const { data } = await this.#http.get(`lender/contribution/stats`);
    return data;
  }

  async listLenderContribution() {
    const { data } = await this.#http.get(`lender/contribution/list`);
    return data;
  }

  async adminInvoiceStats() {
    const { data } = await this.#http.get("/invoice/stats");
    return data;
  }
}

const backend = new Backend();
export default backend;
