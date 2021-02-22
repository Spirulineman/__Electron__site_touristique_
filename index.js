const { app, BrowserWindow } = require('electron');


/* ==========================  security policy Electron  ================================ */
/* session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://www.openstreetmap.org', 'https://api.mapbox.com', 'https://www.mapbox.com', 'https://unpkg.com')) {
      // Denies the permissions request
      return callback(false)
    }
  }) */

  /* const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com') */

/* ==========================  /security policy Electron  ================================ */

// =======================  Create globals so leaflet can load
global.window = {};
global.document = {
  documentElement: {
    style: {}
  },
  getElementsByTagName: function() { return []; },
  createElement: function() { return {}; }
};
global.navigator = {
  userAgent: 'nodejs'
};
global.L = require('leaflet');
// ======================   /Create globals so leaflet can load

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

/* ====================    LEAFLET    ============================ */

var L = require('leaflet');

var map = L.map('map', {
    center: [48, 7.5],
    zoom: 13
});

 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


/* var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap); */

/* ====================    /LEAFLET    ============================ */