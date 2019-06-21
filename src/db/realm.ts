import { Schema } from "./schema";
import * as Realm from "realm";

/**Global where we keep the reference to the open Realm database */
let activeRealm: Realm;

/**
 * @abstract
 * Creates or opens local Real database. Returns the created real as a result
 * @description
 * We can only open the Realm once, so first we check if one is already active.
 * */
export async function openRealm() {
  if (activeRealm) {
    return activeRealm;
  }
  activeRealm = await Realm.open({
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
    schema: Schema
  });

  return activeRealm;
}
