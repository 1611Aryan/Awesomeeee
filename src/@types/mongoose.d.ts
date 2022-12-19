declare module "mongoose" {
  interface DocumentQuery<
    ResultType,
    DocType extends import("mongoose").Document,
    THelpers = {}
  > {
    mongooseCollection: {
      name: any
    }
    useCachedProfile: boolean
    cacheProfileById(id: string): Query<ResultType, DocType & THelpers>
    id: string
    deleteCacheById(id: string): Query<ResultType, DocType & THelpers>
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> {}
}
