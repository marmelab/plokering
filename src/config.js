const config = {
  dev: {
    port: 8030,
  },

  peerJsServer: {
    host: "0.peerjs.com",
    port: 443,
    path: "/",
    debug: 0, // 0 - disable logs, 1 - only errors, 2 - errors and warnings, 3 - all logs
  },
};

export default config;
