// // jwtUtils.js
// import jwt from 'jsonwebtoken';

// class JwtToken {
//   constructor() {
//     this.secretKey = 'manoj@ayush-ayansh-2021';
//     this.user = "";
//   }

//   isTokenExpired = () => {
//     let token = sessionStorage.getItem('userInfo');
//     if (!token) {
//       return false;
//     }
//     jwt.verify(token, this.secretKey, (err, decoded) => {
//       if (err) {
//         return false;
//       }
//       this.user = decoded;
//       return true;
//     });
//   };

//   isAdmin = async () => {
//     try {
//       await jwtToken.isTokenExpired(); // await the asynchronous function
//       if (this.user !== "") {
//         const user = JSON.parse(this.user);
//         return user.isAdmin || false;
//       }
//     } catch (err) {
//       console.log('admin checking -->', err);
//       return false;
//     }
//   };
// }

// const jwtToken = new JwtToken();

// export default jwtToken;
