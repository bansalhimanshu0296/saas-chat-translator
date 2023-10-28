import { db } from "@/firebase"
import { collection, doc, query, where } from "firebase/firestore"
import { User } from "next-auth"

const userConverter = {
    toFirestore: function(customer){
        return{
            email: customer.email,
            image: customer.image,
            name: customer.name
        }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options)
        return{
            id: snapshot.id,
            email: data.email,
            image: data.image,
            name: data.name
        }
    }
}

export const getUserByEmailRef = (email) => query(
    collection(db, "users"), where("email", "==", email)
).withConverter(userConverter)