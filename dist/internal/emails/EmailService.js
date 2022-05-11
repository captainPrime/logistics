"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGridMailService = void 0;
const mail_1 = require("@sendgrid/mail");
const TEMPLATES = {
    withButton: "d-8cb45c4e9a094e929377c7edec75484c",
    withoutButton: "d-8c3cae2dcbc24836ae0ec457e1e91ddc",
    kycEmail: "d-487b3047176b496a9c7205b53c6418c0",
    welcomeEmail: "d-1048ce8a34114e33a8b63c4135c168b1",
    coinWaitlistEmail: "d-9b71dfc8affd4bbeb09586c98c2d18f9",
    transactionEmail: "d-7e7204aea52f493b9ad963e426ff098d",
    exclusiveEmail: "d-c9fc663340834cdb924b120bc6cd4139",
};
class BaseEmailService {
}
class SendGridMailService extends BaseEmailService {
    constructor(html, subject, text) {
        super();
        this.SG_SERVICE = mail_1.default;
        this.sendEmail = async (to, templateType, templateArgs) => {
            this.SG_SERVICE.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to,
                from: this.from,
                subject: this.subject,
                text: this.text,
                html: this.html,
                templateId: "",
                dynamic_template_data: Object.assign(Object.assign({}, templateArgs), { subject: this.subject }),
            };
            if (templateType) {
                delete msg.html;
                msg.templateId = TEMPLATES[templateType];
            }
            else {
                delete msg.templateId;
            }
            try {
                await mail_1.default.send(msg);
                return true;
            }
            catch (error) {
                console.log(error);
                console.log(await error.response.body.errors);
                return false;
            }
        };
        this.subject = subject;
        this.html = html;
        (this.from = "Vesti <info@wevesti.com>"), (this.text = text);
    }
}
exports.SendGridMailService = SendGridMailService;
//# sourceMappingURL=EmailService.js.map