import { type SchemaTypeDefinition } from 'sanity'
import Orders from "./order"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Orders],
}
