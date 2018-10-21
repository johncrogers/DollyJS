module.exports.dependencies = [
  "axios",
  "body-parser",
  "cors",
  "express",
  "jquery",
  "knex",
  "pg",
  "react",
  "react-dom",
  "semantic-ui-react",
  "babel-core",
  "babel-loader",
  "babel-preset-es2015",
  "babel-preset-react",
  "nodemon",
  "webpack",
  "helmet"
];
module.exports.directoryStructure = [
  {
    name: "app",
    subfolders: [
      {
        name: "dist",
        subfolders: [
          {
            name: "scripts",
            subfolders: []
          },
          {
            name: "styles",
            subfolders: []
          }
        ]
      },
      {
        name: "src",
        subfolders: [
          {
            name: "views",
            subfolders: [
              {
                name: "admin",
                subfolders: []
              },
              {
                name: "public",
                subfolders: []
              }
            ]
          },
          {
            name: "resources",
            subfolders: []
          },
          {
            name: "copy",
            subfolders: []
          }
        ]
      }
    ]
  },
  {
    name: "server",
    subfolders: [
      {
        name: "controllers",
        subfolders: [
          {
            name: "auth",
            subfolders: []
          },
          {
            name: "routers",
            subfolders: [
              {
                name: "api",
                subfolders: [
                  {
                    name: "endpoints",
                    subfolders: []
                  }
                ]
              },
              {
                name: "app",
                subfolders: [
                  {
                    name: "endpoints",
                    subfolders: []
                  }
                ]
              },
              {
                name: "rendering",
                subfolders: [
                  {
                    name: "endpoints",
                    subfolders: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "db",
    subfolders: [
      {
        name: "models",
        subfolders: []
      },
      {
        name: "tables",
        subfolders: [
          {
            name: "conn",
            subfolders: []
          },
          {
            name: "api",
            subfolders: []
          },
          {
            name: "schemas",
            subfolders: []
          }
        ]
      },
      {
        name: "policy",
        subfolders: []
      },
      {
        name: "migrations",
        subfolders: []
      }
    ]
  }
];
