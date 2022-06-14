const axios = require('axios').default;

export function postUser(name, sector, agreeToTerms){
    return axios.post('https://4b4f69d9-4d37-4e20-b18e-51a0c00ba22a.mock.pstmn.io/user', {
        name, sector, agreeToTerms
    })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function updateUser(id, name, sector, agreeToTerms){
    console.log("updating user")
}

export function getUserSectors(){
    return axios.get('https://4b4f69d9-4d37-4e20-b18e-51a0c00ba22a.mock.pstmn.io/sector')
        .then(function (response){
            return response.data
        })
        .catch(function (error){
            console.log({error});
        })
}