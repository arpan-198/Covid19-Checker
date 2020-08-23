//COVID19 CASE  STAT TYPE INTERFACE

export interface IndiaStat {
    confirmed: Number | null;
    active: Number | null;
    deceased: Number | null;
    recovered: Number | null;
    aChange?: Number | null;
    cChange?: Number | null;
    rChange?: Number | null;
    dChange?: Number | null;
}


export interface Distdata {
    dist_name : string;
    data : IndiaStat;
}