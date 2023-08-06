const URL = 'http://localhost:8000';
const EndPoint = `${URL}/api/tareas`;

export function FetchTasks(method, data = null, id = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if ((method === 'POST' || method === 'PUT') && data !== null) {
        options.body = JSON.stringify(data);
    }
    return fetch(`${EndPoint}/${id !== null? id : ''}`, options);
}

//Metodos HTTP
export const Metodo ={
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
}