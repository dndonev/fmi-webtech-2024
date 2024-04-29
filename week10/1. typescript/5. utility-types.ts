interface ICar {
    serialNumber: string;
    capacity: number;
}

type TCarCapacity = Omit<ICar, 'serialNumber' | 'capacity' | 'regPlate'>;
type NullableCar = Partial<ICar>;

type TCapacityCar = Pick<ICar, 'capacity'>;

const car: TCarCapacity = {
    
}
