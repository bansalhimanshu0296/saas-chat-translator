import { db } from "@/firebase";
import { collection } from "firebase/firestore";

const subscriptionConverter = {
    toFirestore: function(subscription){
        return{
            ...subscription
        }
    },
    fromFirestore: function(snaphot, options){
        const data = snaphot.data(options);
       
        const subscription = {
            id: snaphot.id,
            cancel_at_period_end: data.cancel_at_period_end,
            created: data.created,
            current_period_start: data.current_period_start,
            items: data.items,
            latest_invoice: data.latest_invoice,
            metadata: data.metadata,
            payment_method: data.payment_method,
            price: data.price,
            prices: data.prices,
            product: data.product,
            quantity: data.quantity,
            status: data.status,
            stripeLink: data.stripeLink,
            cancel_at: data.cancel_at,
            canceled_at: data.canceled_at,
            current_period_end: data.current_period_end,
            ended_at: data.ended_at,
            trial_start: data.trial_start,
            trial_end: data.trial_end,
            role: data.role
        }
        return subscription
    }

}

export const subscriptionRef = (userId) => collection(db, 'customers', userId, 'subscriptions').withConverter(subscriptionConverter);

