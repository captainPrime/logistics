import sgMail from "@sendgrid/mail";

const TEMPLATES = {
  withButton: "d-8cb45c4e9a094e929377c7edec75484c",
  withoutButton: "d-8c3cae2dcbc24836ae0ec457e1e91ddc",
  kycEmail: "d-487b3047176b496a9c7205b53c6418c0",
  welcomeEmail: "d-1048ce8a34114e33a8b63c4135c168b1",
  coinWaitlistEmail: "d-9b71dfc8affd4bbeb09586c98c2d18f9",
  transactionEmail: "d-7e7204aea52f493b9ad963e426ff098d",
  exclusiveEmail: "d-c9fc663340834cdb924b120bc6cd4139",
};
type TemplateType = keyof typeof TEMPLATES;
abstract class BaseEmailService {
  abstract html: string;
  abstract from: string;
  abstract subject: string;
  abstract text?: string;

  public abstract sendEmail(
    to: string | string[],
    templateType?: TemplateType,
    templateArgs?: Record<string, any>
  ): void;
}

export class SendGridMailService extends BaseEmailService {
  SG_SERVICE = sgMail;

  html: string;
  from: string;
  subject: string;
  text?: string;

  constructor(html: string, subject: string, text?: string) {
    super();
    this.subject = subject;
    this.html = html;
    (this.from = "Vesti <info@wevesti.com>"), (this.text = text);
  }

  public sendEmail = async (
    to: string | string[],
    templateType?: TemplateType,
    templateArgs?: Record<string, any>
  ): Promise<boolean> => {
    this.SG_SERVICE.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: this.from,
      subject: this.subject,
      text: this.text,
      html: this.html,
      templateId: "",
      dynamic_template_data: {
        ...templateArgs,
        subject: this.subject,
      },
    };

    if (templateType) {
      delete msg.html;
      msg.templateId = TEMPLATES[templateType];
    } else {
      delete msg.templateId;
    }

    try {
      await sgMail.send(msg);
      return true;
    } catch (error) {
      console.log(error);
      console.log(await error.response.body.errors);
      return false;
    }
  };
}
