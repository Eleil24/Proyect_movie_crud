import { useState } from "react";
import { loginUser } from "../services/authService";
import { Mail, Lock, Clapperboard} from "lucide-react";

export default function LoginView({ onLoginSuccess }) {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = await loginUser(correo, password);
      console.log("Token recibido:", token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Payload del token:", payload);

      // const now = Date.now();
      // const expira = payload.exp * 1000;
      // const minutosRestantes = (expira - now) / 1000 / 60;

      // console.log("Token expira en:", minutosRestantes.toFixed(2), "minutos");
      // console.log("Hora actual:", new Date(now).toLocaleTimeString());
      // console.log("Token expira a las:", new Date(expira).toLocaleTimeString());

      const userAuth = { token };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));

      onLoginSuccess(userAuth);
    } catch (error) {
      setErrorMsg(error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-black flex justify-center items-center p-4 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl">
            <Clapperboard size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">PelisMax</h1>
        </div>

        <div className="bg-gray-900/80 rounded-3xl shadow-2xl p-8 border border-gray-800">

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Iniciar Sesión
          </h2>

          <div className="space-y-5">

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition duration-300 transform hover:scale-105"
            >
              Ingresar al Sistema
            </button>

          </div>
        </div>
      </div>
    </div>
  );


  // return (
  //   <div className="min-h-screen bg-base-200 flex justify-center items-center p-4">
  //     <div className="card w-96 bg-base-100 shadow-xl p-6">

  //       <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

  //       {errorMsg && (
  //         <p className="text-red-500 text-center mb-3">{errorMsg}</p>
  //       )}

  //       <form onSubmit={handleSubmit} className="space-y-4">

  //         <input
  //           type="text"
  //           placeholder="Correo"
  //           className="input input-bordered w-full"
  //           value={correo}
  //           onChange={e => setCorreo(e.target.value)}
  //         />

  //         <input
  //           type="password"
  //           placeholder="Contraseña"
  //           className="input input-bordered w-full"
  //           value={password}
  //           onChange={e => setPassword(e.target.value)}
  //         />

  //         <button className="btn btn-primary w-full">
  //           Ingresar
  //         </button>
  //       </form>

  //     </div>
  //   </div>
  // );
}

