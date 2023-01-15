import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { glocersTypes } from "../types/glocersTypes"

const collectionName = 'tiendas';

export const actionGetGlocersAsync = () => {
    return async (dispatch) => {
        const glocersCollection = collection(dataBase, collectionName);
        const querySnapshot = await getDocs(glocersCollection);        
        const glocers = [];
        
        try {
            querySnapshot.forEach(element => {
                const glocer = {
                    id: element.id,
                    ...element.data()
                }
                glocers.push(glocer)
                console.log(glocers)
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(actionGetGlocersSync(glocers));
        }
    }
};

const actionGetGlocersSync = (glocers) => {
    return {
        type: glocersTypes.GET_GLOCERS,
        payload: {
            glocers: glocers,
          },
    }
}