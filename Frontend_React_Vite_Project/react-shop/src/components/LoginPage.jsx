import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState(""); //na promenljive se postavlja pocetna vrednost ""
  const [password, setPassword] = useState(""); //definise se i ime funkcije za menjanje vrednosti promenljive
  const [error, setError] = useState("");
  const navigate = useNavigate();//koristice se za promenu urla
  const handleLogin = async (e) => {//funkcija koja se dole poziva
    e.preventDefault();//da se ne uradi reload
    setError(""); //cisti se ako ima starih gresaka

    //salje se preko axiosa post zahtev prema serveru sa vrednostima username i password
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      //ako je bilo uspesno onda za tu sesiju pamti podatke
      console.log("Login successful:", response.data);
      alert("Login successful!");
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("city", response.data.city);
      sessionStorage.setItem("phone_number", response.data.phone_number);
      //u zavisnosti od role ulogovane osobe:
      if (response.data.hasOwnProperty('pay')) {
        //worker
        sessionStorage.setItem("pay", response.data.pay);

        navigate('/worker');//prelazi na url za radnika nakon sto se ulogovao
      } else {
        // client
        sessionStorage.setItem("cart", JSON.stringify(response.data.productsInCart));
        sessionStorage.setItem("country", response.data.country);
        sessionStorage.setItem("postal_code", response.data.postal_code);
        sessionStorage.setItem("currency", response.data.currency);
        navigate('/products');//prelazi na url kada se kupac ulogovao
      }

    } catch (error) {//ako je doslo do greske
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message || "Login failed. Please try again.");
    }
  };

  return (//html koji ce biti ubacen u onaj root div
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <h1 className="text-4xl font-extrabold mb-8 text-blue-400">ONLINE SHOP</h1>
  <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">{/* funkcija koja se poziva kada se pritisne dugme */}
          <div>
            <label className="block text-sm font-medium text-blue-400 mb-1" >Username</label>
            {/* kako se bilo sta unese tako se menja vrednost promenljive ovo onChange*/}
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-400 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>

          <button
  onClick={() => navigate("/register")}
  className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200 mt-2"
>{/* promena urla, pa onda router vraca novu komponentu */}
  Register
</button>




        </form>
      </div>
    </div>
  );
}
