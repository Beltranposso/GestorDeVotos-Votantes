import React, { useEffect, useState } from "react";
import PNG from "../../assets/Logo.png";
import PNG2 from "../../assets/Espera.png";
import PNG3 from "../../assets/Bien.png";
import PNG4 from "../../assets/Error.png";
import DangerImage from "../../assets/DangerImage.png";

const MyComponent = ({ variant }) => {
  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (variant === "Espera") {
      setColor("#1B263B");
      setText("Estamos a la espera de que el anfitrión active la Asamblea");
      setImage(PNG2);
    } else if (variant === "Danger") {
      setColor("#FF0000");
      setText("Hubo un problema al procesar tu voto. Por favor, inténtalo de nuevo...");
      setImage(PNG4);
    } else if (variant === "Success") {
      setColor("#00E509");
      setText("¡Tu respuesta ha sido enviada con éxito! Gracias por tu participación.");
      setImage(PNG3);
    }
  }, [variant]);

  return (
    <div className="flex h-full w-full bg-[#F0F4F8] flex-wrap sm:flex-nowrap">
      {/* Contenedor de texto */}
      <div
        className="flex flex-col h-full justify-center items-center w-full text-white"
        style={{ backgroundColor: color }}
      >
        <div className="flex flex-col text-sm justify-center items-center h-[300px] w-5/6 gap-5">
          <div className="w-full flex justify-start">
            <img src={PNG} width={150} height={100} alt="Logo" />
          </div>
          <div className="flex flex-col w-full justify-start text-2xl xs:text-sm sm:text-4xl font-bold">
            <h1>{text}</h1>
          </div>
        </div>

        {/* Imagen adicional solo en Danger */}
        {variant === "Danger" && (
          <div className="mt-4 ml-[-30px] mr-10">
            <img src={DangerImage} alt="Imagen adicional de peligro" width={300} height={150} />
          </div>
        )}
      </div>

      {/* Contenedor de imagen y botón */}
      <div className="w-full flex flex-col justify-center items-center bg-[#F0F4F8]">
        {variant && (
          <div className="mt-8">
            {/* Imagen principal dependiendo de la variante */}
            <img src={image} alt={`${variant} image`} width={400} height={250} />
          </div>
        )}
        {variant === "Danger" && (
          <div className="mt-8">
            <button
              className="px-20 py-7 text-white font-bold text-xl rounded-full shadow-lg hover:bg-[#A30000] focus:outline-none"
              style={{ backgroundColor: "#CF0000" }}
              onClick={() => window.location.reload()}
            >
              Volver a la Votación
            </button>
          </div>
        )}
        {variant === "Success" && (
          <div className="mt-9">
            <button
              className="px-10 py-5 text-white font-bold text-lg rounded-full shadow-lg hover:bg-[#008806] focus:outline-none"
              style={{
                backgroundColor: "#00A907",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => window.location.reload()}
            >
              Ya puedes cerrar esta ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComponent;