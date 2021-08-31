interface Service<T> {
  create(name: string, score: number): Promise<T>;
  getList(): Promise<T[]>;
}

export default Service;