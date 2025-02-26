import { Empresa } from "../types/types";
import { fetchAPI } from "./api";

export const empresaService = {
  findAll: async (): Promise<Empresa[]> => {
    return await fetchAPI('/empresas');
  },
  findOne: async (id_empresa: number): Promise<Empresa> => {
    return await fetchAPI(`/empresas/${id_empresa}`);
  },
  create: async (data: Partial<Empresa>): Promise<Empresa> => {
    return await fetchAPI('/empresas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id_empresa: number, data: Partial<Empresa>): Promise<Empresa> => {
    return await fetchAPI(`/empresas/${id_empresa}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  remove: async (id_empresa: number): Promise<void> => {
    return await fetchAPI(`/empresas/${id_empresa}`, {
      method: 'DELETE',
    });
  },
};
