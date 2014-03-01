

x = "0x00000015";
y = "0xffffffeb";



a = parseInt(x,16);
b = parseInt(y,16);

if((x & 0x8000) > 0){
	console.log("veci je 1");
	a = a - 0x10000;
};


if((y & 0x80000000) != 0){
	b = b - 0x100000000;
};

console.log(a);
console.log(b);