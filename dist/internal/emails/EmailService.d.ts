import sgMail from "@sendgrid/mail";
declare const TEMPLATES: {
    withButton: string;
    withoutButton: string;
    kycEmail: string;
    welcomeEmail: string;
    coinWaitlistEmail: string;
    transactionEmail: string;
    exclusiveEmail: string;
};
declare type TemplateType = keyof typeof TEMPLATES;
declare abstract class BaseEmailService {
    abstract html: string;
    abstract from: string;
    abstract subject: string;
    abstract text?: string;
    abstract sendEmail(to: string | string[], templateType?: TemplateType, templateArgs?: Record<string, any>): void;
}
export declare class SendGridMailService extends BaseEmailService {
    SG_SERVICE: sgMail.MailService;
    html: string;
    from: string;
    subject: string;
    text?: string;
    constructor(html: string, subject: string, text?: string);
    sendEmail: (to: string | string[], templateType?: TemplateType, templateArgs?: Record<string, any>) => Promise<boolean>;
}
export {};
