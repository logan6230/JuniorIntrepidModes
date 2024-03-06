import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    console.log(file);
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target!.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      axios
        .post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("No se ha seleccionado ninguna imagen");
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{ background: "red" }}>
          Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
        </p>
      </div>
      {imageUrl && <img src={imageUrl} alt="Vista previa de la imagen" />}{" "}
      <button onClick={handleSubmit}>Subir imagen</button>
    </div>
  );
};

export default UploadImage;
