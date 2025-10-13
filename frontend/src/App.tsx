import { useEffect, useState } from 'react';
import axios from 'axios'; // ou tu peux utiliser fetch()
import UserForm from './Formular';
import AddProductForm from './test';

interface Stuff {
  _id: string,
  title: string,
  description: string,
  imageUrl: string,
  price: number,
  userId: string
}
function App() {
  const [stuff, setStuff] = useState<Stuff[]>([]);

  useEffect(() => {
    const response = async()=>{
      try{
        const res = await axios.get('http://localhost:3000/api/stuff');
        setStuff(res.data);
      }
      catch(err){
        alert(`Erreur lors de la récupération des donnees : ${err}`);
      }
    }
    response();
  }, []);

  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Liste d'objets 📦</h1>
      {stuff.length === 0 ? (
        <p>Chargement...</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {stuff.map(item => (
            <div key={item._id} className='border p-4 rounded'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <img src={item.imageUrl} alt={item.title} style={{ width: '200px' }} />
            <p>Prix : {item.price}€</p>
          </div>
          ))}
        </div>  
        )}
    </div>


    <AddProductForm />
  <UserForm/>
    </>
  );
}

export default App;
