import Stripe from "stripe";
import { connectToDB } from "../database";

export async function handleSubscriptionDeleted({
    subscriptionId,
    stripe,
} : {
    subscriptionId: string;
    stripe: Stripe,
}) {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const sql = await connectToDB();
        await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
    } catch (err) {
        console.error(`Error handling subscription deletion`, err)
        throw err;
    }
}

export async function handleCheckoutSessionCompleted({ session, stripe }: { session: Stripe.Checkout.Session; stripe: Stripe }) {
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = session.line_items?.data[0].price?.id;

    const sql = await connectToDB();

    if ('email' in customer && priceId) {
        await createOrUpdateUser(customer, customerId, sql);
        await updateUserSubscription(priceId, customer.email as string, sql);
        await insertPayment(session, customer.email as string, sql, priceId);
    };
};

async function createOrUpdateUser(customer: Stripe.Customer, customerId: string, sql: any) {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${customer.email}`;

        if (user.length === 0) {
            await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
        };

    } catch (err) {
        console.error('Error in inserting user:', err);
    };
};

async function updateUserSubscription(priceId: string, email: string, sql: any) {
    try {
        await sql`UPDATE users SET price_id = ${priceId}, status = 'active' WHERE email = ${email}`;

    } catch (err) {
        console.error('Error in updating user subscription:', err);
    };
};

async function insertPayment(session: Stripe.Checkout.Session, customerEmail: string, sql: any, priceId: string) {
    try {
        await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail})`;

    } catch (err) {
        console.error('Error in inserting payment:', err);
    };
};