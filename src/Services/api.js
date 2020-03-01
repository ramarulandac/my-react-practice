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
    
    return await response.json();    
   

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
        
        return await response.json();        

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}


export const getPosts = async (params) => {

    
    const queryparams = Object.keys(params)
    const pathQuery = queryparams.filter(element => (params[element]!=='') && !element.includes('Price'))
                                            .map((filter,y) =>  { return (y===0)?
                                                        `${filter.toLowerCase()}=${params[filter]}`:
                                                        `&${filter.toLowerCase()}=${params[filter]}`}).join('')    

    
    const pathPrice = `&price=${params['minPrice']}-${params['maxPrice']}`
                                    
                                    
                                                        
                                    
    try {
        const endpoint = `${URL}/anuncios?${pathQuery}${pathPrice}`;
        console.log(endpoint)
        const response = await fetch(endpoint,{
            method:'GET',
            credentials: 'include'
        })        
        
        return await response.json();      

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}

export const getPost = async (id) => {    
    
    try {
        const endpoint = `${URL}/anuncios/${id}`;
        const response = await fetch(endpoint, {
            method:'GET',
            credentials: 'include'
        })        
        
        return await response.json();      

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}




export const getUpdate= async (id,post) => {    

    const {name, price, description,foto,venta, tag} = post
    
    try {
        const endpoint = `${URL}/anuncios?id=${id}`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'name': name,
                'price': price,
                'description':description,
                'type':venta,
                'photo':foto,
                'tag':tag
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials:'include'}); 
        
        return await response.json();      

    } catch(err){
        console.log(`Error fetching request..`)
        throw new Error(err);
    }
}

export const getNew = async(post) => {

    const {name,price,description,venta,foto,tag} = post
    
    try {
        const endpoint = `${URL}/anuncios`;
        const response = await fetch (endpoint, {
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    'name': name,
                                                    'price': price,
                                                    'description':description,
                                                    'type':venta,
                                                    'photo':foto,
                                                    'tag':tag
                                                }),
                                                headers: {
                                                    'content-type': 'application/json'
                                                },
                                                credentials:'include'});    
    return await response.json();    
   

} catch (err) {
    console.log(`Error fetching request..`)
    throw new Error(err);
  }
}


