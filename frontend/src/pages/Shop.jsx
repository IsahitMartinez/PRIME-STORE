import Navbar from "../components/Navbar";
import batman1 from "../assets/batman1.jpeg";
import pants from "../assets/pants.jpeg";
import oversizemundo from "../assets/oversizemundo.jpeg";
import YouglaSpartan from "../assets/YounglaSpartan.jpeg";
import topyoungla from "../assets/topyoungla1.jpeg";
import Superman1 from "../assets/Superman1.jpeg";
import GymsharkBasicLicra from "../assets/GymsharkBasicLicra.jpeg";
import BatmanMangaLarga from "../assets/BatmanMangaLarga.jpeg";



const Products = [
    {
      id: 1,
      nombre: "Oversize Mundo",
      precio: "435 $",
      categoria: "Oversize",
      image: oversizemundo,

    },
    {
        id: 2,
        nombre: "Batman Compresion",
        precio: "460 $",
        categoria: "Compresion",
        image: batman1,
    },
    {
        id: 3,
        nombre: "Pants YoungLA",
        precio: "400 $",
        categoria: "Pants",
        image: pants,
    },
    {    

        id:4,
        nombre: "Batman manga larga",
        precio: "480 $",
        categoria: "Compresion",
        image: BatmanMangaLarga,
    },
    {
        id:5,
        nombre: "Top YoungLA",
        precio: "360 $",
        categoria: "Tops",
        image: topyoungla,
    },
    {
        id:6,
        nombre: "Licra Gymshark Basic",
        precio: "280 $",
        categoria: "Licras",
        image: GymsharkBasicLicra,
    },
    {

        id:7,
        nombre: "Pants Spartan Gymshark",
        precio: "420 $",
        categoria: "Pants",
        image: YouglaSpartan,
    },
    {
        id:8,
        nombre: "Superman Compresion",
        precio: "450 $",
        categoria: "Compresion",
        image: Superman1,
    }
    
];

function Shop() {
    return (


    <div className="min-h-screen bg-[#fefefc] p-20"> {/* Contenedor principal con fondo claro y padding */  }
         <Navbar /> {/* Navbar en la parte superior */ }
      <h1
        className="text-7xl text-black mt-10" 
        style={{ fontFamily: "Bebas Neue" }}
      >
        SHOP
      </h1>

      <p className="text-xl text-gray-500 mt-4"> {/* Descripción de la tienda */ }
     Explora y adquiere comodidad con estilo
        </p> 

        <div className="grid grid-cols-3 gap-10 mt-10"> {/* Grid para mostrar los productos */ }
            {Products.map((product) => ( /* Mapeo de los productos para mostrarlos en la tienda */ 
                <div key={product.id} className="bg-white p-4 shadow-md">
                    <img src={product.image} alt={product.nombre} className="w-full h-80 object-cover rounded-3xl mb-5" />
                    <h2 className="text-xl font-bold">{product.nombre}</h2>
                    <p className="text-lg text-green-500">{product.precio}</p>
                    <p className="text-sm text-gray-500">{product.categoria}</p>
                     <button className="mt-5 w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition">
              AGREGAR AL CARRITO
            </button>
                </div>
            
            
            ))}
            
        </div>
    </div>

    );
}

export default Shop;

