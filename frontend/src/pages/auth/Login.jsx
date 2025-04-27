// import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
// import { GoogleLogin } from '@react-oauth/google';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import logo from './../../assets/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';




// export default function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     toast.success('Connexion réussie !');
//     // axios.post('/api/login', data)... 
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0927EB] to-[#00C6FB]">
//       <div className="bg-white p-8  rounded-xl shadow-lg w-full max-w-sm">
//         {/* Logo minimaliste */}
//         <div className="flex justify-center mb-2">
//           <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
//             <img src={logo}  className="rounded-xl w-full h-full object-contain " alt="logo"/>
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-center pb-4 text-gray-800">Connexion</h1>

//         {/* Formulaire */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Champ Email */}
//           <div className="space-y-1">
//         <label htmlFor="email" className="block  italic text-sm font-medium text-gray-700">
//             Email 
//         </label>
//         <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <EnvelopeIcon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//             id="email"
//             {...register('email', { required: 'Email obligatoire' })}
//             type="email"
//             placeholder="exemple@domain.com"
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
//             />
//         </div>
//         {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//         )}
//         </div>
//           {/* Champ Mot de passe */}
//           <div className="space-y-1">
//         <label htmlFor="email" className="block normal-case italic text-sm font-medium text-gray-700">
//             Mot de passe
//         </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <LockClosedIcon className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               {...register('password', { required: 'Mot de passe obligatoire' })}
//               type="password"
//               placeholder="Mot de passe"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
//           </div>
//           </div>

//           {/* Bouton Submit */}
//           <button
//             type="submit"
//             className="w-full bg-[#0927EB] text-white py-2.5 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//             </svg>
//             Se connecter
//           </button>
//         </form>

//         {/* Options supplémentaires */}
       
//         <div className="mt-5 flex items-center justify-between">
//   <div className="flex items-center">
//     <input 
//       id="remember-me" 
//       name="remember-me" 
//       type="checkbox" 
//       className="h-4 w-4 text-[#0927EB] focus:ring-[#0927EB] border-[#0927EB] rounded"
//     />
//     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//       Remember me
//     </label>
//   </div>
  
//   <div className="text-sm">
//     <a href="/forgot-password" className="text-[#0927EB] hover:underline">
//       Mot de passe oublié ?
//     </a>
//     </div>
//     </div>


//         {/* Séparateur */}
//         <div className="flex items-center my-5">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-3 text-gray-500 text-sm">ou</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         {/* Lien vers Register */}
//         <p className="text-center text-sm text-gray-600">
//           Pas de compte ? <a href="/register" className="text-[#0927EB] font-medium hover:underline">S'inscrire</a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useForm } from 'react-hook-form';
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from './../../assets/logo.png';
import { authService } from '../../services/auth';

export default function Login() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
      const result = await authService.login(data);
      
      if (result.success) {
        toast.success(result.message);

          // Redirection en fonction du rôle
          switch(result.user.role) {
            case 'RA':
              navigate('/radash');
              break;
            case 'rs':
              navigate('/rsdash');
              break;
            case 'Enseignant':
              navigate('/enseignant-dashboard');
              break;
            case 'Etudiant':
              navigate('/etudash');
              break;
            default:
              navigate('/');
          }
          
        }}
         catch (error) {
          toast.error(error.message || 'Échec de la connexion');
        } 
       
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-open bg-gradient-to-br from-[#0927EB] to-[#00C6FB]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
            <img src={logo} className="rounded-xl w-full h-full object-contain" alt="logo"/>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center pb-4 text-gray-800">Connexion</h1>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Champ Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block italic text-sm font-medium text-gray-700">
              Email 
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                {...register('email', { 
                  required: 'Email obligatoire',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email invalide'
                  }
                })}
                type="email"
                placeholder="exemple@domain.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1">
            <label htmlFor="password" className="block normal-case italic text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('password', { 
                  required: 'Mot de passe obligatoire',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 caractères'
                  }
                })}
                type="password"
                placeholder="Mot de passe"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Bouton Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#0927EB] text-white py-2.5 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Se connecter
              </>
            )}
          </button>
        </form>

        {/* Options supplémentaires */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              className="h-4 w-4 text-[#0927EB] focus:ring-[#0927EB] border-[#0927EB] rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>
          
          <div className="text-sm">
            <a href="/forgot-password" className="text-[#0927EB] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        {/* Lien vers Register */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Pas de compte ? <a href="/register" className="text-[#0927EB] font-medium hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}