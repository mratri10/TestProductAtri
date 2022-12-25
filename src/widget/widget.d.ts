type IconType={
    type?:string
    name:string,
    size?:number,
    color?:string
}

type SuhuType={
    value?:number,
    size?:number
}

type ImageType={
    onPressImage?:Function<string>;
    value?:string
}

type DateType={
    onPressDate?:Function<Date>;
    value?:Date
}
type TypeInputProduct={
    onPressInput:Function<TypeProductItem>
    mode:string
  }
type TypeProductItem={
    name?:string;
    qty?:string;
    expiredAt?:string;
    picture?:string;
    isActive?:boolean;
    id?:string;
    onlyCLose:boolean;
}