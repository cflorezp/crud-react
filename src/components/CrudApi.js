import React, {useState} from 'react';
import { useEffect } from 'react/cjs/react.development';
import {helpHttp} from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';



const CrudApi = () =>{

    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect(()=>{
        setLoading(true);
        api.get(url).then((res)=>{
            if(!res.err){
                setDb(res);
                setError(null);
            }else{
                setDb(null);
                setError(res);
            }
            setLoading(false);
        });
    }, []);

 

    const createData = (data) =>{
        data.id = Date.now();
        setDb([...db, data]);
    };

    const updateData = (data) =>{
        let newData = db.map(el => el.id === data.id ? data:el);
        setDb(newData);
    };

    const deleteData = (id) =>{
        let isDelete = window.confirm("¿Esta seguro de eliminar este registro?");
        if(isDelete){
            let newData = db.filter(el => el.id !== id);
            setDb(newData);
        }
    };

    return(
        <div>
            <h2>CRUD API - Servidor externo</h2>
            <article className="grid-1-2">
            <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
            {loading && <Loader/>}
            {error &&  <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            {db && <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>}
            
           
            </article>

        </div>

    );
}

export default CrudApi;