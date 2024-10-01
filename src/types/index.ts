export type  Guitar = {
    id: number
    name: string
    image: string    
    description: string
    price: number
}

// Extendemos un tipo desde otro

export type  CartItem = Guitar & {
    quantity: number
}

//export type GuitarID = Guitar['id']

// Usamos pick para seleccionar algunos atributos
/*export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
    quantity: number
}*/

// Omit es lo contrario de Pick, quita atributos
/* export type CartItem = Omit<Guitar, 'image' | 'description'> & {
    quantity: number
}*/