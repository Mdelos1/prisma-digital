import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc, 
  // getFirestore
} from 'firebase/firestore';

import { database } from '../../firebase/firebaseConfig';

const VerMovimiento = ({verMovimientoModal, setVerMovimientoModal, idRegistro}) => {

  // const db = getFirestore(app)
  const [registro, setRegistro] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState('');

  const typeForm = (info) => {
    setType(info);
  }

  useEffect(() => {
    const getStore = async() => {
      try {
        const consulta = await getDoc(doc(database, 'registro', idRegistro))
        setRegistro(consulta?._document.data.value.mapValue.fields);
      } catch (error) {
        throw error;
      }
    }
    getStore();
  }, [])


  const submit = async() => {
   try {
    await deleteDoc(doc(database, 'registro', idRegistro));
   } catch (error) {
    throw error
   }
    setVerMovimientoModal(!verMovimientoModal);
  }

  

  // console.log(registro)

  return (
    <div className='VerMovimiento'>
      <div className='VerMovimiento__container'>
        <h3>Ver Movimientos</h3>
        <h4>{registro.fechaYHora?.stringValue}</h4>
        <form className='VerMovimiento__form'>
          <div className='info_description'>
            <label htmlFor="description">Descripcion</label>
            <br />
            <input type="text" name='description' value={registro.descripcion?.stringValue}/>
          </div>
          <div className='movimiento_info'>
            <label htmlFor="type">Tipo de Movimiento</label>
            <br />

            {
              registro.tipo?.stringValue === 'ingreso' ? (
                <div>
                  <input 
                    type="radio" 
                    name='type' 
                    onClick={() => typeForm('ingreso')} 
                    defaultChecked
                    />Ingreso
                  <br />
                  <input 
                    type="radio" 
                    name='type' 
                    onClick={() => typeForm('gasto')} 
                    />Gasto
                </div>
              ) : (
                <div>
                  <input 
                    type="radio" 
                    name='type' 
                    onClick={() => typeForm('ingreso')} 
                    />Ingreso
                  <br />
                  <input 
                    type="radio" 
                    name='type' 
                    onClick={() => typeForm('gasto')} 
                    defaultChecked
                  />Gasto
                </div>
                )
            }
          </div>
          <div className='valor_info'>
            <label htmlFor="valor">Valor</label>
            <br />
            <input type="number" name='valor' value={registro.valor?.stringValue}/>
          </div>
          <div className='newRegistro__buttons'>
            <button type='submit' onClick={() => submit()}>Eliminar</button>
            <button onClick={() => setVerMovimientoModal(!verMovimientoModal)}>Cancelar</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default VerMovimiento