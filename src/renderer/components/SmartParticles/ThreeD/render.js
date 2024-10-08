const { SerialPort } = require('serialport')

function listSerialPorts() {
    // await SerialPort.list().then((ports) => {
    //   console.log('ports', ports);
    // })
    let port = new SerialPort({
        path: 'COM6',
        baudRate: 9600,
      });
    console.log(555);
    console.log(port);
}

export { listSerialPorts };