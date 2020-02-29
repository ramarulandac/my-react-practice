const URL = ' http://34.89.93.186:8080/apiv1'


     

export const signUp = async(username, password) => {
    
    try {
        const endpoint = `${URL}/register`;
        const response = await fetch (endpoint, {
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    'username': username,
                                                    'password': password
                                                }),
                                                headers: {
                                                    'content-type': 'application/json'
                                                },
    });
    
    const data = await response.json();
       
    return data;
} catch (err) {
    console.log(`Error fetching request..`)
    throw new Error(err);
  }
}


export const Start = async (username,password) => {

    try {
        const endpoint = `${URL}/login`;
        const response = await fetch(endpoint, {
            method:'POST',
            body:JSON.stringify({
                'username':username,
                'password':password
            }),
            headers: {
                'content-type':'application/json'
            },
            credentials:'include'
        })        
        
        const data = await response.json();

        return data;        

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}


export const getPosts = async (params) => {

    const queryparams = Object.keys(params)
    console.log(params)
    console.log(queryparams)
    
    const pathQuery = queryparams.filter(element => (params[element]!==''))
                                            .map((filter,y) =>  { return (y===0)?
                                                        `${filter.toLowerCase()}=${params[filter]}`:
                                                        `&${filter.toLowerCase()}=${params[filter]}`})
                                    .join('')

    console.log(pathQuery)
    try {
        const endpoint = `${URL}/anuncios?${pathQuery}`;
        const response = await fetch(endpoint, {
            method:'GET',
            credentials: 'include'
        })        
        
        const data = await response.json();

        return data;        

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}


