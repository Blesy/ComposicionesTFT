extern crate serde_json;
extern crate serde;

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;

#[derive(Debug, Serialize, Deserialize)]
struct Heroes {
    nombre: String,
    rasgo1: String,
    rasgo2: String,
    rasgo3: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Rasgos {
    contador: i32,
    oro: i32,
    plata: i32,
    bronce: i32,
    espatula: bool,
}

fn main() {
    let lista: HashMap<String, Heroes> = serde_json::from_str(&fs::read_to_string("./datos/lista.json").unwrap()).unwrap();
    let mut rasgos: HashMap<String, Rasgos> = serde_json::from_str(&fs::read_to_string("./datos/rasgos2.json").unwrap()).unwrap();

    // ...

    // Resto de la lógica del programa aquí, necesitarás reescribir la mayoría de las funciones para que funcionen en Rust.
    // La programación en Rust es muy diferente de TypeScript y no puedes copiar directamente la lógica de un lenguaje a otro.

    let json = serde_json::to_string(&rasgos).unwrap();
    fs::write("./salida/data.json", json).expect("Unable to write file");
}
