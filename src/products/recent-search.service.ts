import { Injectable } from "@nestjs/common";
import { createProductsDTO } from "./DTO/ProductsDTO";
type RecentList={
query:string;
list:createProductsDTO[]
}[]
@Injectable()
export class RecentSearchProduct{
 private store : {[key:string]:RecentList}[]=[];
 
addRecentSearch(token:string,query:string,list:createProductsDTO[]){
 
  const recentList=this.store[token]||[]
  recentList.unshift({
    query,list
  })
  this.store[token]=recentList
  
}
find(token:string){
  return this.store[token]||[]
}
findByTokenAndQuery(token: string, query: string) {
  const recentList = this.find(token);

  return recentList.filter((searchResult) =>
    searchResult.query.includes(query.toLowerCase())
  );
}
}