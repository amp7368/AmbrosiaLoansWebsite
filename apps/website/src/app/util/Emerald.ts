const E = {
    stx: Math.pow(64, 3),
    le: Math.pow(64, 2),
    eb: Math.pow(64, 1),
    e: 1,
};
export class ECurrency {
    public stx: number;
    public le: number;
    public eb: number;
    public em: number;
    public total: number;
    constructor(emeralds: number) {
        let ems = (this.total = emeralds);
        this.stx = Math.floor(ems / E.stx);
        ems %= E.stx;
        this.le = Math.floor(ems / E.le);
        ems %= E.le;
        this.eb = Math.floor(ems / E.eb);
        ems %= E.eb;
        this.em = Math.floor(ems);
    }
}
