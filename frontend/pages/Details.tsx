import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/stuff/${id}`);
        if (!response.ok) throw new Error("Produit introuvable");
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!product) return;
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = async () => {
    if (!product) return;
    try {
      const response = await fetch(`http://localhost:3000/api/stuff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Erreur lors de la mise à jour");
      alert("Produit modifié avec succès !");
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tu es sûr de vouloir supprimer ce produit ?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://localhost:3000/api/stuff/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      alert("Produit supprimé !");
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Aucun produit trouvé.</p>;

  return (
    <div style={{ padding: "20px" }}>
      {isEditing ? (
        <>
          <h2>Modifier le produit</h2>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nom du produit"
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Prix"
            style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
          />
          <button
            onClick={handleUpdate}
            style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", borderRadius: "8px" }}
          >
            Enregistrer
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "10px", padding: "10px", borderRadius: "8px" }}
          >
            Annuler
          </button>
        </>
      ) : (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong>{product.price} €</strong>
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ maxWidth: "300px", marginTop: "10px" }}
            />
          )}

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", borderRadius: "8px" }}
            >
              Modifier
            </button>
            <button
              onClick={handleDelete}
              style={{ marginLeft: "10px", backgroundColor: "crimson", color: "white", padding: "10px", border: "none", borderRadius: "8px" }}
            >
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
