export type Category='Tortas clásicas'|'Personalizadas'|'Porciones'|'Boxes'|'Individuales';
export type Choice={label:string;price?:number}; export type OptionGroup={name:string;required?:boolean;choices:Choice[]};
export type Product={id:string;name:string;description:string;price:number;category:Category;image:string;alt:string;available:boolean;leadDays:number;custom?:boolean;options?:OptionGroup[];extras?:Choice[]};
export type CartItem={key:string;product:Product;quantity:number;selections:Record<string,Choice>;extras:Choice[];note:string;date:string;customization:Record<string,string>};
