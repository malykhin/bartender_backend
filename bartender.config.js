module.exports = {
  apps: [
    {
      name: 'bartender',
      script: './src/index.js',
      env: {
        SERIAL_PORT: '/dev/cu.wchusbserial1410',
        BAUD_RATE: 57600,
      },
    },
  ],
}
