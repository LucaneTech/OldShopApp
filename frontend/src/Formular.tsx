import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    userId: "",
  });

  // Chaque fois que l'utilisateur tape, on met à jour l'état
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Quand on soumet le formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // évite le rechargement de la page

    try {
      await axios.post("http://localhost:3000/api/stuff", formData);
      alert("Produit créé avec succès !");
    } catch (err) { 
      console.error(err);
      alert("Erreur lors de la création !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="URL de l'image"
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="userId"
        placeholder="ID de l'utilisateur"
        value={formData.userId}
        onChange={handleChange}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default UserForm;
