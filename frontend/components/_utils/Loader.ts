export const ModelLoaderOBJ = (url: string) => {
  const OBJLoader = require('three/examples/jsm/loaders/OBJLoader').OBJLoader;
  return new Promise((resolve: (model: THREE.Mesh) => void, reject) => {
    // instantiate a loader
    const loader = new OBJLoader();
    // load a resource
    loader.load(
      // resource URL
      url,
      // called when resource is loaded, assumes we get a group back, this might be bad
      function ({ children }: any) {
        if (!children[0]) return;

        const child = children[0];
        resolve(child as THREE.Mesh);
      },
      // called when loading is in progresses
      function (xhr: any) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      function (error: any) {
        console.log('An error happened');
        reject(error);
      },
    );
  });
};
