require('module-alias/register');

const http = require('http'),
      WarehouseManagerAPI = require('@WarehouseManagerAPI'),
      WarehouseManagerServer = http.Server(WarehouseManagerAPI),
      WarehouseManagertPort = process.env.PORT || 3002,
      LOCAL = '0.0.0.0';

WarehouseManagerServer.listen(WarehouseManagertPort, LOCAL, () => {
    console.log(`Warehouse manager api running on ${WarehouseManagertPort}`);
})