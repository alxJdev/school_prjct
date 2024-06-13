export class Crypto {
    constructor(key) {
        /**
         * @type {[string]}
         */
        this.CharArray = '@,#,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9, ,'.split(',');
        this.Key = key;
    }

    /**
     * @param {string} value
     * @return {string}
     */
    encrypt(value) {
        let split = value.split('');
        let char_array = split.map((x) => {
            let idx = this.CharArray.indexOf(x);
            let new_idx = idx + this.Key;
            while (new_idx > this.CharArray.length - 1) {
                new_idx -= (this.CharArray.length - 1);
            }
            return this.CharArray[new_idx];
        });
        return char_array.join('');
    }

    /**
     * @param {string} value
     * @return {string}
     */
    decrypt(value) {
        let split = value.split('');
        let char_array = split.map((x) => {
            let idx = this.CharArray.indexOf(x);
            let new_idx = idx - this.Key;
            while (new_idx < 0) {
                new_idx += (this.CharArray.length - 1);
            }
            return this.CharArray[new_idx];
        });
        return char_array.join('');
    }
}