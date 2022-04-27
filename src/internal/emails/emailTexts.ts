export const RECEIVED_TRANSFER = `
{%sender%} transfered {%currency%}{%amount%} to your wallet
`;

export const SENT_TRANSFER = `
We successfully transferred {%currency%}{%amount%} to {%receiver%}'s wallet.
`;

export const PROVIDER_TRANSFER = `
{%sender%} sent {%currency%}{%amount%} to your wallet for {%service%} Service,  Contact Details Phone Number :{%merchantPhoneNumber%}, Email : {%merchantEmail%}`;

export const MERCHANT_TRANSFER = `
We successfully send {%currency%}{%amount%} to {%service%} Service Provider : {%receiver%}, Contact Details Phone Number :{%providerPhoneNumber%}, Email : {%providerEmail%}`;

export const DEPOSIT_COMPLETE = `
We successfully made a deposit of {%currency%}{%amount%} to your wallet
`;

export const ADMIN_WES_PAYMENT = `
{%sender%} transferred {%currency%}{%amount%} for {%type%} Payment. You can reach this user via {%sender_email%}`;

export const USER_WES_PAYMENT = `
We have successfully received your {%type%} Payment 
of {%currency%}{%amount%}

We would get back to you shortly.
`;
