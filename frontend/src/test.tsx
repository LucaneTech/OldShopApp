import { useState } from "react";
import axios from "axios";

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append("upload_preset", "preset_cloudinary"); // ton preset Cloudinary

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ton_nom_de_compte/image/upload",
      formDataImg
    );
    setFormData({ ...formData, imageUrl: res.data.secure_url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produit à enregistrer :", formData);
    // ici tu appelles ton API backend pour insérer dans MongoDB
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nom du produit" onChange={handleChange} />
      <input type="number" name="price" placeholder="Prix" onChange={handleChange} />
      <input type="file" onChange={handleImageUpload} />
      <button type="submit">Ajouter</button>
    </form>
  );
}


export default AddProductForm;