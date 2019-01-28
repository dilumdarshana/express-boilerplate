const ejs = require('ejs');
const path = require('path');
const sendgrid = require('@sendgrid/mail');
const config = require('config');

module.exports = {

    mailClient: null,

    /**
     * init sendgrid connection
     */
    init() {
        this.mailClient = sendgrid.setApiKey(config.sendgrid.api_key);
    },

    /**
     * create email template
     *
     * @param templateName
     * @param data
     */
    createTemplate(templateName, data) {
        const jsonPath = path.join(__dirname, '../views/emails/', templateName);

        return new Promise((resolve, reject) => {
            ejs.renderFile(jsonPath, data, (error, str) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(str);
                }
            });
        });
    },

    /**
     * Send an email
     *
     * @param mailOptions
     */
    send(mailOptions) {
        return new Promise((resolve, reject) => {
            this.mailClient.sendMail(mailOptions, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    },
};
