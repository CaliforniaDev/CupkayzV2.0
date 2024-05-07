const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
};

const allowedCards = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];




function onGooglePayLoaded() {
    const googlePayClient = new google.payments.api.PaymentsClient({
        environment: "TEST"
    });
}