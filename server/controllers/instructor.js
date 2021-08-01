import queryString from 'query-string';

import User from './../models/user';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export const makeInstructor = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).exec();

        if (!user.stripe_account_id) {

            const account = await stripe.accounts.create({
                type: 'express'
            });

            user.stripe_account_id = account.id;

            user.save();

        }

        let accountLink = await stripe.AccountLinksResource.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: 'account_onboarding'
        });

        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email
        });

        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);

    } catch (err) {
        console.log(err);
    }

}