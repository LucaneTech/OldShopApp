import React, { useEffect, useState } from "react";
import HeroSection from '../components/Hero'
import axios from "axios";
import CardElement from "../components/cardProduct";
import { Link } from "react-router-dom";

export interface CardElementProps {
    _id: number
    title: string;
    category?: string;
    description?: string;
    price: number;
    offerPrice: number;
    imageUrl: string;
    userId: number;
    rating?: number;
    onAdd?: (title: string, quantity: number) => void;
}

const Home: React.FC = () => {

    const [data, setData] = useState<CardElementProps[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<CardElementProps[]>(
                    "http://localhost:3000/api/stuff"
                );
                setData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };

        fetchProducts();
    }, []);




    return (
        <>
            <HeroSection />
            <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
                Ajouter un Produit
            </Link>
            <h2 className="text-2xl font-bold mt-8">Nos Produits</h2>
            {/** Products section on grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 mt-12">
                {data.map((product) => (
                    <CardElement key={product._id} {...product} />
                ))}
            </div>


        </>
    )
}

export default Home