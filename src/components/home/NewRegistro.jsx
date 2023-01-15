import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  addDoc,
  collection, 
} from 'firebase/firestore';

import { database } from '../../firebase/firebaseConfig';

const NewRegistro = ({registroModal, setRegistroModal}) => {

  // const db = getFirestore(app)
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState('');

  const typeForm = (info) => {
    setType(info);
  }

  const defaultValues = {descripcion: null, valor: null}
  // const tiempoTranscurrido = Date.now();
  const date = new Date();
  const fecha = date.toLocaleDateString()
  const fechaYHora = date.toLocaleString()
  

  const submit = async(form) => {
    const newRegister = {
      descripcion: form.descripcion,
      tipo: type,
      valor: form.valor,
      fecha: fecha,
      fechaYHora: fechaYHora
    }
    try {
      await addDoc(collection(database, "registro"), {...newRegister});
    } catch (error) {
      throw error;
    }
    setRegistroModal(!registroModal);
  }

  

  // console.log(type)

  return ( 
    <div className='newRegistro'>
      <div className='newRegistro__container'>
        <h3>Registro de Movimientos</h3>
        <form onSubmit={handleSubmit(submit)} className='newRegistro__form'>
          <div className='info_description'>
            <label htmlFor="description">Descripcion</label>
            <br />
            <input type="text" id='description' {...register('descripcion')}/>
          </div>
          <div className='movimiento_info'>
            <label htmlFor="type">Tipo de Movimiento</label>
            <br />
            <div>
              <input type="radio" id='type' onClick={() => typeForm('ingreso')}/>Ingreso
              <br />
              <input type="radio" id='type' onClick={() => typeForm('gasto')}/>Gasto
            </div>
          </div>
          <div className='valor_info'>
            <label htmlFor="valor">Valor</label>
            <br />
            <input type="number" id='valor' {...register('valor')}/>
          </div>
          <div className='newRegistro__buttons'>
            <button type='submit'>Registrar</button>
            <button onClick={() => setRegistroModal(!registroModal)}>Cancelar</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default NewRegistro
