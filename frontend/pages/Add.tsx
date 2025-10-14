import React, { useState,  } from "react";
import axios from "axios";
export interface Product {
  title: string;
  category?: string;
  description?: string;
  price: number;
  offerPrice: number;
  imageUrl: string;
  userId: number;
  rating?: number;
}



const ProductForm: React.FC= () => {
  const [formData, setFormData] = useState<Product>({
    
    title: "",
    category: "",
    description: "",
    price: 0,
    offerPrice: 0,
    imageUrl: "",
    userId: 0,
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:value
     
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  
     try {
      await axios.post("http://localhost:3000/api/stuff", formData);
      alert("Produit créé avec succès !");
    } catch (err) { 
      console.error(err);
      alert("Erreur lors de la création !");
    }

    // Reset form
    setFormData({
      
      title: "",
      category: "",
      description: "",
      price: 0,
      offerPrice: 0,
      imageUrl: "",
      userId: 0,
      rating: 0,
    });
    window.location.href= "localhost:5173";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Ajouter un produit</h2>
      
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Catégorie"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="offerPrice"
        placeholder="Prix promo"
        value={formData.offerPrice}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="URL de l'image"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="userId"
        placeholder="ID utilisateur"
        value={formData.userId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="rating"
        placeholder="Note (0-5)"
        value={formData.rating}
        onChange={handleChange}
        min={0}
        max={5}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
      >
        Ajouter le produit
      </button>
    </form>
  );
};

export default ProductForm;
