interface Repository<T> {
  create(entity: T): Promise<T>;
  getList(): Promise<T[]>;
}

export default Repository;