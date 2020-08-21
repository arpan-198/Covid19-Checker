//COVID19 CASE  STAT TYPE INTERFACE

export interface IndiaStat {
    confirmed: Number | null;
    active: Number | null;
    death: Number | null;
    recovered: Number | null;
    aChange?: Number | null;
    cChange?: Number | null;
    rChange?: Number | null;
    dChange?: Number | null;
}