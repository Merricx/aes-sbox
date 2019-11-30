function generate(irreducible_poly){
    try{
        p = parseInt(eval(irreducible_poly.replace(/x/g, '10')), 2);
    } catch(err){
        console.log('Irreducible Polynomial invalid');
        return;
    }

    // Calculate Multiplicative Inverse
    let t = new Uint32Array(256);
    for (let i = 0, x = 1; i < 256; i ++) {
        t[i] = x;
        x ^= (x << 1) ^ ((x >>> 7) * p);
    }

    // Generate Sbox with Affine transformation
    let Sbox = new Uint32Array(256);
    Sbox[0] = 0x63;
    for (let i = 0; i < 255; i ++) {
        let x = t[255 - i];
        x |= x << 8;
        x ^= (x >> 4) ^ (x >> 5) ^ (x >> 6) ^ (x >> 7);
        Sbox[t[i]] = (x ^ 0x63) & 0xFF;
    }

    return Sbox;
}


// Inverse of Sbox
function inverse(sbox){
    let InvSbox = new Uint32Array(256);
    for (let i =0; i < 256; i++){
        InvSbox[i] = sbox.indexOf(i);
    }

    return InvSbox;
}