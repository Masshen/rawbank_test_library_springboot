import Crud from "./crud";
class BookService extends Crud {
  url = "books";
  destroy(id: string | number) {
    return this.axiosNoConnected.delete(`${this.url}/${id}`);
  }
  get(id: string | number) {
    return this.axiosNoConnected.get(`${this.url}/${id}`);
  }
  getAll() {
    return this.axiosNoConnected.get(`${this.url}`);
  }
  getByKey(query: string) {
    return this.axiosNoConnected.get(`${this.url}?${query}`);
  }
  store(data: any) {
    return this.axiosNoConnected.post(`${this.url}`, data);
  }
  update(id: string | number, data: any) {
    return this.axiosNoConnected.put(`${this.url}/${id}`, data);
  }
}

export default new BookService();
