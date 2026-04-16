
export interface TransactionData {
    id: string;
    ocppTxnId: string;
    userName: string;
    userType: "Driver" | "B2C Users";
    chargingStation: string;
    chargingPoint: string;
    connectorId: string;
    startSoc: string;
    currentSoc: string;
    duration: string;
    unitConsumed: string;
    chargingSpeed: string;
    lastMeterReceived: string;
    vehicleType: string;
}

