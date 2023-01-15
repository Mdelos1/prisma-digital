import React, { useEffect, useState } from 'react'
import LogoPrisma from '../../assets/imgs/logo-prisma.png'
import NewRegistro from './NewRegistro'
import VerMovimiento from './VerMovimiento'
import { 
    getFirestore, 
    collection,
    getDoc, 
    getDocs, 
    doc, 
    deleteDoc, 
    setDoc,
  } from 'firebase/firestore';
  import { database } from '../../firebase/firebaseConfig';


const home = () => {

    const [registroModal, setRegistroModal] = useState(false);
    const [verMovimientoModal, setVerMovimientoModal] = useState(false);
    const [idRegistro, setIdRegistro] = useState(0);
    const [listaRegistro, setListaRegistro] = useState([]);

    useEffect(() => {
        const getStore = async() => {
          try {
            const docs = []
            const consulta = await getDocs(collection(database, 'registro'))
            consulta.forEach(doc => {
              docs.push({...doc.data(), id:doc.id})
            }) 
            setListaRegistro(docs);
          } catch (error) {
            throw error;
          }
        }
        getStore();
      }, [])

    console.log(listaRegistro)
    const ver = (id) => {
        setIdRegistro(id)
        setVerMovimientoModal(!verMovimientoModal)
    }

  return (
    <>  
    <div className='logo_backgrnd'>
        <img src={LogoPrisma} alt='Logo_Prisma' className="logo_prisma"/>
    </div>
    <hr className='barra'></hr>
    <div className='info_backgrnd'>
        <div className='info_card'>
            <h1>Movimientos</h1>
            {
                listaRegistro.map((lis,i) => (
                    <div className='info_movimientos' key={i} onClick={() => ver(lis.id)}>
                        <div className='info_details'>
                            <p>{lis.fecha}</p>
                            <p>{lis.descripcion}</p>
                        </div>
                        <div>
                            <p>$ {lis.tipo === 'gasto' && '-'}{lis.valor} COP</p>
                        </div>
                    </div>
                ))
            }

            <div className='btns_home'>
                <button className='btn_verMas' >Ver más</button>
                <button className='btn_registro_movimiento' onClick={() => setRegistroModal(!registroModal)}>+</button>
            </div>
        </div>
        {
            registroModal && (
                <NewRegistro registroModal={registroModal} setRegistroModal={setRegistroModal}/>
            )
        }
        {
            verMovimientoModal && (
                <VerMovimiento
                    verMovimientoModal={verMovimientoModal} 
                    setVerMovimientoModal={setVerMovimientoModal}
                    idRegistro={idRegistro}
                />
            )
        }
    </div>
    </>
  )
}

export default home
