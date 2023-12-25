import axios from 'axios'



// const login = async (username = "", email = "", password = "") => {

//     try {
//         if ((!username || !email) && !password) return alert('All credential required')

//         const user = await axios.post(`https://purple-fireman-gaols.pwskills.app:3000/api/v1/user/login`, { username, email, password })
//         console.log(user.data);

//     } catch (error) {
//         // console.log(res)
//         alert("Login failed")
//     }
// }


export { login }