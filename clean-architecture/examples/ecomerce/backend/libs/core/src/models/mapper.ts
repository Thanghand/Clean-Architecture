export abstract class Mapper<D = any, P = any> {
    abstract toDomain(persistenceModel: P): D;
    abstract fromDomain(domainModel: D): P;
  }