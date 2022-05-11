"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_WES_PAYMENT = exports.ADMIN_WES_PAYMENT = exports.DEPOSIT_COMPLETE = exports.MERCHANT_TRANSFER = exports.PROVIDER_TRANSFER = exports.SENT_TRANSFER = exports.RECEIVED_TRANSFER = void 0;
exports.RECEIVED_TRANSFER = `
{%sender%} transfered {%currency%}{%amount%} to your wallet
`;
exports.SENT_TRANSFER = `
We successfully transferred {%currency%}{%amount%} to {%receiver%}'s wallet.
`;
exports.PROVIDER_TRANSFER = `
{%sender%} sent {%currency%}{%amount%} to your wallet for {%service%} Service,  Contact Details Phone Number :{%merchantPhoneNumber%}, Email : {%merchantEmail%}`;
exports.MERCHANT_TRANSFER = `
We successfully send {%currency%}{%amount%} to {%service%} Service Provider : {%receiver%}, Contact Details Phone Number :{%providerPhoneNumber%}, Email : {%providerEmail%}`;
exports.DEPOSIT_COMPLETE = `
We successfully made a deposit of {%currency%}{%amount%} to your wallet
`;
exports.ADMIN_WES_PAYMENT = `
{%sender%} transferred {%currency%}{%amount%} for {%type%} Payment. You can reach this user via {%sender_email%}`;
exports.USER_WES_PAYMENT = `
We have successfully received your {%type%} Payment 
of {%currency%}{%amount%}

We would get back to you shortly.
`;
//# sourceMappingURL=emailTexts.js.map