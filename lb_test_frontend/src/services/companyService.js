import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/lb_test_project/companies/";

function companyUrl(companySlug) {
  return `${apiEndpoint}/${companySlug}`;
}

export function getCompanies() {
  return http.get(apiEndpoint);
}

export function getCompany(companySlug) {
  return http.get(companyUrl(companySlug));
}
