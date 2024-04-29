interface ICat {
    name: string;
}

interface ICat {
    age?: number;
}

type TOptionalAgeCat = ICat;

const cat: TOptionalAgeCat = {
    name: 'catty',
}