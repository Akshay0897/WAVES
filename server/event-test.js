const fs = require('fs');
const EventEmitter = require('events');
/* const myEmitter = new EventEmitter(); */

/* 
//here on is observer which is observing 
myEmitter.on('myevent',(params) => {
    console.log('this is my fucking event',params);
});

myEmitter.emit('myevent',9); */

/* class Sales extends EventEmitter {

        constructor() {
            super();
        }
}

const eventemitter = new Sales(); */


const fstream = fs.createReadStream('sample.txt');
const wstream = fs.WriteStream('sample1.txt');
 fstream.emit('started reading','data');

/*
fstream.on('end',() => {
    console.log('unsubscribing from event end of file');
}) */

//readablestream.pipe(writableStream); like response of writefile




