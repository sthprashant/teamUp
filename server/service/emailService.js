/**
 * Created by limyandivicotrico on 10/1/17.
 */

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

export function sendMessage(req, res, next) {
    sgMail.send({
        to: req.body.receiver,
        from: 'teamup@official.com',
        subject: 'Register to TeamUp',
        text: 'your team has invited you to teamup! go to utsteamup.herokuapp.com to register now!'
    }, (err, json) => {
        if (err) {
            res.send('no');
        }
        res.send('yay');
    });
}

export function sendConfirm(req, res, next) {
    sgMail.send({
        to: req.body.receiver,
        from: 'teamup@official.com',
        subject: 'Register to TeamUp',
        text: 'your team has invited you to teamup! go to utsteamup.herokuapp.com to start collaborating!'
    }, (err, json) => {
        if (err) {
            res.send('no');
        }
        res.send('yay');
    });
}
