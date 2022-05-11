export declare class UserDTO {
    first_name: string;
    last_name: string;
    email_address: string;
    picture_url?: string;
    phone_number: string;
}
export declare class UpdateUserDTO {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    picture_url?: string;
}
export declare class userHopperRequestDTO {
    destination: string;
    destinationLat: string;
    destinationLng: string;
    pickup: string;
    pickupLat: string;
    pickupLng: string;
    hopper_id: string;
    totalRequestCost: string;
    totalRequestDistance: string;
    totalRequestDuration: string;
    requestPayType: string;
    requestPayStatus: string;
    requestMadeStatus: string;
    user_id: string;
    requestPaymentID: string;
    requestCreatedAt: string;
    email_address?: string;
}
